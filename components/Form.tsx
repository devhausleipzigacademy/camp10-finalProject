"use client"

import React from 'react';
import Input from './shared/Input';
import Select from './shared/Select';
import Button from './shared/Button';
import TagsInput from './TagsInput';
import { useState } from 'react';

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
  const initalFormState = {
    title: "",
    companyName: "",
    url: "",
    location: "",
    companyWebsite: "",
    deadline: "",
    remoteType: "Hybrid",
    priority: "low",
    currentStage: "Applied",
    description: "",
    labels: []
  }
  const [formState, setFormState] = useState(initalFormState)

  return (
    <>
      <form className="flex gap-l" onSubmit={(e) => {
        e.preventDefault()
        console.log(formState)
        }}>
        <div className="flex flex-col w-1/2 gap-xs text-s">
          <Input
            label="Job Title"
            name="jobTitle"
            type="string"
            isRequired={true}
            value={formState.title}
            onChange={(e) => setFormState({...formState, title: e.target.value})}
          ></Input>
          <Input
            label="Job URL"
            name="jobURL"
            type="string"
            value={formState.url}
            isRequired={true}
            onChange={(e) => setFormState({...formState, url: e.target.value})}
          ></Input>
          <Input
            label="Company"
            name="company"
            type="string"
            isRequired={true}
            value={formState.companyName}
            onChange={(e) => setFormState({...formState, companyName: e.target.value})}
          ></Input>
          <Input
            label="Location"
            name="location"
            type="string"
            isRequired={false}
            value={formState.location}
            onChange={(e) => setFormState({...formState, location: e.target.value})}
          ></Input>
          <Input
            label="Deadline"
            name="deadline"
            type="date"
            value={formState.deadline}
            isRequired={false}
            onChange={(e) => setFormState({...formState, deadline: e.target.value})}
          ></Input>
          <label htmlFor="description">Description</label>
          <textarea
            className="bg-basicColors-dark bg-opacity-0 border p-xs rounded-[0.3125rem] border-borderColors-borderLight focus:outline focus:outline-2 focus:outline-basicColors-light "
            name="Description"
            id="description"
            rows={8}
            value={formState.description}
            onChange={(e) => setFormState({...formState, description: e.target.value})}
          ></textarea>
        </div>
        <div className="flex flex-col w-1/2 gap-xs text-s">
          <Input
            label="Company Website"
            name="companyWebsite"
            type="string"
            isRequired={false}
            value={formState.companyWebsite}
            onChange={(e) => setFormState({...formState, companyWebsite: e.target.value})}
          ></Input>
          <Select
            label="Type"
            name="remoteType"
            isRequired={false}
            options={['Onsite', 'Remote', 'Hybrid']}
            value={formState.remoteType}
            onChange={(e) => setFormState({...formState, remoteType: e.target.value})}
          ></Select>
          <Select
            label="Current Stage"
            name="currentStage"
            isRequired={false}
            options={['Scouted', 'Applied', 'Interview', 'Offer', 'Rejected']}
            value={formState.currentStage}
            onChange={(e) => setFormState({...formState, currentStage: e.target.value})}
          ></Select>
          <Select
            label="Priority"
            name="priority"
            isRequired={false}
            options={['low', 'medium', 'high']}
            value={formState.priority}
            onChange={(e) => setFormState({...formState, priority: e.target.value})}
          ></Select>
          <TagsInput />
          <Button className="m-auto" variant="hover">
            Create
          </Button>
        </div>
      </form>
    </>
  );
}

export default Form;
