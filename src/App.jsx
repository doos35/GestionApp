import React from 'react';
import Workspace from './components/Workspace';
import InventoryPanel from './components/InventoryPanel';

const App = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Workspace />
      </div>
      <InventoryPanel />
    </div>
  );
};

export default App;
