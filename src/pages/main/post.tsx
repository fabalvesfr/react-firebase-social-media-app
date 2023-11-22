import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { Post as IPost } from "./main"; // Had to rename it becase both the imported interface and the component were named Post. IPost stands for Interface Post
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props; // Destructuring our props passed via main.tsx into an object

  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes"); //this variable holds a reference to the "posts" table in our firebase database

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    ); // "like" state will be a list of objects, each having a single key called "userId"
  };
  const addLike = async (data: any) => {
    try {
      const newDoc = await addDoc(likesRef, {
        // Adding a like document (entry) in the likes collection (database)
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes(
          (prev) =>
            prev
              ? [...prev, { userId: user.uid, likeId: newDoc.id }]
              : [{ userId: user?.uid, likeId: newDoc.id }] // If the likes array is null (empty), add a single object with the userId, or else add it to the end of the existing array
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeLike = async (data: any) => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);

      const likeId = likeToDeleteData.docs[0].id; // Id of the like to be deleted
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId == user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={hasUserLiked ? removeLike : addLike}>
          {" "}
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
          {/* If the current user has already liked the post, the like button button will no longer be available and a thumbs down button will appear instead */}
        </button>
        {/* HTML entity (like an unicode) for the Like icon */}
        {likes && <p>Likes: {likes.length}</p>}
      </div>
    </div>
  );
};
