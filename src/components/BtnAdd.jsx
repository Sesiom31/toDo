import { CalendarDaysIcon, StarIcon } from '@heroicons/react/24/solid';
import BtnIcon from './BtnIcon';
import { useState, useRef, useEffect } from 'react';
import Proptypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BtnAdd({ setTareas, id, categories, index }) {
  const [openInput, setOpenInput] = useState(false);
  const [calenderIsOpen, setCalenderIsOpen] = useState(false);
  const [newTarea, setNewTarea] = useState({
    id: 0,
    description: '',
    completed: false,
    date_start: '',
    date_end: '',
    important: false,
    categories: ['tareas'],
    pasos: [],
  });
  const inputRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (openInput) {
      inputRef.current.focus();
    }
  }, [openInput]);

  useEffect(() => {
    console.log('efect calendar');
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
              <h3 className="text-[0.9rem] text-orange-600 dark:text-orange-400 dark:font-extralight">Agregar Tarea</h3>
            </div>

            <span></span>
          </button>
        ) : (
          <section className="w-full h-full flex items-center justify-between  ">
            <div className=" w-full h-full rounded-md flex items-center pt-0.5 ">
              <span className="border border-orange-600 h-4 w-4 rounded-full dark:text-orange-500 "></span>
              <input
                ref={inputRef}
                value={newTarea.description}
                type="text"
                placeholder="Agregar Tarea"
                className=" h-[80%]  w-[95%] text-[0.9rem] placeholder:text-[0.9rem] 
                 placeholder:text-gray-400 pt-0.5 placeholder:pt-0.5  outline-none px-8  
                md:px-16 dark:bg-zinc-700 dark:text-white dark:shadow-none "
                onChange={(e) => {
                  setNewTarea({ ...newTarea, description: e.target.value });
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
                  console.log('hola');
                  setCalenderIsOpen(!calenderIsOpen);
                }}
              />
              {calenderIsOpen && (
                <div ref={calendarRef}>
                  <DatePicker
                    inline
                    minDate={new Date()}
                    onChange={(date) => {
                      setNewTarea({ ...newTarea, date_end: date });
                    }}
                  />
                </div>
              )}
            </div>

            <div title="Marcar como importante" className="flex items-center">
              <BtnIcon
                icon={StarIcon}
                className={`${newTarea.important ? 'text-orange-600' : ' text-gray-400 '} ${
                  categories[index].category === 'importante' && 'text-orange-600 '
                } `}
                onClick={() => {
                  setNewTarea({ ...newTarea, important: !newTarea.important });
                }}
              />
            </div>
          </div>

          {newTarea.description.trim() !== '' && (
            <span className="flex items-center ">
              <button
                type="button"
                className={` bg-orange-600 text-gray-200 py-1 px-3 pb-1.5 text-xs rounded-md hover:bg-orange-700`}
                onClick={() => {
                  console.log(newTarea);
                  setOpenInput(false);
                  setTareas((prevState) => [
                    ...prevState,
                    {
                      ...newTarea,
                      id: id,
                      date_start: new Date(),
                      important: categories[index].category === 'importante' ? true : false,
                      categories: [
                        ...newTarea.categories,
                        categories[index].category,
                        newTarea.important ? 'importante' : '',
                      ],
                    },
                  ]);
                  setNewTarea({
                    ...newTarea,
                    date_start: '',
                    date_end: '',
                    description: '',
                    important: false,
                    categories: ['tareas'],
                  });
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
  setTareas: Proptypes.func.isRequired,
  id: Proptypes.number.isRequired,
  categories: Proptypes.array.isRequired,
  index: Proptypes.number.isRequired,
};

export default BtnAdd;
