import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../../services/firebaseConnection';
import TaskCard from '../TaskCard';
import { Container, Content } from './styles';

interface TaskProps {
  id: string;
  name: string;
  cost: number;
  limitDate: Date | string;
  presentationOrder: number;
}

function TaskList() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const tarefasCollection = collection(db, 'tarefas');
  const tarefasSnapshot = getDocs(tarefasCollection);

  async function fetchTasks() {
    const tarefasCollection = collection(db, 'tarefas');
    const tarefasSnapshot = await getDocs(tarefasCollection);

    const taskList = tarefasSnapshot.docs.map((doc) => {
      const data = doc.data();

      const limitDate =
        data.limitDate && data.limitDate.seconds
          ? new Date(data.limitDate.seconds * 1000)
          : new Date(data.limitDate);

      return {
        id: doc.id,
        ...data,
        limitDate,
      } as TaskProps;
    });

    const orderedTasks = taskList.sort(
      (a, b) => a.presentationOrder - b.presentationOrder,
    );

    setTasks(orderedTasks);
  }

  useEffect(() => {
    fetchTasks();
  }, [tarefasSnapshot]);

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    const items = reorder(tasks, result.source.index, result.destination.index);

    console.log(items);
    setTasks(items);
  }

  async function handleDeleteAndReorder(taskId: string) {
    const taskRef = doc(db, 'tarefas', taskId);
    await deleteDoc(taskRef);

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    const batchUpdates = updatedTasks.map((task, index) => {
      const taskRef = doc(db, 'tarefas', task.id);
      return updateDoc(taskRef, { presentationOrder: index + 1 });
    });

    await Promise.all(batchUpdates);
  }

  return (
    <Container>
      <Content>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks" type="list" direction="vertical">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                    onDeleteTask={() => handleDeleteAndReorder(task.id)}
                  />
                ))}

                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </Content>
    </Container>
  );
}

export default TaskList;
