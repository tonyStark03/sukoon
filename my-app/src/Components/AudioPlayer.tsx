import React, { useState } from "react";
import { Howl } from "howler";

interface AudioPlayerProps {
    sound: string;
    soundInstances: { [key: string]: Howl };
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ sound, soundInstances }) => {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const togglePlay = () => {
        if (playing) {
            soundInstances[sound].pause();
        } else {
            soundInstances[sound].play();
        }
        setPlaying(!playing);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        soundInstances[sound].volume(newVolume);
        setVolume(newVolume);
    };

    return (
        <div className="flex items-center space-x-4 p-2 bg-neutral-700 rounded-lg my-2">
            <button onClick={togglePlay} className="px-4 py-2 bg-white text-black rounded">
                {playing ? "Pause" : "Play"}
            </button>
            <p className="text-white">{sound}</p>
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        </div>
    );
};

export default AudioPlayer;
