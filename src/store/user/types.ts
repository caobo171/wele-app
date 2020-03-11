export  interface ResultType{
    Email_ad?: string,
    Facebook?: string,
    photoURL?: string,
    id: string,
    Time?: string,
    Total?:number,
    UserId? : string,
    [podcast:number]: number,
    Name?: string
}


export interface ResultV2Type{
    id: string,
    sum: number
}


export interface UserType{
    displayName: string,
    email: string,
    photoURL: string,
    id: string,
    weleEmail?: string,
    online?: boolean,
    result? : ResultType,
    lastSeen? : number
}

export interface State {
    currentUser: null | UserType,
    listUsers: Map<string,UserType>,
    listResult : Map<string, ResultType>,
    listResultMonthly: Map<string,ResultV2Type>
}

export interface MergeResultsType{
    user: UserType,
    total: number
}