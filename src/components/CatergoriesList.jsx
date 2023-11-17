import { TrashIcon } from '@heroicons/react/24/outline';
import BtnIcon from './BtnIcon';
import PropTypes from 'prop-types';

function List({ categorie, setCategories, setIndex }) {
  return (
    <li
      className="flex justify-between items-center w-full h-12 pr-3.5 pl-1 cursor-pointer hover:bg-gray-200"
      onClick={(e) => {
        console.log('li');
        e.stopPropagation();
        setIndex(categorie.id - 1);
      }}
    >
      <section className="flex items-center gap-2">
        <BtnIcon icon={categorie.icon} />
        <h3 className="text-sm capitalize ">{categorie.name}</h3>
      </section>

      <div className=" flex items-center gap-2">
        {categorie.added && (
          <BtnIcon
            icon={TrashIcon}
            className="w-4 h-4"
            onClick={(e) => {
              console.log('delete');
              e.stopPropagation();
              setIndex(0);
              setCategories((prevState) => prevState.filter((cat) => cat.id !== categorie.id));
            }}
          />
        )}
        <span className="text-sm">{categorie.count}</span>
      </div>
    </li>
  );
}

function CatergoriesList({ categories, setCategories, setIndex }) {
  console.log(categories);
  return (
    <ul>
      {categories.map((categorie) => (
        <List
          key={categorie.id}
          categorie={categorie}
          setCategories={setCategories}
          setIndex={setIndex}
        />
      ))}
    </ul>
  );
}

List.propTypes = {
  categorie: PropTypes.object.isRequired,
  setCategories: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
};

CatergoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
};

export default CatergoriesList;
