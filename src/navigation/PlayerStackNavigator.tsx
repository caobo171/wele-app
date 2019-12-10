import { createStackNavigator } from "react-navigation-stack";
import Player from "../pages/Player";
import SettingRates from "../pages/SettingRates";



const PlayerNavigator = createStackNavigator(
    {
      Player:{
        screen: Player
      },
      SettingRates:{
        screen: SettingRates
      }
    },
    {
      initialRouteName: "Player"
    }
  )
  

export default PlayerNavigator