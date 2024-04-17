"use client"

import { useEffect, useRef, useState } from "react";

const MixtapeControls: React.FC<{
    player: Spotify.Player,
    trackName: string
}> = ({ player, trackName }) => {

    const clickSound = useRef<HTMLAudioElement>(null);

    const playClickSound = () => {
        if (clickSound.current) {
            clickSound.current.volume = 0.6
            clickSound.current.play();
        }
    };

    const [seeking, setSeeking] = useState<NodeJS.Timeout | null>(null);

    const startFastForward = () => {
        const seeking = setInterval(() => {
            player.getCurrentState().then(state =>
                state && player.seek(state.position + 5000));
        }, 200);  // Adjust the frequency of seek calls as needed
        setSeeking(seeking);

        const cassetteSound = document.getElementById('cassette-sound') as HTMLAudioElement
        cassetteSound.play();
    };

    const startRewind = () => {
        const seeking = setInterval(() => {
            player.getCurrentState().then(state =>
                state && player.seek(state.position - 5000));
        }, 200);  // Adjust the frequency of seek calls as needed
        setSeeking(seeking);

        const cassetteSound = document.getElementById('cassette-sound') as HTMLAudioElement
        cassetteSound.play();
    };

    const stopSeeking = () => {
        if (seeking) {
            clearInterval(seeking);
            setSeeking(null);

            const cassetteSound = document.getElementById('cassette-sound') as HTMLAudioElement
            cassetteSound.pause();
        }
    };

    return (
        <div className='flex gap-2 items-center text-base'>
            <button
                className="font-black border p-1/2 bg-gray-200"
                onClick={() => { playClickSound(); player.resume(); }}
            >
                <div className="font-black border px-3 py-1 bg-gray-300">
                    {"PLAY"}
                </div>
            </button>
            <button
                className="font-black border p-1/2 bg-gray-200"
                onClick={() => { playClickSound(); player.pause() }}
            >
                <div className="font-black border px-3 py-1 bg-gray-300">
                    {"PAUSE"}
                </div>
            </button>

            <button
                className="font-black border p-1/2 bg-gray-200"
                onMouseDown={() => { playClickSound(); startFastForward(); }}
                onMouseUp={stopSeeking}
                onTouchStart={() => { playClickSound(); startFastForward(); }}
                onTouchEnd={stopSeeking}
            >
                <div className="font-black border px-3 py-1 bg-gray-300">
                    {"FF"}
                </div>
            </button>

            <button
                className="font-black border p-1/2 bg-gray-200"
                onMouseDown={() => { playClickSound(); startRewind(); }}
                onMouseUp={stopSeeking}
                onTouchStart={() => { playClickSound(); startRewind(); }}
                onTouchEnd={stopSeeking}
            >
                <div className="font-black border px-3 py-1 bg-gray-300">
                    {"REWIND"}
                </div>
            </button>

            <audio ref={clickSound} src="/button_click.mp3" preload="auto" />
            <audio id="cassette-sound" src="/tape_moving.mp3" loop />
        </div>
    );
};

export default MixtapeControls;