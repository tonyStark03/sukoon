interface TabNavProps {
    activeTab: "Sounds" | "Music" | "Brainwaves";
    setActiveTab: (tab: "Sounds" | "Music" | "Brainwaves") => void;
    counts: { Sounds: number; Music: number; Brainwaves: number };
}

const TabNav: React.FC<TabNavProps> = ({ activeTab, setActiveTab, counts }) => {
    const tabs = [
        { name: "Sounds", count: `${counts.Sounds}/8` },
        { name: "Music", count: `${counts.Music}/6` },
        { name: "Brainwaves", count: `${counts.Brainwaves}/5` }
    ];

    return (
        <div className="border-b border-neutral-700">
            <div className="flex justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        className={`px-6 py-3 relative ${
                            activeTab === tab.name ? "text-white" : "text-gray-400"
                        }`}
                        onClick={() => setActiveTab(tab.name as "Sounds" | "Music" | "Brainwaves")}
                    >
                        {tab.name} <span className="text-sm text-gray-400">({tab.count})</span>
                        {activeTab === tab.name && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabNav;
