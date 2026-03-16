import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);
const [dark,setDark] = useState(true);

const [mouseX,setMouseX] = useState(0);
const [mouseY,setMouseY] = useState(0);

const navigate = useNavigate();

const handleMouseMove = (e)=>{
setMouseX(e.clientX);
setMouseY(e.clientY);
};

const toggleTheme = ()=>{
setDark(!dark);

if(!dark){
document.documentElement.classList.remove("dark");
}else{
document.documentElement.classList.add("dark");
}
};

const handleLogin = async (e) => {

e.preventDefault();

if(!email.trim()){
toast.error("Email is required");
return;
}

if(!password.trim()){
toast.error("Password is required");
return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailRegex.test(email)){
toast.error("Enter valid email address");
return;
}

setLoading(true);

try{

toast.loading("Logging in...", { id: "login" });

const response = await fetch("https://ttdeployment-ddu1.onrender.com/api/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email:email,
password:password
})
});

const result = await response.json();

if(response.ok){

const token = result.data;

if(!token){
toast.error("Invalid token received", { id: "login" });
return;
}

localStorage.setItem("token",token);

const decoded = jwtDecode(token);

localStorage.setItem("role",decoded.role);

toast.success("Login Successful", { id: "login" });

if(decoded.role === "ADMIN"){
navigate("/admin-dashboard");
}else{
navigate("/user-dashboard");
}

}else{

if(result.message?.includes("verify")){
toast.error("Please verify your email before login",{id:"login"});
}else{
toast.error(result.message || "Invalid Credentials", { id: "login" });
}

}

}catch(err){

console.error("Login error:",err);
toast.error("Server error", { id: "login" });

}finally{

setLoading(false);

}

};

return (

<div
onMouseMove={handleMouseMove}
className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950"
>

{/* Animated Mesh Gradient */}

<div className="absolute w-[700px] h-[700px] bg-cyan-500/30 blur-[140px] rounded-full top-[-150px] left-[-150px] animate-pulse"></div>

<div className="absolute w-[700px] h-[700px] bg-blue-600/30 blur-[140px] rounded-full bottom-[-150px] right-[-150px] animate-pulse"></div>

<div className="absolute w-[500px] h-[500px] bg-indigo-500/30 blur-[120px] rounded-full top-[40%] left-[30%] animate-pulse"></div>

{/* Mouse Follow Light */}

<div
className="pointer-events-none absolute w-[400px] h-[400px] rounded-full blur-[120px]"
style={{
left: mouseX - 200,
top: mouseY - 200,
background:"rgba(0,255,255,0.15)"
}}
/>

{/* Theme Toggle */}

<button
onClick={toggleTheme}
className="absolute top-6 right-6 backdrop-blur-md bg-white/20 p-3 rounded-full text-white"
>
{dark ? <FaSun/> : <FaMoon/>}
</button>

<motion.div
initial={{opacity:0,y:50,scale:0.9}}
animate={{opacity:1,y:0,scale:1}}
transition={{duration:0.6}}
className="relative flex w-11/12 max-w-6xl rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20"
>

{/* LEFT PANEL */}

<div className="hidden md:flex flex-col justify-center w-1/2 p-14 text-white bg-gradient-to-br from-blue-700/80 to-cyan-700/80 backdrop-blur-lg">

<h1 className="text-5xl font-bold mb-6 tracking-wide">
Complaint System
</h1>

<p className="text-lg text-blue-100 mb-8 leading-relaxed">
Manage and track complaints with a modern intelligent dashboard.
</p>

<ul className="space-y-4 text-lg">

<li>✔ Secure login</li>
<li>✔ Real-time complaint tracking</li>
<li>✔ Admin monitoring</li>
<li>✔ Email notifications</li>

</ul>

</div>

{/* RIGHT PANEL */}

<div className="flex flex-col justify-center items-center w-full md:w-1/2 p-12">

<h2 className="text-3xl font-bold text-white mb-2">
Welcome Back
</h2>

<p className="text-gray-300 mb-10">
Sign in to your account
</p>

<form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">

<input
type="email"
placeholder="Email Address"
className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-cyan-400 backdrop-blur-md outline-none transition"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-cyan-400 backdrop-blur-md outline-none transition"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<p
className="text-sm text-cyan-400 cursor-pointer hover:underline"
onClick={()=>navigate("/forgot-password")}
>
Forgot Password?
</p>

<button
disabled={loading}
className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
>

{loading && (
<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
)}

{loading ? "Logging in..." : "Login"}

</button>

<p className="text-gray-300 text-sm text-center mt-4">

Don't have an account?

<span
className="text-cyan-400 cursor-pointer hover:underline ml-2"
onClick={()=>navigate("/register")}
>

Register

</span>

</p>

</form>

</div>

</motion.div>

</div>

);

}

export default Login;