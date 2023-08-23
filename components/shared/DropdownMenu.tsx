import { useRef, useState } from 'react';
import { HiDotsHorizontal, HiOutlineChevronRight } from 'react-icons/hi';

type Props = {
    onDelete: () => void;
    onEdit: () => void;
    onColor: () => void;
};

export default function DropdownMenu({ onDelete, onEdit, onColor }: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const DropdownMenuHandler = (state: boolean) => {
        setOpen(!state);
    };

    const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
    const subMenuRef = useRef<HTMLDivElement>(null);
    const SubMenuHandler = (state: boolean) => {
        setOpenSubMenu(!state);
    };

    // close the dropdown by clicking outside of it.
    window.addEventListener('click', e => {
        console.log(!(e.target instanceof SVGElement) && open);
        if (!(e.target instanceof SVGElement) && open) {
            setOpen(false);
        }
    });

    window.addEventListener('click', e => {
        console.log(!(e.target instanceof SVGElement) && openSubMenu);
        if (!(e.target instanceof SVGElement) && openSubMenu) {
            setOpenSubMenu(false);
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
                        <li
                            className="hover:bg-hoverColors-hover rounded-sm p-xxs"
                            onClick={onColor}
                        >
                            color
                            <div className="relative" ref={subMenuRef}>
                                <div
                                    className="flex justify-end py--xl"
                                    onClick={() => SubMenuHandler(openSubMenu)}
                                >
                                    <HiOutlineChevronRight size={15} />
                                </div>
                                {openSubMenu && (
                                    <div className="w-[7rem] border text-basicColors-light rounded-lg text-s text-left p-xs absolute top-m ui-background-dark right-[0] z-50">
                                        <ul>
                                            <li className="hover:bg-hoverColors-hover rounded-sm p-xxs">
                                                <div className="w-m h-m rounded-full bg-cardColors-red" />
                                            </li>
                                            <li className="hover:bg-hoverColors-hover rounded-sm p-xxs">
                                                <div className="w-m h-m rounded-full bg-cardColors-green" />
                                            </li>
                                            <li className="hover:bg-hoverColors-hover rounded-sm p-xxs">
                                                <div className="w-m h-m rounded-full bg-cardColors-blue" />
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
