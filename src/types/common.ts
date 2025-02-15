
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

export enum MartialStatus { Single, Married, Divorced, Widowed }
export enum EducationalLevel { 
    DoctoralDegree = "Doctoral Degree",
    MasterDegree = "Master's Degree",
    BachelorDegree = "Bachelor's degree",
    AssociateDegree = "Associate degree or diploma",
    SecondaryHighSchool = "Secondary High School education",
    PrimaryEducation = "Primary Education",
    Uneducated = "Uneducated"
}

export enum occupation {
    art = "Arts and entertainment",
    business = "Business administration",
    industry = "Industrial and manufacturing",
    law = "Law enforcement and armed forces",
    science = "Science and technology",
    null = ""
}

export type Patient = {
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

    martialStatus?: MartialStatus
    educationalLevel?: EducationalLevel
    occupation?: string

    GI_F: {
        [GI_Functions.BowelMovement]: string[]
        [GI_Functions.Digestion]: string[]
        [GI_Functions.Appetite]: string[]
    }
}


export enum GI_Functions { 
    BowelMovement = "Bowel Movement",
    Digestion = "Digestion",
    Appetite ="Appetite" 
}

export type Dietitian = {
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

export type UserData = Dietitian | Patient; 

// .. declare UserType
export enum UserTypes { "Dietitian", "Patient", null }

// -- =====================================================================================