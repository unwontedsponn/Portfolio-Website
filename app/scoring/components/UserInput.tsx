// UserInput.tsx
import React, { useState } from "react";
import SlideFadeIn from "@/app/components/SlideFadeIn";

interface UserInputProps {
  currentBeat: number;
  onNoteSelect: (note: string, duration: "quarter" | "half", range: "low" | "high") => void;
  onReset: () => void;
  isStaveFull: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ currentBeat, onNoteSelect, onReset, isStaveFull }) => {
  const [selectedNote, setSelectedNote] = useState<string>("C");
  const [selectedDuration, setSelectedDuration] = useState<"quarter" | "half">("quarter");
  const [selectedRange, setSelectedRange] = useState<"low" | "high">("low");

  const notes = ["C", "D", "E", "F", "G", "A", "B"];

  const handleNoteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNote(event.target.value);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDuration(event.target.value as "quarter" | "half");
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRange(event.target.value as "low" | "high");
  };

  const handleAddNote = () => {
    onNoteSelect(selectedNote, selectedDuration, selectedRange);
  };

  return (
    <div className="flex flex-col items-center justify-center font-gopher-mono">            
      
      <div className="w-full max-w-2xl px-6">             
        {/* Note Selection */}
        <SlideFadeIn direction="left" className="mb-4">
          <label className="block text-dark-gray font-medium mb-2">Choose a Note:</label>
          <select
            value={selectedNote}
            onChange={handleNoteChange}
            className="w-full border border-gray-400 rounded px-2 py-1 text-dark-gray"
          >
            {notes.map((note) => (
              <option key={note} value={note}>
                {note}
              </option>
            ))}
          </select>
        </SlideFadeIn>

        {/* Duration Selection */}
        <SlideFadeIn direction="up" className="mb-4">
          <label className="block text-dark-gray font-medium mb-2">Choose Note Duration:</label>
          <select
            value={selectedDuration}
            onChange={handleDurationChange}
            className="w-full border border-gray-400 rounded px-2 py-1 text-dark-gray"
          >
            <option value="quarter">Quarter Note</option>
            <option
              value="half"
              disabled={(currentBeat % 4) > 2 || currentBeat >= 15}
            >
              Half Note
            </option>
          </select>
        </SlideFadeIn>

        {/* Range Selection */}
        <SlideFadeIn direction="left" className="mb-4">
          <label className="block text-dark-gray font-medium mb-2">Choose High or Low:</label>
          <select
            value={selectedRange}
            onChange={handleRangeChange}
            className="w-full border border-gray-400 rounded px-2 py-1 text-dark-gray"
          >
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </SlideFadeIn>

        {/* Buttons */}
        <SlideFadeIn direction="right" className="flex flex-row gap-4">
          <button
            onClick={handleAddNote}
            disabled={isStaveFull}
            className={`w-full py-2 px-4 font-medium ${
              isStaveFull
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-light-blue w-full border-3 border-thick-border-gray hover:cursor-pointer hover:opacity-75"
            }`}
          >
            Add Note
          </button>

          <button
            onClick={onReset}
            className="bg-pink w-full border-3 border-thick-border-gray py-2 px-4 hover:cursor-pointer hover:opacity-75"
          >
            Reset
          </button>
        </SlideFadeIn>
      </div>
    </div>
  );
};

export default UserInput;
