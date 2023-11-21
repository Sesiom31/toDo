import { TareasList } from './TareasList';
import PropTypes from 'prop-types';

function Main({ categories, index, tareas, setTareas, setIdTarea, setRightIsVisible, setLeftIsVisible }) {
  const tareaDisplay = tareas.filter((tarea) =>
    tarea.categories.includes(categories[index].category)
  );

  return (
    <main className=" relative  h-[calc(100%)] w-full my-5 overflow-y-auto overflow-x-hidden grow shrink 
    dark:text-gray-200  ">
      <TareasList
        tareasList={tareaDisplay}
        setTareas={setTareas}
        setIdTarea={setIdTarea}
        setRightIsVisible={setRightIsVisible}
        setLeftIsVisible={setLeftIsVisible}
      />
    </main>
  );
}

Main.propTypes = {
  categories: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  tareas: PropTypes.array.isRequired,
  setTareas: PropTypes.func.isRequired,
  setIdTarea: PropTypes.func.isRequired,
  setRightIsVisible: PropTypes.func.isRequired,
  setLeftIsVisible: PropTypes.func.isRequired,
};

export default Main;
