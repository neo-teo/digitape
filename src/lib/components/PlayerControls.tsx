"use client"

import { useEffect, useRef, useState } from "react";
import PlayerButton from "./PlayerButton";

const PlayerControls: React.FC<{
    player: Spotify.Player,
}> = ({ player }) => {

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
        <div>
            <div className='flex items-center text-base'>
                <PlayerButton
                    label="PLAY"
                    onClick={() => { playClickSound(); player.resume(); }}
                />
                <PlayerButton
                    label="PAUSE"
                    onClick={() => { playClickSound(); player.pause(); }}
                />
                <PlayerButton
                    label="FF"
                    onMouseDown={() => { playClickSound(); startFastForward(); }}
                    onMouseUp={stopSeeking}
                    onTouchStart={() => { playClickSound(); startFastForward(); }}
                    onTouchEnd={stopSeeking}
                />
                <PlayerButton
                    label="REWIND"
                    onMouseDown={() => { playClickSound(); startRewind(); }}
                    onMouseUp={stopSeeking}
                    onTouchStart={() => { playClickSound(); startRewind(); }}
                    onTouchEnd={stopSeeking}
                />

                <audio ref={clickSound} src="/button_click.mp3" preload="auto" />
                <audio id="cassette-sound" src="/tape_moving.mp3" loop />
            </div>
            <div className="bg-black h-3 rounded-b-md"></div>
        </div>
    );
};

export default PlayerControls;