import React from 'react';
import { useBlocStore } from '../stores/blocStore';

const InventoryPanel = () => {
  const blocs = useBlocStore(state => state.blocs);
  const updateBloc = useBlocStore(state => state.updateBloc);

  const handleScan = (id) => {
    updateBloc(id, { qrScanned: true });
  };

  return (
    <div style={{ padding: 10, width: 300, borderLeft: '1px solid #ccc', background: '#fafafa' }}>
      <h3>Inventaire</h3>
      {blocs.map(bloc => (
        <div key={bloc.id} style={{ marginBottom: 5 }}>
          <strong>{bloc.name}</strong> – {bloc.qrScanned ? '✅ Scanné' : '❌ Non scanné'}
          {!bloc.qrScanned && (
            <button onClick={() => handleScan(bloc.id)} style={{ marginLeft: 5 }}>
              Scanner
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default InventoryPanel;
