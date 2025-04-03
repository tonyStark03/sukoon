import React, { useState } from "react";
import { Howl } from "howler";
import TabNav from "./TabNav";
import SoundControls from "./SoundControls";
import SelectionCard from "./SelectionCard";
import AudioPlayer from "./AudioPlayer";

const Vibrations: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"Sounds" | "Music" | "Brainwaves">("Sounds");
    const [modalOpen, setModalOpen] = useState(false);

    // State to store selected audio for each category
    const [selectedSounds, setSelectedSounds] = useState<string[]>([]);
    const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
    const [selectedBrainwaves, setSelectedBrainwaves] = useState<string[]>([]);
    
    // Store Howler.js sound instances
    const [soundInstances, setSoundInstances] = useState<{ [key: string]: Howl }>({});
    
    // Temporarily store selections before generating
    const [tempSelection, setTempSelection] = useState<string[]>([]);

    const categories = {
        Sounds: ["Birds", "Ocean", "Rain", "Wind Chimes", "Waterfall", "Koshi Chimes", "Crickets", "Fire"],
        Music: ["Ambient", "Lo-Fi", "Binaural Beats", "Classical", "Jazz", "Electronic"],
        Brainwaves: ["Alpha Waves", "Beta Waves", "Theta Waves", "Delta Waves", "Gamma Waves"],
        Sample: ["Sleep", "Relaxation", "Focus", "Meditation", "Creativity", "Random"]
    };

    // Function to generate and categorize sounds
    const handleGenerate = () => {
        let newSounds: string[] = [];
        if (activeTab === "Sounds") {
            newSounds = [...new Set([...selectedSounds, ...tempSelection])];
            setSelectedSounds(newSounds);
        } else if (activeTab === "Music") {
            newSounds = [...new Set([...selectedMusic, ...tempSelection])];
            setSelectedMusic(newSounds);
        } else if (activeTab === "Brainwaves") {
            newSounds = [...new Set([...selectedBrainwaves, ...tempSelection])];
            setSelectedBrainwaves(newSounds);
        }

        // Initialize Howler sounds
        const newInstances = { ...soundInstances };
        tempSelection.forEach((item) => {
            if (!newInstances[item]) {
                newInstances[item] = new Howl({
                    src: [`/audio/${item.toLowerCase().replace(/ /g, "_")}.mp3`], // Update path as needed
                    loop: true,
                    volume: 0.5,
                });
            }
        });

        setSoundInstances(newInstances);
        setTempSelection([]);
        setModalOpen(false);
    };

    // Store selected items temporarily
    const handleSelect = (item: string) => {
        if (!tempSelection.includes(item)) {
            setTempSelection((prev) => [...prev, item]);
        }
    };

    return (
        <div className="flex items-center justify-center w-[48rem] relative">
            <div className="bg-neutral-800 rounded-lg shadow-lg shadow-neutral-900/70 w-full max-w-3xl">
                <div className="px-4 py-16 text-white">
                    <h1 className="text-2xl font-semibold text-center mb-8">Vibrations</h1>

                    <div className="flex justify-center space-x-6 mb-6">
                        <button className="px-4 py-2 hover:bg-neutral-700 rounded" onClick={() => setModalOpen(true)}>
                            Sample Packs
                        </button>
                        <button className="px-4 py-2 hover:bg-neutral-700 rounded">Saved Mixes</button>
                    </div>

                    <TabNav
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        counts={{
                            Sounds: selectedSounds.length,
                            Music: selectedMusic.length,
                            Brainwaves: selectedBrainwaves.length,
                        }}
                    />

                    {/* Display selected items with audio controls */}
                    <div className="py-6 text-center">
                        
                        {activeTab === "Sounds" && selectedSounds.map((sound) => (
                            <AudioPlayer key={sound} sound={sound} soundInstances={soundInstances} />
                        ))}
                        {activeTab === "Music" && selectedMusic.map((sound) => (
                            <AudioPlayer key={sound} sound={sound} soundInstances={soundInstances} />
                        ))}
                        {activeTab === "Brainwaves" && selectedBrainwaves.map((sound) => (
                            <AudioPlayer key={sound} sound={sound} soundInstances={soundInstances} />
                        ))}
                    </div>
                    <div className="flex justify-center mb-6 text-white">
                        <button className="bg-transparent border border-white px-6 py-2 rounded hover:bg-neutral-700" onClick={() => setModalOpen(true)}>
                            Add New {activeTab}
                        </button>
                    </div>
                    
                        <SoundControls />
                    </div>
                   
                    
            </div>

            {/* Reusable Modal */}
            {modalOpen && (
                <SelectionCard
                    title={`Select ${activeTab}`}
                    items={categories[activeTab]}
                    onClose={() => setModalOpen(false)}
                    onSelect={handleSelect}
                    onGenerate={handleGenerate}
                />
            )}
        </div>
    );
};

export default Vibrations;
