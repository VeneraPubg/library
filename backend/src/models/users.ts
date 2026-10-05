import { users, User } from "../data";

export function getAllUsers(): User[] {
  return users;
}

export function getUserByID(id: string): User | undefined {
  return users.find((user) => user.id === id);
}
