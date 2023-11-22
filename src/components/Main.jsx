import { TareasList } from './TareasList';
import PropTypes from 'prop-types';

function Main({ tareasFiltradas, categorie, setRightIsVisible, setLeftIsVisible, setIdPickTarea }) {
  const tareasDisplay = tareasFiltradas.filter((tarea) =>
    tarea.categories.includes(categorie.category)
  );

  return (
    <main
      className=" relative  h-[calc(100%)] w-full my-5 overflow-y-auto overflow-x-hidden grow shrink 
    dark:text-gray-200  "
    >
      <TareasList
        tareasDisplay={tareasDisplay}
        setRightIsVisible={setRightIsVisible}
        setLeftIsVisible={setLeftIsVisible}
        setIdPickTarea={setIdPickTarea}
      />
    </main>
  );
}

Main.propTypes = {
  tareasFiltradas: PropTypes.array.isRequired,
  categorie: PropTypes.object.isRequired,
  setRightIsVisible: PropTypes.func.isRequired,
  setLeftIsVisible: PropTypes.func.isRequired,
  setIdPickTarea: PropTypes.func.isRequired,
};

export default Main;
