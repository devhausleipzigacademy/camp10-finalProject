import { Tag } from '@prisma/client';
import { create } from 'zustand';

export type TagType = Pick<Tag, "id" | "name">

// temporary store for moved jobs in dnd
type TagsStore = {
    addedTags: TagType[];
    setAddedTags: (jobs: TagType[]) => void;
};

export const useTagsStore = create<TagsStore>()(set => ({
  addedTags: [] as TagType[],
  setAddedTags: (tags: TagType[]) => set({ addedTags: tags }),
}));
