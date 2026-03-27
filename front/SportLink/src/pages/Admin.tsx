import React, { useState, useEffect } from "react";
import { getUsers, getReservations, getEquipment, createEquipment, updateEquipment, deleteEquipment } from "../services/api";

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [newEquipment, setNewEquipment] = useState({ name: '', sport: '', category: '', quantity: 0, description: '', imageUrl: '', available: true });

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'reservations') fetchReservations();
    if (activeTab === 'equipment') fetchEquipment();
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await getReservations();
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEquipment = async () => {
    try {
      const res = await getEquipment();
      setEquipment(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateEquipment = async () => {
    try {
      await createEquipment(newEquipment);
      fetchEquipment();
      setNewEquipment({ name: '', sport: '', category: '', quantity: 0, description: '', imageUrl: '', available: true });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateEquipment = async (id: string, data: any) => {
    try {
      await updateEquipment(id, data);
      fetchEquipment();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEquipment = async (id: string) => {
    try {
      await deleteEquipment(id);
      fetchEquipment();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Espace Admin</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab('users')}>Utilisateurs</button>
        <button onClick={() => setActiveTab('reservations')}>Réservations</button>
        <button onClick={() => setActiveTab('equipment')}>Équipements</button>
      </div>

      {activeTab === 'users' && (
        <div>
          <h2>Utilisateurs</h2>
          <ul>
            {users.map((user: any) => (
              <li key={user._id}>{user.name} - {user.email} - {user.role}</li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'reservations' && (
        <div>
          <h2>Réservations</h2>
          <ul>
            {reservations.map((res: any) => (
              <li key={res._id}>User: {res.userId.name} - Equipment: {res.equipmentId.name} - Status: {res.status}</li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'equipment' && (
        <div>
          <h2>Équipements</h2>
          <div>
            <h3>Ajouter Équipement</h3>
            <input placeholder="Nom" value={newEquipment.name} onChange={e => setNewEquipment({...newEquipment, name: e.target.value})} />
            <input placeholder="Sport" value={newEquipment.sport} onChange={e => setNewEquipment({...newEquipment, sport: e.target.value})} />
            <input placeholder="Catégorie" value={newEquipment.category} onChange={e => setNewEquipment({...newEquipment, category: e.target.value})} />
            <input type="number" placeholder="Quantité" value={newEquipment.quantity} onChange={e => setNewEquipment({...newEquipment, quantity: parseInt(e.target.value)})} />
            <input placeholder="Description" value={newEquipment.description} onChange={e => setNewEquipment({...newEquipment, description: e.target.value})} />
            <input placeholder="Image URL" value={newEquipment.imageUrl} onChange={e => setNewEquipment({...newEquipment, imageUrl: e.target.value})} />
            <button onClick={handleCreateEquipment}>Ajouter</button>
          </div>
          <ul>
            {equipment.map((eq: any) => (
              <li key={eq._id}>
                {eq.name} - {eq.sport} - Qty: {eq.quantity}
                <button onClick={() => handleUpdateEquipment(eq._id, { available: !eq.available })}>
                  {eq.available ? 'Désactiver' : 'Activer'}
                </button>
                <button onClick={() => handleDeleteEquipment(eq._id)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;