import React from 'react';
import { useBlocStore } from '../stores/blocStore';
import DraggableBloc from './DraggableBloc';
import ConnectionLine from './ConnectionLine';

const Workspace = ({ onSelectBloc }) => {
  const blocs = useBlocStore(state => state.blocs);
  const addBloc = useBlocStore(state => state.addBloc);

  const handleDoubleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addBloc("equipment", null, x, y);
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#f0f0f0'
      }}
    >
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#3a86ff" />
          </marker>
        </defs>
        {blocs.flatMap(bloc =>
          bloc.connections.map(connId => {
            const target = blocs.find(b => b.id === connId);
            return target ? (
              <ConnectionLine key={`${bloc.id}-${connId}`} from={bloc} to={target} />
            ) : null;
          })
        )}
      </svg>
      {blocs.map(bloc => (
        <DraggableBloc key={bloc.id} bloc={bloc} onSelect={onSelectBloc} />
      ))}
    </div>
  );
};

export default Workspace;
