import { Button } from "@/components/ui/button";
import { ShoppingCart,UserRound,MapPin,ChevronRight } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { FoodItem } from "../types";


function FoodCard({foodItem}:{foodItem:FoodItem}){
    return(
        <div className="w-full">
            <div className="flex m-2">
                <img src={foodItem.food.image} className="w-24 aspect-square rounded-2xl"/>
                <div className="flex flex-col justify-between p-2">
                    <div>
                        <h1 className="text-s text-[#EF4444]">{foodItem.food.name}</h1>
                        <p className="text-xs">{foodItem.food.ingredients}</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3">
                            <button>-</button>
                            {foodItem.quantity}
                            <button>+</button>
                        </div>
                        <h2 className="font-bold">{foodItem.food.price}$</h2>
                    </div>
                    
                </div>
            </div>
            <div className="border-b border-dashed "></div>
        </div>
    );
}

export function Header(){
    const [orderVisible,setOrderVisible] = useState<boolean>(false);
    const [foods,setFoods] = useState<FoodItem[]>([]);
    const singned = true;
    useEffect(()=>{
        const path =localStorage.getItem("orderItems");
        const res = JSON.parse(path);
        setFoods(res);
    },[])
    return (
        <div className="relative top-0 left-0 right-0 h-16 bg-primary flex items-center pl-24 pr-24 justify-between">
            <div className="flex">
                <img src="/LogoNomNom.svg" alt="" />
                <div>
                    <div className="text-primary-foreground flex">Nom<div className="text-[#EF4444]">Nom</div></div>
                    <div className="text-primary-foreground text-xs">Swift delivery</div>
                </div>
            </div>
            {
                singned?
                <div className="flex gap-3">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-80 rounded-full h-10 bg-white flex items-center justify-around p-4 text-muted-foreground"><MapPin size={16} className="text-red-500"/><div className="text-red-500">Delivery address:</div>Add Location<ChevronRight size={16}/></Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 rounded-3xl">
                        </PopoverContent>
                    </Popover>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant={"secondary"} className="rounded-full h-10 w-10" ><ShoppingCart/></Button>
                        </SheetTrigger>
                        <SheetContent className="bg-primary rounded-s-2xl border-none text-primary-foreground">
                            <SheetHeader className="m-4">
                            <SheetTitle className="text-white flex gap-5"><ShoppingCart/> Order detail</SheetTitle>
                            </SheetHeader>
                            <div className="w-full h-[93%] flex flex-col gap-6">
                                {
                                    orderVisible?
                                    <div>
                                        <div className="w-full bg-white p-2 rounded-full grid grid-cols-2">
                                            <button className="rounded-full pl-3 pr-3 text-nowrap bg-white text-black" onClick={() => setOrderVisible(false)}>Cart</button>
                                            <button className="rounded-full pl-3 pr-3 bg-[#EF4444] text-white" onClick={() => setOrderVisible(true)}>Order</button>
                                        </div>
                                        order
                                    </div>
                                    :<div className="h-1/2 flex flex-col gap-6">
                                        <div className="w-full bg-white p-2 rounded-full grid grid-cols-2">
                                            <button className="rounded-full pl-3 pr-3 text-nowrap bg-[#EF4444] text-white" onClick={() => setOrderVisible(false)}>Cart</button>
                                            <button className="rounded-full pl-3 pr-3 bg-white text-black text-nowrap " onClick={() => setOrderVisible(true)}>Order</button>
                                        </div>
                                        <div className="w-full h-full rounded-3xl bg-white text-black p-3">
                                            <h1 className="font-extrabold text-xl mb-3">My card</h1>
                                            {foods?.map((foodItem:FoodItem)=><FoodCard key={foodItem.food._id} foodItem={foodItem}></FoodCard>)}
                                            <button className="w-full rounded-full border border-[#EF4444] mt-2 p-2 text-[#EF4444]">Add Food</button>
                                        </div>
                                    </div>
                                }
                                <div className="h-1/3 bg-white rounded-3xl p-2">
                                    <SheetClose asChild>
                                        <Button variant={'destructive'} type="submit" className="rounded-full w-full">Save changes</Button>
                                    </SheetClose>
                                </div>
                                
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Button variant={"destructive"} className="rounded-full h-10 w-10"><UserRound/></Button>
                </div>
                :
                <div className="flex gap-3">
                    <Button className="bg-secondary font-medium text-secondary-foreground rounded-full">Sign up</Button>
                    <Button className="bg-[#EF4444] font-medium rounded-full">Log in</Button>
                </div>
                }
            
        </div>
    );
}