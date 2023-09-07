export type RealworldResult<T, E = T> = T & {errors: Record<keyof E, [string]>}

type UserDTO = {
    "user": {
        "email": "string",
        "token": "string",
        "username": "string",
        "bio": "string",
        "image": "string"
      }
}

export class _Api {
    // private readonly host = 'https://api.realworld.io/api'
    private readonly host = 'http://wordpress:3001/api'
    private readonly defaultHeaders = {
        "content-type": "application/json"
    }
    async registerUser(args: {username: string, email: string, password: string}): Promise<RealworldResult<UserDTO, UserDTO['user']>>{
        return await (await fetch(`${this.host}/users`, {
            method: 'POST',
            body: JSON.stringify({user: args}),
            headers: this.defaultHeaders,
        })).json()
    }
    async loginUser(args: {email: string, password: string}): Promise<RealworldResult<UserDTO, UserDTO['user']>>{
        return await (await fetch(`${this.host}/users/login`, {
            method: 'POST',
            body: JSON.stringify({user: args}),
            headers: this.defaultHeaders,
        })).json()
    }

    async getLoggedInUser(token: string): Promise<RealworldResult<UserDTO, UserDTO['user']>> {
        return await (await fetch(`${this.host}/user`, {
            method: 'GET',
            headers: {...this.defaultHeaders, 'Authorization': `Token ${token}`},
        })).json()
    }

    async updateUser(token: string, args: Partial<UserDTO['user'] & {password: string}>): Promise<RealworldResult<UserDTO, UserDTO['user']>> {
        return await (await fetch(`${this.host}/user`, {
            method: 'PUT',
            body: JSON.stringify({user: args}),
            headers: {...this.defaultHeaders, 'Authorization': `Token ${token}`},
        })).json()
    }
}
export const Api = new _Api()