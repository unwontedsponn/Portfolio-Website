import React from 'react';

const Toolbar: React.FC = () => (
  <div className="mx-auto toolbar p-4 flex justify-center space-x-4 font-gopher-mono text-base md:text-xs lg:text-base">
    <button className="toolbar-button border-3 border-thick-border-gray py-2 px-4 hover:cursor-pointer hover:opacity-75">Enter Note</button>            
    <button className="toolbar-button border-3 border-thick-border-gray py-2 px-4 hover:cursor-pointer hover:opacity-75">Key Signature</button>
    <button className="toolbar-button border-3 border-thick-border-gray py-2 px-4 hover:cursor-pointer hover:opacity-75">Playback</button>
  </div>
);

export default Toolbar;
