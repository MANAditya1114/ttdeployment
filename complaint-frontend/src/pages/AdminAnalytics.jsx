import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

import { Bar } from "react-chartjs-2";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

function AdminAnalytics(){

const [data,setData] = useState(null);

useEffect(()=>{
fetchAnalytics();
},[]);

const fetchAnalytics = async () => {

try{

const res = await API.get("/api/admin/analytics");
setData(res.data);

}catch(err){
console.error(err);
}

};

if(!data){

return(
<div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-white">

<Sidebar/>

<div className="flex-1">

<Navbar/>

<div className="p-8">
Loading...
</div>

</div>

</div>
)

}

const chartData = {

labels: Object.keys(data.departments),

datasets:[
{
label:"Complaints per Department",
data:Object.values(data.departments),
backgroundColor:"rgba(59,130,246,0.7)"
}
]

};

return(

<div className="flex bg-gray-100 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-white">

<Sidebar/>

<div className="flex-1">

<Navbar/>

<div className="p-8">

<h1 className="text-3xl font-bold mb-8 dark:text-white">
Admin Analytics Dashboard
</h1>

{/* ================= STAT CARDS ================= */}

<div className="grid grid-cols-3 gap-6 mb-10">

<div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-800">

<h2 className="text-gray-500 dark:text-gray-400">
Total Complaints
</h2>

<p className="text-3xl font-bold text-blue-600">
{data.total}
</p>

</div>

<div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-800">

<h2 className="text-gray-500 dark:text-gray-400">
Pending Complaints
</h2>

<p className="text-3xl font-bold text-orange-500">
{data.pending}
</p>

</div>

<div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-800">

<h2 className="text-gray-500 dark:text-gray-400">
Resolved Complaints
</h2>

<p className="text-3xl font-bold text-green-600">
{data.resolved}
</p>

</div>

</div>

{/* ================= CHART ================= */}

<div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-800">

<h2 className="text-xl font-semibold mb-4 dark:text-white">
Department Workload
</h2>

<Bar data={chartData}/>

</div>

</div>

</div>

</div>

);

}

export default AdminAnalytics;