import { Badge } from "@/components/ui/badge";
import { FoodCard } from "./food-card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Plus,Image} from "lucide-react";
import { useState ,useEffect } from "react";
import { Food,CategoryType } from "../types";
import { Dispatch,SetStateAction } from "react";


export function Category({ title,counted }:{ title: string ,counted:number }){
    return(
        <div className="whitespace-nowrap">
            <Badge className="rounded-full p-2" variant="outline">
                {title}
                <div className="rounded-full bg-black text-white ml-2 pl-2 pr-2 text-xs">{counted}</div>
            </Badge>
        </div>
    );
}

export function CategoryCard({ title,id,categories,handleButtonClick,setMessage}:{ title: string,id:string , categories:CategoryType[],handleButtonClick:Dispatch<SetStateAction<boolean>>,setMessage:Dispatch<SetStateAction<string>>}){
    const CLOUD_NAME = "dgnzbzibb";
    const [imageDrop, setImageDrop] = useState<string>('');
    const [foods,setFoods] = useState<Food[]>([]);

    async function getFoods(){
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category/${id}/foods`);
        const data = await res.json();
        setFoods(data);
    }

    async function inputImage(event: any){
        const file = event.target.files[0];
        if(!file) return;
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'food-delivery');
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
            {
              method: 'POST',
              body: data,
            }
        );
        const dataJson = await response.json();
        const previewImage:string = dataJson.secure_url;
        setImageDrop(previewImage);
    }
    async function addFood(dialogData:FormData) {
        const body = JSON.stringify({
            name:dialogData.get("FoodName"),
            price:dialogData.get("FoodPrice"),
            ingredients:dialogData.get("Ingredients"),
            image:imageDrop,
            category:id
        });
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food`,{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body
        });
        window.location.reload();
    }
    useEffect(()=>{
        getFoods();
    },[id]);
    return(
        <div className="w-full h-fit rounded-2xl bg-background p-3 grid grid-cols-4 gap-3">
            <h2 className="font-extrabold text-2xl col-span-4">{title}&nbsp;({foods.length})</h2>
            <div className="w-full h-full border rounded-3xl p-2 border-dashed border-[#EF4444] flex flex-col items-center justify-center">
                <Dialog>
                    <DialogTrigger>
                        <a onClick={()=>setImageDrop('')}>
                            <div className="rounded-full w-9 h-9 bg-[#EF4444] flex justify-center items-center text-white">
                                <Plus size={16}/>
                            </div>
                        </a>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add new Dish to Appetizers</DialogTitle>
                        </DialogHeader>
                        <form className="mb-4 mt-4 flex flex-col gap-5 items-start" action={addFood}>
                            <div className="grid grid-cols-2 w-full gap-4">
                                <div>Food name</div>
                                <div>Food price</div>
                                <Input name="FoodName" placeholder="Type food name..." type="text"></Input>
                                <Input name="FoodPrice" placeholder="Type food price..." type="number"></Input>
                            </div>
                            <div>
                                Ingredients
                            </div>
                            <textarea name="Ingredients" className="border rounded-lg w-full p-2 h-24" placeholder="List ingredients..."></textarea>
                            <div>
                                Food image
                            </div>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full aspect-[3/1] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden">
                                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                                    <Image size={16}/>
                                </div>
                                <div>Choose a file or drag & drop it here</div>
                                <input id="dropzone-file" type="file" className="hidden" name="Image" onChange={inputImage}/>
                                <img src={imageDrop}/>
                            </label>
                            <DialogClose asChild>
                                <Button type="submit" className="self-end" onClick={()=>{
                                    setMessage("New dish is being added to the menu")
                                    handleButtonClick(true)}}>
                                    Add Dish
                                </Button>
                            </DialogClose>
                        </form>
                    </DialogContent>
                </Dialog>
                <div className="text-center mt-6">
                    Add new Dish to <br/> {title} 
                </div>
            </div>
            {foods.map((food:Food)=><FoodCard key={food._id} info={food} categories={categories}/>)}
        </div>
    );
}