export type Person = {
  id: number
  document: string
  firstName: string
  lastName: string
  email: string
}

export type PersonInput = Omit<Person, 'id'>

export type Nationality = {
  document: string
  firstName: string
  countryCode: string
  countryName: string
  probability: number
}
