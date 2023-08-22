'use client';

import { useAuth } from '@clerk/nextjs';
import { Tag } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

type TagProps = {
    tagData: Tag[];
};

function TagsInput({ tagData }: TagProps) {
    // using useState Hook for now. Should probably be written into API endpoints later.
    const [tags, setTags] = useState<string[]>([]);
    //
    console.log(tags);
    useEffect(() => {
        axios.get(`/api/tag`).then(({ data }) => {
            setTags(data);
        });
    }, []);

    function keyHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const newTag = e.currentTarget.value.trim();
        if (!newTag) return;
        !tags.includes(newTag) && setTags([...tags, newTag]);

        e.currentTarget.value = '';
    }

    function blurHandler(e: React.FocusEvent<HTMLInputElement>) {
        e.preventDefault();
        const newTag = e.currentTarget.value.trim();
        if (!newTag) return;
        !tags.includes(newTag) && setTags([...tags, newTag]);
        e.currentTarget.value = '';
    }

    function removeTag(index: number) {
        setTags(tags.filter((_, idx) => idx !== index));
    }

    return (
        <div className="flex flex-col gap-xs">
            <label htmlFor="tags" className="text-s font-600">
                Tags
            </label>
            <div className="flex items-center w-full flex-wrap gap-x-xs px-xxs bg-basicColors-dark bg-opacity-0 border focus:outline focus:outline-2 focus:outline-basicColors-light rounded-[0.3125rem] border-borderColors-borderLight">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="flex items-center text-xs bg-opacity-0 border rounded-full h-m px-xs py-xxs my-xs gap-xxs"
                    >
                        <span>{tag}</span>
                        <RxCross2
                            onClick={() => removeTag(index)}
                            className="rounded-full text-xxs bg-opacity-60 bg-cardColors-red"
                        />
                    </div>
                ))}
                <input
                    onKeyDown={keyHandler}
                    onBlur={blurHandler}
                    type="text"
                    id="tags"
                    name="tags"
                    className="flex-grow text-xs bg-opacity-0 border-none p-xs focus:outline-none bg-basicColors-dark"
                    placeholder="Add your tag"
                />
            </div>
        </div>
    );
}

export default TagsInput;
