"use client"

const Marquee: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className="marquee py-2 font-normal">
            <div className="marquee-content">
                {children}
            </div>
            <div className="marquee-content">
                {children}
            </div>
        </div>
    );
};

export default Marquee;