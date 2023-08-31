'use client';
import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { TagType, useAddedTagsStore } from '@/store/tags';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

type TagProps = {
    tagsData: TagType[];
};

function FormTags({ tagsData }: TagProps) {
    const [selectedTag, setSelectedTag] = useState('');
    const [query, setQuery] = useState('');
    // const [addedTags, setAddedTags] = useState([] as string[]);
    const { addedTags, setAddedTags } = useAddedTagsStore();
    const queryClient = useQueryClient();
    const { data: existingTags } = useQuery<TagType[]>({
        queryKey: ['tags'],
        queryFn: () => axios.get('/api/tag').then(res => res.data),
        initialData: tagsData,
    });
    console.log(existingTags);
    const addTag = useMutation({
        mutationFn: (data: string) =>
            axios.post('/api/tag', { name: data }).then(res => res.data),
        onError: error => {
            console.log(error);
        },
        onSuccess: data => {
            !addedTags.map(tag => tag.name).includes(data.name) &&
                setAddedTags([...addedTags, { name: data.name, id: data.id }]);
            queryClient.invalidateQueries(['tags']);
            toast.success('Tag created');
        },
    });

    const filteredTags =
        (query.trim() === ''
            ? existingTags.map(tag => tag.name)
            : existingTags
                  .map(tag => tag.name)
                  .filter(tag => {
                      return tag.toLowerCase().includes(query.toLowerCase());
                  })).filter(tag => !addedTags.map(tag => tag.name).includes(tag));

    function createTagHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newTag = e.currentTarget.value.trim();
            if (!newTag) return;
            // check if the tag already exists
            if (!existingTags.map(tag => tag.name).includes(newTag)) {
                addTag.mutate(newTag);
            } else if (!addedTags.map(tag => tag.name).includes(newTag)) {
                setAddedTags([
                    ...addedTags,
                    {
                        name: newTag,
                        id:
                            existingTags.find(tag => tag.name === newTag)?.id ||
                            '',
                    },
                ]);
            }
            setQuery('');
            setSelectedTag('');
        }
    }

    return (
        <Combobox
            as={'div'}
            className="flex flex-col gap-xs"
            value={selectedTag}
            onChange={setSelectedTag}
        >
            <Combobox.Label className="text-s font-600">
                Tags Headless UI
            </Combobox.Label>
            <div className="bg-transparent border text-xs p-xs focus:outline focus:outline-2 focus:outline-basicColors-light rounded-[0.3125rem] border-borderColors-borderLight">
                <div className="flex w-full flex-wrap gap-xs gap-y-xs">
                    {addedTags.map(tag => (
                        <div
                            key={tag.id}
                            className="rounded-full h-[1.5rem] bg-cardColors-blue py-xxxs px-xs text-textColors-textBody"
                        >
                            {`${tag.name} x`}
                        </div>
                    ))}
                    <Combobox.Input
                        onKeyDown={createTagHandler}
                        onChange={event => setQuery(event.target.value)}
                        className="bg-transparent focus:outline-none"
                        value={query}
                    />
                </div>
            </div>
            <Combobox.Options className="ui-background">
                {filteredTags.map(tag => (
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
