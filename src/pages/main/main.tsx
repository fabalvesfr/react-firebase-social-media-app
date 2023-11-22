import { getDocs, collection } from "firebase/firestore"; // here each doc represents an entry in our firebase db
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "../main/post";

export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const postsRef = collection(db, "posts");

  const [postsList, setPostsList] = useState<Post[] | null>(null); // The notation means that our state is represented either by a null value or an array of Post

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[] // returns an array of Post type
    ); // This notation means, return a copy of the doc object extracting its data (using the data() function and add an "id" key whose value is the doc id)
  };

  // In order to update the UI with the posts from our db everytime the component renders, we use the useEffet() hook
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h2>Home page</h2>
      {postsList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};
