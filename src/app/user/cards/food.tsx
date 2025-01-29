import { Food } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function FoodCard({food}:{food:Food}){
    function addCart(){
        localStorage.setItem("orderItems",JSON.stringify(
            [{
                food:food,
                quantity:1
            }]
        ))
    }

    return(
        <div className="w-full aspect-[4/3] h-fit bg-white rounded-2xl text-black p-5">
            <div style={{backgroundImage: `url(${food.image})`}} className="rounded-3xl w-full h-2/3 mb-4 bg-cover bg-center relative">
                <Button variant={"secondary"} className="rounded-full w-10 h-10 absolute right-3 bottom-3" onClick={addCart}><Plus/></Button>
            </div>
            <div className="font-medium text-lg flex justify-between">
                <div className="text-[#EF4444]">{food.name}</div>
                <div>${food.price}</div>
            </div>
            <div className="text-lg">{food.ingredients}</div>
        </div>
    )

}