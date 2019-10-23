import AsyncStorage from '@react-native-community/async-storage'


class WeleLocalStorage {
    constructor(){

    }


    set = (key:string, value: string)=>{
        AsyncStorage.setItem(`@wele-${key}`, value )
    }

    get = async (key:string , type : string , defaultValue?:any)=>{
        const data = await AsyncStorage.getItem(`@wele-${key}`)

        if(!data){
            return defaultValue ? defaultValue: null
        } 
        switch(type){
            case 'string':{
                return data
            }
            case 'number':{
                return Number(data)
            }
            case 'object':{
                return JSON.parse(data)
            }
            default :
                return data 
        }
    }

}

const storage = new WeleLocalStorage()

export default storage