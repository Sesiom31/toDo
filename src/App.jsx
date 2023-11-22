import Body from './components/Body';
import Header from './components/Header';
import { useReducer, useState } from 'react';
import { tareasList } from './data/tareas';
import { TareasContext, TareasDispatchContext } from './state/ToDoContext';
import { tareasReducer } from './state/tareasReducer';

function App() {
  const [tareas, dispatch] = useReducer(tareasReducer, tareasList);

  const [textFilter, setTextFilter] = useState('');
  const [isDark, setIsDark] = useState(false); // estado del tema [claro, oscuro]

  const tareasFiltradas = tareas.filter((tarea) => {
    return tarea.description.toLowerCase().includes(textFilter.toLowerCase());
  });

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
