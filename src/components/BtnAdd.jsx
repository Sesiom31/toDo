import { CalendarDaysIcon, StarIcon } from '@heroicons/react/24/outline';
import BtnIcon from './BtnIcon';
import { useState, useRef, useEffect } from 'react';
import Proptypes from 'prop-types';

function BtnAdd({ setTareas, id, categories, index }) {
  const [openInput, setOpenInput] = useState(false);
  const [newTarea, setNewTarea] = useState({
    id: 0,
    description: '',
    completed: false,
    date_start: ' 24/12/2023',
    date_end: '',
    important: false,
    categories: ['tareas'],
    pasos: [],
  });
  const inputRef = useRef(null);

  useEffect(() => {
    if (openInput) {
      inputRef.current.focus();
    }
  });

  return (
    <>
      <section className="w-full h-12 md:h-14 shadow-inner shadow-gray-700 rounded-md overflow-hidden flex flex-col justify-center items-center px-4 ">
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
                className=" h-[80%]  w-[95%] text-[0.9rem] placeholder:text-[0.9rem] placheloder:textgray-500  outline-none px-20 pb-1 md:pb-0.5 "
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
        <div className="px-3 flex justify-between w-full mt-2">
          <div className="flex gap-8 items-center">
            <BtnIcon icon={CalendarDaysIcon} className="text-orange-600" />
            <BtnIcon
              icon={StarIcon}
              className="text-orange-600"
              onClick={() => setNewTarea({ ...newTarea, important: true })}
            />
          </div>
          <span className="flex items-center">
            <button
              type="button"
              className="bg-orange-600 text-gray-200 py-1 px-3 pb-1.5 text-xs rounded-md hover:bg-orange-500"
              onClick={() => {
                console.log(newTarea);
                setOpenInput(false);
                setTareas((prevState) => [
                  ...prevState,
                  {
                    ...newTarea,
                    id: id,
                    categories: [...newTarea.categories, categories[index].category],
                  },
                ]);
                setNewTarea({
                  ...newTarea,
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
