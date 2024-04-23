"use client"

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
        <button
            className="grain bg-black bg-opacity-90 rounded-xl grain text-left"
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div className="py-1 px-4 w-[250px] md:w-fit text-white">
                {label}
            </div>
        </button>
    );
}

export default PlayerButton;