import Api from "./api.ts";
import type { Article, Articles, RealworldResult } from "./models.ts";

export class ArticleApi {
  async getArticleFeed(token: string, args: { page?: number }): Promise<RealworldResult<Articles, Article>> {
    const { page = 0 } = args;
    return await (
      await fetch(`${Api.host}/articles/feed?offset=${page * 20}&limit=20`, {
        method: "GET",
        headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async getArticles(args: {
    tag?: string;
    page?: number;
    favorited?: string;
    author?: string;
  }): Promise<RealworldResult<Articles, Article>> {
    const { page = 0 } = args;
    const params = new URLSearchParams();
    params.append("offset", (page * 20).toString());
    params.append("limit", "20");
    if (args.tag) params.append("tag", args.tag);
    if (args.favorited) params.append("favorited", args.favorited);
    if (args.author) params.append("author", args.author);

    return await (
      await fetch(`${Api.host}/articles?${params}`, {
        method: "GET",

        headers: { ...Api.defaultHeaders },
      })
    ).json();
  }

  async createArticle(
    token: string,
    args: { title: string; description: string; body: string; tagList: string[] },
  ): Promise<RealworldResult<{ article: Article }, Article>> {
    return await (
      await fetch(`${Api.host}/articles`, {
        method: "POST",
        body: JSON.stringify({ article: args }),
        headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async deleteArticle(token: string, slug: string): Promise<RealworldResult<{}, Article>> {
    return await (
      await fetch(`${Api.host}/articles`, {
        method: "POST",
        headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async updateArticle(
    token: string,
    slug: string,
    args: { title: string; description: string; body: string },
  ): Promise<RealworldResult<{ article: Article }, Article>> {
    return await (
      await fetch(`${Api.host}/articles/${slug}`, {
        method: "PUT",
        body: JSON.stringify({ article: args }),
        headers: { ...Api.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async getArticle(slug: string): Promise<RealworldResult<{ article: Article }, Article>> {
    return await (
      await fetch(`${Api.host}/articles/${slug}`, {
        method: "GET",
        headers: { ...Api.defaultHeaders },
      })
    ).json();
  }
}
