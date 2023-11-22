import { createContext, useContext } from 'react';

export const TareasContext = createContext(null);
export const TareasDispatchContext = createContext(null);


export const useTareas = () => {
  return useContext(TareasContext);
};

export const useTareasDispatch = () => {
  return useContext(TareasDispatchContext);
};


