import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import {
LayoutDashboard,
ClipboardList,
PlusCircle,
User,
Settings,
BarChart3,
ChevronLeft,
ChevronRight
} from "lucide-react";

function Sidebar(){

const role = localStorage.getItem("role");
const location = useLocation();

/* ⭐ COLLAPSE STATE */

const [collapsed,setCollapsed] = useState(false);

/* ⭐ ACTIVE LINK STYLE */

const linkStyle = (path) => {

return `flex items-center ${collapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-lg transition-all duration-200 group ${
location.pathname === path
? "bg-indigo-600 text-white shadow"
: "text-gray-300 hover:bg-gray-800 hover:text-white"
}`;

};

return(

<div className={`${collapsed ? "w-20" : "w-64"} min-h-screen bg-gray-900 text-white flex flex-col transition-all duration-300`}>

{/* ================= LOGO ================= */}

<div className="p-6 border-b border-gray-800 flex justify-between items-center">

{!collapsed && (

<h2 className="text-2xl font-bold tracking-wide">
CMS
</h2>

)}

<button
onClick={()=>setCollapsed(!collapsed)}
className="text-gray-300 hover:text-white transition"
>

{collapsed ? <ChevronRight size={20}/> : <ChevronLeft size={20}/>}

</button>

</div>


{/* ================= NAVIGATION ================= */}

<nav className="flex-1 p-4 space-y-2">

{/* ================= USER MENU ================= */}

{role === "USER" && (

<>

<Link to="/user-dashboard" className={linkStyle("/user-dashboard")}>

<LayoutDashboard size={18}/>

{!collapsed && "Dashboard"}

{collapsed && (
<span className="absolute left-20 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
Dashboard
</span>
)}

</Link>

<Link to="/my-complaints" className={linkStyle("/my-complaints")}>

<ClipboardList size={18}/>

{!collapsed && "My Complaints"}

</Link>

<Link to="/create" className={linkStyle("/create")}>

<PlusCircle size={18}/>

{!collapsed && "Create Complaint"}

</Link>

<Link to="/profile" className={linkStyle("/profile")}>

<User size={18}/>

{!collapsed && "Profile"}

</Link>

</>

)}

{/* ================= ADMIN MENU ================= */}

{role === "ADMIN" && (

<>

<Link to="/admin-dashboard" className={linkStyle("/admin-dashboard")}>

<LayoutDashboard size={18}/>

{!collapsed && "Dashboard"}

</Link>

<Link to="/admin-complaints" className={linkStyle("/admin-complaints")}>

<Settings size={18}/>

{!collapsed && "Manage Complaints"}

</Link>

<Link to="/admin/analytics" className={linkStyle("/admin/analytics")}>

<BarChart3 size={18}/>

{!collapsed && "Analytics"}

</Link>

<Link to="/profile" className={linkStyle("/profile")}>

<User size={18}/>

{!collapsed && "Profile"}

</Link>

</>

)}

</nav>

</div>

);

}

export default Sidebar;