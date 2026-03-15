import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function VerifyAccount(){

const { token } = useParams();
const navigate = useNavigate();

const [loading,setLoading] = useState(true);

useEffect(()=>{

verifyAccount();

},[]);

const verifyAccount = async () => {

try{

const res = await fetch(
`http://localhost:8081/api/auth/verify/${token}`
);

const data = await res.json();

if(res.ok){

toast.success("Account verified successfully");

setTimeout(()=>{
navigate("/");
},2000);

}else{

toast.error(data.message || "Verification failed");

}

}catch(err){

toast.error("Server error");

}

setLoading(false);

};

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">

<div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-xl text-center">

<h1 className="text-3xl font-bold text-white mb-4">
Account Verification
</h1>

{loading ? (

<p className="text-gray-300">
Verifying your account...
</p>

):( 

<p className="text-gray-300">
You can now login to your account
</p>

)}

</div>

</div>

);

}

export default VerifyAccount;