import type {AstroAdapter, AstroGlobal, AstroInstance} from "astro";

export class JwtManagerImpl {
    private static readonly KEY = 'token'
    isLoggedIn = (ctx: AstroGlobal) => !!this.read(ctx)
    save = (ctx: AstroGlobal, token: string) => ctx.cookies.set(JwtManagerImpl.KEY, token)
    read = (ctx: AstroGlobal) => ctx.cookies.get(JwtManagerImpl.KEY)
    delete = (ctx: AstroGlobal) => ctx.cookies.delete(JwtManagerImpl.KEY)
}
// export class JwtManagerImpl {
//     isLoggedIn = () => !!localStorage.getItem('jwt')
//     save = (token: string) => localStorage.setItem('jwt', token)
//     read = () => localStorage.getItem('jwt')
//     delete = () => localStorage.removeItem('jwt')
// }

export const JwtManager = new JwtManagerImpl()