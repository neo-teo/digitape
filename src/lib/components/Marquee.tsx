"use client"

const Marquee: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <div className="marquee text-3xl">
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