import { useState } from 'react';
import AsideLeft from './AsideLeft';
import { categories as categoriesArray } from '../data/categories';
import HeaderBody from './HeaderBody';
import Main from './Main';
import AsideRight from './AsideRight';
import Proptypes from 'prop-types';

function Body({tareas, setTareas, nextId}) {
  const [index, setIndex] = useState(0); // indice categoria
  const [categories, setCategories] = useState(categoriesArray); // lista categorias
  const [leftIsVisible, setLeftIsVisible] = useState(false); // estado del aside izquierdo
  const [rightIsVisible, setRightIsVisible] = useState(false); // estado del aside derecho
  const [idTarea, setIdTarea] = useState(0); // id de la tarea

  
  
  let tarea = tareas.find((t) => t.id === idTarea); // tarea actual

  if (tarea === undefined) {
    tarea = {
      id: 1,
      description: ' ',
      completed: false,
      date_start: 'Sun Nov 19 2023 16:38:50 GMT-0500 ',
      date_end: 'Sun Nov 19 2023 16:38:50 GMT-0500 ',
      important: false,
      categories: ['tareas'],
      pasos: [{ id: 1, description: ' ', completed: false }], // pasos de la tarea
    };
  }

  console.log(tarea);

  return (
    <div
      className={`${!rightIsVisible && 'md:gap-0 md:px-0'} ${
        leftIsVisible && 'pl-0'
      } w-auto h-[calc(100%-3.5rem)]  relative overflow-hidden flex grow shrink md:gap-0 dark:bg-zinc-800  `}
    >
      <AsideLeft
        categories={categories}
        setCategories={setCategories}
        setIndex={setIndex}
        leftIsVisible={leftIsVisible}
        setLeftIsVisible={setLeftIsVisible}
        tareas={tareas}
      />

      <section
        className={`transition-[width] h-full overflow-hidden w-screen flex flex-col relative will-change-[width] md:ml-2  `}
      >
        <HeaderBody
          index={index}
          categories={categories}
          setLeftIsVisible={setLeftIsVisible}
          setRightIsVisible={setRightIsVisible}
          setTareas={setTareas}
          id={nextId}
        />

        <Main
          tareas={tareas}
          categories={categories}
          index={index}
          setTareas={setTareas}
          setIdTarea={setIdTarea}
          setLeftIsVisible={setLeftIsVisible}
          setRightIsVisible={setRightIsVisible}
        />
      </section>

      <AsideRight
        tarea={tarea}
        setTareas={setTareas}
        rightIsVisible={rightIsVisible}
        setRightIsVisible={setRightIsVisible}
      />
    </div>
  );
}

Body.propTypes = {
  tareas: Proptypes.array.isRequired,
  setTareas: Proptypes.func.isRequired,
  nextId: Proptypes.number.isRequired,
}

export default Body;
