import auth , {firebase} from "@react-native-firebase/auth";
import UserType from "src/models/User";


class PresenceSystem {


    async init(updateUserFunction: any){
        const user:any = await firebase.auth().currentUser

        console.log('check current user', user._user.uid)

        const onlineRef = await  firebase.database().ref('.info/connected');

        await onlineRef.on('value', (snapshot:any) => {

            firebase.database().ref(`/users/${user._user.uid}/online`).set(true)
            firebase.database().ref(`/users/${user._user.uid}/online`).onDisconnect().set(false)

            firebase.database().ref(`/users`).on('child_changed',(data:any)=>{
                const user : UserType = {
                    id: data._snapshot.key,
                    ...data._snapshot.value
                }

                updateUserFunction(user)


            })

        })
    }
}




const presenceSystem = new PresenceSystem()

export default presenceSystem