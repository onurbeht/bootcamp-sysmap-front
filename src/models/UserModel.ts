export interface UserModel {
  id: string;
  name: string;
  email: string;
  wallet: Wallet;
}

type Wallet = {
  id: string;
  balance: number;
  points: number;
  lastUpdate: string;
  owner: string;
};
