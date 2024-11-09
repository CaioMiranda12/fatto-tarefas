import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import AppRoutes from './routes/routes';
import { GlobalStyle } from './styles/globalStyles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
    <GlobalStyle />
  </StrictMode>,
);
