'use client';

import React, { useState } from 'react';

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
          onKeyDown={keyHandler}
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
