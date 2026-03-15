import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

function ChatBot(){

const [open,setOpen] = useState(false);
const [messages,setMessages] = useState([
{sender:"bot",text:"Hello 👋 I am Complaint Assistant. Ask me anything."}
]);
const [input,setInput] = useState("");

const getBotResponse = (msg) => {

msg = msg.toLowerCase();

if(msg.includes("hi") || msg.includes("hello")){
return "Hello 👋 How can I help you?";
}

if(msg.includes("create complaint")){
return "To create complaint go to 👉 Create Complaint page in sidebar.";
}

if(msg.includes("track") || msg.includes("status")){
return "You can track complaints in 👉 My Complaints page.";
}

if(msg.includes("admin")){
return "Admin manages complaints and resolves them.";
}

if(msg.includes("help")){
return "You can ask me:\n• create complaint\n• track complaint\n• status";
}

return "Sorry 🤖 I didn't understand. Try asking about complaints.";
};

const sendMessage = () => {

if(!input.trim()) return;

const userMsg = {sender:"user",text:input};

const botMsg = {
sender:"bot",
text:getBotResponse(input)
};

setMessages([...messages,userMsg,botMsg]);

setInput("");

};

return(

<>
{/* CHAT ICON */}

<div className="fixed bottom-6 right-6">

<button
onClick={()=>setOpen(!open)}
className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
>

{open ? <X size={24}/> : <MessageCircle size={24}/>}

</button>

</div>

{/* CHAT WINDOW */}

{open && (

<div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-xl flex flex-col">

{/* HEADER */}

<div className="bg-blue-600 text-white p-3 rounded-t-xl">
Complaint Assistant
</div>

{/* MESSAGES */}

<div className="h-64 overflow-y-auto p-3 space-y-2">

{messages.map((m,index)=>(
<div
key={index}
className={`p-2 rounded text-sm ${
m.sender==="user"
? "bg-blue-100 text-right"
: "bg-gray-100"
}`}
>

{m.text}

</div>
))}

</div>

{/* INPUT */}

<div className="flex border-t">

<input
type="text"
placeholder="Ask something..."
className="flex-1 p-2 outline-none"
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={(e)=> e.key==="Enter" && sendMessage()}
/>

<button
onClick={sendMessage}
className="bg-blue-600 text-white px-4"
>
Send
</button>

</div>

</div>

)}

</>

);

}

export default ChatBot;