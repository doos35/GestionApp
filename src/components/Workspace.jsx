import React from 'react';
import { useBlocStore } from '../stores/blocStore';
import DraggableBloc from './DraggableBloc';

const Workspace = () => {
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
      {blocs.map(bloc => (
        <DraggableBloc key={bloc.id} bloc={bloc} />
      ))}
    </div>
  );
};

export default Workspace;
