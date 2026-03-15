import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import API from "../services/api";

function Navbar() {

const navigate = useNavigate();

/* ================= ROLE ================= */

const role = localStorage.getItem("role");

/* ================= AVATAR ================= */

const token = localStorage.getItem("token");

let userInitial = "U";

try{

if(token){

const payload = JSON.parse(atob(token.split(".")[1]));

if(payload.sub){
userInitial = payload.sub.charAt(0).toUpperCase();
}

}

}catch(err){

console.log("Token decode error");

}

/* ================= DARK MODE ================= */

const [dark,setDark] = useState(
localStorage.getItem("theme") === "dark"
);

useEffect(()=>{

if(dark){

document.documentElement.classList.add("dark");
localStorage.setItem("theme","dark");

}else{

document.documentElement.classList.remove("dark");
localStorage.setItem("theme","light");

}

},[dark]);

const toggleDarkMode = () => {

setDark(!dark);

};

/* ================= GLOBAL SEARCH ================= */

const [search,setSearch] = useState("");
const [results,setResults] = useState([]);
const [showResults,setShowResults] = useState(false);

const searchRef = useRef();

/* SEARCH API */

useEffect(()=>{

if(search.length < 2){

setResults([]);
setShowResults(false);
return;

}

searchComplaints();

},[search]);

const searchComplaints = async () => {

try{

let res;

if(role === "ADMIN"){
res = await API.get("/api/admin/complaints?page=0&size=100");
}else{
res = await API.get("/api/user/complaints");
}

let data = res.data.content ? res.data.content : res.data;

const filtered = data.filter(c =>
c.title.toLowerCase().includes(search.toLowerCase())
);

setResults(filtered.slice(0,5));
setShowResults(true);

}catch(err){

console.error("Search error",err);

}

};

/* ================= CLOSE SEARCH ON CLICK OUTSIDE ================= */

useEffect(()=>{

const handleClickOutside = (event) => {

if(searchRef.current && !searchRef.current.contains(event.target)){
setShowResults(false);
}

};

document.addEventListener("mousedown",handleClickOutside);

return ()=> document.removeEventListener("mousedown",handleClickOutside);

},[]);

/* ================= ESC KEY CLOSE SEARCH ================= */

useEffect(()=>{

const handleKey = (e)=>{

if(e.key === "Escape"){
setShowResults(false);
}

};

window.addEventListener("keydown",handleKey);

return ()=> window.removeEventListener("keydown",handleKey);

},[]);

/* ================= LOGO CLICK ================= */

const goHome = () => {

if(role === "ADMIN"){
navigate("/admin-dashboard");
}else{
navigate("/user-dashboard");
}

};

/* ================= LOGOUT ================= */

const logout = () => {

localStorage.removeItem("token");
localStorage.removeItem("role");

navigate("/");

};

return (

<div className="h-16 bg-white dark:bg-gray-900 shadow flex justify-between items-center px-8 border-b dark:border-gray-800">

{/* ================= LOGO ================= */}

<div
onClick={goHome}
className="cursor-pointer flex items-center gap-3 hover:opacity-80 transition"
>

<div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
CMS
</div>

<h1 className="text-lg font-semibold dark:text-white">
Complaint Management System
</h1>

</div>

{/* ================= SEARCH ================= */}

<div ref={searchRef} className="relative w-96">

<div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3">

<FaSearch className="text-gray-500"/>

<input
type="text"
placeholder="Search complaints..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full p-2 bg-transparent outline-none text-sm dark:text-white"
/>

</div>

{/* SEARCH RESULTS */}

{showResults && results.length > 0 && (

<div className="absolute w-full bg-white dark:bg-gray-900 shadow-xl rounded-lg mt-2 z-50 border dark:border-gray-800 max-h-64 overflow-y-auto">

{results.map((c)=>(

<div
key={c.id}
onClick={()=>{

navigate(`/complaint/${c.id}`);
setShowResults(false);
setSearch("");

}}
className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-b dark:border-gray-800"
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

)}

</div>

{/* ================= RIGHT SIDE ================= */}

<div className="flex items-center gap-6">

{/* ROLE BADGE */}

{role && (

<span
className={`px-3 py-1 text-xs rounded-full font-semibold ${
role === "ADMIN"
? "bg-red-100 text-red-600"
: "bg-blue-100 text-blue-600"
}`}
>
{role}
</span>

)}

{/* ================= DARK MODE ================= */}

<button
onClick={toggleDarkMode}
className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
>

{dark ? <Sun size={20}/> : <Moon size={20}/>}

</button>

{/* ================= AVATAR ================= */}

<div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold cursor-pointer hover:scale-105 transition">

{userInitial}

</div>

{/* ================= LOGOUT ================= */}

<button
onClick={logout}
className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
>

Logout

</button>

</div>

</div>

);

}

export default Navbar;