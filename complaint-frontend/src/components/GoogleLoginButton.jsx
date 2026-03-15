import { FcGoogle } from "react-icons/fc";

function GoogleLoginButton(){

const handleGoogleLogin = ()=>{

window.location.href="http://localhost:8081/oauth2/authorization/google";

};

return(

<button
onClick={handleGoogleLogin}
className="flex items-center justify-center gap-3 w-full bg-white text-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-100 transition"
>

<FcGoogle size={22}/>
Continue with Google

</button>

);

}

export default GoogleLoginButton;