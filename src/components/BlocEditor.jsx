import React from 'react';
import { useBlocStore } from '../stores/blocStore';

const BlocEditor = ({ bloc, onClose }) => {
  const updateBloc = useBlocStore(state => state.updateBloc);
  const deleteBloc = useBlocStore(state => state.deleteBloc);

  const handleChange = (e) => {
    updateBloc(bloc.id, { [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: 10, background: '#fff', border: '1px solid #ccc', width: 250 }}>
      <h4>Modifier Bloc</h4>
      <input name="name" value={bloc.name} onChange={handleChange} placeholder="Nom" />
      <input name="description" value={bloc.description} onChange={handleChange} placeholder="Description" />
      <select name="type" value={bloc.type} onChange={handleChange}>
        <option value="baie">Baie</option>
        <option value="carte">Carte</option>
        <option value="alim">Alimentation</option>
        <option value="equipment">Équipement</option>
      </select>
      <input name="color" type="color" value={bloc.color} onChange={handleChange} />
      <br />
      <button onClick={onClose}>Fermer</button>
      <button onClick={() => deleteBloc(bloc.id)} style={{ color: 'red', marginLeft: 5 }}>Supprimer</button>
    </div>
  );
};

export default BlocEditor;
