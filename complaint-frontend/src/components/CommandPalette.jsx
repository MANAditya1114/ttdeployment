import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CommandPalette({ complaints }) {

const [open,setOpen] = useState(false);
const [query,setQuery] = useState("");
const navigate = useNavigate();

useEffect(()=>{

const handleKey = (e)=>{

if((e.ctrlKey || e.metaKey) && e.key === "k"){
e.preventDefault();
setOpen(true);
}

if(e.key === "Escape"){
setOpen(false);
}

};

window.addEventListener("keydown",handleKey);

return ()=> window.removeEventListener("keydown",handleKey);

},[]);

const filtered = complaints.filter(c =>
c.title.toLowerCase().includes(query.toLowerCase())
);

if(!open) return null;

return(

<div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-32 z-50">

<div className="bg-white dark:bg-gray-900 w-[600px] rounded-xl shadow-xl">

<input
autoFocus
placeholder="Search complaints..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="w-full p-4 border-b dark:border-gray-700 outline-none bg-transparent dark:text-white"
/>

<div className="max-h-80 overflow-y-auto">

{filtered.slice(0,10).map(c=>(
<div
key={c.id}
onClick={()=>{

navigate(`/complaint/${c.id}`);
setOpen(false);
setQuery("");

}}
className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-b dark:border-gray-700"
>

<p className="font-medium dark:text-white">
{c.title}
</p>

<p className="text-xs text-gray-500">
Complaint #{c.id}
</p>

</div>
))}

</div>

</div>

</div>

);

}

export default CommandPalette;