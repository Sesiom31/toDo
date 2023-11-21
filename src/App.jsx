

import Body from './components/Body';
import Header from './components/Header';
import { useState } from 'react';
import { tareasList } from './data/tareas';

function App() {
 const [tareas, setTareas] = useState(tareasList);
  return (
    <div className="2xl:container selection: w-full h-screen overflow-hidden ">
      <Header />

      <Body />
      
    </div>
  );
}

export default App;
