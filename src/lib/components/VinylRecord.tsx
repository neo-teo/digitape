"use client"

import Image from 'next/image'

const VinylRecord: React.FC<{ artworkUrl: string, isPlaying: boolean }> = ({ artworkUrl, isPlaying }) => {
    return (
        <div className="relative flex items-center justify-center h-[600px] w-[600px]">
            <div className="absolute h-[600px] w-[600px] rounded-full bg-black z-0"></div>

            {/* TODO: randomize where the lines appear ahahahah*/}
            <div className="absolute opacity-50 h-[550px] w-[550px] rounded-full border border-4 border-gray-700 bg-transparent z-2"></div>
            <div className="absolute opacity-50 h-[480px] w-[480px] rounded-full border border-gray-700 bg-transparent z-2"></div>
            <div className="absolute opacity-50 h-[450px] w-[450px] rounded-full border border-2 border-gray-700 bg-transparent z-2"></div>
            <div className="absolute opacity-50 h-[400px] w-[400px] rounded-full border border-gray-700 bg-transparent z-2"></div>

            <div className="absolute h-[320px] w-[320px] rounded-full bg-white z-5 grain"></div>
            {artworkUrl &&
                <Image
                    src={artworkUrl}
                    alt="artwork"
                    width="300"
                    height="300"
                    className={`abolute z-10 rounded-full ${isPlaying ? 'rotate' : 'spinitback'}`}
                />}
            <div className="absolute h-[20px] w-[20px] rounded-full bg-white z-30"></div>
        </div>
    );
};

export default VinylRecord;