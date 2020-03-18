import {UserType} from '@/store/user/types'

class CurrentUser {
    __user : null | UserType;

    constructor(){
       
    }

    get user(){
        return this.__user;
    }

    clear(){
        this.__user = null;
    }

    setUser(user:UserType){
        this.__user = user
    }

}

export default new CurrentUser();