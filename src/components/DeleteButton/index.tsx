import Popper from '@mui/material/Popper';
import { MouseEvent, useState } from 'react';
import { MdDelete } from 'react-icons/md';

import { Container, ConfirmContainer } from './styles';

interface DeleteButtonProps {
  onDelete: () => void;
}

function DeleteButton({ onDelete }: DeleteButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Container>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        <MdDelete size={25} color="red" />
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ConfirmContainer>
          <p>Você tem certeza que deseja excluir a tarefa?</p>
          <div>
            <button onClick={onDelete}>Sim</button>
            <button onClick={handleClick}>Não</button>
          </div>
        </ConfirmContainer>
      </Popper>
    </Container>
  );
}

export default DeleteButton;
