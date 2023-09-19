import { type AstroCookies } from "astro";
import type { User } from "../api/models.ts";

const COOKIE_KEY = "user";
export class CookieHelper {
  getUser(cookies: AstroCookies): User | undefined {
    return cookies.get(COOKIE_KEY)?.json();
  }
  getToken(cookies: AstroCookies): string | undefined {
    return cookies.get(COOKIE_KEY)?.json()?.token;
  }
  setUser(cookies: AstroCookies, user: User) {
    cookies.set(COOKIE_KEY, JSON.stringify(Object.fromEntries(Object.entries(user).filter((entry) => entry[1]))));
  }
  logout(cookies: AstroCookies) {
    cookies.delete(COOKIE_KEY);
  }
}

export const CookieHelperImpl = new CookieHelper();

export function getToken() {
  for (const cookie of document.cookie.split(";")) {
    const [name, value] = cookie.trim().split("=");
    if (name === "user") return JSON.parse(decodeURIComponent(value))?.token;
  }
  return null;
}
