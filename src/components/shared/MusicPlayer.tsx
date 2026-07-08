import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
    src: string;
    startPlaying: boolean;
}

export default function MusicPlayer({ src, startPlaying }: MusicPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const attemptPlay = async () => {
            if (startPlaying && audioRef.current) {
                try {
                    await audioRef.current.play();
                } catch (error) {
                    console.log("Autoplay prevented, waiting for interaction:", error);
                    // Add a one-time listener to retry on next click
                    const retryPlay = async () => {
                        if (audioRef.current) {
                            try {
                                await audioRef.current.play();
                            } catch (e) {
                                // ignore
                            }
                        }
                        window.removeEventListener('click', retryPlay);
                    };
                    window.addEventListener('click', retryPlay);
                }
            }
        };

        attemptPlay();
    }, [startPlaying]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (audioRef.current) {
                    audioRef.current.pause();
                }
            } else {
                // Resume if it was supposed to be playing
                if (startPlaying && audioRef.current && !isMuted) {
                    // Check mute state or just try playing. 
                    // Ideally we just try play, if it was muted it stays muted but plays.
                    audioRef.current.play().catch(e => console.log("Resume failed", e));
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [startPlaying, isMuted]);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="fixed top-4 right-4 z-[60]">
            <audio ref={audioRef} src={src} loop />
            <button
                onClick={toggleMute}
                className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors border border-white/30"
                aria-label={isMuted ? "Sesi aç" : "Sesi kapat"}
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
        </div>
    );
}
