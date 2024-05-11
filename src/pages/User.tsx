import React, { FormEvent, useEffect, useState } from "react";
import { UserModel } from "../models/UserModel";
import { api_users, api_wallet } from "../services/apiService";
import { useAuthContext } from "../hooks/useAuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BsArrowClockwise, BsBoxArrowRight } from "react-icons/bs";
import { Input } from "@/components/ui/input";

const User = () => {
  const [user, setUser] = useState<UserModel>();
  const [loading, setLoading] = useState(true);
  const [loadingFormUser, setLoadingFormUser] = useState(false);
  const [loadingFormWallet, setLoadingFormWallet] = useState(false);

  const [username, setUsername] = useState(user?.name);
  const [password, setPassword] = useState("");
  const [walletBalance, setWalletbalance] = useState<number>(0);

  const { getToken, logout } = useAuthContext();

  const getUserInfo: () => Promise<UserModel> = async () => {
    api_users.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

    const data = await api_users
      .get("/my-user")
      .then((res) => setUser(res.data))
      .catch((error) => error.message);

    return data;
  };

  const handleUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingFormUser(true);

    if (password && password.length < 3) {
      console.log("A senha precisa ter no minimo 3 caracteres!");
      setLoadingFormUser(false);
      return;
    }

    let data = {};

    if (password && username) data = { password, username };
    if (password && !username) data = { password, username: "" };
    if (!password && !username) return console.log("nenhum dado foi alterado");

    api_users.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

    const response = await api_users.put("/update/" + user?.id, data);

    if (response.status === 204) console.log("dados atualizados");
    if (response.status === 403) {
      console.log(response);
      setLoadingFormUser(false);
      return;
    }

    getUserInfo();

    setLoadingFormUser(false);
    return;
  };

  const handleWallet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingFormWallet(true);

    console.log("Entrou");

    if (walletBalance <= 0) {
      console.log("Não é possivel depositar um valor negativo!");
      setLoadingFormWallet(false);
      return;
    }

    api_wallet.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

    const data = { value: walletBalance };
    console.log("Enviando...");
    await api_wallet
      .post("/credit", data)
      .then(() => {
        console.log("Saldo atualizado");
        getUserInfo();
        setLoadingFormWallet(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingFormWallet(false);
        return;
      });
  };

  useEffect(() => {
    getUserInfo();
    setLoading(false);
  }, []);

  return (
    <div className="container min-h-screen min-w-full max-w-max">
      {loading ? (
        <div className="flex justify-center items-center space-x-4 mt-10">
          <Skeleton className="bg-slate-400 h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="bg-slate-400 h-4 w-[250px]" />
            <Skeleton className="bg-slate-400 h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <>
          <div className="container flex justify-between border-b-2 border-slate-400 mt-10">
            <p className="text-2xl">
              Olá, <span className="font-bold">{user?.name}</span>
            </p>
            <Button
              variant="destructive"
              className="mb-2"
              onClick={() => logout()}
            >
              <BsBoxArrowRight className="size-5" />
              <span className="pl-1">Sair</span>
            </Button>
          </div>
          <div className="container mt-5 grid grid-flow-row grid-cols-4 grid-rows-2">
            <div className=" border-slate-500 border-2 rounded-md col-span-2 col-start-2 row-start-1 row-span-1 mb-2 p-4">
              <label>
                Seu email:
                <Input
                  disabled
                  type="email"
                  placeholder={user?.email}
                  className="mb-2 text-lg"
                />
              </label>
              <form onSubmit={handleUser} className="gap-2">
                <label>
                  Novo nome de usuario:
                  <Input
                    type="text"
                    min={3}
                    value={username}
                    placeholder={user?.name}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <label>
                  Nova senha:
                  <Input
                    type="text"
                    min={3}
                    value={password}
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <div className="flex justify-center">
                  {!loadingFormUser ? (
                    <Button variant="outline" type="submit" className="mt-2">
                      Atualizar
                    </Button>
                  ) : (
                    <Button disabled className="mt-2">
                      <BsArrowClockwise className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Aguarde...
                    </Button>
                  )}
                </div>
              </form>
            </div>
            <div className=" col-span-2 col-start-2 row-start-2 row-span-1 border-slate-500 border-2 rounded-md p-4 mb-5">
              <p className="font-bold">Wallet Id:</p>
              <span className="border-b-2 border-slate-500">
                {user?.wallet.id}
              </span>
              <p className="font-bold">Saldo:</p>
              <span className="p-2 underline">R$ {user?.wallet.balance}</span>
              <p className="font-bold">Ultima atualização:</p>
              <span className="p-2 underline">{user?.wallet.lastUpdate}</span>

              <form
                onSubmit={handleWallet}
                className="mt-4 p-2 border-t-2 border-slate-500"
              >
                <label>
                  Deposite um valor para sua wallet
                  <Input
                    type="number"
                    placeholder={"R$ xx.xx"}
                    required
                    value={walletBalance}
                    onChange={(e) => setWalletbalance(e.target.valueAsNumber)}
                    className="mb-2 text-lg"
                  />
                </label>
                <div className="flex justify-center">
                  {!loadingFormWallet ? (
                    <Button variant="outline" type="submit" className="mt-2">
                      Depositar
                    </Button>
                  ) : (
                    <Button disabled className="mt-2">
                      <BsArrowClockwise className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Aguarde...
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
