import Api from "./api.ts";
import type { Comment, RealworldResult } from "./models.ts";

export class CommentApi {
  async getComments(slug: string): Promise<RealworldResult<{ comments: Comment }, Comment>> {
    return await (
      await fetch(`${Api.host}/articles/${slug}/comments`, {
        method: "GET",
        headers: Api.defaultHeaders,
      })
    ).json();
  }
  async createComment(
    token: string,
    slug: string,
    body: string,
  ): Promise<RealworldResult<{ comment: Comment }, Comment>> {
    console.log(token, slug, body);

    return await (
      await fetch(`${Api.host}/articles/${slug}/comments`, {
        method: "POST",
        body: JSON.stringify({ comment: { body } }),
        headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async deleteComment(token: string, slug: string, id: number): Promise<RealworldResult<{}, Comment>> {
    const res = await fetch(`${Api.host}/articles/${slug}/comments/${id}`, {
      method: "DELETE",
      headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
    });
    return res.status == 200 ? {} : await res.json();
  }
}
