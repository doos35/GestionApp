import React, { useRef, useState } from 'react';
import { useBlocStore } from '../stores/blocStore';

const DraggableBloc = ({ bloc }) => {
  const updateBloc = useBlocStore(state => state.updateBloc);
  const nestBloc = useBlocStore(state => state.nestBloc);
  const connectBlocs = useBlocStore(state => state.connectBlocs);
  const blocs = useBlocStore(state => state.blocs);
  const [dragging, setDragging] = useState(false);
  const ref = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    offset.current = { x: e.clientX - bloc.x, y: e.clientY - bloc.y };
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const x = e.clientX - offset.current.x;
    const y = e.clientY - offset.current.y;
    updateBloc(bloc.id, { x, y });
  };

  const handleMouseUp = (e) => {
    setDragging(false);

    if (e.altKey) {
      const myRect = ref.current?.getBoundingClientRect();
      const target = blocs.find(b => {
        if (b.id === bloc.id) return false;
        const el = document.getElementById(`bloc-${b.id}`);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
          myRect.x > rect.x &&
          myRect.y > rect.y &&
          myRect.x < rect.x + rect.width &&
          myRect.y < rect.y + rect.height
        );
      });

      if (target) {
        nestBloc(bloc.id, target.id);
      }
    }
  };

  const handleConnectClick = () => {
    if (!window.connectSource) {
      window.connectSource = bloc.id;
      alert("Bloc source sélectionné. Cliquez maintenant sur le bloc cible.");
    } else {
      connectBlocs(window.connectSource, bloc.id);
      window.connectSource = null;
      alert("Blocs connectés !");
    }
  };

  return (
    <div
      id={`bloc-${bloc.id}`}
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: 'absolute',
        left: bloc.x,
        top: bloc.y,
        cursor: 'grab',
        padding: 10,
        background: '#fff',
        border: bloc.parentId ? '1px dashed #7b2cbf' : '1px solid #000',
        borderRadius: 4
      }}
    >
      {bloc.type}
      <button onClick={handleConnectClick} style={{ marginLeft: 5 }}>🔗</button>
    </div>
  );
};

export default DraggableBloc;
