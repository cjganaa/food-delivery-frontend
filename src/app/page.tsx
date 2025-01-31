"use client";
import { useState ,useEffect } from "react";
import { CategoryType } from "./types";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";


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
    <div className="p-20 w-screen h-screen flex">
      <div className="w-2/5 h-full p-20 flex flex-col justify-center items-start gap-6">
        <div>
          <h1 className="font-bold text-black text-xl">Log in</h1>
          <h4 className="text-muted-foreground">Log in to enjoy your favorite dishes.</h4>
        </div>
        <Input type="email" placeholder="Enter your email address" className="max-w-[400px]"/>
        <Input type="password" placeholder="Password" className="max-w-[400px]"/>
        <a href="http://localhost:3000/forgot" className="hover:underline">Forgot password?</a>
        <Button variant={"secondary"} className="w-full max-w-[400px] bg-neutral-300  text-white hover:bg-black">Let's Go</Button>
        <div className="self-center">Don’t have an account? <a href="http://localhost:3000/signup" className="text-[#2563EB]">Sign up</a></div>
      </div>
      <div className="w-3/5 h-full rounded-3xl bg-cover bg-center"
      style={{backgroundImage:`url("login.jpeg")`}}>
      </div>
    </div>
  );
}
