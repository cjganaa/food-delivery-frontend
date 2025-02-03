"use client";
import { Footer } from "../_component/footer";
import { Header } from "../_component/header";
import { ChevronLeft,ChevronRight } from "lucide-react";
import { useState ,useEffect } from "react";
import { CategoryType } from "../types";
import { CategoryCard } from "./cards/categoty";

export function UserPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  async function getCategories() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category`
    );
    const data = await res.json();
    setCategories(data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <Header/>
      <div className="bg-[url(/bg.png)] w-full h-[990px] bg-cover bg-center"></div>
      <div className="bg-neutral-700 w-full text-white">
        <div className="p-24">
          <h1 className="font-bold text-3xl mb-6">Categories</h1>
          <div className="w-full flex items-center">
            <button className="p-5">
              <ChevronLeft/>
            </button>
            <div className="w-full h-11 overflow-x-auto flex items-center gap-4">
              <button className="rounded-full pl-3 pr-3 bg-white text-black text-nowrap focus:bg-[#EF4444] focus:text-white">All dishes</button>
              {categories.map((category:CategoryType)=><button key={category.id} className="rounded-full pl-3 pr-3 bg-white text-black text-nowrap focus:bg-[#EF4444] focus:text-white">{category.name}</button>)}
            </div>
            <button className="p-5">
              <ChevronRight/>
            </button>
          </div>
        </div>
        
        <div className="pb-24 pl-24 pr-24">
            {categories.map((category: CategoryType) => 
                <CategoryCard key={category.id} category={category}/>
            )}
        </div>

      </div>
      <Footer/>
    </div>
  );
}
