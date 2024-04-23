"use client"

import { useEffect, useState } from "react";
import Player from '@/lib/components/Player';
import { useRouter } from 'next/navigation';
import MixtapeForm from '@/lib/components/MixtapeForm';

const getOAuthToken = async () => {
    const res = await fetch(`/api/access-token`);
    const { access_token } = await res.json();

    return access_token;
}

export default function Radio() {
    const router = useRouter();

    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const [playlistId, setPlaylistId] = useState<string | undefined>('6Eiq8U3eRdzcwXntyue9nP');
    useEffect(() => {
        getOAuthToken().then((token) => {
            // if no access token, send user to login page
            if (!token) {
                router.push(`/`);
            }
            setAccessToken(token)
        });
    }, []);

    if (!accessToken) {
        return;
    }

    return (
        <main className="min-h-screen flex flex-col gap-10">
            {playlistId
                ? <Player
                    playlistId={playlistId}
                    accessToken={accessToken}
                />
                : <MixtapeForm
                    setPlaylistId={setPlaylistId}
                    accessToken={accessToken}
                />}
        </main>
    );
}
