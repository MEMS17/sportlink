import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bienvenue sur SportLink !</h1>
      <p>Plateforme de gestion et location de matériel sportif.</p>
      <nav>
        <Link to="/login">Se connecter</Link> | <Link to="/register">S'inscrire</Link>
      </nav>
    </div>
  );
};

export default Home;