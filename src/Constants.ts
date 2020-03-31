import { Dimensions } from "react-native";

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');
const isSmallIphone = HEIGHT < 590;

export default {
    WIDTH, 
    HEIGHT,
    HINT_FONTSIZE: isSmallIphone ? 12 :18,
    TITLE_FONTSIZE: isSmallIphone? 14 : 20,
    BUTTON_FONTSIZE : isSmallIphone ? 10 : 16,
    BILLBOARD_FONTSIZE: isSmallIphone ? 14 : 28,
    BILLBOARD_ITEM_FONTSIZE: isSmallIphone ? 10 : 14,
    PODCAST_ITEM_FONTSIZE: isSmallIphone? 10: 12
}