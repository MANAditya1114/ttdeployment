import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function ForgotPassword(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [loading,setLoading] = useState(false);

const handleSubmit = async (e)=>{

e.preventDefault();

if(!email.trim()){
toast.error("Email required");
return;
}

setLoading(true);

try{

toast.loading("Sending reset email",{id:"reset"});

const res = await fetch("https://ttdeployment-ddu1.onrender.com/api/auth/forgot-password",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({email})

});

if(res.ok){
toast.success("Reset link sent",{id:"reset"});
}else{
toast.error("Failed to send email",{id:"reset"});
}

}catch(err){
toast.error("Server error",{id:"reset"});
}

setLoading(false);

};

return(

<div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950">

<div className="absolute w-[600px] h-[600px] bg-cyan-500/30 blur-[120px] rounded-full top-[-100px] left-[-100px] animate-pulse"></div>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-[420px]"
>

<h2 className="text-3xl text-white font-bold mb-4">
Reset Password
</h2>

<p className="text-gray-300 mb-6">
Enter your email to receive reset link.
</p>

<form onSubmit={handleSubmit} className="space-y-5">

<input
type="email"
placeholder="Email address"
className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-cyan-400"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<button
disabled={loading}
className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-xl font-semibold"
>
{loading?"Sending...":"Send Reset Link"}
</button>

</form>

<p
className="text-cyan-400 mt-6 cursor-pointer hover:underline"
onClick={()=>navigate("/")}

>

Back to Login

</p>

</motion.div>

</div>

);

}

export default ForgotPassword;