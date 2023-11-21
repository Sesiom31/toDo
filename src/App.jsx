

import Body from './components/Body';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [isDark, setIsDark] = useState(false); // estado del tema [claro, oscuro]


  let nextId = tareas.length + 1; // id de la siguiente tarea

  const tareasFiltradas = tareas.filter((tarea) => {
    return tarea.description.toLowerCase().includes(textFilter.toLowerCase());
  });

  return (
    <div className={` ${isDark && 'dark'} 2xl:container selection: w-full h-screen overflow-hidden  `}>
      <Header textFilter={textFilter} setTextFilter={setTextFilter} setIsDark= {setIsDark} isDark ={isDark} />

      <Body tareas={tareasFiltradas} setTareas={setTareas} nextId={nextId} />
    </div>
  );
}

export default App;
