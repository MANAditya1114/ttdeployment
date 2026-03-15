import { useEffect, useState } from "react";
import API from "../services/api";

function ComplaintTimeline({complaintId, onClose}){

const [timeline,setTimeline] = useState([]);

useEffect(()=>{

fetchTimeline();

},[]);

const fetchTimeline = async () => {

try{

const res = await API.get(`/api/complaints/${complaintId}/timeline`);
setTimeline(res.data);

}catch(err){

console.error(err);

}

};

return(

<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

<div className="bg-white w-[600px] p-6 rounded-xl shadow-lg">

<h2 className="text-2xl font-bold mb-6">
Complaint Timeline
</h2>

<div className="space-y-4 max-h-[400px] overflow-y-auto">

{timeline.map((t,index)=>(

<div key={index} className="flex items-start gap-4">

<div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>

<div>

<p className="font-semibold">{t.action}</p>

<p className="text-sm text-gray-500">
By {t.performedBy}
</p>

<p className="text-xs text-gray-400">
{new Date(t.timestamp).toLocaleString()}
</p>

</div>

</div>

))}

</div>

<div className="mt-6 text-right">

<button
onClick={onClose}
className="bg-gray-600 text-white px-4 py-2 rounded"
>
Close
</button>

</div>

</div>

</div>

);

}

export default ComplaintTimeline;