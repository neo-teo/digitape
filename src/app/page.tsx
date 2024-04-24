"use client"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-10">
      <div className="text-8xl">
        TURN PLAYLISTS INTO MIXTAPES YOU CAN SHARE WITH FRIENDS
      </div>
      <a
        href="/api/login"
        id="buttony"
        className="w-fit text-left text-8xl"
      >
        LOG IN WITH SPOTIFY
      </a>
    </main>
  );
}
