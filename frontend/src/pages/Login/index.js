import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    const response = await api.post("/session", { email });

    const {_id} = response.data;

    localStorage.setItem('user',_id);

    console.log(_id)
    
    history.push("/dashboard");
  }

  return (
        <>
        <p>
          Ofereça <strong>spots</strong> para progrmadores e encontre
          <strong>talentos</strong> para a sua empresa
        </p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">E-MAIL</label>
          <input
            type="email"
            id="email"
            placeholder="Seu email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <button type="submit" className="btn">
            Entrar
          </button>
        </form>
        </>
  );
}
