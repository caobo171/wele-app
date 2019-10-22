import { createStackNavigator } from "react-navigation-stack";
import Player from "./../components/Player/index";
import SettingRates from "./../Pages/SettingRates";



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