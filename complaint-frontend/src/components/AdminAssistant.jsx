import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";

function AdminAssistant({ complaints = [], setFilteredComplaints }) {

const [open,setOpen] = useState(false);
const [input,setInput] = useState("");

const [messages,setMessages] = useState([
{
sender:"bot",
text:"Hello Admin 👋 I can help manage complaints.\nTry: 'show pending complaints'",
time:new Date().toLocaleTimeString()
}
]);

const chatRef = useRef(null);

/* ================= AUTO SCROLL ================= */

useEffect(()=>{
if(chatRef.current){
chatRef.current.scrollTop = chatRef.current.scrollHeight;
}
},[messages]);

/* ================= PROCESS COMMAND ================= */

const processCommand = (command) => {

const msg = command.toLowerCase();

/* PENDING */

if(msg.includes("pending")){

const filtered = complaints.filter(c => c.status === "PENDING");

setFilteredComplaints(filtered);

return `Showing ${filtered.length} pending complaints`;

}

/* RESOLVED */

if(msg.includes("resolved")){

const filtered = complaints.filter(c => c.status === "RESOLVED");

setFilteredComplaints(filtered);

return `Showing ${filtered.length} resolved complaints`;

}

/* HIGH PRIORITY */

if(msg.includes("high")){

const filtered = complaints.filter(c => c.priority === "HIGH");

setFilteredComplaints(filtered);

return `Showing ${filtered.length} high priority complaints`;

}

/* ELECTRICAL */

if(msg.includes("electrical")){

const filtered = complaints.filter(c => c.assignedTo === "Electrical");

setFilteredComplaints(filtered);

return `Showing ${filtered.length} electrical complaints`;

}

/* ALL */

if(msg.includes("all")){

setFilteredComplaints(complaints);

return "Showing all complaints";

}

/* SUMMARY */

if(msg.includes("summary")){

return `Total complaints: ${complaints.length}`;

}

/* HELP */

if(msg.includes("help")){

return `Commands:
• show pending complaints
• show resolved complaints
• show high priority complaints
• show electrical complaints
• show all complaints
• summary`;

}

return "Sorry, I didn't understand that command. Type 'help' to see available commands.";

};

/* ================= SEND MESSAGE ================= */

const sendMessage = () => {

if(!input.trim()) return;

const userMessage = {
sender:"user",
text:input,
time:new Date().toLocaleTimeString()
};

const botResponseText = processCommand(input);

const botMessage = {
sender:"bot",
text:botResponseText,
time:new Date().toLocaleTimeString()
};

setMessages(prev => [...prev,userMessage,botMessage]);

setInput("");

};

/* ================= UI ================= */

return(

<>

{/* Floating Button */}

<div className="fixed bottom-6 right-6 z-50">

<button
onClick={()=>setOpen(!open)}
className="bg-indigo-600 text-white p-4 rounded-full shadow-xl hover:bg-indigo-700 transition"
>

{open ? <X size={24}/> : <MessageSquare size={24}/>}

</button>

</div>

{/* Assistant Window */}

{open && (

<div className="fixed bottom-20 right-6 w-80 bg-white dark:bg-gray-900 shadow-2xl rounded-xl flex flex-col z-50 border dark:border-gray-700">

{/* Header */}

<div className="bg-indigo-600 text-white p-3 rounded-t-xl font-semibold flex justify-between items-center">

<span>Admin Assistant</span>

<button onClick={()=>setOpen(false)}>
<X size={18}/>
</button>

</div>

{/* Messages */}

<div
ref={chatRef}
className="h-72 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-900"
>

{messages.map((m,index)=>(

<div key={index}>

<div
className={`p-2 rounded-lg text-sm max-w-[85%] ${
m.sender==="user"
? "bg-indigo-500 text-white ml-auto"
: "bg-gray-200 dark:bg-gray-800 dark:text-white"
}`}
>

{m.text}

</div>

<p className={`text-xs mt-1 ${
m.sender==="user"
? "text-right text-gray-400"
: "text-gray-400"
}`}>

{m.time}

</p>

</div>

))}

</div>

{/* Input */}

<div className="flex border-t dark:border-gray-700">

<input
type="text"
placeholder="Type command..."
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={(e)=> e.key === "Enter" && sendMessage()}
className="flex-1 p-3 outline-none text-sm bg-white dark:bg-gray-900 dark:text-white"
/>

<button
onClick={sendMessage}
className="bg-indigo-600 text-white px-4 hover:bg-indigo-700 transition"
>

<Send size={18}/>

</button>

</div>

</div>

)}

</>

);

}

export default AdminAssistant;