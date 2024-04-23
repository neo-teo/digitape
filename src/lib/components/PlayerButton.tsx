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
        <div className="flex flex-col">
            <div className="text-sm py-1 bg-black text-white text-center">
                {label}
            </div>
            <button
                className="border border-black p-1/2 bg-gray-200"
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <Image
                    src={button} alt="cassette button"
                    width={60}
                />
            </button>
        </div>
    );
}

export default PlayerButton;