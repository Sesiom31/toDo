import BtnIcon from './BtnIcon';
import { Square2StackIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
import CatergoriesList from './CatergoriesList';
import PropTypes from 'prop-types';

function AsideLeft({ categories, setCategories, setIndexCategory, leftIsVisible, setLeftIsVisible }) {
  const [openInput, setOpenInput] = useState(false);
  const [nameList, setNameList] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (openInput) {
      inputRef.current.focus();
    }
  }, [openInput]);

  return (
    <aside
      className={`${
        leftIsVisible ? 'w-48 sm:w-56 md:w-60 lg:w-72 xl:w-80' : 'w-0'
      } transition-[width] shadow-md shadow-gray-500  h-full flex flex-col py-1 gap-y-6  pb-4
      absolute md:relative top-0 left-0 bg-gray-100 z-50 overflow-y-auto will-change-[width]
      dark:bg-zinc-600 dark:text-gray-200 dark:shadow-zinc-700 dark:shadow-md dark:border-none `}
    >
      <div className="flex justify-end px-2 ">
        <BtnIcon
          icon={XMarkIcon}
          onClick={() => {
            setLeftIsVisible(false);
          }}
        />
      </div>

      <section>
        <CatergoriesList
          categories={categories}
          setCategories={setCategories} // para eliminar listas agregadas no las listas por defecto
          setIndexCategory={setIndexCategory}
        />
      </section>

      <div className="flex w-full px-2 flex-col">
        {!openInput ? (
          <button
            type="button"
            onClick={() => setOpenInput(true)}
            className="w-full text-sm bg-orange-600 text-gray-200 py-1 px-2 rounded-md"
          >
            Añadir una lista...
          </button>
        ) : (
          <div className="flex flex-col gap-2 items-end">
            <input
              ref={inputRef}
              type="text"
              value={nameList}
              onChange={(e) => setNameList(e.target.value)}
              placeholder="Añadir una lista..."
              className="w-full text-sm bg-gray-200 text-slate-800 py-1 px-2 rounded-md placeholder:text-slate-800 placeholder:text-sm placeholder:px-2.5 placeholder:py-1 outline-none"
            />
            {nameList.trim() !== '' && (
              <button
                type="button"
                onClick={() => {
                  setNameList('');
                  setOpenInput(false);
                  setCategories((prevState) => [
                    ...prevState,
                    {
                      id: prevState.length,
                      name: nameList,
                      category: nameList.toLowerCase(),
                      icon: Square2StackIcon,
                      count: 0,
                      added: true,
                    },
                  ]);
                }}
                className="bg-orange-600  text-xs w-16 text-gray-200 rounded-md pb-0.5 border-none hover:bg-orange-500"
              >
                Agregar
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

AsideLeft.propTypes = {
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
  setIndexCategory: PropTypes.func.isRequired,
  leftIsVisible: PropTypes.bool.isRequired,
  setLeftIsVisible: PropTypes.func.isRequired,
};

export default AsideLeft;
