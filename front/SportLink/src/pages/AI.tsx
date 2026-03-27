import { useState } from "react";
import { getRecommendations, createReservation } from "../services/api";

const AI: React.FC = () => {
  const [description, setDescription] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleGetRecommendations = async () => {
    try {
      const res = await getRecommendations(description);
      setRecommendations(res.data);
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
        alert("Réservation effectuée !");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="ai-container">
      <h1>Assistant IA de Recommandation</h1>
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
  );
};

export default AI;