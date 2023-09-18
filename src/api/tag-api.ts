import type { RealworldResult, Tag } from "./models.ts";
import Api from "./api.ts";

export class TagApi {
  async getTags(): Promise<RealworldResult<{ tags: Tag[] }, { tags: Tag[] }>> {
    return await (
      await fetch(`${Api.host}/tags`, {
        method: "GET",
        headers: Api.defaultHeaders,
      })
    ).json();
  }
}
