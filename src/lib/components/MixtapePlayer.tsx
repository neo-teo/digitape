"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image'
import MixtapeControls from './MixtapeControls';
import Mixtape from './Mixtape';

const setPlaylist = async (device_id: string, playlist_id: string, access_token: string) => {
    const headers = { 'Authorization': `Bearer ${access_token}` };

    const url = `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`;

    const body = JSON.stringify({ context_uri: `https://open.spotify.com/playlist/${playlist_id}` });

    const response = await fetch(url, { method: 'PUT', body, headers });
    if (response.ok) {
        console.log('Playlist loaded successfully!');
    } else {
        console.error('Failed to load playlist');
    }

    const shuffleUrl = `https://api.spotify.com/v1/me/player/shuffle?state=true&device_id=${device_id}`;
    await fetch(shuffleUrl, { method: 'PUT', headers });
}

const MixtapePlayer: React.FC<{
    playlistId: string,
    accessToken: string
}> = ({ playlistId, accessToken }) => {

    const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);

    const [trackName, setTrackName] = useState('')
    const [artworkUrl, setArtworkUrl] = useState('')
    const [artists, setArtists] = useState<string[]>([]);
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

                setPlaylist(device_id, playlistId, accessToken).then(() => {
                    // TODO: unecessary, just nice for dev
                    player.nextTrack();
                });
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state => {
                if (!state || !state.track_window.current_track) {
                    return;
                }

                setTrackName(state.track_window.current_track.name);
                setArtworkUrl(state.track_window.current_track.album.images[0].url)
                setArtists(state.track_window.current_track.artists
                    .map((artist) => artist.name)
                    .filter((name: string) => !state.track_window.current_track.name.toLowerCase().includes(name.toLowerCase()))
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
        <div className="flex flex-col items-center gap-5">
            <div className="h-10">
            </div>

            <Mixtape isPlaying={!paused} />

            <div className="h-10">
            </div>

            <div className='flex flex-col items-center'>
                <div className="h-1 w-5 bg-gray-700 grain">
                </div>
                <div className="flex flex-col items-center gap-5 bg-black rounded-lg grain pt-5 max-w-[700px]">
                    <MixtapeControls player={player} trackName={trackName} />

                    <div className='flex items-center bg-black w-full bg-opacity-80 rounded-lg gap-5 p-2'>
                        <Image
                            src={artworkUrl}
                            alt="artwork"
                            width="100"
                            height="100"
                            className={`rounded-md`}
                        />

                        <div className="digital-display-font w-[180px] flex flex-col text-white text-base">
                            <div>
                                {trackName}
                            </div>
                            <div>
                                {artists.join(", ")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MixtapePlayer;