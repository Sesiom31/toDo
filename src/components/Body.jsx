import { useState } from 'react';
import AsideLeft from './AsideLeft';
import { categories as categoriesArray } from '../data/categories';
import HeaderBody from './HeaderBody';
import Main from './Main';
import { tareasList } from '../data/tareas';

function Body() {
  const [categories, setCategories] = useState(categoriesArray);
  const [index, setIndex] = useState(0);
  const [leftIsVisible, setLeftIsVisible] = useState(false);
  const [tareas, setTareas] = useState(tareasList);

  const nextId = tareas.length + 1;

  return (
    <div className="w-full h-[calc(100%-3.5rem)]   relative overflow-y-hidden flex grow shrink ">
      <AsideLeft
        categories={categories}
        setCategories={setCategories}
        setIndex={setIndex}
        leftIsVisible={leftIsVisible}
        setLeftIsVisible={setLeftIsVisible}
        tareas={tareas}
      />

      <section
        className={`transition-[width] h-full overflow-hidden w-full flex flex-col relative will-change-[width] `}
      >
        <HeaderBody
          index={index}
          categories={categories}
          setLeftIsVisible={setLeftIsVisible}
          setTareas={setTareas}
          id={nextId}
        />

        <Main tareas={tareas} categories={categories} index={index} setTareas={setTareas} />
      </section>
    </div>
  );
}

export default Body;
