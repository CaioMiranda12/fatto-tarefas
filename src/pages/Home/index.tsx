import Header from '../../components/Header';
import TaskList from '../../components/TaskList';
import { Container } from './styles';

function Home() {
  return (
    <Container>
      <Header />
      <TaskList />
    </Container>
  );
}

export default Home;
