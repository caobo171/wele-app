import { createStackNavigator } from "react-navigation-stack";
import Notifications from "../pages/Notifications";


const NotificationNavigator = createStackNavigator(
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