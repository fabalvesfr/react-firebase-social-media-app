import { CreateForm } from "./create-form";

export const CreatePost = () => {
  return (
    <div className="form-container">
      <h3 className="title-create-post">
        <i className="fa-brands fa-rocketchat" style={{ marginRight: 6 }}></i>
        What do you want to share with your friends today?
      </h3>
      <CreateForm />
    </div>
  );
};
