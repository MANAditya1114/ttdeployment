import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function ComplaintDetails(){

const { id } = useParams();

const [complaint,setComplaint] = useState(null);
const [timeline,setTimeline] = useState([]);

/* ⭐ COMMENTS */
const [comments,setComments] = useState([]);
const [message,setMessage] = useState("");

useEffect(()=>{

fetchComplaint();
fetchTimeline();
fetchComments();

},[id]);

/* ============================= */
/* FETCH COMPLAINT */
/* ============================= */

const fetchComplaint = async ()=>{

try{

const res = await API.get("/api/user/complaints");

let list = [];

if(Array.isArray(res.data)){
list = res.data;
}
else if(res.data.content){
list = res.data.content;
}

const found = list.find(c => String(c.id) === String(id));

setComplaint(found);

}catch(err){

console.error("Error loading complaint:",err);

}

};

/* ============================= */
/* FETCH TIMELINE */
/* ============================= */

const fetchTimeline = async ()=>{

try{

const res = await API.get(`/api/complaints/${id}/timeline`);

setTimeline(res.data);

}catch(err){

console.error("Timeline error:",err);

}

};

/* ============================= */
/* FETCH COMMENTS */
/* ============================= */

const fetchComments = async () => {

try{

const res = await API.get(`/api/comments/${id}`);

setComments(res.data);

}catch(err){

console.error("Comment load error:",err);

}

};

/* ============================= */
/* SEND COMMENT */
/* ============================= */

const sendComment = async () => {

if(!message.trim()) return;

try{

await API.post(`/api/comments/${id}`,{
message: message
});

setMessage("");

fetchComments();

}catch(err){

console.error("Comment error:",err);

}

};

/* ============================= */
/* LOADING STATE */
/* ============================= */

if(!complaint){

return(

<div className="flex bg-gray-100 min-h-screen">

<Sidebar/>

<div className="flex-1">

<Navbar/>

<div className="p-8">

<h1 className="text-xl">Loading complaint...</h1>

</div>

</div>

</div>

);

}

/* ============================= */
/* PAGE UI */
/* ============================= */

return(

<div className="flex bg-gray-100 min-h-screen">

<Sidebar/>

<div className="flex-1">

<Navbar/>

<div className="p-8">

<h1 className="text-3xl font-bold mb-6">
Complaint Details
</h1>

{/* ============================= */}
{/* COMPLAINT CARD */}
{/* ============================= */}

<div className="bg-white rounded-xl shadow p-6 mb-8">

<h2 className="text-xl font-semibold mb-4">
{complaint.title}
</h2>

<p className="mb-2">
<b>Description:</b> {complaint.description}
</p>

<p className="mb-2">
<b>Status:</b> {complaint.status}
</p>

<p className="mb-2">
<b>Priority:</b> {complaint.priority}
</p>

<p className="mb-2">
<b>User Email:</b> {complaint.userEmail}
</p>

<p className="mb-2">
<b>Created At:</b> {complaint.createdAt}
</p>

{/* ============================= */}
{/* ATTACHMENT VIEWER */}
{/* ============================= */}

{complaint.attachmentPath && (

<div className="mt-4">

<p className="font-semibold mb-2">
Attachment
</p>

{complaint.attachmentPath.endsWith(".png") ||
complaint.attachmentPath.endsWith(".jpg") ||
complaint.attachmentPath.endsWith(".jpeg") ? (

<img
src={`https://ttdeployment-ddu1.onrender.com/uploads/images/${complaint.attachmentPath}`}
alt="Complaint Attachment"
className="w-64 rounded shadow"
/>

) : (

<a
href={`https://ttdeployment-ddu1.onrender.com/uploads/pdfs/${complaint.attachmentPath}`}
target="_blank"
rel="noopener noreferrer"
className="text-blue-600 underline"
>
View PDF Attachment
</a>

)}

</div>

)}

</div>

{/* ============================= */}
{/* TIMELINE */}
{/* ============================= */}

<div className="bg-white rounded-xl shadow p-6 mb-8">

<h2 className="text-xl font-semibold mb-4">
Complaint Timeline
</h2>

{timeline.length === 0 ? (

<p className="text-gray-500">
No activity yet
</p>

):( 

timeline.map((t)=>(

<div key={t.id} className="border-b py-3 flex justify-between">

<div>

<p className="font-medium">
{t.action}
</p>

<p className="text-sm text-gray-500">
Performed By: {t.performedBy}
</p>

</div>

<p className="text-xs text-gray-400">
{t.timestamp}
</p>

</div>

))

)}

</div>

{/* ============================= */}
{/* COMMENTS */}
{/* ============================= */}

<div className="bg-white rounded-xl shadow p-6">

<h2 className="text-xl font-semibold mb-4">
Comments
</h2>

{comments.length === 0 ? (

<p className="text-gray-500">
No comments yet
</p>

):( 

comments.map((c)=> (

<div key={c.id} className="border-b py-3">

<p className="font-medium">
{c.userEmail}
</p>

<p className="text-gray-700">
{c.message}
</p>

<p className="text-xs text-gray-400">
{c.createdAt}
</p>

</div>

))

)}

{/* ADD COMMENT */}

<div className="flex gap-3 mt-4">

<input
type="text"
placeholder="Write a comment..."
className="border p-2 flex-1 rounded"
value={message}
onChange={(e)=>setMessage(e.target.value)}
/>

<button
onClick={sendComment}
className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
>
Send
</button>

</div>

</div>

</div>

</div>

</div>

);

}

export default ComplaintDetails;