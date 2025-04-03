import { FiClock, FiPlay, FiHeart } from "react-icons/fi";

interface SoundControlsProps {
    playAll: () => void;
}

const SoundControls: React.FC<SoundControlsProps> = ({ playAll }) => {
    return (
        <div className="flex justify-around rounded-2xl space-x-16 py-4 shadow-neutral-900/70 shadow-md">
            <div className="flex flex-col items-center">
                <button className="w-11 h-11 cursor-pointer flex items-center justify-center mb-1 hover:bg-neutral-700 transition-colors">
                    <FiClock className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-400">Set Timer</span>
            </div>

            <div className="flex flex-col items-center">
                <button
                    onClick={playAll}
                    className="w-12 h-12 cursor-pointer flex items-center justify-center mb-1 hover:bg-neutral-700 transition-colors"
                >
                    <FiPlay className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-400">Play All</span>
            </div>

            <div className="flex flex-col items-center">
                <button className="w-12 h-12 flex cursor-pointer items-center justify-center mb-1 hover:bg-neutral-700 transition-colors">
                    <FiHeart className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-400">Save Mix</span>
            </div>
        </div>
    );
};

export default SoundControls;
