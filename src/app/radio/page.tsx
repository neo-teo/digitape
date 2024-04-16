"use client"

import Image from 'next/image'
import { FormEvent, useEffect, useState } from "react";
import cd from "@/../public/cd.png";
import Marquee from '@/lib/components/Marquee';
import CassettePlayer from '@/lib/components/CassettePlayer';
import { useRouter } from 'next/navigation';
import MixtapeForm from '@/lib/components/MixtapeForm';

const getOAuthToken = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/access-token`);
    const { access_token } = await res.json();

    return access_token;
}

export default function Radio() {
    const router = useRouter();

    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const [playlistId, setPlaylistId] = useState<string | undefined>('37i9dQZF1EpxnjlbMmCa20');

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
                ? <CassettePlayer
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
