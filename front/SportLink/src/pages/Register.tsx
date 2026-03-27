import React, { useState } from "react";
import { register } from "../services/api";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      setError("Merci de saisir votre nom !");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Merci de saisir un email valide !");
      return;
    }

    if (!password) {
      setError("Merci de saisir votre mot de passe !");
      return;
    }

    try {
      await register(name, email, password);
      alert("Inscription réussie !");
      // Rediriger vers login ou home
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>S'inscrire</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;