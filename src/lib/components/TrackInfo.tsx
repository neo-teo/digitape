"use client"

import Image from 'next/image'
import Marquee from './Marquee';

const TrackInfo: React.FC<{
    artworkUrl: string,
    trackName: string,
    artists: string[]
}> = ({ artworkUrl, trackName, artists }) => {
    return (
        <div className='flex items-center w-full rounded-lg p-2'>
            <Image
                src={artworkUrl}
                alt="artwork"
                width="100"
                height="100"
                className={`rounded-md`}
            />

            <Marquee>
                {trackName} - {artists.join(", ")}
            </Marquee>
        </div>
    );
};

export default TrackInfo;