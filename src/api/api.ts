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
const defaultHeaders = {
  "content-type": "application/json",
};
export async function registerUser(args: {
  username: string;
  email: string;
  password: string;
}): Promise<RealworldResult<{ user: User }, User>> {
  return await (
    await fetch(`${host}/users`, {
      method: "POST",
      body: JSON.stringify({ user: args }),
      headers: defaultHeaders,
    })
  ).json();
}

export async function loginUser(args: {
  email: string;
  password: string;
}): Promise<RealworldResult<{ user: User }, User>> {
  return await (
    await fetch(`${host}/users/login`, {
      method: "POST",
      body: JSON.stringify({ user: args }),
      headers: defaultHeaders,
    })
  ).json();
}

export async function getLoggedInUser(token: string): Promise<RealworldResult<{ user: User }, User>> {
  return await (
    await fetch(`${host}/user`, {
      method: "GET",
      headers: { ...defaultHeaders, Authorization: `Token ${token}` },
    })
  ).json();
}

export async function updateUser(
  token: string,
  args: Partial<User & { password: string }>,
): Promise<RealworldResult<{ user: User }, User>> {
  return await (
    await fetch(`${host}/user`, {
      method: "PUT",
      body: JSON.stringify({ user: args }),
      headers: { ...defaultHeaders, Authorization: `Token ${token}` },
    })
  ).json();
}
export async function getTags(): Promise<RealworldResult<{ tags: Tag[] }, { tags: Tag[] }>> {
  return await (
    await fetch(`${host}/tags`, {
      method: "GET",
      headers: defaultHeaders,
    })
  ).json();
}
export async function getProfile(username: string): Promise<RealworldResult<{ profile: Profile }, Profile>> {
  return await (
    await fetch(`${host}/profiles/${username}`, {
      method: "GET",
      headers: defaultHeaders,
    })
  ).json();
}
export async function followProfile(
  token: string,
  username: string,
): Promise<RealworldResult<{ profile: Profile }, Profile>> {
  return await (
    await fetch(`${host}/profiles/${username}/follow`, {
      method: "POST",
      headers: { ...defaultHeaders, Authorization: `Token ${token}` },
    })
  ).json();
}
export async function unfollowProfile(
  token: string,
  username: string,
): Promise<RealworldResult<{ profile: Profile }, Profile>> {
  return await (
    await fetch(`${host}/profiles/${username}/follow`, {
      method: "DELETE",
      headers: { ...defaultHeaders, Authorization: `Token ${token}` },
    })
  ).json();
}
export async function favoriteArticle(
  token: string,
  slug: string,
): Promise<RealworldResult<{ article: Article }, Article>> {
  return await (
    await fetch(`${host}/articles/${slug}/favorite`, {
      method: "POST",
      headers: { ...defaultHeaders, Authorization: `Token ${token}` },
    })
  ).json();
}
export async function unfavoriteArticle(
  token: string,
  slug: string,
): Promise<RealworldResult<{ article: Article }, Article>> {
  return await (
    await fetch(`${host}/articles/${slug}/favorite`, {
      method: "DELETE",
      headers: { ...defaultHeaders, Authorization: `Token ${token}` },
    })
  ).json();
}
export async function getComments(slug: string): Promise<RealworldResult<{ comments: Comment[] }, Comment>> {
  return await (
    await fetch(`${host}/articles/${slug}/comments`, {
      method: "GET",
      headers: defaultHeaders,
    })
  ).json();
}
export async function createComment(
  token: string,
  slug: string,
  body: string,
): Promise<RealworldResult<{ comment: Comment }, Comment>> {
  console.log(token, slug, body);

  return await (
    await fetch(`${host}/articles/${slug}/comments`, {
      method: "POST",
      body: JSON.stringify({ comment: { body } }),
      headers: { ...defaultHeaders, Authorization: `Token ${token}` },
    })
  ).json();
}
export async function deleteComment(token: string, slug: string, id: number): Promise<RealworldResult<{}, Comment>> {
  const res = await fetch(`${host}/articles/${slug}/comments/${id}`, {
    method: "DELETE",
    headers: { ...defaultHeaders, Authorization: `Token ${token}` },
  });
  return res.status == 200 ? {} : await res.json();
}
export async function getArticleFeed(
  token: string,
  args: { page?: number },
): Promise<RealworldResult<Articles, Article>> {
  const { page = 0 } = args;
  return await (
    await fetch(`${host}/articles/feed?offset=${page * 20}&limit=20`, {
      method: "GET",
      headers: { ...defaultHeaders, Authorization: `Token ${token}` },
    })
  ).json();
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

  return await (
    await fetch(`${host}/articles?${params}`, {
      method: "GET",

      headers: { ...defaultHeaders },
    })
  ).json();
}

export async function createArticle(
  token: string,
  args: { title: string; description: string; body: string; tagList: string[] },
): Promise<RealworldResult<{ article: Article }, Article>> {
  return await (
    await fetch(`${host}/articles`, {
      method: "POST",
      body: JSON.stringify({ article: args }),
      headers: { ...defaultHeaders, Authorization: `Token ${token}` },
    })
  ).json();
}
export async function deleteArticle(token: string, slug: string): Promise<RealworldResult<{}, Article>> {
  return await (
    await fetch(`${host}/articles`, {
      method: "POST",
      headers: { ...defaultHeaders, Authorization: `Token ${token}` },
    })
  ).json();
}
export async function updateArticle(
  token: string,
  slug: string,
  args: { title: string; description: string; body: string },
): Promise<RealworldResult<{ article: Article }, Article>> {
  return await (
    await fetch(`${host}/articles/${slug}`, {
      method: "PUT",
      body: JSON.stringify({ article: args }),
      headers: { ...defaultHeaders, Authorization: `Token ${token}` },
    })
  ).json();
}
export async function getArticle(slug: string): Promise<RealworldResult<{ article: Article }, Article>> {
  return await (
    await fetch(`${host}/articles/${slug}`, {
      method: "GET",
      headers: { ...defaultHeaders },
    })
  ).json();
}
