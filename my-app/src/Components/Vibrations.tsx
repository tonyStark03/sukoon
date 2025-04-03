import React, { useState } from "react";
import TabNav from "./TabNav";
import SoundControls from "./SoundControls";
import SelectionCard from "./SelectionCard";
import AudioPlayer from "./AudioPlayer";
import { Howl } from "howler";

const Vibrations: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Sounds");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [soundInstances, setSoundInstances] = useState<{ [key: string]: Howl }>({});

    const categories = {
        Sounds: ["Birds", "Ocean", "Rain", "Wind Chimes", "Waterfall", "Koshi Chimes", "Crickets", "Fire"],
        Music: ["Ambient", "Lo-Fi", "Binaural Beats", "Classical", "Jazz", "Electronic"],
        Brainwaves: ["Alpha Waves", "Beta Waves", "Theta Waves", "Delta Waves", "Gamma Waves"],
        Sample: ["Sleep", "Relaxation", "Focus", "Meditation", "Creativity", "Random"]
    };

    const handleSelect = (item: string) => {
        if (!selectedItems.includes(item)) {
            const newSound = new Howl({
                src: [`/sounds/${item}.mp3`], // Ensure your sounds are stored in `public/sounds/`
                loop: true,
                volume: 0.5
            });

            setSelectedItems([...selectedItems, item]);
            setSoundInstances((prev) => ({ ...prev, [item]: newSound }));
        }
        setModalOpen(false);
    };

    const handleRemove = (sound: string) => {
        if (soundInstances[sound]) {
            soundInstances[sound].stop();
            const updatedInstances = { ...soundInstances };
            delete updatedInstances[sound];
            setSoundInstances(updatedInstances);
        }
        setSelectedItems(selectedItems.filter((s) => s !== sound));
    };

    const playAllSounds = () => {
        selectedItems.forEach((sound) => {
            soundInstances[sound]?.play();
        });
    };

    return (
        <div className="flex items-center justify-center w-[48rem] relative">
            <div className="bg-neutral-800 rounded-lg shadow-lg shadow-neutral-900/70 w-full max-w-3xl">
                <div className="px-4 py-16 text-white">
                    <h1 className="text-2xl font-semibold text-center mb-8">Vibrations</h1>

                    <div className="flex justify-center space-x-6 mb-6">
                        <button className="px-4 py-2 hover:bg-neutral-700 rounded"
                            onClick={() => {
                                setModalOpen(true);
                                setActiveTab("Sample");
                            }}>
                            Sample Packs
                        </button>
                        <button className="px-4 py-2 hover:bg-neutral-700 rounded">Saved Mixes</button>
                    </div>

                    <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

                    <div className="py-8 text-center">
                        {selectedItems.length === 0 ? <p className="text-gray-400 mb-6">No {activeTab.toLowerCase()} selected yet.</p> : null}
                        <button className="bg-transparent border border-white px-6 py-2 rounded hover:bg-neutral-700"
                            onClick={() => setModalOpen(true)}>
                            Add New {activeTab}
                        </button>
                    </div>

                    {/* Display Selected Audio Tracks */}
                    <div className="mt-4">
                        {selectedItems.map((sound) => (
                            <AudioPlayer key={sound} sound={sound} onRemove={handleRemove} />
                        ))}
                    </div>

                    <SoundControls playAll={playAllSounds} />
                </div>
            </div>

            {modalOpen && (
                <SelectionCard
                    title={`Select ${activeTab}`}
                    items={categories[activeTab as keyof typeof categories]}
                    onClose={() => setModalOpen(false)}
                    onSelect={handleSelect}
                    onGenerate={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Vibrations;
