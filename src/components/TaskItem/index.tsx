import { Draggable } from '@hello-pangea/dnd';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { convertCurrency } from '../../utils/convertCurrency';
import DeleteButton from '../DeleteButton';
import { CardActions, CardContainer, CardId } from './styles';

interface TaskItemProps {
  task: {
    id: string;
    name: string;
    cost: number;
    limitDate: Date | string;
    presentationOrder: number;
  };
  index: number;
}

function TaskCard({ task, index }: TaskItemProps) {
  const navigate = useNavigate();

  async function HandleEditTask(id: string) {
    navigate(`/tarefa/${id}`);
  }

  function formatDate(date: Date | string) {
    const inputDate = new Date(date);
    const newDate = inputDate.setDate(inputDate.getDate() + 1);

    return new Date(date).toLocaleDateString();
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <CardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
      )}
    </Draggable>
  );
}

export default TaskCard;
