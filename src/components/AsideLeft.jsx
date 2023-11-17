import BtnIcon from './BtnIcon';
import { Square2StackIcon, XMarkIcon } from '@heroicons/react/24/outline';
import CatergoriesList from './CatergoriesList';
import { useState } from 'react';
import PropTypes from 'prop-types';

function AsideLeft({ categories, setCategories, setIndex }) {
  const [openInput, setOpenInput] = useState(false);
  const [nameList, setNameList] = useState('');
  return (
    <aside className=" shadow-md shadow-gray-500 w-40 h-full flex flex-col py-1 gap-y-6 md:w-56">

      <div className="flex justify-end px-2 ">
        <BtnIcon icon={XMarkIcon} />
      </div>

      <section>
        <CatergoriesList categories={categories} setCategories={setCategories} setIndex={setIndex} />
      </section>

      <div className="flex w-full px-2 flex-col">
        {openInput ? (
          <div className="flex flex-col gap-2 items-end">
            <input
              type="text"
              value={nameList}
              onChange={(e) => setNameList(e.target.value)}
              placeholder="Añadir una lista..."
              className="w-full text-sm bg-gray-200 text-slate-800 py-1 px-2 rounded-md placeholder:text-slate-800 placeholder:text-sm placeholder:px-2.5 placeholder:py-1 outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setNameList('');
                setOpenInput(false);
                setCategories((prevState) => [
                  ...prevState,
                  {
                    id: prevState.length + 1,
                    name: nameList,
                    category: nameList.toLowerCase(),
                    icon: Square2StackIcon,
                    count: 0,
                    added:true
                  },
                ]);
              }}
              className="bg-orange-600  text-xs w-16 text-gray-200 rounded-md pb-0.5 border-none hover:bg-orange-500"
            >
              Agregar
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpenInput(true)}
            className="w-full text-sm bg-orange-600 text-gray-200 py-1 px-2 rounded-md"
          >
            Añadir una lista...
          </button>
        )}
      </div>
    </aside>
  );
}

AsideLeft.propTypes = {
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
};

export default AsideLeft;
