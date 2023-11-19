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

  const nextId = tareas.length + 1

  return (
    <div className="w-full h-[calc(100%-3.5rem)] p-0.5 md:p-2 relative overflow-y-hidden">
      <AsideLeft
        categories={categories}
        setCategories={setCategories}
        setIndex={setIndex}
        leftIsVisible={leftIsVisible}
        setLeftIsVisible={setLeftIsVisible}
        tareas={tareas}
      />
      <HeaderBody
        index={index}
        categories={categories}
        setLeftIsVisible={setLeftIsVisible}
        setTareas={setTareas}
        id={nextId}
      />

      <Main tareas={tareas} categories={categories} index={index} setTareas={setTareas} />
    </div>
  );
}

export default Body;
