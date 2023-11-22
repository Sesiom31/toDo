import {  useState } from 'react';
import AsideLeft from './AsideLeft';
import { categories as categoriesArray } from '../data/categories';
import HeaderBody from './HeaderBody';
import Main from './Main';
import AsideRight from './AsideRight';
import Proptypes from 'prop-types';

function Body({ tareasFiltradas }) {
  
  const [indexCategory, setIndexCategory] = useState(0); // indice categoria
  const [categories, setCategories] = useState(categoriesArray); // lista categorias
  const [leftIsVisible, setLeftIsVisible] = useState(false); // estado del aside izquierdo
  const [rightIsVisible, setRightIsVisible] = useState(false); // estado del aside derecho 
  const [idPickTarea, setIdPickTarea] = useState(0); // id de la tarea seleccionada

  let categorie = categories[indexCategory]  

  return (
    <div
      className={`${!rightIsVisible && 'md:gap-0 md:px-0'} ${
        leftIsVisible && 'pl-0'
      } w-auto h-[calc(100%-3.5rem)]  relative overflow-hidden flex grow shrink md:gap-0 dark:bg-zinc-800  `}
    >
      <AsideLeft
        categories={categories}
        setCategories={setCategories}
        setIndexCategory={setIndexCategory}
        leftIsVisible={leftIsVisible}
        setLeftIsVisible={setLeftIsVisible}
      />

      <section
        className={`transition-[width] h-full overflow-hidden w-screen flex flex-col relative will-change-[width] md:ml-2  `}
      >
        <HeaderBody
          categorie={categorie}
          setLeftIsVisible={setLeftIsVisible}
          setRightIsVisible={setRightIsVisible}
        />

        <Main
          tareasFiltradas={tareasFiltradas}
          categorie={categorie}
          setLeftIsVisible={setLeftIsVisible}
          setRightIsVisible={setRightIsVisible}
          setIdPickTarea={setIdPickTarea}
        />
      </section>

      <AsideRight
        idPickTarea={idPickTarea}
        rightIsVisible={rightIsVisible}
        setRightIsVisible={setRightIsVisible}
      />
    </div>
  );
}

Body.propTypes = {
  tareasFiltradas: Proptypes.array.isRequired,
}

export default Body;
