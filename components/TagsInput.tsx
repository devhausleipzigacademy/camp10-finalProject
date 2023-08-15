'use client';

import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx'

// using useState Hook for now. Should probably be written into API endpoints later.

function TagsInput() {
  const [tags, setTags] = useState<string[]>([]);

  function keyHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    const newTag = e.currentTarget.value.trim();
    if (!newTag) return;
    setTags([...tags, newTag]);
    e.currentTarget.value = '';
  }

  return (
    <div className='flex flex-col gap-xs'>
      <label htmlFor="tags" className='text-s font-600'>Tags</label>
      <div className="flex items-center w-full flex-wrap gap-x-xs px-xxs bg-basicColors-dark bg-opacity-0 border focus:outline focus:outline-2 focus:outline-basicColors-light rounded-[0.3125rem] border-borderColors-borderLight">
        {tags.map((tag, index) => (
            <div className="flex bg-opacity-0 border rounded-full h-m px-xs py-xxs my-xs text-xs items-center gap-xxs">
              <span>{tag}</span>
              <RxCross2 className="text-xxs"/>
            </div>
        ))}
        <input
          onKeyDown={keyHandler}
          type="text"
          id="tags"
          name="tags"
          className="flex-grow bg-opacity-0 text-xs p-xs border-none focus:outline-none bg-basicColors-dark"
          placeholder="Add your tag"
        />
      </div>
    </div>
  );
}

export default TagsInput;
