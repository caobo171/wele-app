import Notifications from "../pages/Notifications";
import { createSwitchNavigator } from "react-navigation";


const NotificationNavigator = createSwitchNavigator(
    {
        Notifications: {
            screen: Notifications,
            navigationOptions:{
                header: null
            }
        },

    },
    {
        initialRouteName: "Notifications"
    }
)


export default NotificationNavigator