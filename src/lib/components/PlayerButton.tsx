"use client"

import Image from 'next/image'
import button from "@/../public/cassette_button.png";

interface PlayerButtonProps {
    label: string;
    onClick?: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onTouchStart?: () => void;
    onTouchEnd?: () => void;
}

const PlayerButton: React.FC<PlayerButtonProps> = ({
    label,
    onClick,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd
}) => {
    return (
        <div className="flex flex-row sm:flex-col gap-5">
            <div className="py-1 px-4 bg-black w-[250px] sm:w-fit text-white">
                {label}
            </div>
            <button
                className="grain bg-black rounded-xl"
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
            </button>
        </div>
    );
}

export default PlayerButton;