import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoSearchSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { db } from '../../services/firebaseConnection';
import { convertCurrency } from '../../utils/convertCurrency';
import DeleteButton from '../DeleteButton';
import {
  CardActions,
  Container,
  Content,
  InputContainer,
  CardContainer,
  CardId,
} from './styles';

interface TaskProps {
  id: string;
  name: string;
  cost: number;
  limitDate: Date | string;
  presentationOrder: number;
}

function TaskList() {
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
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

  function handleSearchClick() {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }

  async function HandleEditTask(id: string) {
    navigate(`/tarefa/${id}`);
  }

  function formatDate(date: Date | string) {
    const inputDate = new Date(date);
    const newDate = inputDate.setDate(inputDate.getDate() + 1);

    // return inputDate.toLocaleDateString();

    // return new Date(newDate).toLocaleDateString();

    return new Date(date).toLocaleDateString();
  }

  function formatStartDate(date: Date | string) {
    const inputDate = new Date(date);
    const newDate = inputDate.setDate(inputDate.getDate() + 1);

    return inputDate.toLocaleDateString();

    // return new Date(newDate).toLocaleDateString();

    // return new Date(date).toLocaleDateString();
  }

  return (
    <Container>
      <Content>
        <InputContainer>
          <button onClick={handleSearchClick} type="button">
            <IoSearchSharp color="#000" size={20} />
          </button>
          <input ref={inputRef} placeholder="Procurar tarefa..." />
        </InputContainer>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <CardContainer>
                <span>Nome: {task.name}</span>
                {task.cost >= 1000 ? (
                  <p
                    style={{
                      backgroundColor: '#ffd843',
                      padding: 10,
                      fontWeight: 'bold',
                    }}
                  >
                    Custo: {convertCurrency(task.cost)}
                  </p>
                ) : (
                  <p>Custo: {convertCurrency(task.cost)}</p>
                )}
                <p>Data limite: {formatDate(task.limitDate)}</p>

                <CardId>
                  Id: <span>{task.id}</span>
                </CardId>
                <CardActions>
                  <button onClick={() => HandleEditTask(task.id)} type="button">
                    <FaEdit size={25} color="#000" />
                  </button>
                  <DeleteButton taskId={task.id} />
                </CardActions>
              </CardContainer>
            </li>
          ))}
        </ul>
      </Content>
    </Container>
  );
}

export default TaskList;
