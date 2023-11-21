import { useState } from 'react';
import AsideLeft from './AsideLeft';
import { categories as categoriesArray } from '../data/categories';
import HeaderBody from './HeaderBody';
import Main from './Main';
import { tareasList } from '../data/tareas';
import AsideRight from './AsideRight';

function Body() {
  const [index, setIndex] = useState(0);
  const [categories, setCategories] = useState(categoriesArray);
  const [leftIsVisible, setLeftIsVisible] = useState(false);
  const [rightIsVisible, setRightIsVisible] = useState(false);
  const [tareas, setTareas] = useState(tareasList);
  const [idTarea, setIdTarea] = useState(0);

  const nextId = tareas.length + 1;

  return (
    <div
      className={`${!rightIsVisible && 'md:gap-0 md:px-2'} w-auto h-[calc(100%-3.5rem)]  relative overflow-hidden flex grow-[2] shrink-[2] md:gap-3`}
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
        className={`transition-[width] h-full overflow-hidden w-screen flex flex-col relative will-change-[width] `}
      >
        <HeaderBody
          index={index}
          categories={categories}
          setLeftIsVisible={setLeftIsVisible}
          setTareas={setTareas}
          id={nextId}
        />

        <Main
          tareas={tareas}
          categories={categories}
          index={index}
          setTareas={setTareas}
          setIdTarea={setIdTarea}
          setRightIsVisible={setRightIsVisible}
        />
      </section>

      <AsideRight
        idTarea={idTarea}
        tareas={tareas}
        setTareas={setTareas}
        rightIsVisible={rightIsVisible}
        setRightIsVisible={setRightIsVisible}
      />
    </div>
  );
}

export default Body;
