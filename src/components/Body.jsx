import { useState } from "react"
import AsideLeft from "./AsideLeft"
import { categories as categoriesArray } from "../data/categories"
import HeaderBody from "./HeaderBody"


function Body() {
  const [categories, setCategories] = useState(categoriesArray)
  const [index, setIndex] = useState(0)

  return (
    <div className="w-full h-[calc(100%-3.5rem)] p-0.5 md:p-2">
      {/* <AsideLeft categories={categories} setCategories={setCategories} setIndex={setIndex} /> */}
      <HeaderBody index={index} categories={categories} />

    </div>
  )
}

export default Body