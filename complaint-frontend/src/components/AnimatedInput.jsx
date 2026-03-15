function AnimatedInput({label,type,value,onChange}){

return(

<div className="relative w-full">

<input
type={type}
value={value}
onChange={onChange}
required
placeholder=" "
className="peer w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none backdrop-blur"
/>

<label
className="
absolute left-3 -top-2.5 text-sm text-gray-300 px-1
transition-all
peer-placeholder-shown:top-3
peer-placeholder-shown:text-base
peer-placeholder-shown:text-gray-400
peer-focus:-top-2.5
peer-focus:text-sm
peer-focus:text-indigo-300
"
>

{label}

</label>

</div>

);

}

export default AnimatedInput;