import { Tag } from '@prisma/client';
import { create } from 'zustand';

export type TagType = Pick<Tag, "id" | "name">

// temporary store for moved jobs in dnd
type AddedTagsStore = {
    addedTags: TagType[];
    setAddedTags: (jobs: TagType[]) => void;
};

export const useAddedTagsStore = create<AddedTagsStore>()(set => ({
  addedTags: [] as TagType[],
  setAddedTags: (tags: TagType[]) => set({ addedTags: tags }),
}));
