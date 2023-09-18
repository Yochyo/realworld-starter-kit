import type { RealworldResult, User } from "./models.ts";
import Api from "./api.ts";

export class UserApi {
  async registerUser(args: {
    username: string;
    email: string;
    password: string;
  }): Promise<RealworldResult<{ user: User }, User>> {
    return await (
      await fetch(`${Api.host}/users`, {
        method: "POST",
        body: JSON.stringify({ user: args }),
        headers: Api.defaultHeaders,
      })
    ).json();
  }

  async loginUser(args: { email: string; password: string }): Promise<RealworldResult<{ user: User }, User>> {
    return await (
      await fetch(`${Api.host}/users/login`, {
        method: "POST",
        body: JSON.stringify({ user: args }),
        headers: Api.defaultHeaders,
      })
    ).json();
  }

  async getLoggedInUser(token: string): Promise<RealworldResult<{ user: User }, User>> {
    return await (
      await fetch(`${Api.host}/user`, {
        method: "GET",
        headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }

  async updateUser(
    token: string,
    args: Partial<User & { password: string }>,
  ): Promise<RealworldResult<{ user: User }, User>> {
    return await (
      await fetch(`${Api.host}/user`, {
        method: "PUT",
        body: JSON.stringify({ user: args }),
        headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
}
