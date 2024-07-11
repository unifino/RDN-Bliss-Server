
// -- =====================================================================================

export enum Post {
    logIn       = "/logIn",
}

export enum Get {
    getPatients = "/getPatients",
}

// -- =====================================================================================

export enum Gender { "male", "female", null }

export type Patients = {
    id: number
    email: string
    username: string
    password: string
    firstname: string
    lastname: string
    age: string
    gender: Gender

    name?: string
}

export type Dietitians = {
    id: number
    email: string
    username: string
    password: string
    firstname: string
    lastname: string
    age: string
    gender: Gender

    name?: string
}

export type UserData = Dietitians | Patients; 

// .. declare UserType
export enum UserTypes { "Dietitian", "Patient", null }

// -- =====================================================================================