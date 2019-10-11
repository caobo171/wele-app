/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React , {useState , useEffect} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';
import { View, TouchableOpacity, ScrollView , Text } from 'react-native';
import TrackPlayer, {
  useTrackPlayerProgress,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';




import styled from 'styled-components';

const PODCAST = {

    key: 1,
    name: '[ESL 40063] Yelling at Children',
    description: `Pre-Beginner Course quay trở lại sau hai tuần vắng bóng rồi đây. Bài nghe thứ 4 của series, chúng ta hãy cùng nghe một đoạn trích nói về việc “YELLING AT CHILDREN” (la mắng trẻ em). Giáo dục con trẻ chưa bao giờ được xem là dễ dàng. Để giúp trẻ nghe lời, hiểu và làm những điều đúng cần rất nhiều sự kiên nhẫn và bình tĩnh từ bố mẹ và người lớn. Việc cha mẹ quát mắng con là A COMMON SITUATION (một tình huống phổ biến) ở nhiều gia đình trên thế giới. Nhiều bậc phụ huynh RAISE THEIR VOICES (lên giọng) hay quát tháo con cái họ khi họ FELL ANGRY OR AFRAID OR FRUSTRATED (cảm thấy giận dữ, sợ hãi hay chán nản). Việc la mắng con trẻ sẽ tốt khi ở mức độ vừa phải và cho trẻ con thấy việc HAVE EMOTIONS (biểu lộ cảm xúc) là hoàn toàn ổn. Nó chỉ không tốt khi khiến trẻ FEEL SHAME (cảm thấy xấu hổ).
        Đôi khi một người hét lớn lên để nói với thế giới rằng anh ấy POWERFUL AND IN CONTROL (có uy quyền và nắm quyền kiểm soát). Các bạn có tưởng tượng cảnh mình đứng trên nóc một tòa cao ốc hay trên đỉnh núi và hét lớn không? Rất thú vị phải không nào? Các mems hãy hét lên “I CAN DO IT! I CAN LEARN ENGLISH! I ENJOY LEARNING ENGLISH!” thật mạnh mẽ nhé :D.
        Các new members cùng gõ toàn bộ bài nghe vào file word rồi gửi đính kèm về weenjoylearningenglish@gmail.com với tiêu đề "ESL 40063 Tên bạn" nhé.
        Chúc cả nhà một tuần vui vẻ và tràn đầy năng lượng!`,
    source: 'Spotlight',
    narrator: 'Le Dieu Huong',
    imageUrl: 'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-9/70250807_2865993873415542_3327755512937709568_n.jpg?_nc_cat=104&_nc_oc=AQk2O6URyALOwDThGhXMZSzIA2kDDHOGaqSBI16nXRupykDDebtyGh9A7jR_iZ5oca8&_nc_ht=scontent.fhan5-4.fna&oh=40f0a049ecbb6aacc816902c494d59c7&oe=5E20C26F',
};

const Wrapper = styled.View`
  height: 100%;
  width: 100%;
  color: yellow;
`;

const HeaderWrapper = styled.View`
  background-color: white;
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  align-items: center;
  
`;
const StyledBodyWrapper = styled.View`
  background-color: white;
  height: 100%;
  align-items: flex-start;
  padding: 10px 10px 10px 20px;
`;


const StyledContent = styled.View`
  width: 100%;
  margin: 0 ;
  height: 100%;
  background-color: white;
  flex-direction: column;
`;



const StyledInfoWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  flex: 1.5;
`;


const StyledPodcastImage = styled.Image`
  height: 200;
  width: 96%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledAntDesignIcon = styled(EntypoIcon)`
  font-size: 16px;
  color: #a8a8a8;
  margin: 8px 10px 8px 10px;
`;


const StyledHeaderText = styled.Text`
  margin: auto;
`;

const StyledDescriptionWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
    width: 100%;
`;

const StyleInfo = styled.View`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

const StyleSmallText = styled.Text`
  color: #a8a8a8;
`;

const DescriptionSub = styled.Text`
  color: #787878;
  font-size: 10px;
`;

const StyledNameText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 12px;
`;

const StyledSlider = styled(Slider)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 12px;
  width: 100%;
  font-size: 5px;
  height: 10px;
`;

const StyledViewTimeIndicator = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 94%;
  margin-left: auto;
  margin-right: auto;
`;

const StyledTime = styled.Text`
  font-size: 12px;
  color: #919191;
`;

const StyledFeatureButtonGroup = styled.View`
  flex-direction: row;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
`;

const StyledPlayBackButton = styled.View`
  position: relative;
`;

const StyledFeatherIcon = styled(FeatherIcon)`
  font-size: 28px;
  color: black;
  margin: 8px 10px 8px 10px;
`;

const StyledEntypoIcon = styled(EntypoIcon)`
  font-size: 52px;
  color: #e3e3e3;
  
`;

const StyledBadge = styled.Text`
  font-size: 12px;
  font-weight: bold;
  border-radius: 50;
  top: 24px;
  left: 8px;
  width: 20px;
  position: absolute;
`;

const StyledButtonText = styled.Text`;
  width: 32px;
  text-align:center;
  margin-top: 10px;
  height: 32px;
  font-weight: bold;
  font-size: 20px;
`;

const StyledPlayButton = styled.View`
  background-color:#545454;
  border-radius: 50;
`;

const Player = (props) => {

  const progress = useTrackPlayerProgress();

  useEffect(() => {
    TrackPlayer.addEventListener('playback-state',(data)=>{
      console.log('check data', data);
    });

    TrackPlayer.setupPlayer().then(async () => {

      // Adds a track to the queue
      await TrackPlayer.add({
          id: 'trackId',
          url: props.navigation.getParam('audioUrl'),
          title: 'Track Title',
          artist: 'Track Artist',
          artwork: 'linhtinh',
      });

      // Starts playing it
      TrackPlayer.play();

  });

  }, [props.navigation]);

  return (
    <Wrapper>
      <HeaderWrapper>
        <TouchableOpacity onPress={() => {
          props.navigation.navigate('PodcastDetail');
        }}>
            <StyledAntDesignIcon name={'chevron-thin-down'} />
        </TouchableOpacity>
        <StyledHeaderText>We EnJoy Learning English</StyledHeaderText>

        <TouchableOpacity onPress={() => {
          props.navigation.navigate('Home');
        }}>
            <StyledAntDesignIcon name={'dots-three-vertical'} />
        </TouchableOpacity>
      </HeaderWrapper>


      <StyledBodyWrapper>
          <StyledContent>
                <StyledInfoWrapper size="big" >
                    <StyledPodcastImage
                        resizeMode={'contain'}
                        source={{ uri: PODCAST.imageUrl }}
                    />
                    <StyleInfo>
                      <StyledNameText>{PODCAST.name}</StyledNameText>
                      <DescriptionSub>
                            {PODCAST.source} <StyleSmallText>dẫn bởi </StyleSmallText>{PODCAST.narrator}
                      </DescriptionSub>
                    </StyleInfo>

                </StyledInfoWrapper>

                <StyledDescriptionWrapper>

                <StyledSlider
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor= "#919191"
                  maximumTrackTintColor="#e3e3e3"
                  thumbTintColor = "#919191"
                />
                <StyledViewTimeIndicator>
                  <StyledTime>3:33</StyledTime>
                  <StyledTime>4:22</StyledTime>
                </StyledViewTimeIndicator>


                <StyledFeatureButtonGroup>
                    <TouchableOpacity>
                      <StyledButtonText>1x</StyledButtonText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=> TrackPlayer.stop()}>
                      <StyledPlayButton>
                        <StyledEntypoIcon name="triangle-right"/>
                      </StyledPlayButton>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <StyledPlayBackButton>
                          <StyledFeatherIcon name="corner-up-left"/>
                          <StyledBadge>15 </StyledBadge>
                      </StyledPlayBackButton>
                    </TouchableOpacity>

                </StyledFeatureButtonGroup>
                </StyledDescriptionWrapper>

          </StyledContent>
      </StyledBodyWrapper>


    </Wrapper>
  );
};

Player.navigationOptions = {
  header: null,
  tabBarVisible: false,
};

export default Player;

