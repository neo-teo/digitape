"use client"

import Image from 'next/image'
import cassette_paused from "@/../public/cassette_paused.png";
import cassette_playing from "@/../public/cassette_playing.gif";
import Marquee from './Marquee';

const Mixtape: React.FC<{ paused: boolean }> = ({ paused }) => {
    return (<>
        <div className="relative flex items-center justify-center w-full max-w-[600px]">
            <Image
                src={cassette_paused} alt="cassette tape"
                className='absolute'
            />
            <Image
                src={cassette_playing} alt="cassette tape"
                className={`absolute ${paused ? 'opacity-0' : ''}`}
            />

            <div className='w-[88%] mb-[32%]'>
                <Marquee>
                    <div className="pl-[10%] font-bold text-base whitespace-nowrap md:text-xl">
                        {"I PUT THESE SONGS TOGETHER FOR U :)"}
                    </div>
                </Marquee>
            </div>
        </div>
    </>
    );
};

export default Mixtape;