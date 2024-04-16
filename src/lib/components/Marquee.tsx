"use client"

const Marquee: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className="sticky top-0 marquee py-2 bg-black text-white">
            <div className="marquee-content font-black">
                {children}
            </div>
            <div className="marquee-content font-black">
                {children}
            </div>
        </div>
    );
};

export default Marquee;