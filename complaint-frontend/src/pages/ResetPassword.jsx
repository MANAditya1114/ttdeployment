import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ResetPassword(){

const { token } = useParams();
const navigate = useNavigate();

const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

const handleReset = async (e) => {

e.preventDefault();

setLoading(true);

try{

const res = await fetch(
`https://ttdeployment-ddu1.onrender.com/api/auth/reset-password/${token}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
password
})
}
);

const data = await res.json();

if(res.ok){

toast.success("Password reset successful");

setTimeout(()=>{
navigate("/");
},2000);

}else{

toast.error(data.message || "Reset failed");

}

}catch(err){

toast.error("Server error");

}

setLoading(false);

};

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">

<div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-xl w-96">

<h1 className="text-3xl font-bold text-white mb-6 text-center">
Reset Password
</h1>

<form onSubmit={handleReset} className="space-y-4">

<input
type="password"
placeholder="New password"
className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 outline-none"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button
disabled={loading}
className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg"
>

{loading ? "Updating..." : "Reset Password"}

</button>

</form>

</div>

</div>

);

}

export default ResetPassword;