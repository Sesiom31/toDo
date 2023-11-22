import { useEffect, useState, useRef, useContext } from 'react';
import { Tarea } from './TareasList';
import PropTypes from 'prop-types';
import { PasosList } from './PasosList';
import BtnIcon from './BtnIcon';
import { ArrowRightOnRectangleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { TareasContext, TareasDispatchContext } from '../state/ToDoContext';

function AsideRight({ idPickTarea, rightIsVisible, setRightIsVisible }) {
  const tareas = useContext(TareasContext);
  const dispatch = useContext(TareasDispatchContext);

  const [addPasos, setAddPasos] = useState(false);
  const [descriptionPasos, setDescriptionPasos] = useState('');
  const [openUpdate, setOpenUpdate] = useState(false);
  const [descriptionUpdate, setDescriptionUpdate] = useState('');

  const inputRef = useRef(null);
  const inputDescriptionRef = useRef(null);

  const tarea = tareas.find((t) => t.id === idPickTarea) || {
    id: 1,
    description: 'Hacer ejercicio',
    completed: false,
    date_start: 'Sun Nov 19 2023 16:38:50 GMT-0500 (hora estándar de Perú)',
    date_end: 'Sun Nov 19 2023 16:38:50 GMT-0500 (hora estándar de Perú)',
    important: false,
    categories: ['tareas', 'dia'],
    pasos: [],
  };

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
      absolute right-0  md:relative bg-white z-50 overflow-hidden overflow-y-auto md:will-change-[width] py-4
      dark:bg-zinc-600 dark:text-gray-200 dark:shadow-none `}
    >
      <Tarea tarea={tarea} />

      <section className="mt-1 mx-1">
        <div>
          {!openUpdate ? (
            <button
              type="button"
              className="w-full h-10  shadow-md shadow-gray-500 rounded-md text-orange-600 font-normal text-[0.9rem] text-left px-12  dark:bg-zinc-700 dark:shadow-none dark:pb-0 dark:text-orange-500"
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
                            outline-none border-none px-12 h-auto py-3 resize-none min-h-[1rem] overflow-hidden
                            dark:bg-zinc-700 dark:text-gray-200  "
              >
                {tarea.description}
              </textarea>
              {descriptionUpdate !== '' && (
                <button
                  onClick={() => {
                    setDescriptionUpdate('');
                    setOpenUpdate(false);
                    dispatch({
                      type: 'ACTUALIZAR_DESCRIPTION_TAREA',
                      id: idPickTarea,
                      description: descriptionUpdate,
                    });
                  }}
                  className={`text-gray-200 bg-orange-700 rounded-md text-xs px-2 py-0.5 pb-1  w-auto dark:bg-orange-600`}
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
              className="w-full h-10  shadow-md shadow-gray-500 rounded-md text-orange-600 font-normal text-[0.9rem] text-left px-12 dark:bg-zinc-700 dark:shadow-none dark:pb-0 dark:text-orange-500 "
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
                            outline-none border-none px-12  dark:bg-zinc-700 dark:text-gray-200  "
              />
              {descriptionPasos.trim() !== '' && (
                <button
                  onClick={() => {
                    setDescriptionPasos('');
                    setAddPasos(false);
                    dispatch({
                      type: 'AGREGAR_PASO',
                      id: idPickTarea,
                      description: descriptionPasos,
                    });
                  }}
                  className={`text-gray-200 bg-orange-700 rounded-md text-xs px-2 py-0.5 pb-1  w-auto dark:bg-orange-600`}
                >
                  Agregar paso
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className=" max-h-[200px] h-auto overflow-auto my-8">
        <PasosList tarea={tarea} />
      </section>

      <section className="flex absolute justify-between w-full  px-10 bottom-0 py-5">
        <span className="flex items-center relative" data-tooltip="Ocultar Panel">
          <BtnIcon icon={ArrowRightOnRectangleIcon} onClick={() => setRightIsVisible(false)} />
        </span>
        <span
          className="flex items-center relative "
          data-tooltip="Eliminar tarea"
          onClick={() => {
            setRightIsVisible(false);
            dispatch({
              type: 'ELIMINAR_TAREA',
              id: idPickTarea,
            });
          }}
        >
          <BtnIcon icon={TrashIcon} />
        </span>
      </section>
    </aside>
  );
}

AsideRight.propTypes = {
  idPickTarea: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired])
    .isRequired,

  rightIsVisible: PropTypes.bool.isRequired,
  setRightIsVisible: PropTypes.func.isRequired,
};

export default AsideRight;
