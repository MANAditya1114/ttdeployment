import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import toast from "react-hot-toast";

function CreateComplaint(){

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [priority,setPriority] = useState("MEDIUM");
const [file,setFile] = useState(null);

/* ⭐ NEW */
const [departmentId,setDepartmentId] = useState("");
const [departments,setDepartments] = useState([]);

/* ⭐ AI SUMMARY */
const [summary,setSummary] = useState("");

/* ================= FETCH DEPARTMENTS ================= */

useEffect(()=>{

fetchDepartments();

},[]);

const fetchDepartments = async () => {

try{

const res = await API.get("/api/departments");

setDepartments(res.data);

}catch(err){

toast.error("Failed to load departments");

}

};

/* ================= AI ANALYSIS ================= */

const analyzeComplaint = async () => {

try{

const res = await API.post("/api/ai/categorize",{
text:description
});

setPriority(res.data.priority);
setSummary(res.data.summary);

toast.success("AI Analysis Complete");

}catch(err){

toast.error("AI analysis failed");

}

};

const handleSubmit = async (e) => {

e.preventDefault();

if(!departmentId){

toast.error("Please select department");
return;

}

try{

toast.loading("Submitting complaint...", { id: "createComplaint" });

const res = await API.post("/api/user/complaints",{
title,
description,
priority,
departmentId
});

const complaint = res.data.data;

if(file){

const formData = new FormData();
formData.append("file",file);

await API.post(
`/api/user/complaints/${complaint.id}/upload`,
formData,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
);

}

toast.success("Complaint submitted successfully", { id: "createComplaint" });

setTitle("");
setDescription("");
setPriority("MEDIUM");
setFile(null);
setSummary("");
setDepartmentId("");

}catch(err){

toast.error("Failed to create complaint", { id: "createComplaint" });

}

};

return(

<div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">

<Sidebar/>

<div className="flex-1">

<Navbar/>

<div className="p-8">

<h1 className="text-3xl font-bold mb-6 dark:text-white">
Create Complaint
</h1>

<div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow max-w-xl border border-gray-200 dark:border-gray-800">

<form onSubmit={handleSubmit} className="space-y-4">

<input
type="text"
placeholder="Complaint Title"
className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded bg-white dark:bg-gray-800 dark:text-white"
value={title}
onChange={(e)=>setTitle(e.target.value)}
required
/>

<textarea
placeholder="Complaint Description"
className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded bg-white dark:bg-gray-800 dark:text-white"
rows="4"
value={description}
onChange={(e)=>setDescription(e.target.value)}
required
/>

{/* ⭐ SELECT DEPARTMENT */}

<select
className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded bg-white dark:bg-gray-800 dark:text-white"
value={departmentId}
onChange={(e)=>setDepartmentId(e.target.value)}
required
>

<option value="">Select Department</option>

{departments.map(dep=>(
<option key={dep.id} value={dep.id}>
{dep.name}
</option>
))}

</select>

{/* ⭐ AI BUTTON */}

<button
type="button"
onClick={analyzeComplaint}
className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
>
AI Analyze Complaint
</button>

{/* ⭐ AI SUMMARY */}

{summary && (

<div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm dark:text-gray-200">
AI Summary: {summary}
</div>

)}

<select
className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded bg-white dark:bg-gray-800 dark:text-white"
value={priority}
onChange={(e)=>setPriority(e.target.value)}
>

<option value="HIGH">High</option>
<option value="MEDIUM">Medium</option>
<option value="LOW">Low</option>

</select>

<div>

<label className="block mb-2 font-medium dark:text-white">
Attach File (optional)
</label>

<input
type="file"
onChange={(e)=>setFile(e.target.files[0])}
className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded bg-white dark:bg-gray-800 dark:text-white"
/>

<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
Allowed: PNG, JPG, JPEG, PDF (Max 5MB)
</p>

</div>

<button
className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
>
Submit Complaint
</button>

</form>

</div>

</div>

</div>

</div>

);

}

export default CreateComplaint;