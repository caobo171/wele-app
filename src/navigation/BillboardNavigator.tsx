import { createStackNavigator } from "react-navigation-stack";
import Billboard from "@/pages/Billboard";
import AnotherProfile from "@/pages/UserProfile/AnotherUserProfile";
import { createSwitchNavigator } from "react-navigation";



const BillboardNavigator = createSwitchNavigator(
    {
      Billboard:{
        screen: Billboard
      },
      AnotherProfile:{
        screen: AnotherProfile
      }
    },
    {
      initialRouteName: "Billboard"
    }
  )
  

export default BillboardNavigator