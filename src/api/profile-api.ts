import Api from "./api.ts";
import type { Profile, RealworldResult } from "./models.ts";

export class ProfileApi {
  async getProfile(username: string): Promise<RealworldResult<{ profile: Profile }, Profile>> {
    return await (
      await fetch(`${Api.host}/profiles/${username}`, {
        method: "GET",
        headers: Api.defaultHeaders,
      })
    ).json();
  }
  async followProfile(token: string, username: string): Promise<RealworldResult<{ profile: Profile }, Profile>> {
    return await (
      await fetch(`${Api.host}/profiles/${username}/follow`, {
        method: "POST",
        headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async unfollowProfile(token: string, username: string): Promise<RealworldResult<{ profile: Profile }, Profile>> {
    return await (
      await fetch(`${Api.host}/profiles/${username}/follow`, {
        method: "DELETE",
        headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
}
