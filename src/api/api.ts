import {
  type Article,
  type Articles,
  type Comment,
  type Profile,
  type RealworldResult,
  type Tag,
  type User,
} from "./models.ts";

const host = "http://localhost:3333/api";
export async function registerUser(args: {
  username: string;
  email: string;
  password: string;
}): Promise<RealworldResult<{ user: User }, User>> {
  return await request("POST", `users`, undefined, { user: args });
}

export async function loginUser(args: {
  email: string;
  password: string;
}): Promise<RealworldResult<{ user: User }, User>> {
  return await request("POST", `users/login`, undefined, { user: args });
}

export async function getLoggedInUser(token: string): Promise<RealworldResult<{ user: User }, User>> {
  return await request("GET", `user`, token);
}

export async function updateUser(
  token: string,
  args: Partial<User & { password: string }>,
): Promise<RealworldResult<{ user: User }, User>> {
  return await request("PUT", `user`, token, { user: args });
}
export async function getTags(): Promise<RealworldResult<{ tags: Tag[] }, { tags: Tag[] }>> {
  return await request("GET", `tags`);
}
export async function getProfile(username: string): Promise<RealworldResult<{ profile: Profile }, Profile>> {
  return await request("GET", `profiles/${username}`);
}
export async function followProfile(
  token: string,
  username: string,
): Promise<RealworldResult<{ profile: Profile }, Profile>> {
  return await request("POST", `profiles/${username}/follow`, token);
}
export async function unfollowProfile(
  token: string,
  username: string,
): Promise<RealworldResult<{ profile: Profile }, Profile>> {
  return await request("DELETE", `profiles/${username}/follow`, token);
}
export async function favoriteArticle(
  token: string,
  slug: string,
): Promise<RealworldResult<{ article: Article }, Article>> {
  return await request("POST", `articles/${slug}/favorite`, token);
}
export async function unfavoriteArticle(
  token: string,
  slug: string,
): Promise<RealworldResult<{ article: Article }, Article>> {
  return await request("DELETE", `articles/${slug}/favorite`, token);
}
export async function getComments(slug: string): Promise<RealworldResult<{ comments: Comment[] }, Comment>> {
  return await request("GET", `articles/${slug}/comments`);
}
export async function createComment(
  token: string,
  slug: string,
  body: string,
): Promise<RealworldResult<{ comment: Comment }, Comment>> {
  return await request("POST", `articles/${slug}/comments`, token, { comment: { body } });
}
export async function deleteComment(token: string, slug: string, id: number): Promise<RealworldResult<{}, Comment>> {
  // return res.status == 200 ? {} : await res.json();
  return await request("DELETE", `articles/${slug}/comments/${id}`, token);
}
export async function getArticleFeed(
  token: string,
  args: { page?: number },
): Promise<RealworldResult<Articles, Article>> {
  const { page = 0 } = args;
  return await request("GET", `articles/feed?offset=${page * 20}&limit=20`, token);
}
export async function getArticles(args: {
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

  return await request("GET", `articles?${params}`);
}

export async function createArticle(
  token: string,
  args: { title: string; description: string; body: string; tagList: string[] },
): Promise<RealworldResult<{ article: Article }, Article>> {
  return await request("POST", `articles`, token);
}
export async function deleteArticle(token: string, slug: string): Promise<RealworldResult<{}, Article>> {
  return await request("DELETE", `articles/${slug}`, token);
}
export async function updateArticle(
  token: string,
  slug: string,
  args: { title: string; description: string; body: string },
): Promise<RealworldResult<{ article: Article }, Article>> {
  return await request("PUT", `articles/${slug}`, token, { article: args });
}
export async function getArticle(slug: string): Promise<RealworldResult<{ article: Article }, Article>> {
  return await request("GET", `articles/${slug}`);
}

async function request<T>(
  method: RequestInit["method"],
  route: string,
  token: string | undefined = undefined,
  body: object | undefined = undefined,
): Promise<T> {
  let init: RequestInit = {
    method: method,
    headers: { "content-type": "application/json", Authorization: token ? `Token ${token}` : "" },
    body: JSON.stringify(body),
  };
  return await (await fetch(`${host}/${route}`, init)).json();
}
