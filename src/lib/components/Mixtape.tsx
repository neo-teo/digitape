"use client"

import Image from 'next/image'
import cassette from "@/../public/cassete_tape.png";
import b from "@/../public/cassette_b.png";
import circle from "@/../public/cassete_tape_circle.png";
import Marquee from './Marquee';

const Mixtape: React.FC<{ artworkUrl: string, isPlaying: boolean }> = ({ artworkUrl, isPlaying }) => {
    return (<>
        <div className="relative flex items-center justify-center w-full max-w-[700px]">
            <Image
                src={cassette} alt="cassette tape"
                className='absolute'
            />
            <Image
                src={b} alt="cassette tape b sticker"
                className={`absolute z-10 w-[5%] mr-[78%] mb-[35%]`}
            />
            <Image
                src={circle} alt="cassette tape circle left"
                className={`absolute z-5 w-[10%] mr-[41.5%] mb-[5.6%] ${isPlaying ? 'rotate' : 'spinitback'}`}
            />
            <Image
                src={circle} alt="cassette tape circle right"
                className={`absolute z-5 w-[10%] ml-[42%] mb-[5.6%] ${isPlaying ? 'rotate' : 'spinitback'}`}
            />

            <div className='w-[88%] mb-[35%]'>
                <Marquee>
                    <div className="pl-[10%] font-bold text-sm sm:text-base md:text-lg">
                        {"THANKS FOR TUNING IN, I PUT THESE SONGS TOGETHER FOR U :)"}
                    </div>
                </Marquee>
            </div>
        </div>
    </>
    );
};

export default Mixtape;