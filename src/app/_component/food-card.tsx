import { Food, CategoryType } from "../types";
import { Button } from "@/components/ui/button";
import { Pencil, Image ,Trash} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useState } from "react";

export function FoodCard({info, categories}:{info:Food, categories:CategoryType[]}){
    const [selectedOption, setSelectedOption] = useState(info.category);
    const [imageDrop, setImageDrop] = useState<string>(info.image);
    async function inputImage(event: any){
        const CLOUD_NAME = "dgnzbzibb";
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

    async function deleteFood(){
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${info._id}`,{
            method: 'delete'
        });
        window.location.reload();
    }
    async function updateFood(formData:FormData) {
        const body = JSON.stringify({
            name:formData.get("FoodName"),
            price:formData.get("FoodPrice"),
            ingredients:formData.get("Ingredients"),
            image:imageDrop,
            category:selectedOption
        });
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${info._id}`,{
            method: 'put',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body
        });
        window.location.reload();
    }
    return(
        <div className="w-full aspect-[4/3] h-fit border rounded-3xl p-5">
            <div style={{backgroundImage: `url(${info.image})`}} className="rounded-3xl w-full h-2/3 mb-4 bg-cover bg-center relative">
            <Dialog>
                <DialogTrigger><div className="rounded-full w-11 h-11 absolute bottom-4 right-4 text-[#EF4444] bg-background flex justify-center items-center"><Pencil size={16}/></div></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Dishes info</DialogTitle>
                    </DialogHeader>
                    <form className="mb-4 mt-4 gap-4 items-start">
                        <div className="grid grid-cols-[20%_76%] w-full gap-4 mb-4 ">
                            <div className="text-muted-foreground text-sm" >Dish name</div>
                            <Input name="FoodName" placeholder="Type category name..." type="text" defaultValue={info.name}></Input>
                            <div className="text-muted-foreground text-sm" >Dish category</div>
                            <Select
                                value={selectedOption}
                                onValueChange={(value) => {
                                    setSelectedOption(value);
                                }}>
                                <SelectTrigger className="w-full">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent className="w-fit">
                                    <SelectGroup>
                                        {
                                            categories.map((category:CategoryType)=><SelectItem key={category.id} value={category.id}><div className="bg-secondary pl-3 pr-3 rounded-full">{category.name}</div></SelectItem>)
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div className="text-muted-foreground text-sm" >Dish price</div>
                            <Input name="FoodPrice" type="number" defaultValue={info.price}></Input>
                            <div className="text-muted-foreground text-sm" >Ingredients</div>
                            <textarea name="Ingredients" className="border rounded-lg w-full p-2 h-24" placeholder="List ingredients..." defaultValue={info.ingredients}></textarea>
                            <div className="text-muted-foreground text-sm" >Dish image</div>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full aspect-[3/1] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden">
                                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                                    <Image size={16}/>
                                </div>
                                <div>Choose a file or drag & drop it here</div>
                                <input id="dropzone-file" type="file" className="hidden" name="Image" onChange={inputImage}/>
                                <img src={imageDrop}/>
                            </label>
                        </div>
                        <div className="flex justify-between">
                            <DialogClose asChild>
                                <Button variant={"outline"} className="border-[#EF4444] text-[#EF4444]" type="submit" formAction={deleteFood}>
                                    <Trash/>
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="submit" formAction={updateFood}>
                                    Save changes
                                </Button>
                            </DialogClose>
                        </div>
                        
                    </form>
                </DialogContent>
            </Dialog>
            </div>
            <div className="font-medium text-lg flex justify-between">
                <div className="text-[#EF4444]">{info.name}</div>
                <div>${info.price}</div>
            </div>
            <div className="text-lg">{info.ingredients}</div>
        </div>
    );
}