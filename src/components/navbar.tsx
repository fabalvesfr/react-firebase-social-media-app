import { Link } from "react-router-dom";
import { auth } from "../config/firebase"; // The auth variable holds all the user information after he logs in
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  {
    /* This useAuthState hook automatically updates the current user every time we log in, even if we have used a different account he'll display the last logged in user */
  }

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <Link to="/">Home</Link>
      {!user ? (
        <Link to="/login">Login</Link>
      ) : (
        <Link to="/createpost">Create Post</Link>
      )}
      {user && (
        <div>
          <p>{user?.displayName}</p>
          <img src={user?.photoURL || ""} width="20" height="20" />
          {/* The src attribute assumes an empty string in case the user does not have a photo in his profile and the photoURL is null */}
          <button onClick={signUserOut}>Log out</button>
        </div>
      )}
    </div>
  );
};
