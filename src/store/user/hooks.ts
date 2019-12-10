import { useSelector } from 'react-redux'
import { UserType, MergeResultsType, ResultType, State } from './types'


// Only users who used app are displayed in the following list
export const useResults = () => {

    const results: Map<string, ResultType> = useSelector((state: {user: State}) => state.user.listResult);

    const users: Array<UserType> = useSelector((state: any) => [...state.user.listUsers.values()])

    //@ts-ignore
    const mergeResults: MergeResultsType[] = users.map((user: UserType) => {
        if (user.weleEmail && results.get(user.weleEmail)) {
            return {
                user,
                //@ts-ignore
                total: results.get(user.weleEmail) ? results.get(user.weleEmail).Total : 0 as number
            }
        } else {
            return {
                user,
                total: 0 as number
            }
        }})

    return mergeResults.sort((a, b)=> b.total - a.total)
}


export const useCurrentUser = ()=>{
    const currentUser: UserType = useSelector((state:{user: State})=> state.user.currentUser)
    return currentUser
}

const transformResult = (result: ResultType | undefined)=>{
    if(!result ) return { totalArray : [ 0, 0, 0, 0, 0, 0, 0, 0 , 0], labelArray:['', '', '', '', '', '', '', '' , ''] } 
  
    const rResult = {...result}
  
    const keys = Object.keys(rResult)
    let data: number[] = []
    for (let i = 0 ; i< keys.length; i++){
      if(Number(keys[i]) > 0 ){      
        data.push(Number(keys[i]))
      }
    }
  
    data = data.sort((a,b)=> a-b )
  
    let tempTotal = 0;
    let totalArray  = []
    let labelArray = []
    const divider = Math.round(data.length / 6)
    for (let i = 0 ; i< data.length; i++){
      if(rResult[data[i]]){
        tempTotal += Number(rResult[data[i]])
          if(i% divider === 0){
            totalArray.push(tempTotal)
            labelArray.push(data[i])
          }
          
      }
    }
  
    if(data.length -1 % divider !== 0 ){
      totalArray.push(tempTotal)
      labelArray.push(data[data.length -1])
    }
  
    return { totalArray, labelArray }
}
  

export const useMyResult = ()=>{
    const results = useSelector((state:{user: State})=> transformResult(state.user.currentUser.result))

    return results
}