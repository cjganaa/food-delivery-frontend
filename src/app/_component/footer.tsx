import {Facebook,Instagram  } from "lucide-react";
import { CategoryType } from "../types";
import { useState, useEffect } from "react";

export function Footer(){
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
    return(
        <div className="relative bottom-0 left-0 right-0 h-[755px] bg-primary flex flex-col justify-around ">
            <div className="w-screen bg-[#EF4444] h-[92px] flex gap-7 items-center pl-20 overflow-hidden text-secondary font-extrabold text-3xl whitespace-nowrap">
                Fresh fast delivered &nbsp;&nbsp;&nbsp;&nbsp; Fresh fast delivered &nbsp;&nbsp;&nbsp;&nbsp; Fresh fast delivered &nbsp;&nbsp;&nbsp;&nbsp; Fresh fast delivered &nbsp;&nbsp;&nbsp;&nbsp; Fresh fast delivered  &nbsp;&nbsp;&nbsp;&nbsp; Fresh fast delivered &nbsp;&nbsp;&nbsp;&nbsp; Fresh fast delivered
            </div>
            <div className="p-20 text-primary-foreground grid grid-cols-3 place-items-center">
                <div className="flex flex-col w-fit items-center">
                    <img src="/LogoNomNom.svg" className="w-[46px] h-[38px]"/>
                    <div>
                        <div className="text-primary-foreground flex">Nom<div className="text-[#EF4444]">Nom</div></div>
                        <div className="text-primary-foreground text-xs">Swift delivery</div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <div className="text-muted-foreground">NOMNOM</div>
                        <div><a href="">Menu</a></div>
                        <div><a href="">Contact us</a></div>
                        <div><a href="">Delivery zone</a></div>
                    </div>
                    <div>
                        <div className="col-span-2 text-muted-foreground">MENU</div>
                        {categories?.slice(0,Math.floor(categories.length/2)).map((category:CategoryType)=><div key={category.id}><a href="">{category.name}</a></div>)}
                        
                    </div>
                    <div>
                        <br />{categories?.slice(Math.floor(categories.length/2)).map((category:CategoryType)=><div key={category.id}><a href="">{category.name}</a></div>)}
                    </div>
                </div>
                <div className="place-self-stretch">
                    <div className="w-full h-full flex flex-col items-center">
                        <div className="text-muted-foreground">FOLLOW US</div>
                        <div className="flex gap-6">
                            <a href=""><Facebook/></a>
                            <a href=""><Instagram/></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ml-20 mr-20 border-t h-[84px] border-muted-foreground text-muted-foreground flex items-center gap-12">
                <div>Copy right 2024 &copy; Nomnom LLC </div>
                <div>Privacy policy  </div>
                <div>Terms and conditoin</div>
                <div>Cookie policy</div>
            </div>
        </div>
    );
}