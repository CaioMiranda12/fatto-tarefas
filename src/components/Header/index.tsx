import FormPopUp from '../FormPopUp';
import { Container, HeaderContent } from './styles';

function Header() {
  return (
    <Container>
      <HeaderContent>
        <h1>Tarefas+</h1>
        <FormPopUp />
      </HeaderContent>
    </Container>
  );
}

export default Header;
