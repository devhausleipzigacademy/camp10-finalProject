"use client"

import React from 'react';
import Input from './shared/Input';
import Select from './shared/Select';
import Button from './shared/Button';
import TagsInput from './TagsInput';
// import { useState } from 'react';
import { useForm } from "react-hook-form";

type Form = {
  title: string;
  companyName: string;
  url: string;
  location: string;
  companyWebsite: string;
  deadline: Date;
  remoteType: string[];
  priority: string[];
  currentStage: string[];
  description: string;
  labels: string[];
};

function Form() {
  const { register, handleSubmit } = useForm<Form>({
    mode: "onChange",
  });
  const onSubmitHandler = (data:Form) => {
    console.log(data)
  }
  

  // const initalFormState = {
  //   title: "",
  //   companyName: "",
  //   url: "",
  //   location: "",
  //   companyWebsite: "",
  //   deadline: "",
  //   remoteType: "Hybrid",
  //   priority: "Low",
  //   currentStage: "Applied",
  //   description: "",
  //   labels: []
  // }
  // const [formState, setFormState] = useState(initalFormState)

  return (
    <>
      <form className="flex gap-l" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col w-1/2 gap-xs text-s">
          <Input
            label="Job Title"
            id="title"
            type="string"
            isRequired={true}
            // value={formState.title}
            // onChange={(e) => setFormState({...formState, title: e.target.value})}
            {...register("title")}
          ></Input>
          <Input
            label="Job URL"
            type="string"
            id="url"
            isRequired={true}
            // value={formState.url}
            // onChange={(e) => setFormState({...formState, url: e.target.value})}
            {...register("url")}
          ></Input>
          <Input
            label="Company"
            id='companyName'
            type="string"
            isRequired={true}
            // value={formState.companyName}
            // onChange={(e) => setFormState({...formState, companyName: e.target.value})}
            {...register("companyName")}
          ></Input>
          <Input
            label="Location"
            id="location"
            type="string"
            isRequired={false}
            // value={formState.location}
            // onChange={(e) => setFormState({...formState, location: e.target.value})}
            {...register("location")}
          ></Input>
          <Input
            label="Deadline"
            id="deadline"
            type="date"
            isRequired={false}
            // value={formState.deadline}
            // onChange={(e) => setFormState({...formState, deadline: e.target.value})}
            {...register("deadline")}
          ></Input>
          <label htmlFor="description">Description</label>
          <textarea
            className="bg-basicColors-dark bg-opacity-0 border p-xs rounded-[0.3125rem] border-borderColors-borderLight focus:outline focus:outline-2 focus:outline-basicColors-light"
            id="description"
            rows={8}
            // value={formState.description}
            // onChange={(e) => setFormState({...formState, description: e.target.value})}
            {...register("description")}
          ></textarea>
        </div>
        <div className="flex flex-col w-1/2 gap-xs text-s">
          <Input
            label="Company Website"
            id="companyWebsite"
            type="string"
            isRequired={false}
            // value={formState.companyWebsite}
            // onChange={(e) => setFormState({...formState, companyWebsite: e.target.value})}
            {...register("companyWebsite")}
          ></Input>
          <Select
            label="Type"
            id="remoteType"
            isRequired={false}
            options={['Onsite', 'Remote', 'Hybrid']}
            // value={formState.remoteType}
            // onChange={(e) => setFormState({...formState, remoteType: e.target.value})}
            {...register("remoteType")}
          ></Select>
          <Select
            label="Current Stage"
            id="currentStage"
            isRequired={false}
            options={['Scouted', 'Applied', 'Interview', 'Offer', 'Rejected']}
            // value={formState.currentStage}
            // onChange={(e) => setFormState({...formState, currentStage: e.target.value})}
            {...register("currentStage")}
          ></Select>
          <Select
            label="Priority"
            id="priority"
            isRequired={false}
            options={['Low', 'Medium', 'High']}
            // value={formState.priority}
            // onChange={(e) => setFormState({...formState, priority: e.target.value})}
            {...register("priority")}
          ></Select>
          <TagsInput />
          <Button className="m-auto" variant="hover" type='submit'>
            Create
          </Button>
        </div>
      </form>
    </>
  );
}

export default Form;
