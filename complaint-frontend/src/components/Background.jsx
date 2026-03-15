import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

function Background(){

const particlesInit = useCallback(async (engine)=>{
  await loadFull(engine);
},[]);

return(

<div className="fixed inset-0 -z-10">

{/* Gradient background */}

<div className="absolute inset-0 bg-gradient-to-br
from-indigo-900
via-purple-900
to-slate-900"></div>

{/* Glow lights */}

<div className="absolute w-[600px] h-[600px] bg-cyan-500/30 blur-[120px] rounded-full -top-40 -left-40"></div>

<div className="absolute w-[600px] h-[600px] bg-purple-600/30 blur-[120px] rounded-full bottom-[-200px] right-[-200px]"></div>

{/* Particles */}

<Particles
init={particlesInit}
options={{
background:{color:"transparent"},
fpsLimit:60,
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

export default Background;