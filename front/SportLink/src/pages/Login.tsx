import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Merci de saisir un email valide !");
      return;
    }

    if (!password) {
      setError("Merci de saisir votre mot de passe !");
      return;
    }

    try {
      const response = await login(email, password);
      const token = response.data.token;
      localStorage.setItem('token', token);
      const decoded: any = jwtDecode(token);
      if (decoded.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/member');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
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
      <button onClick={handleLogin}>Se connecter</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;