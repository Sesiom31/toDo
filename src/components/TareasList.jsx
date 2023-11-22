import { StarIcon } from '@heroicons/react/24/solid';
import BtnIcon from './BtnIcon';
import PropTypes from 'prop-types';
import { CheckIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../data/formato';
import { useContext } from 'react';
import { TareasDispatchContext } from '../state/ToDoContext';

export function Tarea({ tarea, setRightIsVisible, setLeftIsVisible, setIdPickTarea }) {
  const dispatch = useContext(TareasDispatchContext);
  return (
    <li
      className={` ${
        !setIdPickTarea && 'h-auto py-2'
      } flex justify-between items-center w-auto h-14 mx-1 px-3  shadow-sm shadow-gray-600 
     rounded-md  md:mx-0  dark:bg-zinc-700 `}
      onClick={() => {
        if (setIdPickTarea && typeof setIdPickTarea === 'function') {
          setLeftIsVisible(false);
          setRightIsVisible(true);
          setIdPickTarea(tarea.id);
        }
      }}
    >
      <div
        className={`${
          !setIdPickTarea && 'lg:gap-5'
        } flex items-center gap-4 md:gap-8 lg:gap-16 h-full `}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: 'TOGGLE_COMPLETED',
              id: tarea.id,
            });
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
              !setIdPickTarea &&
              'line-clamp-none w-[14.5rem] sm:w-[30rem] md:w-[8rem] lg:w-[15rem]  '
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
            dispatch({
              type: 'TOGGLE_IMPORTANT',
              id: tarea.id,
            });
          }}
        />
      </div>
    </li>
  );
}

export function TareasList({ tareasDisplay, setRightIsVisible, setLeftIsVisible, setIdPickTarea }) {
  return (
    <>
      <h4 className=" text-[0.8rem] text-gray-500 pl-2 dark:text-gray-300">Incompletos</h4>
      <ul className="h-auto flex flex-col gap-4 my-3 md:pr-1 mb-12">
        {tareasDisplay
          .filter((tarea) => !tarea.completed)
          .map((tarea) => (
            <Tarea
              key={tarea.id}
              tarea={tarea}
              setRightIsVisible={setRightIsVisible}
              setLeftIsVisible={setLeftIsVisible}
              setIdPickTarea={setIdPickTarea}
            />
          ))}
      </ul>
      {tareasDisplay.some((tarea) => tarea.completed) && (
        <>
          <h4 className=" text-[0.8rem] text-gray-500 pl-2 dark:text-gray-300">Completos</h4>

          <ul className="h-auto flex flex-col gap-4 my-3 md:pr-1">
            {tareasDisplay
              .filter((tarea) => tarea.completed)
              .map((tarea) => (
                <Tarea
                  key={tarea.id}
                  tarea={tarea}
                  setRightIsVisible={setRightIsVisible}
                  setLeftIsVisible={setLeftIsVisible}
                  setIdPickTarea={setIdPickTarea}
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
  setRightIsVisible: PropTypes.func,
  setLeftIsVisible: PropTypes.func,
  setIdPickTarea: PropTypes.func,
};

TareasList.propTypes = {
  tareasDisplay: PropTypes.array.isRequired,
  setRightIsVisible: PropTypes.func,
  setLeftIsVisible: PropTypes.func,
  setIdPickTarea: PropTypes.func,
};
