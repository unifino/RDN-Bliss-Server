
// -- =====================================================================================

export enum Post {
    logIn       = "/logIn",
}

export enum Get {
    getPatients = "/getPatients",
}

// -- =====================================================================================

export enum Gender { null = "Prefer not to Answer", male = "Male", female = "Female" }

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
    userType?: UserTypes
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
    userType?: UserTypes
}

export type UserData = Dietitians | Patients; 

// .. declare UserType
export enum UserTypes { "Dietitian", "Patient", null }

// -- =====================================================================================