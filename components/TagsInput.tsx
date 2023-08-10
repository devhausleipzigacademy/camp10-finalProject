'use client';

import { useState } from 'react';

function TagsInput() {
  const [tags, setTags] = useState(['Part-time', 'Freelance']);
  return (
    <>
      <label htmlFor="tags">Tags</label>
      <div className="bg-basicColors-dark bg-opacity-0 border focus:outline focus:outline-2 focus:outline-basicColors-light rounded-[0.3125rem] border-borderColors-borderLight">
        {tags.map((tag, index) => (
          <div
            className="inline-block bg-opacity-0 bg-basicColors-dark text-basicColors-light px-s py-s"
            key={index}
          >
            <div className="flex bg-opacity-0 border rounded-full py-xxs px-m">
              <span>{tag}</span>
              <span className="text-xs ml-xs">&times;</span>
            </div>
          </div>
        ))}
        <input
          type="text"
          id="tags"
          name="tags"
          className="flex-grow bg-opacity-0 border-none p-s focus:outline-none bg-basicColors-dark"
          placeholder="Add your tag"
        />
      </div>
    </>
  );
}

export default TagsInput;
