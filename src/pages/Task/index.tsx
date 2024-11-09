import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { db } from '../../services/firebaseConnection';
import { Container, HeaderLink, HeaderTask } from './styles';

interface TaskProp {
  name: string;
  limitDate: string;
  cost: number;
  presentationOrder: string;
}

function Task() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<TaskProp | null>(null);
  const [name, setName] = useState<string>('');
  const [cost, setCost] = useState<number>(0);
  const [limitDate, setLimitDate] = useState<string>('');

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }

    async function loadTask() {
      const docRef = doc(db, 'tarefas', `${id}`);
      const snapshot = await getDoc(docRef);

      if (snapshot.data() === undefined) {
        navigate('/');
      } else {
        const taskData = snapshot.data() as TaskProp;

        setTask(taskData);

        setName(taskData.name);
        setCost(taskData.cost);

        if (taskData.limitDate) {
          setLimitDate(taskData.limitDate);
        }
      }
    }

    loadTask();
  }, [id, navigate]);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleCostChange(e: ChangeEvent<HTMLInputElement>) {
    setCost(Number(e.target.value));
  }

  function handleLimitDateChange(e: ChangeEvent<HTMLInputElement>) {
    setLimitDate(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!task) return;

    const inputDate = new Date(limitDate);
    const newDate = inputDate.setDate(inputDate.getDate() + 1);
    console.log(new Date(newDate).toLocaleDateString);

    const updatedTask = {
      name,
      limitDate: limitDate || newDate,
      cost,
    };
    const docRef = doc(db, 'tarefas', `${id}`);
    try {
      await updateDoc(docRef, updatedTask);
      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar a tarefa: ', error);
    }
  }

  return (
    <Container>
      <HeaderTask>
        <h1>Tarefas+</h1>

        <HeaderLink to="/">Voltar para inicio</HeaderLink>
      </HeaderTask>

      <form onSubmit={handleSubmit}>
        <div>
          <span>Nome</span>
          <input
            type="text"
            placeholder="Digite o nome..."
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div>
          <span>Custo</span>
          <input
            type="number"
            placeholder="Digite o custo..."
            value={cost}
            onChange={handleCostChange}
          />
        </div>

        <div>
          <span>Data limite</span>
          <input
            type="date"
            placeholder="Digite a data limite..."
            value={limitDate || ''}
            onChange={handleLimitDateChange}
          />
        </div>

        <button type="submit">Atualizar</button>
      </form>
    </Container>
  );
}

export default Task;
