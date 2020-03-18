import auth , {firebase} from "@react-native-firebase/auth";
import { UserType } from "@/store/user/types";
import { updateUser } from "@/store/user/function";


class PresenceSystem {


    async init(){

        const user:any = await firebase.auth().currentUser


        const onlineRef = await  firebase.database().ref('.info/connected');

        await onlineRef.on('value', (snapshot:any) => {

            user && firebase.database().ref(`/users/${user._user.uid}/online`).set(true)
            user && firebase.database().ref(`/users/${user._user.uid}/online`).onDisconnect().set(false)

            firebase.database().ref(`/users`).on('child_changed',(data:any)=>{
                const user : UserType = {
                    id: data._snapshot.key,
                    ...data._snapshot.value
                }

                updateUser(user)


            })

        })
    }
}




const presenceSystem = new PresenceSystem()

export default presenceSystem