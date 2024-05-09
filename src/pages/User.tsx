import React, { useEffect, useState } from "react";
import { UserModel } from "../models/UserModel";
import { api_users } from "../services/apiService";
import { useAuthContext } from "../hooks/useAuthContext";

const User = () => {
  const [user, setUser] = useState<UserModel>();

  const { getToken } = useAuthContext();

  const getUserInfo: () => Promise<UserModel> = async () => {
    api_users.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

    const data = await api_users
      .get("/my-user")
      .then((res) => setUser(res.data))
      .catch((error) => error.message);

    return data;
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <div>
        <p>{user?.id}</p>
        <p>{user?.email}</p>
        <p>Username {user?.name}</p>
      </div>
      <div>
        <p>Wallet Id{user?.wallet.id}</p>
        <p>{user?.wallet.balance}</p>
        <p>{user?.wallet.lastUpdate}</p>
      </div>
    </div>
  );
};

export default User;
