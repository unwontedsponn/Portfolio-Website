import React, { useState } from "react";

const Worksheet: React.FC = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 8 }, () => ({
        note: "",
        rhythm: "",
      }))
    )
  );

  const handleCellClick = (rowIdx: number, colIdx: number) => {
    const noteOptions = ["C", "D", "E", "F", "G", "A", "B", "Db", "Eb", "Gb", "Ab", "Bb"];
    const rhythmOptions = ["whole note", "half note", "quarter note"];
    const note = prompt(
      `Choose a note (${noteOptions.join(", ")}):`,
      noteOptions[0]
    );
    const rhythm = prompt(
      `Choose a rhythm (${rhythmOptions.join(", ")}):`,
      rhythmOptions[0]
    );
    if (note && rhythm) {
      const newGrid = grid.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIdx && cIdx === colIdx
            ? { note, rhythm } // Update clicked cell
            : cell // Keep existing values
        )
      );
      setGrid(newGrid);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="border border-orange-500">        

        {/* Main Grid */}
        {grid.map((row, rowIdx) => (
          <div key={`row-${rowIdx}`} className="flex border border-orange-500">            
            <div className="flex-1 grid grid-cols-10">
              {row.map((cell, colIdx) => (
                <div
                  key={`cell-${rowIdx}-${colIdx}`}
                  className="border-l border-orange-500 flex justify-center items-center text-sm text-center cursor-pointer h-16 w-16"
                  onClick={() => handleCellClick(rowIdx, colIdx)}
                >
                  <div>
                    <div>{cell.note}</div>
                    <div className="text-xs">{cell.rhythm}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Worksheet;
