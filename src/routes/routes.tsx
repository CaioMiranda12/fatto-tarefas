import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Task from '../pages/Task';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tarefa/:id" element={<Task />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
