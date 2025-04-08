
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

export enum Gender { null = "?", male = "Male", female = "Female" }

export enum MS { 
    Title = "Martial Status",
    Single = "Single", 
    Married = "Married", 
    Divorced = "Divorced", 
    Widowed = "Widowed" 
}

export enum Education { 
    Title = "Educational Level",
    DoctoralDegree = "Doctoral Degree",
    MasterDegree = "Master's Degree",
    BachelorDegree = "Bachelor's Degree",
    AssociateDegree = "Associate Degree | Diploma",
    SecondaryHighSchool = "High School Education",
    PrimaryEducation = "Primary Education",
    Uneducated = "Uneducated"
}

export enum Occupation {
    Title = "Occupation",
    art = "Arts & Entertainment",
    business = "Business Administration",
    industry = "Industrial & Manufacturing",
    law = "Law Enforcement | Armed Forces",
    science = "Science and Technology",
    null = "Other"
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

    ms?: MS
    education?: Education|string
    occupation?: string|string

    GI_F: GI_F
}

export type GI_F = {
    [GI_Functions.BowelMovement]: string[]
    [GI_Functions.Digestion]: string[]
    [GI_Functions.Appetite]: string[]
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

export type GBi = { meal?: Meal, basket?: Basket, item?: number } 

export enum Basket { 
    Protein = "Protein", 
    Vegtable = "Vegtable", 
    Fruit = "Fruit", 
    Carbo = "Carbo", 
    Fat = "Fat", 
    Beverage = "Beverage",
}

export enum Meal {
    Breakfast = "Breakfast",
    Lunch = "Lunch",
    Snak = "Snak",
    Dinner = "Dinner",
    Bedtime = "Bedtime",
}

// -- =====================================================================================
