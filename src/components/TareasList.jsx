import { StarIcon } from '@heroicons/react/24/solid';
import BtnIcon from './BtnIcon';
import PropTypes from 'prop-types';
import { CheckIcon } from '@heroicons/react/24/outline';

export function Tarea({ tarea, onImportant, onCompleted }) {
  return (
    <li
      className="flex justify-between items-center w-full h-16  shadow-inner shadow-gray-500 
     rounded-md px-4 "
    >
      <div className="flex items-center gap-4 md:gap-20 h-full">
        <div onClick={onCompleted}>
          <span
            className={`${
              tarea.completed ? 'bg-orange-500 ' : 'bg-transparent'
            } w-4 h-4 border border-orange-600 flex items-center justify-center rounded-full `}
          >
            <BtnIcon
              icon={CheckIcon}
              className="h-3 w-3 text-white font-extrabold"
              
            />
          </span>
        </div>
        <div className=" flex flex-col justify-center gap-2 h-full">
          <h4 className=" font-semibold text-lg tracking-wider w-56 line-clamp-1">
            {tarea.description}
          </h4>
          <p className=" text-xs font-semibold text-gray-500">
            <span>18/11/2023</span>
            <span>- 19/11/2023</span>
          </p>{' '}
        </div>
      </div>
      <div className="felc items-center justify-center">
        <BtnIcon
          icon={StarIcon}
          classNameIcon={`${tarea.important ? 'text-orange-600' : ' text-gray-400'}`}
          onClick={onImportant}
        />
      </div>
    </li>
  );
}

export function TareasList({ tareasList, setTareas }) {
  const handleToggleImportant = (id) => {
    setTareas((prevTareas) =>
      prevTareas.map((t) =>
        t.id === id
          ? {
              ...t,
              important: !t.important,
              categories: t.important
                ? t.categories.filter((category) => category !== 'importante')
                : [...t.categories, 'importante'],
            }
          : t
      )
    );
  };

  const handleToggleCompleted = (id) => {
    setTareas((prevTareas) =>
      prevTareas.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <ul className="h-auto flex flex-col gap-4 my-4">
      {tareasList.map((tarea) => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          onImportant={() => handleToggleImportant(tarea.id)}
          onCompleted={() => handleToggleCompleted(tarea.id)}
        />
      ))}
    </ul>
  );
}

Tarea.propTypes = {
  tarea: PropTypes.object.isRequired,
  onImportant: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
};

TareasList.propTypes = {
  tareasList: PropTypes.array.isRequired,
  setTareas: PropTypes.func.isRequired,
};
