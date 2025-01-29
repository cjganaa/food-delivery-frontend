"use client";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Category, CategoryCard } from "../../_component/category";
import { useEffect, useState } from "react";
import { CategoryType } from "../../types";
import { useAuth, useUser } from "@clerk/nextjs";

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [message, setMessage] = useState("");
  const {user,isLoaded} = useUser();
  const {getToken} = useAuth();
  if(!isLoaded){
    null;
  }
  const isAdmin = user?.publicMetadata.role == "admin";
  

  const handleButtonClick = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 1000);
  };

  async function getCategories() {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category`,
      {headers:{
        token : `${token}`
        },
      }
    );
    const data = await res.json();
    setCategories(data);
  }

  async function addCategory(dialogData: FormData) {
    const body = JSON.stringify({
      name: dialogData.get("categoryName"),
    });
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    getCategories();
  }
  
  useEffect(() => {
    getCategories();
    
  }, []);
  let allFoodsCount = 0;
  categories.forEach((category) => {allFoodsCount += category.count;});
  
  return (
    <div className="flex flex-col items-center w-full h-full p-6 gap-6 pt-16">
        {isAdmin?
          <div className="w-full rounded-2xl p-5 bg-background">
            {isAlertVisible && (
              <div className="absolute top-32 flex items-center gap-2 bg-primary p-2 text-primary-foreground rounded-lg">
                <Check size={16} />
                {message}
              </div>
            )}
            <div className="font-bold mb-4">Dishes category</div>
            <div className="flex items-center flex-wrap gap-3">
              <Category title="All Dishes" counted={allFoodsCount} />
              {categories.map((category: CategoryType) => {

                return (
                  <Category
                    key={category.id}
                    title={category.name}
                    counted={category.count}
                  />
                );
              })}
              <Dialog>
                <DialogTrigger>
                  <div className="rounded-full w-9 h-9 bg-[#EF4444] flex justify-center items-center text-white">
                    <Plus size={16}/>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add new category</DialogTitle>
                  </DialogHeader>
                  <form
                    className="mb-4 mt-4 flex flex-col gap-4 items-start"
                    action={addCategory}
                  >
                    Category name
                    <Input
                      name="categoryName"
                      placeholder="Type category name..."
                    ></Input>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        className="self-end"
                        onClick={() => {
                          setMessage("New Category is being added to the menu");
                          handleButtonClick();
                        }}
                      >
                        Add category
                      </Button>
                    </DialogClose>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        :null
        }
        {isAdmin?
          <div className="w-full h-full grid gap-6 overflow-x-hidden">
            {categories.map((category: CategoryType) => (
              <CategoryCard
                key={category.id}
                title={category.name}
                id={category.id}
                categories={categories}
                handleButtonClick={handleButtonClick}
                setMessage={setMessage}
              />
            ))}
          </div>
        :null}
        
    </div>
  );
}
