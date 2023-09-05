import type { AstroAdapter, AstroGlobal, AstroInstance } from "astro";

export class JwtManagerImpl {
  private static readonly KEY = "token";
  // isLoggedIn = () => !!this.read()
  // save = (token: string) => localStorage.setItem(JwtManagerImpl.KEY, token)
  // read = () => localStorage.getItem(JwtManagerImpl.KEY)
  // delete = () => localStorage.removeItem(JwtManagerImpl.KEY)
  clientSide = {
    getCookie: (cname: string) => {
      let name = cname + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    isLoggedIn: () => !!JwtManager.clientSide.read(),
    save: (token: string) =>
      (document.cookie = document.cookie =
        JwtManagerImpl.KEY + "=" + token + ";"),
    read: () => JwtManager.clientSide.getCookie(JwtManagerImpl.KEY),
    delete: () => (document.cookie = ""),
  };
  serverSide = {
    isLoggedIn: (ctx: AstroGlobal) => !!JwtManager.serverSide.read(ctx),
    save: (ctx: AstroGlobal, token: string) =>
      ctx.cookies.set(JwtManagerImpl.KEY, token),
    read: (ctx: AstroGlobal) => ctx.cookies.get(JwtManagerImpl.KEY),
    delete: (ctx: AstroGlobal) => ctx.cookies.delete(JwtManagerImpl.KEY),
  };
}

export const JwtManager = new JwtManagerImpl();
