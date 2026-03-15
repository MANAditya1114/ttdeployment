import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

function AnimatedBackground(){

const particlesInit = useCallback(async engine=>{
await loadFull(engine);
},[]);

return(

<div className="absolute inset-0 -z-10">

<div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 animate-gradient"></div>

<Particles
init={particlesInit}
options={{
background:{color:"transparent"},
particles:{
number:{value:40},
size:{value:3},
move:{enable:true,speed:1},
opacity:{value:0.4},
color:{value:"#ffffff"}
}
}}
/>

</div>

);

}

export default AnimatedBackground;