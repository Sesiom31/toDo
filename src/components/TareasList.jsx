import { StarIcon } from '@heroicons/react/24/solid';
import BtnIcon from './BtnIcon';
import PropTypes from 'prop-types';
import { CheckIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../data/formato';

export function Tarea({ tarea, setTareas, setIdTarea, setRightIsVisible, setLeftIsVisible }) {
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
    <li
      className={` ${
        !setIdTarea && 'h-auto py-2'
      } flex justify-between items-center w-auto h-14 mx-1 px-3  shadow-sm shadow-gray-600 
     rounded-md  md:mx-0  dark:bg-zinc-700 `}
      onClick={() => {
        if (setIdTarea && typeof setIdTarea === 'function') {
          setLeftIsVisible(false);
          setRightIsVisible(true);
          setIdTarea(tarea.id);
        }
      }}
    >
      <div
        className={`${
          !setIdTarea && 'lg:gap-5'
        } flex items-center gap-4 md:gap-8 lg:gap-16 h-full `}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleToggleCompleted(tarea.id);
          }}
          title="Completado"
        >
          <span
            className={`${
              tarea.completed ? 'bg-orange-500  ' : 'bg-transparent'
            } w-4 h-4 border border-orange-600 flex items-center justify-center rounded-full `}
          >
            <BtnIcon
              icon={CheckIcon}
              className="h-3 w-3 text-white font-extrabold dark:text-gray-100"
            />
          </span>
        </div>

        <div className=" flex flex-col justify-center gap-2 h-full">
          <h4
            className={`${
              !setIdTarea && 'line-clamp-none w-[14.5rem] sm:w-[30rem] md:w-[8rem] lg:w-[15rem]  '
            }  font-medium text-lg tracking-wider w-40 line-clamp-1 md:w-96 `}
          >
            {tarea.description}
          </h4>
          <p className=" text-xs font-light text-gray-500 flex gap-4 max-w-[100%] dark:text-gray-300 ">
            {tarea.date_end !== '' ? (
              <>
                <span className=" whitespace-nowrap line-clamp-1">
                  {formatDate(new Date(tarea.date_end))}
                </span>
              </>
            ) : (
              <span className=" whitespace-nowrap line-clamp-1">
                {formatDate(new Date(tarea.date_start))}
              </span>
            )}
          </p>{' '}
        </div>
      </div>
      <div className="flex items-center justify-center" title="Marcar como importante">
        <BtnIcon
          icon={StarIcon}
          classNameIcon={`${tarea.important ? 'text-orange-500' : ' text-gray-400'}`}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleImportant(tarea.id);
          }}
        />
      </div>
    </li>
  );
}

export function TareasList({
  tareasList,
  setTareas,
  setIdTarea,
  setRightIsVisible,
  setLeftIsVisible,
}) {
  return (
    <>
      <h4 className=" text-[0.8rem] text-gray-500 pl-2 dark:text-gray-300">Incompletos</h4>
      <ul className="h-auto flex flex-col gap-4 my-3 md:pr-1 mb-12">
        {tareasList
          .filter((tarea) => !tarea.completed)
          .map((tarea) => (
            <Tarea
              key={tarea.id}
              tarea={tarea}
              setTareas={setTareas}
              setIdTarea={setIdTarea}
              setRightIsVisible={setRightIsVisible}
              setLeftIsVisible={setLeftIsVisible}
            />
          ))}
      </ul>
      {tareasList.some((tarea) => tarea.completed) && (
        <>
          <h4 className=" text-[0.8rem] text-gray-500 pl-2 dark:text-gray-300">Completos</h4>

          <ul className="h-auto flex flex-col gap-4 my-3 md:pr-1">
            {tareasList
              .filter((tarea) => tarea.completed)
              .map((tarea) => (
                <Tarea
                  key={tarea.id}
                  tarea={tarea}
                  setTareas={setTareas}
                  setIdTarea={setIdTarea}
                  setRightIsVisible={setRightIsVisible}
                  setLeftIsVisible={setLeftIsVisible}
                />
              ))}
          </ul>
        </>
      )}
    </>
  );
}

Tarea.propTypes = {
  tarea: PropTypes.object.isRequired,
  setTareas: PropTypes.func.isRequired,
  setIdTarea: PropTypes.func,
  setRightIsVisible: PropTypes.func,
  setLeftIsVisible: PropTypes.func,
};

TareasList.propTypes = {
  tareasList: PropTypes.array.isRequired,
  setTareas: PropTypes.func.isRequired,
  setIdTarea: PropTypes.func.isRequired,
  setRightIsVisible: PropTypes.func,
  setLeftIsVisible: PropTypes.func,
};
