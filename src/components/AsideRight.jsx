import { useEffect, useState, useRef } from 'react';
import { Tarea } from './TareasList';
import Proptypes from 'prop-types';
import { PasosList } from './PasosList';
import BtnIcon from './BtnIcon';
import { ArrowRightOnRectangleIcon, TrashIcon } from '@heroicons/react/24/solid';

function AsideRight({ tarea, setTareas, rightIsVisible, setRightIsVisible }) {
  const [addPasos, setAddPasos] = useState(false);
  const [descriptionPasos, setDescriptionPasos] = useState('');
  const [openUpdate, setOpenUpdate] = useState(false);
  const [descriptionUpdate, setDescriptionUpdate] = useState('');

  const inputRef = useRef(null);
  const inputDescriptionRef = useRef(null);

  console.log(descriptionUpdate);

  useEffect(() => {
    setDescriptionUpdate(tarea.description);
  }, [tarea.description]);

  useEffect(() => {
    if (addPasos) {
      inputRef.current.focus();
    }
  }, [addPasos]);

  useEffect(() => {
    if (inputDescriptionRef.current && openUpdate) {
      const length = inputDescriptionRef.current.value.length;
      inputDescriptionRef.current.setSelectionRange(length, length);
      inputDescriptionRef.current.focus();
    }
  }, [openUpdate]);

  return (
    <aside
      className={`${
        rightIsVisible ? 'w-full md:w-[500px] md:px-2 lg:w-[600px]' : 'w-0'
      } transition-[width] shadow-sm shadow-gray-500  h-full flex flex-col  gap-4  grow shrink 
      absolute right-0  md:relative bg-white z-50 overflow-hidden overflow-y-auto md:will-change-[width] py-4 `}
    >
      <Tarea tarea={tarea} setTareas={setTareas} />
      <section className="mt-1 mx-1">
        <div>
          {!openUpdate ? (
            <button
              type="button"
              className="w-full h-10  shadow-md shadow-gray-500 rounded-md text-orange-600 font-normal text-[0.9rem] text-left px-12 "
              onClick={() => setOpenUpdate(true)}
            >
              Actualizar descripción
            </button>
          ) : (
            <div className="flex flex-col">
              <textarea
                ref={inputDescriptionRef}
                value={descriptionUpdate}
                onChange={(e) => setDescriptionUpdate(e.target.value)}
                placeholder="Actualizar descripción"
                className="w-full shadow-md shadow-gray-500 
                            rounded-md font-normal text-sm placeholder:text-left placeholder:font-light text-gray-700 
                            outline-none border-none px-12 h-auto py-3 resize-none min-h-[1rem] overflow-hidden "
              >
                {tarea.description}
              </textarea>
              {descriptionUpdate !== '' && (
                <button
                  onClick={() => {
                    setDescriptionUpdate('');
                    setOpenUpdate(false);
                    setTareas((prevTareas) => {
                      const newTareas = prevTareas.map((t) =>
                        t.id === tarea.id ? { ...t, description: descriptionUpdate } : t
                      );
                      return newTareas;
                    });
                  }}
                  className={`text-gray-200 bg-orange-700 rounded-md text-xs px-2 py-0.5 pb-1  w-auto`}
                >
                  Actualizar
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="mt-1 mx-1">
        <div>
          {!addPasos ? (
            <button
              type="button"
              className="w-full h-10  shadow-md shadow-gray-500 rounded-md text-orange-600 font-normal text-[0.9rem] text-left px-12 "
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
                            rounded-md font-normal text-sm placeholder:text-left placeholder:font-light text-gray-700 
                            outline-none border-none px-12 "
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
        <PasosList tareaObj={tarea} setTareas={setTareas} id={tarea.id} />
      </section>

      <section className="flex absolute justify-between w-full  px-10 bottom-0 py-5">
        <span className="flex items-center relative" data-tooltip="Ocultar ">
          <BtnIcon icon={ArrowRightOnRectangleIcon} onClick={() => setRightIsVisible(false)} />
        </span>
        <span
          className="flex items-center relative "
          data-tooltip="Eliminar tarea"
          onClick={() => {
            setRightIsVisible(false)
            setTareas((prevTareas) => {
              const newTareas = prevTareas.filter((t) => t.id !== tarea.id);
              return newTareas;
             })
          }}
        >
          <BtnIcon icon={TrashIcon} />
        </span>
      </section>
    </aside>
  );
}

AsideRight.propTypes = {
  tarea: Proptypes.object.isRequired,
  setTareas: Proptypes.func.isRequired,
  rightIsVisible: Proptypes.bool.isRequired,
  setRightIsVisible: Proptypes.func.isRequired,
};

export default AsideRight;
