import { createStackNavigator } from "react-navigation-stack";
import Player from "../pages/Player";
import SettingRates from "../pages/SettingRates";
import { createSwitchNavigator } from "react-navigation";



const PlayerNavigator = createSwitchNavigator(
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