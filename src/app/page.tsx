"use client"

export default function Home() {

  const login = async () => {
    const res = await fetch(`/api/auth-url`);

    if (res.ok) {
      const { auth_url } = await res.json();
      window.location.href = auth_url; // Redirect to Spotify login page
    } else {
      console.error('Failed to fetch auth URL');
    }
  }

  return (
    <main className="min-h-screen flex flex-col gap-10">
      <div className="text-8xl">
        TURN PLAYLISTS INTO MIXTAPES YOU CAN SHARE WITH FRIENDS
      </div>
      <button
        id="buttony"
        className="w-fit text-left text-8xl"
        onClick={login}
      >
        LOG IN WITH SPOTIFY
      </button>
    </main>
  );
}
