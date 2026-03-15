import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile(){

const [user,setUser] = useState({
email:"",
role:"",
joined:""
});

useEffect(()=>{

const token = localStorage.getItem("token");

if(token){

try{

const payload = JSON.parse(atob(token.split(".")[1]));

setUser({
email: payload.sub,
role: payload.role,
joined: payload.iat 
? new Date(payload.iat * 1000).toLocaleDateString()
: "Unknown"
});

}catch(err){

console.error("Invalid token",err);

}

}

},[]);

return(

<div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">

<Sidebar/>

<div className="flex-1">

<Navbar/>

<div className="p-8 flex justify-center">

{/* PROFILE CARD */}

<div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-10 w-full max-w-xl hover:shadow-xl transition border border-gray-200 dark:border-gray-800">

{/* AVATAR */}

<div className="flex flex-col items-center mb-6">

<div className="w-24 h-24 bg-indigo-600 text-white flex items-center justify-center rounded-full text-3xl font-bold shadow">

{user.email ? user.email.charAt(0).toUpperCase() : "U"}

</div>

<h2 className="text-2xl font-bold mt-4 dark:text-white">
{user.email}
</h2>

{/* ROLE BADGE */}

<span
className={`mt-2 px-4 py-1 rounded-full text-sm font-semibold ${
user.role === "ADMIN"
? "bg-red-100 text-red-600"
: "bg-blue-100 text-blue-600"
}`}
>

{user.role}

</span>

</div>

<hr className="mb-6 border-gray-200 dark:border-gray-700"/>

{/* PROFILE DETAILS */}

<div className="space-y-6">

{/* EMAIL */}

<div>

<p className="text-gray-500 dark:text-gray-400 text-sm">
Email Address
</p>

<p className="text-lg font-medium dark:text-white">
{user.email}
</p>

</div>

{/* ROLE */}

<div>

<p className="text-gray-500 dark:text-gray-400 text-sm">
User Role
</p>

<p className="text-lg font-medium dark:text-white">
{user.role}
</p>

</div>

{/* JOINED DATE */}

<div>

<p className="text-gray-500 dark:text-gray-400 text-sm">
Joined Date
</p>

<p className="text-lg font-medium dark:text-white">
{user.joined}
</p>

</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default Profile;