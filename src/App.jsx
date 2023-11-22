import Body from './components/Body';
import Header from './components/Header';
import { useReducer, useState, useEffect } from 'react';
import { TareasContext, TareasDispatchContext } from './state/ToDoContext';
import { tareasReducer } from './state/tareasReducer';

function App() {
  const [tareas, dispatch] = useReducer(tareasReducer, []);
  const [isDark, setIsDark] = useState(false); // estado del tema [claro, oscuro]
  const [textFilter, setTextFilter] = useState('');

  const tareasFiltradas = tareas.filter((tarea) => {
    return tarea.description.toLowerCase().includes(textFilter.toLowerCase());
  });

  useEffect(() => {
    const storedTareas = JSON.parse(localStorage.getItem('tareas'));
    if (storedTareas && storedTareas.length > 0) {
      dispatch({ type: 'CARGAR_TAREAS', tareas: storedTareas });
    }

    const storedTema = JSON.parse(localStorage.getItem('isDark'));
    if (storedTema !== null) {
      setIsDark(storedTema);
    }
  }, []);

  useEffect(() => {
    console.log('establecer tareas');
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  return (
    <TareasContext.Provider value={tareas}>
      <TareasDispatchContext.Provider value={dispatch}>
        <div
          className={` ${
            isDark && 'dark'
          } 2xl:container selection: w-full h-screen overflow-hidden  `}
        >
          <Header
            textFilter={textFilter}
            setTextFilter={setTextFilter}
            setIsDark={setIsDark}
            isDark={isDark}
          />

          <Body tareasFiltradas={tareasFiltradas} />
        </div>
      </TareasDispatchContext.Provider>
    </TareasContext.Provider>
  );
}

export default App;
