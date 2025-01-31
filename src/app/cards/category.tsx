import { CategoryType } from "@/app/types";
import { Food } from "@/app/types";
import { useState, useEffect } from "react";
import { FoodCard } from "./food";
export function CategoryCard({category}:{category:CategoryType}){
    const [foods,setFoods] = useState<Food[]>([]);
    async function getFoods(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category/${category?.id}/foods`);
        const data = await res.json();
        setFoods(data);
    }
    useEffect(()=>{
        getFoods();
    },[]);
    return(
        <div className="pb-4">
            <h1 className="font-bold text-3xl mb-6">
                {category.name}
            </h1>
            <div className="grid grid-cols-3 gap-4">
            {foods.map((food:Food)=><FoodCard key={food._id} food={food}/>)}
        </div>
        </div>
        
    );
}