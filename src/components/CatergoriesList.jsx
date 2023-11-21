import { TrashIcon } from '@heroicons/react/24/outline';
import BtnIcon from './BtnIcon';
import PropTypes from 'prop-types';

function List({ categorie, setCategories, setIndex, tareas }) {
  let count = 0;
  tareas.forEach((tarea) => {
    if (tarea.categories.includes(categorie.category)) {
      count++;
    }
  });

  return (
    <li
      className="flex justify-between items-center w-full h-12 pr-3.5 pl-1 cursor-pointer hover:bg-gray-300"
      onClick={(e) => {
        e.stopPropagation();
        setIndex(categorie.id - 1);
      }}
    >
      <section className="flex items-center gap-2 ">
        <BtnIcon icon={categorie.icon} />
        <h3 className="text-sm capitalize  w-[5.5rem] line-clamp-1 ">{categorie.name}</h3>
      </section>

      <div className=" flex items-center gap-2">
        {categorie.added && (
          <span data-tooltip='Eliminar lista'>

          <BtnIcon
            icon={TrashIcon}
            className="w-[18px] h-[18px] p-0"
            onClick={(e) => {
              console.log('delete');
              e.stopPropagation();
              setIndex(0);
              setCategories((prevState) => prevState.filter((cat) => cat.id !== categorie.id));
            }}
          />
          </span>
        )}
        <span className="text-sm">{count}</span>
      </div>
    </li>
  );
}

function CatergoriesList({ categories, setCategories, setIndex, tareas }) {
  /* console.log(categories); */
  return (
    <ul>
      {categories.map((categorie) => (
        <List
          key={categorie.id}
          categorie={categorie}
          setCategories={setCategories}
          setIndex={setIndex}
          tareas={tareas}
        />
      ))}
    </ul>
  );
}

List.propTypes = {
  categorie: PropTypes.object.isRequired,
  setCategories: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  tareas: PropTypes.array.isRequired,
};

CatergoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  tareas: PropTypes.array.isRequired,
};

export default CatergoriesList;
