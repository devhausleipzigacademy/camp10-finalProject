import { type } from 'os';
import React from 'react';
import Input from './shared/Input';

type Form = {
  title: string;
  companyName: string;
  url: string;
  location: string;
  companyWebsite: string;
  deadline: Date;
  remoteType: 'remote' | 'on site' | 'hybrid';
  priority: 'low' | 'medium' | 'high';
  currentStage: 'scouting' | 'applied' | 'interview' | 'offer' | 'rejected';
  description: string;
  labels: string[];
};

function Form() {
  return (
    <form>
      <div className="flex flex-col gap-xs text-s">
        <Input
          label="Job Title"
          name="jobTitle"
          type="string"
          isRequired={true}
        ></Input>
        <Input
          label="Job URL"
          name="jobURL"
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
        <Input
          label="Company Website"
          name="companyWebsite"
          type="string"
          isRequired={false}
        ></Input>
      </div>
    </form>
  );
}

export default Form;
