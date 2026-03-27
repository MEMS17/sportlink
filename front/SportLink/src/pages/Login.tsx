import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Merci de saisir un email valide !");
      return;
    }

    if (!password) {
      setError("Merci de saisir votre mot de passe !");
      return;
    }

    setError(""); 
    alert(`Email: ${email}, Password: ${password}`);
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
        {error && <p className="error-message">{error}</p>}    </div>
  );
};

export default Login;