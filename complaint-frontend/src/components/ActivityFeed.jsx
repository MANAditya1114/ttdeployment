import { useEffect, useState } from "react";
import API from "../services/api";

function ActivityFeed(){

const [activities,setActivities] = useState([]);

useEffect(()=>{

fetchActivities();

/* 🔄 AUTO REFRESH EVERY 10 SEC */

const interval = setInterval(()=>{

fetchActivities();

},10000);

return ()=> clearInterval(interval);

},[]);

const fetchActivities = async () => {

try{

const role = localStorage.getItem("role");

let res;

/* ⭐ ROLE BASED API */

if(role === "ADMIN"){
res = await API.get("/api/admin/complaints?page=0&size=20");
}else{
res = await API.get("/api/user/complaints");
}

let complaints = [];

if(res.data.content){
complaints = res.data.content;
}else{
complaints = res.data;
}

let activityList = [];

for(const c of complaints){

const timeline = await API.get(`/api/complaints/${c.id}/timeline`);

timeline.data.forEach(a=>{

activityList.push({
complaintId:c.id,
action:a.action,
user:a.performedBy,
time:a.timestamp
});

});

}

activityList.sort((a,b)=> new Date(b.time) - new Date(a.time));

setActivities(activityList.slice(0,10));

}catch(err){

console.error("Activity feed error:",err);

}

};

return(

<div className="bg-white rounded-xl shadow p-6">

<h2 className="text-xl font-semibold mb-4">
Live Activity Feed
</h2>

<div className="space-y-4">

{activities.length === 0 ? (

<p className="text-gray-500">
No recent activity
</p>

):( 

activities.map((a,index)=>(

<div
key={index}
className="border-l-4 border-indigo-500 pl-4 py-2 hover:bg-gray-50 transition rounded"
>

<p className="font-medium">
{a.action}
</p>

<p className="text-sm text-gray-500">
Complaint #{a.complaintId} • {a.user}
</p>

<p className="text-xs text-gray-400">
{a.time}
</p>

</div>

))

)}

</div>

</div>

);

}

export default ActivityFeed;