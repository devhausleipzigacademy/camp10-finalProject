"use client"

import { useForm } from "react-hook-form";
import Input from "./shared/Input";

export default function TestForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <Input label="Title" isRequired={true} {...register("title")}/>
      <button type="submit">Submit</button>
    </form>
  );
}