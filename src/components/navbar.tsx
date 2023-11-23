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
    <div className="navbar">
      <Link className="link home-link" to="/">
        <i className="fa-solid fa-house"></i>Home
      </Link>
      {!user ? (
        <Link className="link login-link" to="/login">
          <i className="fa-solid fa-user"></i>
          Login
        </Link>
      ) : (
        <Link className="link create-post-link" to="/createpost">
          <i className="fa-solid fa-pen"></i>Create Post
        </Link>
      )}
      {user && (
        <div className="user-info">
          <p style={{ fontSize: "0.8em" }}>{user?.displayName}</p>
          <img className="user-photo" src={user?.photoURL || ""} />
          {/* The src attribute assumes an empty string in case the user does not have a photo in his profile and the photoURL is null */}
          <button className="logout-button" onClick={signUserOut}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      )}
    </div>
  );
};
