import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function MyComplaints(){

const [complaints,setComplaints] = useState([]);
const [search,setSearch] = useState("");

/* ⭐ PAGINATION */

const [currentPage,setCurrentPage] = useState(1);
const complaintsPerPage = 5;

const navigate = useNavigate();

useEffect(()=>{
fetchComplaints();
},[]);

/* ================= FETCH COMPLAINTS ================= */

const fetchComplaints = async () => {

try{

const res = await API.get("/api/user/complaints?page=0&size=100");

let data = [];

if(Array.isArray(res.data)){
data = res.data;
}
else if(res.data.content){
data = res.data.content;
}

setComplaints(data);

}catch(err){

console.error(err);
alert("Failed to load complaints");

}

};

/* ================= SEARCH FILTER ================= */

const filteredComplaints = complaints.filter(c =>
c.title.toLowerCase().includes(search.toLowerCase())
);

/* ================= PAGINATION ================= */

const indexOfLast = currentPage * complaintsPerPage;
const indexOfFirst = indexOfLast - complaintsPerPage;

const currentComplaints =
filteredComplaints.slice(indexOfFirst,indexOfLast);

const totalPages =
Math.ceil(filteredComplaints.length / complaintsPerPage);

/* ================= PAGE CHANGE ================= */

const nextPage = () => {

if(currentPage < totalPages){
setCurrentPage(currentPage + 1);
}

};

const prevPage = () => {

if(currentPage > 1){
setCurrentPage(currentPage - 1);
}

};

/* ⭐ RESET PAGE WHEN SEARCH CHANGES */

useEffect(()=>{
setCurrentPage(1);
},[search]);

return(

<div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen">

<Sidebar/>

<div className="flex-1">

<Navbar/>

<div className="p-8">

<h1 className="text-3xl font-bold mb-6 dark:text-white">
My Complaints
</h1>

{/* ================= SEARCH ================= */}

<div className="mb-6">

<input
type="text"
placeholder="Search complaints..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full md:w-96 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

</div>

{/* ================= TABLE ================= */}

<div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800">

<div className="overflow-x-auto">

<table className="w-full text-gray-800 dark:text-gray-200">

<thead>

<tr className="border-b text-left dark:text-gray-300">

<th className="py-3">ID</th>
<th>Title</th>
<th>Priority</th>
<th>Status</th>
<th>Created</th>

</tr>

</thead>

<tbody>

{currentComplaints.length === 0 ? (

<tr>
<td colSpan="5" className="text-center py-6 text-gray-500">
No complaints found
</td>
</tr>

) : (

currentComplaints.map((c)=>(

<tr
key={c.id}
className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition"
onClick={()=>navigate(`/complaint/${c.id}`)}
>

<td className="py-3">{c.id}</td>

<td className="font-medium">{c.title}</td>

<td>

<span
className={`px-2 py-1 rounded text-sm ${
c.priority==="HIGH"
? "bg-red-100 text-red-600"
: c.priority==="MEDIUM"
? "bg-yellow-100 text-yellow-700"
: "bg-blue-100 text-blue-600"
}`}
>
{c.priority}
</span>

</td>

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

{c.createdAt
? new Date(c.createdAt).toLocaleDateString()
: "-"}

</td>

</tr>

))

)}

</tbody>

</table>

</div>

{/* ================= PAGINATION ================= */}

<div className="flex justify-between items-center mt-6">

<button
onClick={prevPage}
disabled={currentPage === 1}
className={`px-4 py-2 rounded ${
currentPage === 1
? "bg-gray-100 text-gray-400 dark:bg-gray-800"
: "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
}`}
>
Previous
</button>

<p className="text-sm text-gray-500 dark:text-gray-400">
Page {currentPage} of {totalPages || 1}
</p>

<button
onClick={nextPage}
disabled={currentPage === totalPages || totalPages === 0}
className={`px-4 py-2 rounded ${
currentPage === totalPages || totalPages === 0
? "bg-gray-100 text-gray-400 dark:bg-gray-800"
: "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
}`}
>
Next
</button>

</div>

</div>

</div>

</div>

</div>

);

}

export default MyComplaints;