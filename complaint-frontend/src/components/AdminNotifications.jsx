import { useEffect } from "react";

/* Fix SockJS global issue */
window.global = window;

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function AdminNotifications({ onNewComplaint }) {

useEffect(() => {

const socket = new SockJS("http://localhost:8081/ws");

const stompClient = new Client({
webSocketFactory: () => socket,
reconnectDelay: 5000
});

stompClient.onConnect = () => {

console.log("✅ WebSocket Connected");

stompClient.subscribe("/topic/complaints",(message)=>{

const complaint = JSON.parse(message.body);

console.log("📢 New Complaint:", complaint);

/* Send to dashboard */
if(onNewComplaint){
onNewComplaint(complaint);
}

});

};

stompClient.activate();

return () => stompClient.deactivate();

},[]);

return null;
}

export default AdminNotifications;