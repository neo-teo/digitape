"use client"

import { useEffect, useState } from 'react';
import VinylRecord from './VinylRecord';
import Marquee from './Marquee';
import Image from 'next/image'
import cd from "@/../public/cd.png";
import CassettePlayerButtons from './CassettePlayerButtons';

const setPlaylist = async (device_id: string, playlist_id: string, access_token: string) => {
    const url = `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`;

    const body = JSON.stringify({ context_uri: `https://open.spotify.com/playlist/${playlist_id}` });

    const headers = { 'Authorization': `Bearer ${access_token}` };

    const response = await fetch(url, { method: 'PUT', body, headers });
    if (response.ok) {
        console.log('Playlist loaded successfully!');
    } else {
        console.error('Failed to load playlist');
    }
}

const CassettePlayer: React.FC<{
    playlistId: string,
    accessToken: string
}> = ({ playlistId, accessToken }) => {

    const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);

    const [trackName, setTrackName] = useState('')
    const [artworkUrl, setArtworkUrl] = useState('')
    const [artists, setArtists] = useState<string[]>();
    const [paused, setPaused] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Player is ready!');

                setPlaylist(device_id, playlistId, accessToken);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }

                setTrackName(state.track_window.current_track.name);
                setArtworkUrl(state.track_window.current_track.album.images[0].url)
                setArtists(state.track_window.current_track.artists
                    .map((artist) => artist.name)
                    .filter((name: string) => !trackName.includes(name))
                );
                setPaused(state.paused);

                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true)
                });
            }));

            player.connect();
        }
    }, [])

    if (!player || !active) {
        return (
            <div className="font-black text-8xl">
                TUNING IN ....
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center gap-5'>
            {/* <Marquee>
                <div className="flex gap-2 text-base">
                    <Image src={cd} alt="cd" width="30" height="30" />
                    thanks for tuning in
                    <Image src={cd} alt="cd" width="30" height="30" />
                </div>
            </Marquee> */}

            <div className="flex flex-col items-center text-center text-2xl">
                <div>
                    {trackName}
                </div>
                <div>
                    {artists?.join(",")}
                </div>
            </div>

            <VinylRecord artworkUrl={artworkUrl} isPlaying={!paused} />

            <CassettePlayerButtons player={player} trackName={trackName} />

        </div>
    );
};

export default CassettePlayer;