import { type } from 'os';
import React from 'react';
import Input from './shared/Input';
import Select from './shared/Select';
import Button from './shared/Button';
import TagsInput from './TagsInput';

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
  return (
    <>
      <form className="flex gap-l">
        <div className="flex flex-col w-1/2 gap-xs text-s">
          <Input
            label="Job Title"
            id="jobTitle"
            type="string"
            isRequired={true}
          ></Input>
          <Input
            label="Job URL"
            id="jobURL"
            type="string"
            isRequired={true}
          ></Input>
          <Input
            label="Company"
            name="company"
            type="string"
            isRequired={true}
          ></Input>
          <Input
            label="Location"
            name="location"
            type="string"
            isRequired={false}
          ></Input>
          <Input
            label="Deadline"
            name="deadline"
            type="Date"
            isRequired={false}
          ></Input>
          <label htmlFor="description">Description</label>
          <textarea
            className="bg-basicColors-dark bg-opacity-0 border p-xs rounded-[0.3125rem] border-borderColors-borderLight focus:outline focus:outline-2 focus:outline-basicColors-light "
            name="Description"
            id="description"
            rows={8}
          ></textarea>
        </div>
        <div className="flex flex-col w-1/2 gap-xs text-s">
          <Input
            label="Company Website"
            name="companyWebsite"
            type="string"
            isRequired={false}
          ></Input>
          <Select
            label="Type"
            name="remoteType"
            isRequired={false}
            options={['on site', 'remote', 'hybrid']}
          ></Select>
          <Select
            label="Current Stage"
            name="currentStage"
            isRequired={false}
            options={['Scouted', 'Applied', 'Interview', 'Offer', 'Rejected']}
          ></Select>
          <Select
            label="Priority"
            name="priority"
            isRequired={false}
            options={['low', 'medium', 'high']}
          ></Select>
          <TagsInput />
          <Button className="m-auto" variant="hover">
            Add
          </Button>
        </div>
      </form>
    </>
  );
}

export default Form;
