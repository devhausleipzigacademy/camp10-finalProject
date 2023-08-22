import { useRef, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

type Props = {
    onDelete: () => void;
    onEdit: () => void;
};

export default function DropdownMenu({ onDelete, onEdit }: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const DropdownMenuHandler = (state: boolean) => {
        setOpen(!state);
    };
    // close the dropdown by clicking outside of it. 
    window.addEventListener('click', e => {
        console.log(!(e.target instanceof SVGElement) && open);
        if (!(e.target instanceof SVGElement) && open) {
            setOpen(false);
        }
    });

    return (
        <div className="relative" ref={dropdownMenuRef}>
            <div onClick={() => DropdownMenuHandler(open)}>
                <HiDotsHorizontal size={20} />
            </div>
            {open && (
                <div className="w-[7rem] border text-basicColors-light rounded-lg text-s text-left p-xs absolute top-m ui-background-dark right-[0] z-50">
                    <ul className="relative w-full">
                        <li
                            className="hover:bg-hoverColors-hover rounded-sm p-xxs"
                            onClick={onEdit}
                        >
                            edit
                        </li>
                        <li
                            className="hover:bg-hoverColors-hover rounded-sm p-xxs"
                            onClick={onDelete}
                        >
                            delete
                        </li>
                        <li className="hover:bg-hoverColors-hover rounded-sm p-xxs">
                            color
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
