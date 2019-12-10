import { createStackNavigator } from "react-navigation-stack";
import Billboard from "@/pages/Billboard";
import AnotherProfile from "@/pages/UserProfile/AnotherUserProfile";



const BillboardNavigator = createStackNavigator(
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