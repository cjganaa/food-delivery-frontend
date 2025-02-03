import { useState ,useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export function LoginPage(){
    const [form,setForm]=useState<number[]>([0]);
    function renderCondition(){
        switch(form[form.length-1]) {
            case 1:
                return <SignUpEmail  form={form} setForm={setForm}/>
            case 2:
                return <SignUpPass  form={form} setForm={setForm}/>
            case 3:
                return <ForgotPass  form={form} setForm={setForm}/>
            case 4:
                return <VerifyEmail  form={form} setForm={setForm}/>
            case 5:
                return <NewPass  form={form} setForm={setForm}/>
            default:
                return <LoginForm form={form} setForm={setForm}/>
        }
    }
    return(
    <div className="p-20 w-screen h-screen flex">
        {renderCondition()}
        <div className="w-3/5 h-full rounded-3xl bg-cover bg-center"
        style={{backgroundImage:`url("login.jpeg")`}}>
        </div>
    </div>
    );
}


function LoginForm({form,setForm}:{form:number[],setForm:Dispatch<SetStateAction<number[]>>}){
    return(
        <div className="w-2/5 h-full p-20 flex flex-col justify-center items-start gap-6">
            <Button variant="outline" size="icon">
                <ChevronLeft/>
            </Button>
            <div>
                <h1 className="font-bold text-black text-xl">Log in</h1>
                <h4 className="text-muted-foreground">Log in to enjoy your favorite dishes.</h4>
            </div>
            <Input type="email" placeholder="Enter your email address" className="max-w-[400px]"/>
            <Input type="password" placeholder="Password" className="max-w-[400px]"/>
            <Button variant={"link"}  className="hover:underline" onClick={()=> setForm([...form,3])}>Forgot password?</Button>
            <Button variant={"secondary"} className="w-full max-w-[400px] bg-neutral-300  text-white hover:bg-black">Let's Go</Button>
            <div className="w-full max-w-[400px] text-center">Don’t have an account? <Button variant={"link"} onClick={()=> setForm([...form,1])} className="text-[#2563EB]">Sign up</Button></div>
        </div>
    );
}

function SignUpEmail({form,setForm}:{form:number[],setForm:Dispatch<SetStateAction<number[]>>}){
    return(
        <div className="w-2/5 h-full p-20 flex flex-col justify-center items-start gap-6">
            <Button variant="outline" size="icon">
                <ChevronLeft />
            </Button>
            <div>
                <h1 className="font-bold text-black text-xl">Create your account</h1>
                <h4 className="text-muted-foreground">Sign up to explore your favorite dishes.</h4>
            </div>
            <Input type="email" placeholder="Enter your email address" className="max-w-[400px]"/>
            <Button variant={"secondary"} className="w-full max-w-[400px] bg-neutral-300  text-white hover:bg-black">Let's Go</Button>
            <div className="w-full max-w-[400px] text-center">Already have an account?<Button variant={"link"} className="text-[#2563EB]" onClick={()=> setForm([0])}>Log in</Button></div>
        </div>
    );
}

function SignUpPass({form,setForm}:{form:number[],setForm:Dispatch<SetStateAction<number[]>>}){
    return(
        <div className="w-2/5 h-full p-20 flex flex-col justify-center items-start gap-6">
            <Button variant="outline" size="icon">
                <ChevronLeft />
            </Button>
            <div>
                <h1 className="font-bold text-black text-xl">Create your account</h1>
                <h4 className="text-muted-foreground">Sign up to explore your favorite dishes.</h4>
            </div>
            <Input type="pass" placeholder="Password" className="max-w-[400px]"/>
            <Input type="confirmpass" placeholder="Confirm" className="max-w-[400px]"/>
            <div className="flex items-center gap-3 text-muted-foreground"><Checkbox id="terms"className="border-muted-foreground"/> Show password</div>
            
            <Button variant={"secondary"} className="w-full max-w-[400px] bg-neutral-300  text-white hover:bg-black">Let's Go</Button>
            <div className="w-full max-w-[400px] text-center">Already have an account?<Button variant={"link"} className="text-[#2563EB]" onClick={()=> setForm([...form,0])}>Log in</Button></div>
        </div>
    );
}

function ForgotPass({form,setForm}:{form:number[],setForm:Dispatch<SetStateAction<number[]>>}){
    return(
        <div className="w-2/5 h-full p-20 flex flex-col justify-center items-start gap-6">
            <Button variant="outline" size="icon">
                <ChevronLeft />
            </Button>
            <div>
                <h1 className="font-bold text-black text-xl">Reset your password </h1>
                <h4 className="text-muted-foreground">Enter your email to receive a password reset link.</h4>
            </div>
            <Input type="email" placeholder="Enter your email address" className="max-w-[400px]"/>
            <Button variant={"secondary"} className="w-full max-w-[400px] bg-neutral-300  text-white hover:bg-black">Send link</Button>
            <div className="w-full max-w-[400px] text-center">Don’t have an account?<Button variant={"link"} className="text-[#2563EB]" onClick={()=> setForm([...form,1])}>Sign up</Button></div>
        </div>
    );
}

function VerifyEmail({form,setForm}:{form:number[],setForm:Dispatch<SetStateAction<number[]>>}){
    return(
        <div className="w-2/5 h-full p-20 flex flex-col justify-center items-start gap-6">
            <Button variant="outline" size="icon">
                <ChevronLeft />
            </Button>
            <div>
                <h1 className="font-bold text-black text-xl">Please verify Your Email</h1>
                <div className="flex max-w-[400px]">
                    <h4 className="text-muted-foreground">We just sent an email to <a  className="text-black">Test@gmail.com</a>. Click the link in the email to verify your account.</h4>
                </div>
                
            </div>
            <Input type="email" placeholder="Enter your email address" className="max-w-[400px]"/>
            <Button variant={"secondary"} className="w-full max-w-[400px] bg-neutral-300  text-white hover:bg-black">Send link</Button>
            <div className="w-full max-w-[400px] text-center">Don’t have an account?<Button variant={"link"} className="text-[#2563EB]" onClick={()=> setForm([...form,1])}>Sign up</Button></div>
        </div>
    );
}

function NewPass({form,setForm}:{form:number[],setForm:Dispatch<SetStateAction<number[]>>}){
    return(
        <div className="w-2/5 h-full p-20 flex flex-col justify-center items-start gap-6">
            <Button variant="outline" size="icon">
                <ChevronLeft />
            </Button>
            <div>
                <h1 className="font-bold text-black text-xl">Create new password</h1>
                <h4 className="text-muted-foreground">Set a new password with a combination of letters and numbers for better security.</h4>
            </div>
            <Input type="pass" placeholder="Password" className="max-w-[400px]"/>
            <Input type="confirmpass" placeholder="Confirm" className="max-w-[400px]"/>
            <div className="flex items-center gap-3 text-muted-foreground"><Checkbox id="terms"className="border-muted-foreground"/>Show password</div>
            <Button variant={"secondary"} className="w-full max-w-[400px] bg-neutral-300  text-white hover:bg-black"  onClick={()=> setForm([...form,0])}>Create password</Button>
        </div>
    );
}