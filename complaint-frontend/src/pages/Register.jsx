import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";

function Register(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [role,setRole] = useState("USER");
const [departmentId,setDepartmentId] = useState("");

const [departments,setDepartments] = useState([]);

const [loading,setLoading] = useState(false);
const [showPassword,setShowPassword] = useState(false);
const [dark,setDark] = useState(true);

const [mouseX,setMouseX] = useState(0);
const [mouseY,setMouseY] = useState(0);

/* =============================
FETCH DEPARTMENTS
============================= */

useEffect(()=>{

fetch("https://ttdeployment-ddu1.onrender.com/api/departments")
.then(res=>res.json())
.then(data=>setDepartments(data))
.catch(()=>toast.error("Failed to load departments"))

},[]);

/* =============================
MOUSE LIGHT
============================= */

const handleMouseMove = (e)=>{
setMouseX(e.clientX);
setMouseY(e.clientY);
};

/* =============================
THEME
============================= */

const toggleTheme = ()=>{
setDark(!dark);

if(!dark){
document.documentElement.classList.remove("dark");
}else{
document.documentElement.classList.add("dark");
}
};

/* =============================
PASSWORD STRENGTH
============================= */

const getPasswordStrength = () => {

if(password.length === 0) return "";
if(password.length < 6) return "Weak";
if(password.length < 10) return "Medium";
return "Strong";

};

/* =============================
REGISTER USER
============================= */

const handleRegister = async (e) => {

e.preventDefault();

if(!name.trim()){
toast.error("Name is required");
return;
}

if(!email.trim()){
toast.error("Email is required");
return;
}

if(!password.trim()){
toast.error("Password is required");
return;
}

if(role==="ADMIN" && !departmentId){
toast.error("Admin must select department");
return;
}

setLoading(true);

try{

toast.loading("Creating account...",{id:"register"});

const response = await fetch("https://ttdeployment-ddu1.onrender.com/api/auth/register",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:name,
email:email,
password:password,
role:role,
departmentId: role==="ADMIN" ? departmentId : null

})

});

if(response.ok){

toast.success("Registration Successful",{id:"register"});
navigate("/");

}else{

const error = await response.json();
toast.error(error.message || "Registration Failed",{id:"register"});

}

}catch(err){

toast.error("Server error",{id:"register"});

}

setLoading(false);

};

/* =============================
UI
============================= */

return(

<div
onMouseMove={handleMouseMove}
className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950"
>

{/* Glow Background */}

<div className="absolute w-[700px] h-[700px] bg-cyan-500/30 blur-[140px] rounded-full top-[-150px] left-[-150px] animate-pulse"></div>
<div className="absolute w-[700px] h-[700px] bg-blue-600/30 blur-[140px] rounded-full bottom-[-150px] right-[-150px] animate-pulse"></div>

{/* Mouse Light */}

<div
className="pointer-events-none absolute w-[400px] h-[400px] rounded-full blur-[120px]"
style={{
left: mouseX-200,
top: mouseY-200,
background:"rgba(0,255,255,0.15)"
}}
/>

{/* Theme */}

<button
onClick={toggleTheme}
className="absolute top-6 right-6 backdrop-blur-md bg-white/20 p-3 rounded-full text-white"
>
{dark ? <FaSun/> : <FaMoon/>}
</button>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="flex w-11/12 max-w-6xl rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20"
>

{/* LEFT PANEL */}

<div className="hidden md:flex flex-col justify-center w-1/2 p-14 text-white bg-gradient-to-br from-blue-700/80 to-cyan-700/80">

<h1 className="text-5xl font-bold mb-6">
Complaint System
</h1>

<p className="text-blue-100 mb-8">
Register to submit and track complaints easily.
</p>

<ul className="space-y-4 text-lg">
<li>✔ Submit complaints</li>
<li>✔ Track progress</li>
<li>✔ Department routing</li>
<li>✔ Admin management</li>
</ul>

</div>

{/* RIGHT PANEL */}

<div className="flex flex-col justify-center items-center w-full md:w-1/2 p-12">

<h2 className="text-3xl font-bold text-white mb-2">
Create Account
</h2>

<p className="text-gray-300 mb-8">
Register to continue
</p>

<form onSubmit={handleRegister} className="w-full max-w-sm space-y-5">

<input
type="text"
placeholder="Full Name"
className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-cyan-400"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Email Address"
className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-cyan-400"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<div className="relative">

<input
type={showPassword?"text":"password"}
placeholder="Password"
className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-cyan-400"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button
type="button"
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-4 top-4 text-gray-300"
>
{showPassword?"Hide":"Show"}
</button>

</div>

{password && (

<p className={`text-sm ${
getPasswordStrength()==="Weak" ? "text-red-400" :
getPasswordStrength()==="Medium" ? "text-yellow-400" :
"text-green-400"
}`}>

Password Strength: {getPasswordStrength()}

</p>

)}

<select
value={role}
onChange={(e)=>setRole(e.target.value)}
className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30"
>

<option value="USER">Register as User</option>
<option value="ADMIN">Register as Admin</option>

</select>

{role==="ADMIN" && (

<select
value={departmentId}
onChange={(e)=>setDepartmentId(e.target.value)}
className="w-full p-4 rounded-xl bg-white/20 text-white border border-white/30"
>

<option value="">Select Department</option>

{departments.map(dep=>(
<option key={dep.id} value={dep.id}>
{dep.name}
</option>
))}

</select>

)}

<button
disabled={loading}
className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-xl font-semibold"
>
{loading?"Registering...":"Register"}
</button>

</form>

<p className="text-gray-300 mt-6">

Already have an account?

<span
className="text-cyan-400 cursor-pointer ml-2 hover:underline"
onClick={()=>navigate("/")}

>

Login

</span>

</p>

</div>

</motion.div>

</div>

);

}

export default Register;