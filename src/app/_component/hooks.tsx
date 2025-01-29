import { useAuth } from "@clerk/nextjs";
import { useEffect,useState } from "react";

export function useAuthFetch(path:string){
    const {getToken} = useAuth();
    const [data,setData] = useState([]);
    async function getFetchData() {
        const token = await getToken();
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`,{
            headers:{
                token:`${token}`
            }
        }).then(res => res.json()).then((data) => setData(data));
    }
    useEffect(()=>{
        getFetchData();
    },[])
    return data;
}