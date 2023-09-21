import { ObjectId } from "mongodb";

export type User = {
  id: ObjectId;
  name: string;
  password: string;
  email: string;
  username: string;
  role: string;
}