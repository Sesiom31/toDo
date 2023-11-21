import BtnIcon from './BtnIcon';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SunIcon } from '@heroicons/react/24/solid';

function Header() {
  return (
    <header className="w-full h-14 bg-orange-600 flex justify-between items-center
     text-gray-100 px-2 sm:px-4 md:px-7 lg:px-8">
      <section className="flex gap-3 items-center justify-center h-8 w-auto sm:gap-16 md:gap-20 lg:gap-40 ">
        <h1 className="font-bold tracking-wider text-lg">ToDo</h1>

        <label
          htmlFor="search"
          className="w-52 h-8 rounded-md bg-gray-200 text-orange-600 flex items-center overflow-hidden sm:w-72 md:w-96 
          lg:w-[500px] "
        >
          <BtnIcon icon={MagnifyingGlassIcon} className="h-8 w-8 p-1.5" />
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Buscar tarea..."
            className=" text-slate-700 h-full w-[calc(100%-2rem)] bg-gray-200  outline-none px-2  border-none text-[0.9rem]
            placeholder:text-[0.9rem]"
          />
        </label>
      </section>

      <div className="flex items-center">
        <BtnIcon icon={SunIcon} />
      </div>
    </header>
  );
}

export default Header;
