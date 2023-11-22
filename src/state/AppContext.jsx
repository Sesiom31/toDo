import { tareasReducer } from './tareasReducer';
import { useReducer } from 'react';
import { TareasContext, TareasDispatchContext } from './ToDoContext';
import PropTypes from 'prop-types';

export function AppContext({ children }) {
  const [tareas, dispatch] = useReducer(tareasReducer, []);

  

  return (
    <TareasContext.Provider value={tareas}>
      <TareasDispatchContext.Provider value={dispatch}>{children}</TareasDispatchContext.Provider>
    </TareasContext.Provider>
  );
}

AppContext.propTypes = {
  children: PropTypes.node.isRequired,
};
