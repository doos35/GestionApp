import { create } from 'zustand';
import { nanoid } from 'nanoid';

export const useBlocStore = create((set, get) => ({
  blocs: [],

  addBloc: (type, parentId = null, x = 100, y = 100) => {
    const id = nanoid();
    const newBloc = { id, type, parentId, children: [], connections: [], x, y };
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
