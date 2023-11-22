import { CheckIcon } from '@heroicons/react/24/outline';
import BtnIcon from './BtnIcon';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { TareasDispatchContext } from '../state/ToDoContext';

export function Paso({paso, tarea}) {
  const dispatch = useContext(TareasDispatchContext);

  return (
    <li
      className="w-auto min-h-[45px] h-auto flex items-center gap-4 px-4 py-1 mx-1  shadow-sm shadow-gray-500 
     rounded-md text-gray-700  text-base hover:bg-gray-300 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-800"
    >
      <span
        className={`${
          paso.completed ? 'bg-orange-500 ' : 'bg-transparent'
        } w-4 h-4 border border-orange-600 flex items-center justify-center rounded-full `}
        onClick={() => {
          dispatch({
            type: 'TOGGLE_COMPLETED_PASO',
            id: tarea.id,
            id_paso: paso.id,
          });
        }}
      >
        <BtnIcon icon={CheckIcon} className="h-3 w-3 text-white font-extrabold" />
      </span>
      <span className=" text-sm">{paso.description}</span>
    </li>
  );
}

export function PasosList({ tarea}) {
  return (
    <ul className="flex flex-col gap-1">
      {tarea.pasos.map((paso) => (
        <Paso key={paso.id} paso={paso} tarea={tarea} />
      ))}
    </ul>
  );
}

Paso.propTypes = {
  paso: PropTypes.object.isRequired,  
  tarea: PropTypes.object.isRequired,
};

PasosList.propTypes = {
  tarea: PropTypes.object.isRequired,
};
