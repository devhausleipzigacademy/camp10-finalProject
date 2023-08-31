'use client';
import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { useAddedTagsStore } from '@/store/tags';

const tags = [
    'Javascript',
    'React',
    'Node',
    'Typescript',
    'Next',
    'Express',
    'MongoDB',
    'GraphQL',
    'PostgreSQL',
    'Python',
];

function FormTags() {
    const [selectedTag, setSelectedTag] = useState('');
    const [query, setQuery] = useState('');
    // const [addedTags, setAddedTags] = useState([] as string[]);
    const { addedTags, setAddedTags } = useAddedTagsStore()

    const filteredPeople =
        query.trim() === ''
            ? tags
            : tags.filter(tag => {
                  return tag.toLowerCase().includes(query.toLowerCase());
              });

    function createTagHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newTag = e.currentTarget.value.trim();
            if (!newTag) return;
            !addedTags.map(tag => tag.name).includes(newTag) && setAddedTags([...addedTags, { name: newTag, id: "" }]);
            setQuery('');
        }
    }

    return (
        <Combobox
            as={'div'}
            className="flex flex-col gap-xs"
            value={selectedTag}
            onChange={setSelectedTag}
        >
            <Combobox.Label className="text-s font-600">Tags Headless UI</Combobox.Label>
            <div className="bg-transparent border text-xs p-xs focus:outline focus:outline-2 focus:outline-basicColors-light rounded-[0.3125rem] border-borderColors-borderLight">
                <div className="flex w-full flex-wrap gap-xs gap-y-xs">
                    {addedTags.map(tag => (
                        <div className="rounded-full h-[1.5rem] bg-cardColors-blue py-xxxs px-xs text-textColors-textBody">
                            {`${tag} x`}
                        </div>
                    ))}
                    <Combobox.Input
                        onKeyDown={createTagHandler}
                        onChange={event => setQuery(event.target.value)}
                        className="bg-transparent focus:outline-none"
                    />
                </div>
            </div>
            <Combobox.Options className="ui-background">
                {filteredPeople.map(tag => (
                    <Combobox.Option
                        key={tag}
                        value={tag}
                        className={({ active }) =>
                            `${active ? 'bg-hoverColors-hover' : ''}`
                        }
                        onClick={() => setQuery(tag)}
                    >
                        {tag}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    );
}

export default FormTags;
