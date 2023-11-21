import { CheckIcon } from '@heroicons/react/24/outline';
import BtnIcon from './BtnIcon';
import PropTypes from 'prop-types';

export function Paso({ paso }) {
  return (
    <li
      className="w-auto min-h-[45px] h-auto flex items-center gap-4 px-4 py-1 mx-1  shadow-sm shadow-gray-500 
     rounded-md text-gray-700  text-base hover:bg-gray-300"
    >
      <span
        className={`${
          paso.completed ? 'bg-orange-500 ' : 'bg-transparent'
        } w-4 h-4 border border-orange-600 flex items-center justify-center rounded-full `}
      >
        <BtnIcon icon={CheckIcon} className="h-3 w-3 text-white font-extrabold" />
      </span>
      <span className=' text-sm'>{paso.description}</span>
    </li>
  );
}

export function PasosList({ tareaObj }) {
  return (
    <ul className='flex flex-col gap-1'>
      {tareaObj.pasos.map((paso) => (
        <Paso paso={paso} key={paso.id} />
      ))}
    </ul>
  );
}


Paso.propTypes = {
  paso: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

PasosList.propTypes = {
  tareaObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    date_start: PropTypes.string.isRequired,
    date_end: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    pasos: PropTypes.array.isRequired,
  }).isRequired,
};