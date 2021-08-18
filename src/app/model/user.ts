export interface User {
    username: string
    first_name: string
    last_name: string
    email: string
    phone_number: string
    role: number
    profile: {
        biography: string
        country: string
        state: string
        city: string
        reputation: number
        latitude: number
        longitude: number
        picture: string
    }
}