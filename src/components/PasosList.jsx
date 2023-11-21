import { CheckIcon } from '@heroicons/react/24/outline';
import BtnIcon from './BtnIcon';
import PropTypes from 'prop-types';

export function Paso({ paso, setTareas, id }) {
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
          setTareas((prevTareas) =>
            prevTareas.map((t) =>
              t.id === id ? { ...t, pasos: t.pasos.map((p) => p.id === paso.id ? {...p, completed: !p.completed} :p) } : t
            )
          );
        }}
      >
        <BtnIcon icon={CheckIcon} className="h-3 w-3 text-white font-extrabold" />
      </span>
      <span className=" text-sm">{paso.description}</span>
    </li>
  );
}

export function PasosList({ tareaObj, setTareas, id }) {
  return (
    <ul className="flex flex-col gap-1">
      {tareaObj.pasos.map((paso) => (
        <Paso paso={paso} key={paso.id} setTareas={setTareas} id={id} />
      ))}
    </ul>
  );
}

Paso.propTypes = {
  paso: PropTypes.object.isRequired,
  setTareas: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

PasosList.propTypes = {
  tareaObj: PropTypes.object.isRequired,
  setTareas: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
