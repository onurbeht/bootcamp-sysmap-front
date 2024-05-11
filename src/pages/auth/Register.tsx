import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_users } from "../../services/apiService";
import { useAuthContext } from "../../hooks/useAuthContext";

import { Button } from "@/components/ui/button";
import { BsArrowClockwise } from "react-icons/bs";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [loading, setLoading] = useState(false);

  const { login } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPass) {
      console.log("Senhas não são iguais");
      setLoading(false);
      return;
    }

    await api_users
      .post("/create", { username, email, password })
      .then((res) => console.log(res.data))
      .catch((erro) => {
        setLoading(false);
        console.log(erro.response.data);
        return;
      });

    await login(email, password);

    setLoading(false);
    navigate("/");
  };

  return (
    <div className=" min-h-screen max-h-screen w-screen max-w-full grid grid-cols-3 grid-flow-col items-center font-bold">
      <div className="bg-auth-image bg-cover bg-no-repeat max-w-full h-full col-span-2 grid grid-cols-3 grid-rows-3 grid-flow-col">
        <div className="col-start-2 w-50 h-20 bg-red-600 blur-3xl" />
        <div className="row-span-1 row-end-5 w-40 h-20 bg-yellow-200 blur-3xl" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl pb-4">Record Store</h2>
        <p className="pb-5">Cadastre-se para explorar mais!</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center border-slate-700 border-2 p-8 rounded-md mb-8 shadow-black shadow-2xl"
        >
          <label className="flex flex-col pb-2 text-violet-600 text-lg">
            <span>Nome</span>
            <input
              type="text"
              name="username"
              placeholder="Ensira seu nome"
              required={true}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-md border-none placeholder:bg-white outline-none p-2"
            />
          </label>
          <label className="flex flex-col pb-2 text-violet-600 text-lg">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Ensira seu email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border-none placeholder:bg-white outline-none p-2"
            />
          </label>
          <label className="flex flex-col pb-2 text-violet-600 text-lg">
            <span>Senha</span>
            <input
              type="password"
              name="password"
              placeholder="Ensira sua senha"
              required={true}
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border-none placeholder:bg-white outline-none p-2"
            />
          </label>
          <label className="flex flex-col pb-2 text-violet-600 text-lg">
            <span>Confirme a Senha</span>
            <input
              type="password"
              name="confirmPass"
              placeholder="Repita sua senha"
              required={true}
              minLength={4}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="rounded-md border-none placeholder:bg-white outline-none p-2"
            />
          </label>

          {!loading ? (
            <Button variant="outline" type="submit">
              Cadastrar
            </Button>
          ) : (
            <Button disabled>
              <BsArrowClockwise className="mr-2 h-4 w-4 animate-spin" />{" "}
              Aguarde...
            </Button>
          )}
        </form>

        <p>
          Já tem uma conta?{" "}
          <Link to="/login" className="font-bold text-violet-600 underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
