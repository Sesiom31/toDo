import { useState } from 'react';
import AsideLeft from './AsideLeft';
import { categories as categoriesArray } from '../data/categories';
import HeaderBody from './HeaderBody';

function Body() {
  const [categories, setCategories] = useState(categoriesArray);
  const [index, setIndex] = useState(0);
  const [leftIsVisible, setLeftIsVisible] = useState(false);

  return (
    <div className="w-full h-[calc(100%-3.5rem)] p-0.5 md:p-2 relative">
      <AsideLeft
        categories={categories}
        setCategories={setCategories}
        setIndex={setIndex}
        leftIsVisible={leftIsVisible}
        setLeftIsVisible={setLeftIsVisible}
      />
      <HeaderBody index={index} categories={categories} setLeftIsVisible={setLeftIsVisible} />
    </div>
  );
}

export default Body;
