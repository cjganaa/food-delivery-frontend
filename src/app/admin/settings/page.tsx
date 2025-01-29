"use client";
import { useAuthFetch } from "@/app/_component/hooks";
import { CategoryType } from "@/app/types";

export default function Home() {
    const categories = useAuthFetch('food-category')
    return(
        <div>
            {categories.map((category: CategoryType)=> category.name)}
        </div>
    );
}