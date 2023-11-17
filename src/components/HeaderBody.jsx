import { ArrowsUpDownIcon, Bars3Icon } from '@heroicons/react/24/outline';
import BtnIcon from './BtnIcon';
import Proptypes from 'prop-types';
import BtnAdd from './BtnAdd';

function HeaderBody({ index, categories }) {
  return (
    <>
      <section className="flex justify-between items-center w-full h-20 mt-8 px-5">
        <section className="flex items-start w-52 h-full gap-4 py-1">
          <BtnIcon icon={Bars3Icon} className=" w-8 h-8 " />
          <div className="-mt-4">
            <h3 className=" capitalize font-bold text-2xl">{categories[index].name}</h3>
            <span className=" text-xs opacity-80">{new Date().toLocaleDateString()}</span>
          </div>
        </section>

        <div className="flex flex-col justify-start h-full py-2">
          <BtnIcon icon={ArrowsUpDownIcon} className="" />
        </div>
      </section>
      <BtnAdd />
    </>
  );
}

HeaderBody.propTypes = {
  index: Proptypes.number.isRequired,
  categories: Proptypes.array.isRequired,
};

export default HeaderBody;
