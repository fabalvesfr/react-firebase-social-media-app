import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // This hook allows us to redirect to the home page after login

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <div>
      <h1>Login page</h1>
      <p>Sign in with Google to continue</p>
      <button className="button login-button" onClick={signInWithGoogle}>
        <img className="google-logo" src="/google-logo.png" alt="Google logo" />
        Sign in with Google
      </button>
    </div>
  );
};
