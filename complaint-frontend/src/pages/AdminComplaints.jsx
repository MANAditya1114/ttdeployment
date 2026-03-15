import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import ComplaintTimeline from "../components/ComplaintTimeline";

function AdminComplaints(){

const [complaints,setComplaints] = useState([]);

const [showTimeline,setShowTimeline] = useState(false);
const [selectedComplaint,setSelectedComplaint] = useState(null);

const [statusFilter,setStatusFilter] = useState("");
const [priorityFilter,setPriorityFilter] = useState("");
const [search,setSearch] = useState("");

useEffect(()=>{
fetchComplaints();
},[]);

const fetchComplaints = async () => {

try{

const res = await API.get("/api/admin/complaints?page=0&size=100");

if(res.data.content){
setComplaints(res.data.content);
}else{
setComplaints(res.data);
}

}catch(err){

console.error(err);
alert("Failed to load complaints");

}

};

const openTimeline = (id) => {

setSelectedComplaint(id);
setShowTimeline(true);

};

const assignComplaint = async (id,department)=>{

try{

if(!department){
return;
}

const complaint = complaints.find(c => c.id === id);

if(complaint && complaint.assignedTo === department){
return;
}

await API.put(
`/api/admin/complaints/${id}/assign`,
{ assignedTo: department }
);

fetchComplaints();

}catch(err){

console.error("Assignment error:",err);
alert("Assignment failed");

}

};

const resolveComplaint = async (id)=>{

try{

await API.put(`/api/admin/complaints/${id}/resolve`);
fetchComplaints();

}catch(err){

console.error(err);
alert("Resolve failed");

}

};

/* ⭐ AI SMART REPLY */

const generateReply = async (text) => {

try{

const res = await API.post("/api/ai/reply",{
text:text
});

alert(res.data.reply);

}catch(err){

alert("AI reply failed");

}

};

const filteredComplaints = complaints.filter(c=>{

const statusMatch =
!statusFilter || c.status === statusFilter;

const priorityMatch =
!priorityFilter || c.priority === priorityFilter;

const searchMatch =
c.title.toLowerCase().includes(search.toLowerCase());

return statusMatch && priorityMatch && searchMatch;

});

return(

<div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-white">

<Sidebar/>

<div className="flex-1">

<Navbar/>

<div className="p-8">

<h1 className="text-3xl font-bold mb-6">
Admin Complaint Management
</h1>

{/* FILTERS */}

<div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border dark:border-gray-800 mb-6 flex gap-4">

<select
className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded"
onChange={(e)=>setStatusFilter(e.target.value)}
>
<option value="">All Status</option>
<option value="PENDING">Pending</option>
<option value="IN_PROGRESS">In Progress</option>
<option value="RESOLVED">Resolved</option>
</select>

<select
className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded"
onChange={(e)=>setPriorityFilter(e.target.value)}
>
<option value="">All Priority</option>
<option value="HIGH">High</option>
<option value="MEDIUM">Medium</option>
<option value="LOW">Low</option>
</select>

<input
type="text"
placeholder="Search complaint..."
className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded flex-1"
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

{/* TABLE */}

<div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border dark:border-gray-800">

<table className="w-full text-gray-800 dark:text-gray-200">

<thead>

<tr className="border-b text-left text-gray-600 dark:text-gray-300">

<th>ID</th>
<th>Title</th>
<th>User</th>
<th>Status</th>
<th>Priority</th>
<th>Assigned To</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{filteredComplaints.map(c=> (

<tr key={c.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition">

<td className="py-2">{c.id}</td>

<td>{c.title}</td>

<td>{c.userEmail}</td>

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

<td>{c.priority}</td>

<td>

{c.assignedTo ? (

<span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
{c.assignedTo}
</span>

) : (

<select
className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 rounded"
onChange={(e)=>assignComplaint(c.id,e.target.value)}
value={c.assignedTo || ""}
>

<option value="">Assign</option>
<option value="IT Department">IT Department</option>
<option value="Maintenance">Maintenance</option>
<option value="Electrical">Electrical</option>
<option value="Hostel Office">Hostel Office</option>

</select>

)}

</td>

<td className="flex gap-2">

<button
onClick={()=>resolveComplaint(c.id)}
className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
>
Resolve
</button>

<button
onClick={()=>openTimeline(c.id)}
className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
>
Timeline
</button>

<button
onClick={()=>generateReply(c.description)}
className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
>
AI Reply
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

{showTimeline && (

<ComplaintTimeline
complaintId={selectedComplaint}
onClose={()=>setShowTimeline(false)}
/>

)}

</div>

);

}

export default AdminComplaints;