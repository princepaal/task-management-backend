export interface IUser {
    name: string,
    email: string,
    password: string,
}




export interface IProfile extends IUser {
    _id?: string,
}


