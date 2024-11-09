import Popper from '@mui/material/Popper';
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';

import { db } from '../../services/firebaseConnection';
import { Button, Container, FormContent } from './styles';

interface TaskProps {
  id?: string;
  name: string;
  cost: number;
  limitDate: Date | Timestamp;
  presentationOrder: number;
}

function FormPopUp() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [name, setName] = useState<string>('');
  const [cost, setCost] = useState<number>(0);
  const [limitDate, setLimitDate] = useState<Date | null>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleCostChange(e: ChangeEvent<HTMLInputElement>) {
    setCost(Number(e.target.value));
  }

  function handleLimitDateChange(e: ChangeEvent<HTMLInputElement>) {
    const date = e.target.value ? new Date(e.target.value) : null;
    setLimitDate(date);
  }

  async function addTask(e: FormEvent) {
    e.preventDefault();

    if (name === '' || cost < 0 || limitDate === null) {
      alert('Preencha os dados corretamente!');
      return;
    }

    const tarefasCollection = collection(db, 'tarefas');

    const normalizedTaskName = name.toLowerCase();

    const tarefasSnapshot = await getDocs(
      query(tarefasCollection, where('name', '==', normalizedTaskName)),
    );

    const taskExists = tarefasSnapshot.docs.some(
      (doc) => doc.data().name.toLowerCase() === normalizedTaskName,
    );

    if (taskExists) {
      alert('Já existe uma tarefa com esse nome.');
      return;
    }

    if (!tarefasSnapshot.empty) {
      alert('Já existe uma tarefa com esse nome.');
      return;
    }

    const allTasksSnapshot = await getDocs(tarefasCollection);

    const tarefas = allTasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TaskProps[];

    const novaOrdemApresentacao =
      tarefas.length > 0
        ? Math.max(...tarefas.map((task) => task.presentationOrder)) + 1
        : 1;

    const inputDate = new Date(limitDate);
    const newDate = inputDate.setDate(inputDate.getDate() + 1);

    inputDate.setHours(0, 0, 0, 0);

    const timestamp = Timestamp.fromDate(inputDate);

    const novaTarefa: TaskProps = {
      name: name,
      cost: cost,
      limitDate: timestamp,
      presentationOrder: novaOrdemApresentacao,
    };

    await addDoc(tarefasCollection, novaTarefa);

    setName('');
    setCost(0);
    setLimitDate(null);
  }

  return (
    <Container>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        + Nova tarefa
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <FormContent>
          <form
            onSubmit={(e) => {
              addTask(e);
            }}
          >
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
                value={limitDate ? limitDate.toISOString().split('T')[0] : ''}
                onChange={handleLimitDateChange}
              />
            </div>

            <button type="submit">Adicionar</button>
          </form>
        </FormContent>
      </Popper>
    </Container>
  );
}

export default FormPopUp;
