import React from 'react';

const OptionsPanel: React.FC = () => (
  <div className="options-panel flex justify-center p-4 space-x-4 font-gopher-mono">
    <label className="block mb-2">
      <span className="">Tempo: </span>
      <input type="number" className="input-field" placeholder="120" />
    </label>
    <label className="block mb-2">
      <span className="">Transpose: </span>
      <input type="number" className="input-field" placeholder="0" />
    </label>    
  </div>
);

export default OptionsPanel;
