
// -- =====================================================================================

export enum Post {
    Login       = "/Login",
    Register    = "/Register",
}

export enum Get {
    getPatients = "/getPatients",
}

export type HashedPass = { hash: string, salt: string, iterations: number } 

// -- =====================================================================================

export enum Gender { null = "Prefer not to Answer", male = "Male", female = "Female" }

export type Patients = {
    id: number
    email: string
    username: string
    password: string|HashedPass
    firstname: string
    lastname: string
    birthday: string
    gender: Gender

    name?: string
    userType?: UserTypes
}

export type Dietitians = {
    id: number
    email: string
    username: string
    password: string|HashedPass
    firstname: string
    lastname: string
    birthday: string
    gender: Gender

    name?: string
    userType?: UserTypes
}

export type UserData = Dietitians | Patients; 

// .. declare UserType
export enum UserTypes { "Dietitian", "Patient", null }

// -- =====================================================================================