import { useEffect,useState } from "react";
import { FaMoon,FaSun } from "react-icons/fa";

function ThemeToggle(){

const [dark,setDark] = useState(true);

useEffect(()=>{

if(dark){
document.documentElement.classList.add("dark");
}else{
document.documentElement.classList.remove("dark");
}

},[dark]);

return(

<button
onClick={()=>setDark(!dark)}
className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-full text-white"
>

{dark ? <FaSun/> : <FaMoon/>}

</button>

);

}

export default ThemeToggle;