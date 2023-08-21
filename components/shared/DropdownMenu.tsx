import { useRef, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';

type Props = {
    onDelete: () => void;
};

export default function DropdownMenu({ onDelete }: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const DropdownMenuHandler = (state: boolean) => {
        setOpen(!state);
    };
    const handleClickDropdown = (event: MouseEvent) => {
        if (open && !dropdownMenuRef.current?.contains(event.target as Node)) {
            setOpen(false);
        }
    };
    window.addEventListener('click', handleClickDropdown);

    return (
        <div className="relative" ref={dropdownMenuRef}>
            <button onClick={() => DropdownMenuHandler(open)}>
                <HiDotsHorizontal size={20} />
            </button>
            {open && (
                <div className=" border bg-basicColors-dark text-basicColors-light w-[120px] h-[120px] rounded-lg absolute text-s text-left px-s py-xs z-[100]">
                    <ul className="relative">
                        <li className="hover:bg-hoverColors-hover rounded-sm py-xxs">
                            edit
                        </li>
                        <li
                            className="hover:bg-hoverColors-hover rounded-sm py-xxs"
                            onClick={onDelete}
                        >
                            delete
                        </li>
                        <li className="hover:bg-hoverColors-hover rounded-sm py-xxs">
                            color
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
