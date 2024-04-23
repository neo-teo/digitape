"use client"

import Image from 'next/image'

const TrackInfo: React.FC<{
    artworkUrl: string,
    trackName: string,
    artists: string[]
}> = ({ artworkUrl, trackName, artists }) => {
    return (
        <div className='flex items-center bg-black w-full bg-opacity-80 rounded-lg gap-5 p-2'>
            <Image
                src={artworkUrl}
                alt="artwork"
                width="200"
                height="200"
                className={`rounded-md`}
            />

            <div className="digital-display-font flex flex-col text-white text-lg">
                <div>
                    {trackName}
                </div>
                <div>
                    {artists.join(", ")}
                </div>
            </div>
        </div>
    );
};

export default TrackInfo;