import React from "react";

import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import Form from "components/common/Form";

const EditPost = () => {
  const { data: user } = useGetIdentity();
  const [postImage, setPostImage] = useState({ name: "", url: "" });
  const [postImage2, setPostImage2] = useState({ name: "", url: "" });
  const [postImage3, setPostImage3] = useState({ name: "", url: "" });
  const [postImage4, setPostImage4] = useState({ name: "", url: "" });
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
  const handleImageChange3 = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPostImage3({ name: file?.name, url: result })
    );
  };
  const handleImageChange4 = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPostImage4({ name: file?.name, url: result })
    );
  };

  const onFinishHandler = async (data: FieldValues) => {
    if (!postImage.name) return alert("Please upload a post image");
    if (!postImage2.name) return alert("Please upload a post image");

    await onFinish({
      ...data,
      photo: postImage.url,
      photo2: postImage2.url,
      email: user.email,
    });
  };
  return (
    <Form
      type="Edit"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      handleImageChange2={handleImageChange2}
      onFinishHandler={onFinishHandler}
      postImage={postImage}
      postImage2={postImage2}
    />
  );
};

export default EditPost;
