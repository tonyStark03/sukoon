import React, { useState } from "react";

interface SelectionCardProps {
    title: string;
    items: string[];
    onClose: () => void;
    onSelect: (item: string) => void;
    onGenerate: () => void;
}

const SelectionCard: React.FC<SelectionCardProps> = ({ title, items, onClose, onSelect, onGenerate }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleSelect = (item: string) => {
        setSelectedItem(item); // Update the selected item
        onSelect(item); // Call the parent function
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-neutral-800 text-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button onClick={onClose} className="text-lg">✖</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {items.map((item) => (
                        <button
                            key={item}
                            onClick={() => handleSelect(item)}
                            className={`px-4 py-2 rounded hover:bg-neutral-600 ${
                                selectedItem === item ? "bg-green-600" : "bg-neutral-700"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <button onClick={onGenerate} className="mt-4 w-full bg-gray-700 py-2 rounded-lg hover:bg-gray-600">
                    Generate
                </button>
            </div>
        </div>
    );
};

export default SelectionCard;
