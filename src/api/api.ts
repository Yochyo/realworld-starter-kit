import { ArticleApi } from "./article-api.ts";
import { CommentApi } from "./comment-api.ts";
import { ProfileApi } from "./profile-api.ts";
import { TagApi } from "./tag-api.ts";
import { UserApi } from "./user-api.ts";
import { FavoriteApi } from "./favorite-api.ts";

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      // @ts-expect-error
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
}

class Api {
  // static readonly host = "http://localhost:3333/api";
  static readonly host = "https://api.realworld.io/api";
  static readonly defaultHeaders = {
    "content-type": "application/json",
  };
}

interface Api extends ArticleApi, CommentApi, ProfileApi, TagApi, UserApi, FavoriteApi {}

applyMixins(Api, [ArticleApi, CommentApi, ProfileApi, TagApi, UserApi, FavoriteApi]);

export default Api;
export const ApiImpl = new Api();
