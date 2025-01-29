"use client";
import { Footer } from "./_component/footer";
import { Header } from "./_component/header";
import { ChevronLeft,ChevronRight } from "lucide-react";
import { useState ,useEffect } from "react";
import { CategoryType } from "./types";
import { FoodCard } from "./_component/food-card";

export default function Home() {
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
      <Footer/>
    </div>
  );
}
