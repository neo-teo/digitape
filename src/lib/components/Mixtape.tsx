"use client"

import Image from 'next/image'
import cassette_paused from "@/../public/cassette_paused.png";
import cassette_playing from "@/../public/cassette_playing.gif";
import Marquee from './Marquee';

const Mixtape: React.FC<{ paused: boolean }> = ({ paused }) => {
    return (<>
        <div>
            <div className="relative max-w-[800px]">
                <Image
                    src={cassette_paused}
                    alt="cassette tape"
                    className={`px-[5%]`}
                />
                <Image
                    src={cassette_playing}
                    alt="cassette tape playing"
                    className={`absolute top-0 left-0 px-[5%] w-full h-auto ${paused ? 'opacity-0' : 'opacity-100'}`}
                />

                {/* <div className='absolute top-0 py-[10%]'>
                    <Marquee>
                        {"I PUT THESE SONGS TOGETHER FOR U :)"}
                    </Marquee>
                </div> */}
            </div>
        </div>
    </>
    );
};

export default Mixtape;