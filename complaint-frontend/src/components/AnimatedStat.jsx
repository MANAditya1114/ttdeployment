import CountUp from "react-countup";

function AnimatedStat({title,value}){

return(

<div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl shadow-lg hover:scale-105 transition">

<p className="text-gray-300">{title}</p>

<h2 className="text-4xl font-bold text-white mt-2">
<CountUp end={value} duration={1.5}/>
</h2>

</div>

);

}

export default AnimatedStat;