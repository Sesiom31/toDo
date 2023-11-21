import { useEffect, useState, useRef } from 'react';
import { Tarea } from './TareasList';
import Proptypes from 'prop-types';
import { PasosList } from './PasosList';
import BtnIcon from './BtnIcon';
import { ArrowRightOnRectangleIcon, TrashIcon } from '@heroicons/react/24/solid';

function AsideRight({ idTarea, tareas, setTareas, rightIsVisible, setRightIsVisible }) {
  const [addPasos, setAddPasos] = useState(false);
  const [descriptionPasos, setDescriptionPasos] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (addPasos) {
      inputRef.current.focus();
    }
  });

  const tarea =
    idTarea !== 0
      ? tareas.find((t) => t.id === idTarea)
      : {
          id: 1,
          description: '',
          completed: false,
          date_start: 'Sun Nov 19 2023 16:38:50 GMT-0500 (hora estándar de Perú)',
          date_end: 'Sun Nov 19 2023 16:38:50 GMT-0500 (hora estándar de Perú)',
          important: false,
          categories: ['tareas', 'dia'],
          pasos: [],
        };

  return (
    <aside
      className={`${
        rightIsVisible ? 'w-full md:w-[500px] md:px-2 lg:w-[600px]' : 'w-0'
      } transition-[width] shadow-sm shadow-gray-500  h-full flex flex-col  gap-4  
      absolute right-0  md:relative bg-white z-50 overflow-hidden overflow-y-auto md:will-change-[width] py-4 `}
    >
      <Tarea tarea={tarea} setTareas={setTareas} />

      <section className="mt-1 mx-1">
        <div>
          {!addPasos ? (
            <button
              type="button"
              className="w-full h-10  shadow-md shadow-gray-500 rounded-md text-orange-700 font-semibold  text-base text-left px-12 "
              onClick={() => setAddPasos(true)}
            >
              Agregar paso
            </button>
          ) : (
            <div className="flex flex-col">
              <input
                ref={inputRef}
                type="text"
                value={descriptionPasos}
                onChange={(e) => setDescriptionPasos(e.target.value)}
                placeholder="Agregar paso"
                className="w-full h-10  shadow-md shadow-gray-500 
     rounded-md  font-semibold  text-base placeholder:text-left text-gray-700 outline-none border-none px-12 "
              />
              {descriptionPasos.trim() !== '' && (
                <button
                  onClick={() => {
                    setDescriptionPasos('');
                    setAddPasos(false);
                    setTareas((prevTareas) => {
                      const newTareas = prevTareas.map((t) =>
                        t.id === tarea.id
                          ? {
                              ...t,
                              pasos: [
                                ...t.pasos,
                                {
                                  id: t.pasos.length + 1,
                                  description: descriptionPasos,
                                  completed: false,
                                },
                              ],
                            }
                          : t
                      );
                      return newTareas;
                    });
                  }}
                  className={`text-gray-200 bg-orange-700 rounded-md text-xs px-2 py-0.5 pb-1  w-auto`}
                >
                  Agregar paso
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className=" max-h-[200px] h-auto overflow-auto my-8">
        <PasosList tareaObj={tarea} />
      </section>

      <section className="flex absolute justify-between w-full  px-10 bottom-0 py-5">
        <span className="flex items-center relative" data-tooltip="Ocultar ">
          <BtnIcon icon={ArrowRightOnRectangleIcon} onClick={() => setRightIsVisible(false)} />
        </span>
        <span className="flex items-center relative " data-tooltip="Eliminar tarea">
          <BtnIcon icon={TrashIcon} />
        </span>
      </section>
    </aside>
  );
}

AsideRight.propTypes = {
  idTarea: Proptypes.number.isRequired,
  tareas: Proptypes.array.isRequired,
  setTareas: Proptypes.func.isRequired,
  rightIsVisible: Proptypes.bool.isRequired,
  setRightIsVisible: Proptypes.func.isRequired,
};

export default AsideRight;
