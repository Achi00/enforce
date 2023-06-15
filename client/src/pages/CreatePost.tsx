import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useNavigate } from "@pankod/refine-react-router-v6";
import Form from "components/common/Form";

const CreatePost = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  if (!user) {
    navigate("/");
  }
  const [postImage, setPostImage] = useState({ name: "", url: "" });
  const [postImage2, setPostImage2] = useState({ name: "", url: "" });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPostImage({ name: file?.name, url: result })
    );
  };
  const handleImageChange2 = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPostImage2({ name: file?.name, url: result })
    );
  };
  const onFinishHandler = async (data: FieldValues) => {
    if (!postImage.name || !postImage2.name)
      return alert("Please Select Image");
    // get product flavors and split after comma
    const flavor = data.flavors
      .split(",")
      .map((flavor: string) => flavor.trim());

    await onFinish({
      flavor,
      ...data,
      photo: postImage.url,
      photo2: postImage2.url,
      email: user.email,
    });
  };

  return (
    <Form
      type="Create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      postImage={postImage}
      postImage2={postImage2}
      handleImageChange={handleImageChange}
      handleImageChange2={handleImageChange2}
      onFinishHandler={onFinishHandler}
    />
  );
};

export default CreatePost;
