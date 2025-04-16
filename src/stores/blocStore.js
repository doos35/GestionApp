import { create } from 'zustand';
import { nanoid } from 'nanoid';

export const useBlocStore = create((set, get) => ({
  blocs: [],

  addBloc: (type, parentId = null, x = 100, y = 100) => {
    const id = nanoid();
    const newBloc = {
      id,
      name: `Bloc-${id.slice(0, 4)}`,
      description: '',
      type,
      color: '#ffffff',
      parentId,
      children: [],
      connections: [],
      x,
      y,
      qrScanned: false
    };
    set(state => ({ blocs: [...state.blocs, newBloc] }));
    return id;
  },

  updateBloc: (id, updates) => {
    set(state => ({
      blocs: state.blocs.map(bloc =>
        bloc.id === id ? { ...bloc, ...updates } : bloc
      )
    }));
  },

  deleteBloc: (id) => {
    set(state => ({
      blocs: state.blocs.filter(bloc => bloc.id !== id).map(bloc => ({
        ...bloc,
        children: bloc.children.filter(c => c !== id),
        connections: bloc.connections.filter(c => c !== id)
      }))
    }));
  },

  nestBloc: (childId, parentId) => {
    set(state => ({
      blocs: state.blocs.map(bloc => {
        if (bloc.id === childId) bloc.parentId = parentId;
        if (bloc.id === parentId && !bloc.children.includes(childId)) {
          bloc.children.push(childId);
        }
        return bloc;
      })
    }));
  },

  connectBlocs: (sourceId, targetId) => {
    set(state => ({
      blocs: state.blocs.map(bloc => {
        if (bloc.id === sourceId && !bloc.connections.includes(targetId)) {
          return { ...bloc, connections: [...bloc.connections, targetId] };
        }
        if (bloc.id === targetId && !bloc.connections.includes(sourceId)) {
          return { ...bloc, connections: [...bloc.connections, sourceId] };
        }
        return bloc;
      })
    }));
  }
}));
