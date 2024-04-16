import React, { FormEvent } from 'react';

interface MixtapeFormProps {
    setPlaylistId: (id: string) => void;
    accessToken: string;
}

const MixtapeForm: React.FC<MixtapeFormProps> = ({ setPlaylistId, accessToken }) => {
    async function generateMixtape(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const playlistUrl = formData.get('playlist') as string;

        const urlPattern = /https:\/\/open\.spotify\.com\/playlist\/(\w+)(?:\?.*)?/;
        const match = playlistUrl.match(urlPattern);
        if (!match) {
            alert('Invalid URL. Please try again.');
            return;
        }
        const playlistId = match[1];

        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            alert('Playlist not found. Please make sure your playlist is public on Spotify.');
            return;
        }

        setPlaylistId(playlistId);
    }

    return (
        <form onSubmit={generateMixtape} className="flex flex-col gap-10">
            <div className='flex flex-col gap-1'>
                <label className="" htmlFor="playlist">PLAYLIST URL</label>
                <input required type="text" id="playlist" name="playlist" placeholder="e.g. https://open.spotify.com/playlist/6Eiq8U3eRdzcwXntyue9nP?si=0eb7200efa6a4b4a" />
            </div>
            <div className='flex flex-col gap-1'>
                <label className="" htmlFor="message">MESSAGE</label>
                <input required type="text" id="message" name="message" placeholder="e.g. some songs for you ❤️" />
            </div>
            <button type="submit" id="buttony" className="w-fit text-left font-black">
                GENERATE PLAYLIST
            </button>
        </form>
    );
};

export default MixtapeForm;