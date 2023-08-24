import { useRef, useState } from 'react';
import { HiDotsHorizontal, HiOutlineChevronRight } from 'react-icons/hi';
const axios = require('axios').default;

type Props = {
    onDelete: () => void;
    onEdit: () => void;
    onChangeColor: (color: string) => void;
};

export default function DropdownMenu({
    onDelete,
    onEdit,
    onChangeColor,
}: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const DropdownMenuHandler = (state: boolean) => {
        setOpen(!state);
    };

    // close the dropdown by clicking outside of it.
    window.addEventListener('click', e => {
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
                        <li className=" rounded-sm p-xxs">
                            <div className="flex flex-row gap-xxs p-xxs ">
                                <div
                                    onClick={() => onChangeColor('#FE5A35')}
                                    className="w-xs h-xs rounded-full bg-cardColors-red hover:scale-150"
                                />
                                <div
                                    onClick={() => onChangeColor('#CBE87E')}
                                    className="w-xs h-xs rounded-full bg-cardColors-green hover:scale-150"
                                />
                                <div
                                    onClick={() => onChangeColor('#DAEDEB')}
                                    className="w-xs h-xs rounded-full bg-cardColors-blue hover:scale-150"
                                />
                                <div
                                    onClick={() => onChangeColor('#B4A0D1')}
                                    className="w-xs h-xs rounded-full bg-cardColors-purple hover:scale-150"
                                />
                                <div
                                    onClick={() => onChangeColor('#FDC959')}
                                    className="w-xs h-xs rounded-full bg-cardColors-yellow hover:scale-150"
                                />
                                <div
                                    onClick={() => onChangeColor('#3D3D3D')}
                                    className="w-xs h-xs rounded-full bg-cardColors-black hover:scale-150"
                                />
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
