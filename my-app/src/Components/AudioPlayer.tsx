import React from "react";
import { Howl } from "howler";

interface AudioPlayerProps {
    sound: string;
    onRemove: (sound: string) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ sound, onRemove }) => {
    return (
        <div className="flex items-center justify-between p-2 bg-neutral-700 rounded-lg my-2">
            <p className="text-white">{sound}</p>
            <button onClick={() => onRemove(sound)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                Remove
            </button>
        </div>
    );
};

export default AudioPlayer;
