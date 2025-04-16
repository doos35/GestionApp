import React, { useState } from 'react';
import Workspace from './components/Workspace';
import InventoryPanel from './components/InventoryPanel';
import BlocEditor from './components/BlocEditor';

const App = () => {
  const [selectedBloc, setSelectedBloc] = useState(null);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <Workspace onSelectBloc={setSelectedBloc} />
        {selectedBloc && (
          <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100 }}>
            <BlocEditor bloc={selectedBloc} onClose={() => setSelectedBloc(null)} />
          </div>
        )}
      </div>
      <InventoryPanel />
    </div>
  );
};

export default App;
