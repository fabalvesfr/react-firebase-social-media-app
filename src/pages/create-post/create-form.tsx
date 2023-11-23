import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore"; // A doc (or document) is basically a table entry and a collection is function where we specify which firebase collection (table) we want to add our document (entry) to
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title to your post."), //  Error message that appears in case user tries to submit form without filling in the title field
    description: yup
      .string()
      .required("You must add a description to your post."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts"); //this variable holds a reference to the "posts" table in our firebase database

  const onCreatePost = async (data: any) => {
    await addDoc(postsRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid, // uid is the id given by Google when a user logs in via it authentication method
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)} className="create-post-form">
      <label className="form-label">
        Title
        <input className="form-input post-title" {...register("title")} />
        <p style={{ color: "red" }}>{errors.title?.message}</p>
      </label>

      <label className="form-label">
        Description
        <textarea
          className="form-input"
          cols={30}
          rows={10}
          {...register("description")}
        />
        <p style={{ color: "red" }}>{errors.description?.message}</p>
      </label>

      <input className="button" type="submit" value="Post" />
    </form>
  );
};
