import { ArrowsUpDownIcon, Bars3Icon } from '@heroicons/react/24/outline';
import BtnIcon from './BtnIcon';
import Proptypes from 'prop-types';
import BtnAdd from './BtnAdd';

function HeaderBody({ index, categories, setLeftIsVisible, setRightIsVisible, setTareas, id }) {
  return (
    <>
      <section className="flex justify-between items-center w-auto h-16 mt-6 px-4 relative z-40 md:px-3 lg:py-4 md:mr-2 ">
        <section className="flex md:justify-start items-start w-52 h-full gap-4 py-1 pl-1  md:pl-4 dark:text-white">
          <BtnIcon
            icon={Bars3Icon}
            className="h-20 w-20 md:h-[2rem] md:w-[2rem] aspect-square"
            onClick={() => {
              setRightIsVisible(false);
              setLeftIsVisible(true);
            }}
          />
          <div className="-mt-4">
            <h3 className=" capitalize font-semibold tracking-widest text-2xl">
              {categories[index].name}
            </h3>
            <span className=" text-xs opacity-80">{new Date().toLocaleDateString()}</span>
          </div>
        </section>

        <div
          className="flex items-start h-full py-1 md:pr-3"
          onClick={() => {
            setTareas((prevTareas) => [...prevTareas].reverse());
          }}
        >
          <BtnIcon icon={ArrowsUpDownIcon} className=" dark:text-white" />
        </div>
      </section>
      <BtnAdd setTareas={setTareas} id={id} categories={categories} index={index} />
    </>
  );
}

HeaderBody.propTypes = {
  index: Proptypes.number.isRequired,
  categories: Proptypes.array.isRequired,
  setLeftIsVisible: Proptypes.func.isRequired,
  setTareas: Proptypes.func.isRequired,
  id: Proptypes.number.isRequired,
  setRightIsVisible: Proptypes.func.isRequired,
};

export default HeaderBody;
