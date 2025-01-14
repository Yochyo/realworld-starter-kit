export type RealworldResult<T, E = T> = T & {
  errors: Record<keyof E, [string]>;
};

export type UserDTO = {
  user: {
    email: "string";
    token: "string";
    username: "string";
    bio: "string";
    image: "string";
  };
};

export type ArticlesDTO = {
  articles: Article[];
  articlesCount: number;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
};

export type TagDTO = {
  tags: string[];
};

export type ProfileDTO = {
  profile: {
    username: "string";
    bio: "string";
    image: "string";
    following: boolean;
  };
};

export type Comment = {
  id: number,
  createdAt: string,
  updatedAt: string,
  body: string
  author: UserDTO['user']
}
export type CommentDTO = {
  comments: Comment[]
}

export class _Api {
  // private readonly host = 'https://api.realworld.io/api'
  private readonly host = "http://localhost:3001/api";
  private readonly defaultHeaders = {
    "content-type": "application/json",
  };
  async registerUser(args: {
    username: string;
    email: string;
    password: string;
  }): Promise<RealworldResult<UserDTO, UserDTO["user"]>> {
    return await (
      await fetch(`${this.host}/users`, {
        method: "POST",
        body: JSON.stringify({ user: args }),
        headers: this.defaultHeaders,
      })
    ).json();
  }
  async loginUser(args: {
    email: string;
    password: string;
  }): Promise<RealworldResult<UserDTO, UserDTO["user"]>> {
    return await (
      await fetch(`${this.host}/users/login`, {
        method: "POST",
        body: JSON.stringify({ user: args }),
        headers: this.defaultHeaders,
      })
    ).json();
  }

  async getLoggedInUser(
    token: string,
  ): Promise<RealworldResult<UserDTO, UserDTO["user"]>> {
    return await (
      await fetch(`${this.host}/user`, {
        method: "GET",
        headers: { ...this.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }

  async updateUser(
    token: string,
    args: Partial<UserDTO["user"] & { password: string }>,
  ): Promise<RealworldResult<UserDTO, UserDTO["user"]>> {
    return await (
      await fetch(`${this.host}/user`, {
        method: "PUT",
        body: JSON.stringify({ user: args }),
        headers: { ...this.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }

  async getArticleFeed(
    token: string,
    args: { page?: number },
  ): Promise<RealworldResult<ArticlesDTO, ArticlesDTO["articles"]>> {
    const { page = 0 } = args;
    return await (
      await fetch(`${this.host}/articles/feed?offset=${page * 20}&limit=20`, {
        method: "GET",
        headers: { ...this.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async getArticles(args: {
    tag?: string;
    page?: number;
    favorited?: string;
    author?: string;
  }): Promise<RealworldResult<ArticlesDTO, ArticlesDTO["articles"]>> {
    const { page = 0 } = args;
    const params = new URLSearchParams();
    params.append("offset", (page * 20).toString());
    params.append("limit", "20");
    if (args.tag) params.append("tag", args.tag);
    if (args.favorited) params.append("favorited", args.favorited);
    if (args.author) params.append("author", args.author);

    return await (
      await fetch(`${this.host}/articles?${params}`, {
        method: "GET",

        headers: { ...this.defaultHeaders },
      })
    ).json();
  }

  async createArticle(token: string, args: { title: string, description: string, body: string, tagList: string[] }): Promise<RealworldResult<{ article: Article }, Article>> {
    return await (
      await fetch(`${this.host}/articles`, {
        method: "POST",
        body: JSON.stringify({ article: args }),
        headers: { ...this.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async deleteArticle(token: string, slug: string): Promise<RealworldResult<{ article: Article }, Article>> {
    return await (
      await fetch(`${this.host}/articles`, {
        method: "POST",
        headers: { ...this.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async updateArticle(token: string, slug: string, args: { title: string, description: string, body: string, tagList: string[] }): Promise<RealworldResult<{ article: Article }, Article>> {
    return await (
      await fetch(`${this.host}/articles/${slug}`, {
        method: "PUT",
        body: JSON.stringify({ article: args }),
        headers: { ...this.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async getArticle(slug: string): Promise<RealworldResult<{ article: Article }, Article>> {
    return await (
      await fetch(`${this.host}/articles/${slug}`, {
        method: "GET",
        headers: { ...this.defaultHeaders },
      })
    ).json();
  }

  async getTags(): Promise<RealworldResult<TagDTO, TagDTO>> {
    return await (
      await fetch(`${this.host}/tags`, {
        method: "GET",
        headers: this.defaultHeaders,
      })
    ).json();
  }

  async getProfile(username: string): Promise<RealworldResult<ProfileDTO, ProfileDTO['profile']>> {
    return await (
      await fetch(`${this.host}/profiles/${username}`, {
        method: "GET",
        headers: this.defaultHeaders,
      })
    ).json();
  }
  async getComments(slug: string): Promise<RealworldResult<CommentDTO, CommentDTO['comments']>> {
    return await (
      await fetch(`${this.host}/articles/${slug}/comments`, {
        method: "GET",
        headers: this.defaultHeaders,
      })
    ).json();
  }
  async createComment(token: string, slug: string, body: string): Promise<RealworldResult<{ comment: Comment }, Comment>> {
    console.log(token, slug, body);

    return await (
      await fetch(`${this.host}/articles/${slug}/comments`, {
        method: "POST",
        body: JSON.stringify({ comment: { body } }),
        headers: { ...this.defaultHeaders, Authorization: `Token ${token}` },
      })
    ).json();
  }
  async deleteComment(token: string, slug: string, id: number): Promise<RealworldResult<{}, CommentDTO['comments']>> {
    const res = await fetch(`${this.host}/articles/${slug}/comments/${id}`, {
      method: "DELETE",
      headers: { ...this.defaultHeaders, Authorization: `Token ${token}` },
    })
    return res.status == 200 ? {} : await res.json()
  }
}
export const Api = new _Api();
