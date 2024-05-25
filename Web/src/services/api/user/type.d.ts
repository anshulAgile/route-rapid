export type IPoliceRes = {
    id: string
    firstName: string
    lastName: string
    licenceNumber: string
    age: number
    createdOnUTC: string
    lastModifiedOnUTC: any
    mobileNumber: string
  }[]
  
  export type ICreatePoliceReq = {
    mobileNo: string
    password: string
    role: string
    firstname: string
    lastName: string
    licenceNumber: string
    age: number
    latitude:string | null
    longitude: string | null
  }
  