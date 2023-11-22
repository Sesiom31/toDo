import { CalendarDaysIcon, StarIcon } from '@heroicons/react/24/solid';
import BtnIcon from './BtnIcon';
import { useState, useRef, useEffect, useContext } from 'react';
import Proptypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TareasDispatchContext } from '../state/ToDoContext';

function BtnAdd({ categorieName }) {
  const [newDescription, setNewDescription] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [openInput, setOpenInput] = useState(false);
  const [calenderIsOpen, setCalenderIsOpen] = useState(false);
  
  const dispatch = useContext(TareasDispatchContext);
  
  const inputRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (openInput) {
      inputRef.current.focus();
    }
  }, [openInput]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalenderIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <section
        className="w-auto h-12 md:h-14 shadow-md shadow-gray-700 rounded-md overflow-hidden 
      flex flex-col justify-center items-center px-3 mx-1 relative md:mx-0 md:mt-5 md:mr-2 dark:bg-zinc-700 "
      >
        {!openInput ? (
          <button
            className="w-full h-full  flex justify-between items-center"
            onClick={() => setOpenInput(true)}
          >
            <div className="flex items-center gap-8 w-10/12 h-full md:gap-16">
              <span className="w-4 h-4 border border-orange-600 block rounded-full dark:border-orange-500"></span>
              <h3 className="text-[0.9rem] text-orange-600 dark:text-orange-400 dark:font-extralight">
                Agregar Tarea
              </h3>
            </div>

            <span></span>
          </button>
        ) : (
          <section className="w-full h-full flex items-center justify-between  ">
            <div className=" w-full h-full rounded-md flex items-center pt-0.5 ">
              <span className="border border-orange-600 h-4 w-4 rounded-full dark:text-orange-500 "></span>
              <input
                ref={inputRef}
                value={newDescription}
                type="text"
                placeholder="Agregar Tarea"
                className=" h-[80%]  w-[95%] text-[0.9rem] placeholder:text-[0.9rem] 
                 placeholder:text-gray-400 pt-0.5 placeholder:pt-0.5  outline-none px-8  
                md:px-16 dark:bg-zinc-700 dark:text-white dark:shadow-none "
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
              />
            </div>
            <span></span>
          </section>
        )}
      </section>
      {openInput && (
        <div className="px-3 flex justify-between w-auto mt-2 mx-4">
          <div className="flex gap-8 items-center">
            <div className="relative flex items-center" title="Ingresar una fecha de vencimiento">
              <BtnIcon
                icon={CalendarDaysIcon}
                className="text-orange-600 dark:text-orange-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setCalenderIsOpen(!calenderIsOpen);
                }}
              />
              {calenderIsOpen && (
                <div ref={calendarRef}>
                  <DatePicker
                    inline
                    minDate={new Date()}
                    onChange={(date) => {
                      setDateEnd(date);
                    }}
                  />
                </div>
              )}
            </div>

            <div title="Marcar como importante" className="flex items-center">
              <BtnIcon
                icon={StarIcon}
                className={`${isImportant ? 'text-orange-600' : ' text-gray-400 '} ${
                  categorieName === 'importante' && 'text-orange-600 '
                } `}
                onClick={() => {
                  setIsImportant(!isImportant);
                }}
              />
            </div>
          </div>

          {newDescription.trim() !== '' && (
            <span className="flex items-center ">
              <button
                type="button"
                className={` bg-orange-600 text-gray-200 py-1 px-3 pb-1.5 text-xs rounded-md hover:bg-orange-700`}
                onClick={() => {
                  dispatch({
                    type: 'AGREGAR_TAREA',
                    description: newDescription,
                    date_end: dateEnd || '',
                    important: isImportant,
                    categories: [categorieName, isImportant ? 'importante': ''],
                  });
                  setOpenInput(false);
                  setNewDescription('');
                  setDateEnd('');
                  setIsImportant(false);
                }}
              >
                Agregar Tarea
              </button>
            </span>
          )}
        </div>
      )}
    </>
  );
}

BtnAdd.propTypes = {
  categorieName: Proptypes.string.isRequired,
};

export default BtnAdd;
