import Api from "./api.ts";
import type { Article, RealworldResult } from "./models.ts";

export class FavoriteApi {
  async favoriteArticle(token: string, slug: string): Promise<RealworldResult<{ article: Article }, Article>> {
    return await (
      await fetch(`${Api.host}/articles/${slug}/favorite`, {
        method: "POST",
        headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async unfavoriteArticle(token: string, slug: string): Promise<RealworldResult<{ article: Article }, Article>> {
    return await (
      await fetch(`${Api.host}/articles/${slug}/favorite`, {
        method: "DELETE",
        headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
}
