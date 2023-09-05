'use client';
import { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { TagType, useAddedTagsStore } from '@/store/tags';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';

type TagProps = {
    linkedTags: TagType[];
};

function FormTags({ linkedTags }: TagProps) {
    const [selectedTag, setSelectedTag] = useState('');
    const [query, setQuery] = useState('');
    const { addedTags, setAddedTags } = useAddedTagsStore();
    const queryClient = useQueryClient();
    const { data: existingTags } = useQuery<TagType[]>({
        queryKey: ['tags'],
        queryFn: () => axios.get('/api/tag').then(res => res.data),
    });

    useEffect(() => {
        setAddedTags(linkedTags);
    }, []);
    const addTag = useMutation({
        mutationFn: (data: string) =>
            axios.post('/api/tag', { name: data }).then(res => res.data),
        onError: error => {},
        onSuccess: data => {
            !addedTags.map(tag => tag.name).includes(data.name) &&
                setAddedTags([...addedTags, { name: data.name, id: data.id }]);
            queryClient.invalidateQueries(['tags']);
            toast.success('Tag created');
        },
    });
    // const deleteTag = useMutation({
    //     mutationFn: (id: string) =>
    //         axios.delete(`/api/tag/${id}`).then(res => res.data),
    //     onError: error => {
    //     },
    //     onSuccess: data => {
    //         setAddedTags(addedTags.filter(tag => tag.id !== data.id));
    //         queryClient.invalidateQueries(['tags']);
    //         toast.success('Tag deleted');
    //     },
    // })

    function removeTag(tag: TagType) {
        setAddedTags(addedTags.filter(t => t.name !== tag.name));
    }

    if (!existingTags) {
        return null;
    }

    const filteredTags = (
        query.trim() === ''
            ? existingTags.map(tag => tag.name)
            : existingTags
                  .map(tag => tag.name)
                  .filter(tag => {
                      return tag.toLowerCase().includes(query.toLowerCase());
                  })
    ).filter(tag => !addedTags.map(tag => tag.name).includes(tag));

    function createTagHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newTag = e.currentTarget.value.trim();
            if (!newTag) return;
            // check if the tag already exists
            if (!existingTags?.map(tag => tag.name).includes(newTag)) {
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
            <Combobox.Label className="text-s font-600">Tags</Combobox.Label>
            <div className="bg-transparent border text-xs p-xs focus:outline focus:outline-2 focus:outline-basicColors-light rounded-[0.3125rem] border-borderColors-borderLight">
                <div className="flex flex-wrap w-full border-none gap-xs gap-y-xs">
                    {addedTags.map(tag => (
                        <div
                            key={tag.id}
                            className="flex items-center justify-around rounded-full text-xxs gap-xxs h-m bg-cardColors-blue py-xxs px-s text-textColors-textBody"
                        >
                            <span className="mb-[2px]">{tag.name}</span>
                            <RxCross2
                                onClick={() => removeTag(tag)}
                                className="align-bottom bg-opacity-0 rounded-full text-xxs text-cardColors-red hover:cursor-pointer"
                            />
                        </div>
                    ))}
                    <Combobox.Input
                        onKeyDown={createTagHandler}
                        onChange={event => setQuery(event.target.value)}
                        className="bg-transparent border-none focus:ring-0 focus:outline-none"
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
