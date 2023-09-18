export type RealworldResult<T, E = T> = T & {
  errors: Record<keyof E, [string]>;
};

export type User = {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
};

export type Profile = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
};

export type Articles = {
  articles: Article[];
  articlesCount: number;
};

export type Comment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
};

export type Tag = string;
