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
  });

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
      <section className="w-auto h-12 md:h-14 shadow-inner shadow-gray-700 rounded-md overflow-hidden flex flex-col justify-center items-center px-4 mx-4  relative   ">
        {!openInput ? (
          <button
            className="w-full h-full  flex justify-between items-center"
            onClick={() => setOpenInput(true)}
          >
            <div className="flex items-center gap-20 w-10/12 h-full">
              <span className="w-4 h-4 border border-orange-600 block rounded-full"></span>
              <h3 className="text-[0.9rem] text-orange-600">Agregar Tarea</h3>
            </div>

            <span></span>
          </button>
        ) : (
          <section className="w-full h-full flex items-start justify-between ">
            <div className=" w-full h-full rounded-md flex items-center ">
              <span className="border border-orange-600 h-4 w-4 rounded-full"></span>
              <input
                ref={inputRef}
                value={newTarea.description}
                type="text"
                placeholder="Agregar Tarea"
                className=" h-[80%]  w-[95%] text-[0.9rem] placeholder:text-[0.9rem] 
                placheloder:textgray-500  outline-none px-20 pb-1 md:pb-0.5 "
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
            <div className="relative flex items-center" title="Ingresa una fecha de vencimiento">
              <BtnIcon
                icon={CalendarDaysIcon}
                className="text-orange-600"
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
          <span className="flex items-center">
            <button
              type="button"
              className={`${
                newTarea.description.trim() === '' ? 'opacity-70 hover:bg-orange-600' : ''
              } bg-orange-600 text-gray-200 py-1 px-3 pb-1.5 text-xs rounded-md hover:bg-orange-700`}
              disabled={newTarea.description.trim() === ''}
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
