import { useState, useEffect } from "react";
import { getEquipment, getMyReservations, createReservation, returnReservation, getRecommendations } from "../services/api";

const Member: React.FC = () => {
  const [equipment, setEquipment] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [filters, setFilters] = useState({ sport: '', category: '', available: true });
  const [description, setDescription] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchEquipment();
    fetchReservations();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await getEquipment(filters);
      setEquipment(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await getMyReservations();
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReserve = async (equipmentId: string) => {
    const startDate = prompt("Date de début (YYYY-MM-DD)");
    const endDate = prompt("Date de fin (YYYY-MM-DD)");
    if (startDate && endDate) {
      try {
        await createReservation(equipmentId, startDate, endDate);
        fetchReservations();
        fetchEquipment(); // Pour mettre à jour le stock
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleReturn = async (id: string) => {
    try {
      await returnReservation(id);
      fetchReservations();
      fetchEquipment();
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetRecommendations = async () => {
    try {
      const res = await getRecommendations(description);
      setRecommendations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="member-container">
      <h1>Espace Membre</h1>

      <div>
        <h2>Catalogue</h2>
        <div className="filters">
          <input placeholder="Sport" value={filters.sport} onChange={e => setFilters({...filters, sport: e.target.value})} />
          <input placeholder="Catégorie" value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})} />
          <button onClick={fetchEquipment}>Filtrer</button>
        </div>
        <div className="equipment-list">
          {equipment.map((eq: any) => (
            <div key={eq._id} className="equipment-card">
              <h3>{eq.name}</h3>
              <p>{eq.description}</p>
              <p>Sport: {eq.sport}, Catégorie: {eq.category}, Quantité: {eq.quantity}</p>
              {eq.available && <button onClick={() => handleReserve(eq._id)}>Réserver</button>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Mes Réservations</h2>
        <ul>
          {reservations.map((res: any) => (
            <li key={res._id}>
              {res.equipmentId.name} - Du {new Date(res.startDate).toLocaleDateString()} au {new Date(res.endDate).toLocaleDateString()} - Status: {res.status}
              {res.status === 'ACTIVE' && <button onClick={() => handleReturn(res._id)}>Retourner</button>}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Assistant IA de Recommandation</h2>
        <textarea
          placeholder="Décrivez votre activité (ex: Je veux faire du foot en salle avec 8 amis)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={handleGetRecommendations}>Obtenir Recommandations</button>

        <div className="recommendations">
          {recommendations.map((eq: any) => (
            <div key={eq._id} className="equipment-card">
              <h3>{eq.name}</h3>
              <p>{eq.description}</p>
              <p>Sport: {eq.sport}, Catégorie: {eq.category}, Quantité: {eq.quantity}</p>
              {eq.available && <button onClick={() => handleReserve(eq._id)}>Réserver</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Member;