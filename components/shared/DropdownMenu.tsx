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
            <div onClick={() => DropdownMenuHandler(open)}>
                <HiDotsHorizontal size={20} />
            </div>
            {open && (
                <div className="border text-basicColors-light w-[120px] h-[120px] rounded-lg text-s text-left px-s py-xs z-50 absolute top-m ui-background">
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
