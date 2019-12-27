import { useSelector } from 'react-redux'
import { UserType, MergeResultsType, ResultType, State } from './types'


// Only users who used app are displayed in the following list
export const useResults = () => {

  const results: Map<string, ResultType> = useSelector((state: { user: State }) => state.user.listResult);

  const users: Array<UserType> = useSelector((state: any) => [...state.user.listUsers.values()])
  //@ts-ignore
  const mergeResults: MergeResultsType[] = users.map((user: UserType) => {

    const weleEmail = user.weleEmail.toLowerCase().replace(/\s/g, '')
    if (user.weleEmail && results.get(weleEmail)) {

      if(results.get(weleEmail).Total){

        if(typeof results.get(weleEmail).Total  !== 'number'  ){
          console.log('check ',results.get(weleEmail).Total ,  results.get(weleEmail))
        }
        return {
            user,
            //@ts-ignore
            total: results.get(weleEmail) ? results.get(weleEmail).Total : 0 as number
          }
        
      }else{
        
        const result = results.get(weleEmail)
        const total:number = Object.keys(result)
        .filter(key=> Number(result[key]) > -3 )
        //@ts-ignore
        .map( key => result[key])
        .reduce( (val1, val2)=> val1 + val2)

        return {
          user,
          total
        }
      }
    } else {
      return {
        user,
        total: 0 as number
      }
    }
  })

  return mergeResults.sort((a, b) => b.total - a.total)
}


export const useCurrentUser = () => {
  const currentUser: UserType = useSelector((state: { user: State }) => state.user.currentUser)
  return currentUser
}

const transformResult = (result: ResultType | undefined) => {

  

  if (!result) return { totalArray: [0, 0, 0, 0, 0, 0, 0, 0, 0], labelArray: ['', '', '', '', '', '', '', '', ''] }
  const lastUpdateTime = new Date(result.Time)

  const missPodcastNumber = ((new Date()).getTime() - lastUpdateTime.getTime())/ (1000 * 60* 60 * 24 * 7 )
  // milliseconds * seconds * minutes * hours * days 
  let rResult = { ...result }

  const keys = Object.keys(rResult)
  let data: number[] = []
  for (let i = 0; i < keys.length; i++) {
    if (Number(keys[i]) > 0) {
      data.push(Number(keys[i]))
    }
  }

  data = data.sort((a, b) => a - b)
  
  const maxKey = data[data.length - 1]

  for(let i = maxKey+1 ; i <=  maxKey + missPodcastNumber ; i++){
     data.push(i)
     rResult[i] = 0 
  }


  let tempTotal = 0;
  let totalArray = []
  let labelArray = []

  const DIVIDER  = 6 ;
  const divider = Math.round(data.length / DIVIDER)

  for (let i = 0; i < data.length; i++) {

    if (rResult[data[i]] === 0 || rResult[data[i]]) {
      tempTotal += Number(rResult[data[i]])
      if (i % divider === 0) {
        totalArray.push(tempTotal)
        labelArray.push(data[i])
      }

    }else{
      
    }
  }

  if (data.length - 1 % divider !== 0) {
    totalArray.push(tempTotal)
    labelArray.push(data[data.length - 1])
  }

  if(totalArray.length < DIVIDER){
    totalArray = [0, 0 , 0 , 0 , 0  ].concat(totalArray);
    labelArray = ['', '' , '' , '' , ''].concat(labelArray);
    console.log(totalArray, labelArray)
  }

  return { totalArray, labelArray }
}


export const useMyResult = () => {
  const results = useSelector((state: { user: State }) => transformResult(state.user.currentUser.result))
  return results
}


export const useAnotherUserResult = (user: UserType) => {
  const weleEmail = user.weleEmail.toLowerCase().replace(/\s/g, '')
  const results = useSelector((state: { user: State }) => {
    const result: ResultType = state.user.listResult.get(weleEmail)
    return transformResult(result)
  })

  return results
}