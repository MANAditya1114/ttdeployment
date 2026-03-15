import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import ActivityFeed from "../components/ActivityFeed";
import ChatBot from "../components/ChatBot";
import AdminNotifications from "../components/AdminNotifications";
import AdminAssistant from "../components/AdminAssistant"; // ⭐ ADDED
import CommandPalette from "../components/CommandPalette"; // ⭐ ADDED

import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";
import { Bell } from "lucide-react";

ChartJS.register(
ArcElement,
Tooltip,
Legend
);

function Dashboard() {

const [loading,setLoading] = useState(true);

const [complaints,setComplaints] = useState([]);

/* ⭐ ADDED */
const [filteredComplaints,setFilteredComplaints] = useState([]);

const [stats,setStats] = useState({
total:0,
resolved:0,
pending:0,
inprogress:0
});

const [priorityStats,setPriorityStats] = useState({
HIGH:0,
MEDIUM:0,
LOW:0
});

const [notifications,setNotifications] = useState([]);
const [showNotif,setShowNotif] = useState(false);

useEffect(()=>{
fetchDashboardData();
},[]);

/* ================= FETCH DASHBOARD DATA ================= */

const fetchDashboardData = async () => {

try{

const role = localStorage.getItem("role");

let res;

if(role === "ADMIN"){
res = await API.get("/api/admin/complaints?page=0&size=100");
}else{
res = await API.get("/api/user/complaints");
}

let data = res?.data?.content ? res.data.content : res?.data || [];

setComplaints(data);

/* ⭐ ADDED */
setFilteredComplaints(data);

/* ===== CALCULATE STATS ===== */

let total = data.length;
let resolved = 0;
let pending = 0;
let inprogress = 0;

let HIGH = 0;
let MEDIUM = 0;
let LOW = 0;

let notif = [];

data.forEach(c=>{

if(c.status === "RESOLVED"){
resolved++;

notif.push({
message:`Complaint "${c.title}" resolved`,
time: c.createdAt ? new Date(c.createdAt).toLocaleString() : "Unknown"
});
}

if(c.status === "IN_PROGRESS"){
inprogress++;

notif.push({
message:`Complaint "${c.title}" in progress`,
time: c.createdAt ? new Date(c.createdAt).toLocaleString() : "Unknown"
});
}

if(c.status === "PENDING"){
pending++;
}

if(c.priority === "HIGH") HIGH++;
if(c.priority === "MEDIUM") MEDIUM++;
if(c.priority === "LOW") LOW++;

});

setStats({
total,
resolved,
pending,
inprogress
});

setPriorityStats({
HIGH,
MEDIUM,
LOW
});

setNotifications(notif);

}catch(err){

console.error("Dashboard load error:",err);

}finally{

setLoading(false);

}

};

/* ================= REALTIME NOTIFICATION ================= */

const handleNewComplaint = (complaint) => {

setNotifications(prev => [

{
message:`New Complaint: ${complaint.title}`,
time:new Date().toLocaleString()
},
...prev

]);

setComplaints(prev => [complaint,...prev]);

/* ⭐ ADDED */
setFilteredComplaints(prev => [complaint,...prev]);

setStats(prev => ({
...prev,
total: prev.total + 1,
pending: prev.pending + 1
}));

};

/* ================= CHART DATA ================= */

const statusChart = {

labels:["Pending","In Progress","Resolved"],

datasets:[
{
label:"Complaints",
data:[
stats.pending,
stats.inprogress,
stats.resolved
],
backgroundColor:[
"#f59e0b",
"#3b82f6",
"#10b981"
]
}
]

};

const priorityChart = {

labels:["High","Medium","Low"],

datasets:[
{
label:"Priority",
data:[
priorityStats.HIGH,
priorityStats.MEDIUM,
priorityStats.LOW
],
backgroundColor:[
"#ef4444",
"#f59e0b",
"#3b82f6"
]
}
]

};

return(

<div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">

{/* ⭐ COMMAND PALETTE */}
<CommandPalette complaints={complaints}/>

<AdminNotifications onNewComplaint={handleNewComplaint}/>

<Sidebar/>

<div className="flex-1">

{/* NAVBAR */}

<div className="flex justify-between items-center px-8 py-4">

<Navbar/>

<div className="relative">

<Bell
size={26}
className="cursor-pointer hover:text-indigo-600 transition"
onClick={()=>setShowNotif(!showNotif)}
/>

{notifications.length > 0 && (

<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
{notifications.length}
</span>

)}

{showNotif && (

<div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 shadow-xl rounded-xl p-4 z-50">

<h3 className="font-semibold mb-3 dark:text-white">
Notifications
</h3>

{notifications.length === 0 ? (

<p className="text-gray-500">
No notifications
</p>

):( 

notifications.slice(0,6).map((n,index)=>(

<div key={index} className="border-b py-2">

<p className="text-sm dark:text-gray-200">
{n.message}
</p>

<p className="text-xs text-gray-400">
{n.time}
</p>

</div>

))

)}

</div>

)}

</div>

</div>

<div className="p-8">

<h1 className="text-3xl font-bold mb-8 dark:text-white">
Dashboard Overview
</h1>

{/* ================= STAT CARDS ================= */}

<div className="grid grid-cols-4 gap-6 mb-10">

<div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
<p>Total Complaints</p>
<h2 className="text-4xl font-bold mt-2">{stats.total}</h2>
</div>

<div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
<p>Pending</p>
<h2 className="text-4xl font-bold mt-2">{stats.pending}</h2>
</div>

<div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
<p>In Progress</p>
<h2 className="text-4xl font-bold mt-2">{stats.inprogress}</h2>
</div>

<div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
<p>Resolved</p>
<h2 className="text-4xl font-bold mt-2">{stats.resolved}</h2>
</div>

</div>

{/* ================= CHARTS ================= */}

<div className="grid grid-cols-2 gap-10 mb-10">

<div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition">

<h2 className="text-xl font-semibold mb-4 dark:text-white">
Complaints by Status
</h2>

<Pie data={statusChart}/>

</div>

<div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition">

<h2 className="text-xl font-semibold mb-4 dark:text-white">
Complaints by Priority
</h2>

<Pie data={priorityChart}/>

</div>

</div>

{/* ================= ACTIVITY FEED ================= */}

<div className="mb-10">
<ActivityFeed/>
</div>

{/* ================= RECENT COMPLAINTS ================= */}

<div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

<h2 className="text-xl font-semibold mb-4 dark:text-white">
Recent Complaints
</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead>

<tr className="text-left border-b text-gray-600 dark:text-gray-300">

<th className="py-3">ID</th>
<th>Title</th>
<th>Status</th>
<th>Priority</th>

</tr>

</thead>

<tbody>

{/* ⭐ CHANGED complaints → filteredComplaints */}

{filteredComplaints.slice(0,5).map((c)=>(

<tr key={c.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition">

<td className="py-3">{c.id}</td>

<td className="font-medium">{c.title}</td>

<td>

<span
className={`px-3 py-1 rounded-full text-sm ${
c.status==="RESOLVED"
? "bg-green-100 text-green-600"
: c.status==="IN_PROGRESS"
? "bg-blue-100 text-blue-600"
: "bg-orange-100 text-orange-600"
}`}
>
{c.status}
</span>

</td>

<td>

<span
className={`px-3 py-1 rounded-full text-sm ${
c.priority==="HIGH"
? "bg-red-100 text-red-600"
: c.priority==="MEDIUM"
? "bg-yellow-100 text-yellow-600"
: "bg-blue-100 text-blue-600"
}`}
>
{c.priority}
</span>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

</div>

<ChatBot/>

{/* ⭐ ADMIN ASSISTANT */}

<AdminAssistant
complaints={complaints}
setFilteredComplaints={setFilteredComplaints}
/>

</div>

);

}

export default Dashboard;