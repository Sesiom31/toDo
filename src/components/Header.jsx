import BtnIcon from './BtnIcon';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import Proptypes from 'prop-types';
import { useRef } from 'react';

function Header({ textFilter, setTextFilter, setIsDark, isDark }) {
  const inputRef = useRef(null);
  return (
    <header
      className="w-full h-14 bg-orange-600 flex justify-between items-center
    k text-gray-100 px-2 sm:px-4 md:px-7 lg:px-8 pr-4 dark:bg-zinc-700  dark:border-b dark:border-b-zinc-400
       "
    >
      <section className="flex gap-8 items-center justify-start h-8 w-[85%] sm:gap-16 md:gap-20 lg:gap-40 ">
        <h1 className="font-bold tracking-wider text-lg ">ToDo</h1>

        <label
          htmlFor="search"
          className="w-[70%] h-8 rounded-md bg-gray-200 text-orange-600 flex items-center overflow-hidden sm:w-72 md:w-96 
          lg:w-[500px]  "
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <BtnIcon icon={MagnifyingGlassIcon} className="h-8 w-8 p-1.5" />
          <input
            ref={inputRef}
            value={textFilter}
            autoComplete="off"
            type="search"
            name="search"
            id="search"
            placeholder="Buscar tarea..."
            className=" text-slate-700 h-full w-[calc(100%-2rem)] bg-gray-200  outline-none px-2  border-none text-[0.9rem]
            placeholder:text-[0.9rem]"
            onChange={(e) => {
              setTextFilter(e.target.value);
            }}
          />
        </label>
      </section>

      <div className="flex items-center" onClick={()=> {
        localStorage.setItem('isDark', !isDark)
        setIsDark(!isDark)
      }}>
        {isDark ? <BtnIcon icon={SunIcon} /> : <BtnIcon icon={MoonIcon} />}
      </div>
    </header>
  );
}

Header.propTypes = {
  textFilter: Proptypes.string.isRequired,
  setTextFilter: Proptypes.func.isRequired,
  setIsDark: Proptypes.func.isRequired,
  isDark: Proptypes.bool.isRequired,
};
export default Header;
