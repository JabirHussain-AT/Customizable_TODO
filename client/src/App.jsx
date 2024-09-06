import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    < Route >
      < AppRoutes />
    </Route>
  );
};

export default App;
