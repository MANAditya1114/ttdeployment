import { useEffect, useState } from "react";
import API from "../services/api";
import { FaBell } from "react-icons/fa";

function NotificationBell(){

const [notifications,setNotifications] = useState([]);
const [open,setOpen] = useState(false);

useEffect(()=>{

fetchNotifications();

},[]);

const fetchNotifications = async () => {

try{

const role = localStorage.getItem("role");

let res;

if(role === "ADMIN"){
res = await API.get("/api/admin/complaints?page=0&size=50");
}else{
res = await API.get("/api/user/complaints");
}

let data = [];

if(res.data.content){
data = res.data.content;
}else{
data = res.data;
}

let notif = [];

data.forEach(c=>{

if(c.status === "RESOLVED"){

notif.push({
message:`Complaint "${c.title}" resolved`,
time:c.createdAt
});

}

if(c.status === "IN_PROGRESS"){

notif.push({
message:`Complaint "${c.title}" is in progress`,
time:c.createdAt
});

}

});

setNotifications(notif);

}catch(err){

console.error(err);

}

};

return(

<div className="relative">

<button
onClick={()=>setOpen(!open)}
className="relative"
>

<FaBell className="text-xl"/>

{notifications.length > 0 && (

<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">

{notifications.length}

</span>

)}

</button>

{open && (

<div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-xl z-50">

<h3 className="p-3 border-b font-semibold">
Notifications
</h3>

<div className="max-h-80 overflow-y-auto">

{notifications.length === 0 ? (

<p className="p-4 text-gray-500">
No notifications
</p>

):( 

notifications.map((n,index)=> (

<div
key={index}
className="p-3 border-b hover:bg-gray-50"
>

<p className="text-sm font-medium">
🔔 {n.message}
</p>

<p className="text-xs text-gray-400">
{n.time}
</p>

</div>

))

)}

</div>

</div>

)}

</div>

);

}

export default NotificationBell;