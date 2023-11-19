import { TareasList } from './TareasList';
import PropTypes from 'prop-types';

function Main({ categories, index, tareas, setTareas }) {
  const tareaDisplay = tareas.filter((tarea) =>
    tarea.categories.includes(categories[index].category)
  );

  return (
    <main className=" absolute left-0 right-0 bottom-0 h-[calc(100%-220px)] px-2 overflow-hidden overflow-y-auto  ">
      <TareasList tareasList={tareaDisplay} setTareas={setTareas} />
    </main>
  );
}

Main.propTypes = {
  categories: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  tareas: PropTypes.array.isRequired,
  setTareas: PropTypes.func.isRequired,
};

export default Main;
