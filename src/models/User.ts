import ResultType from "./Result";

export default interface UserType{
    displayName: string,
    email: string,
    photoURL: string,
    id: string,
    weleEmail?: string,
    online?: boolean,
    result? : ResultType
}