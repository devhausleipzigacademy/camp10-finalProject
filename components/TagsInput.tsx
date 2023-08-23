'use client';

import { Tag } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Fuse from 'fuse.js';
import { cornersOfRectangle } from '@dnd-kit/core/dist/utilities/algorithms/helpers';
import { object } from 'zod';

type TagProps = {
    tagData: Tag[];
};

function TagsInput({ tagData }: TagProps) {
    // using useState Hook for now. Should probably be written into API endpoints later.
    const [existingTags, setExistingTags] = useState<string[]>([]);
    const [newTags, setNewTags] = useState<string[]>([]);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        axios.get(`/api/tag`).then(({ data: userTags }) => {
            setExistingTags(userTags);
            console.log('Existing user tags', userTags);
        });
    }, []);

    const fuse = new Fuse(existingTags); // Fuzzy search lib
    const fuzzyResults = fuse.search(query);
    const fuzzyResItems: string[] = fuzzyResults.map(el => el.item);
    const filteredResults: string[] = fuzzyResItems.filter(
        el => newTags.indexOf(el) < 0
    );

    console.log(fuzzyResults, newTags);

    function createTagHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        const newTag = e.currentTarget.value.trim();
        if (!newTag) return;
        !newTags.includes(newTag) && setNewTags([...newTags, newTag]);
        setQuery('');
    }

    function clickHandler(e: React.MouseEvent<HTMLLIElement>) {
        e.preventDefault();
        const newTag = e.currentTarget.innerText;
        if (!newTag) return;
        !newTags.includes(newTag) && setNewTags([...newTags, newTag]);
        setQuery('');
        inputRef.current?.focus();
    }

    function removeTag(index: number) {
        setNewTags(newTags.filter((_, idx) => idx !== index));
    }

    return (
        <div className="flex flex-col gap-xs ">
            <label htmlFor="tags" className="text-s font-600">
                Tags
            </label>
            <div className="flex w-full flex-wrap gap-x-xs px-xxs bg-basicColors-dark bg-opacity-0 border focus-within:outline focus-within:outline-2 focus-within:outline-basicColors-light rounded-[0.3125rem] border-borderColors-borderLight">
                {newTags.map((tag, index) => (
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
                    onKeyDown={createTagHandler}
                    onChange={e => {
                        setQuery(e.target.value);
                    }}
                    ref={inputRef}
                    value={query}
                    type="text"
                    placeholder="Add/search tags"
                    id="tags"
                    name="tags"
                    autoComplete="off"
                    className="flex-grow text-xs bg-opacity-0 border-none p-xs focus:outline-none bg-basicColors-dark"
                />
            </div>
            <ul className="flex flex-col w-full border rounded-[0.3125rem] empty:hidden bg-basicColors-dark border-borderColors-borderLight">
                {filteredResults.slice(0, 8).map((tag, idx) => {
                    return (
                        <li
                            className="cursor-pointer px-xs py-xxs hover:font-600"
                            key={idx}
                            onClick={clickHandler}
                        >
                            {tag}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TagsInput;
