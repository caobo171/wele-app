/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { View , TouchableOpacity , ScrollView } from 'react-native';

import UserProfile from './UserProfile'
import PodcastDetail from './PodcastDetail'
import Player from './Player'

import { createStackNavigator } from 'react-navigation-stack';




import styled from 'styled-components';
const FAKEDATA = [
  {
    key: 1,
    name: '[ESL 40063] Yelling at Children',
    description: `Pre-Beginner Course quay trở lại sau hai tuần vắng bóng rồi đây. Bài nghe thứ 4 của series, chúng ta hãy cùng nghe một đoạn trích nói về việc “YELLING AT CHILDREN” (la mắng trẻ em). Giáo dục con trẻ chưa bao giờ được xem là dễ dàng. Để giúp trẻ nghe lời, hiểu và làm những điều đúng cần rất nhiều sự kiên nhẫn và bình tĩnh từ bố mẹ và người lớn. Việc cha mẹ quát mắng con là A COMMON SITUATION (một tình huống phổ biến) ở nhiều gia đình trên thế giới. Nhiều bậc phụ huynh RAISE THEIR VOICES (lên giọng) hay quát tháo con cái họ khi họ FELL ANGRY OR AFRAID OR FRUSTRATED (cảm thấy giận dữ, sợ hãi hay chán nản). Việc la mắng con trẻ sẽ tốt khi ở mức độ vừa phải và cho trẻ con thấy việc HAVE EMOTIONS (biểu lộ cảm xúc) là hoàn toàn ổn. Nó chỉ không tốt khi khiến trẻ FEEL SHAME (cảm thấy xấu hổ).
    Đôi khi một người hét lớn lên để nói với thế giới rằng anh ấy POWERFUL AND IN CONTROL (có uy quyền và nắm quyền kiểm soát). Các bạn có tưởng tượng cảnh mình đứng trên nóc một tòa cao ốc hay trên đỉnh núi và hét lớn không? Rất thú vị phải không nào? Các mems hãy hét lên “I CAN DO IT! I CAN LEARN ENGLISH! I ENJOY LEARNING ENGLISH!” thật mạnh mẽ nhé :D.
    Các new members cùng gõ toàn bộ bài nghe vào file word rồi gửi đính kèm về weenjoylearningenglish@gmail.com với tiêu đề "ESL 40063 Tên bạn" nhé.
    Chúc cả nhà một tuần vui vẻ và tràn đầy năng lượng!`,
    source: 'Spotlight',
    narrator: 'Le Dieu Huong',
    imageUrl: 'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-9/70250807_2865993873415542_3327755512937709568_n.jpg?_nc_cat=104&_nc_oc=AQk2O6URyALOwDThGhXMZSzIA2kDDHOGaqSBI16nXRupykDDebtyGh9A7jR_iZ5oca8&_nc_ht=scontent.fhan5-4.fna&oh=40f0a049ecbb6aacc816902c494d59c7&oe=5E20C26F'
  },
];

const RECENT_PODCASTS = [
  {
    key: 1,
    name: '[ESL 40063] Yelling at Children',
    description: `Pre-Beginner Course quay trở lại sau hai tuần vắng bóng rồi đây. Bài nghe thứ 4 của series, chúng ta hãy cùng nghe một đoạn trích nói về việc “YELLING AT CHILDREN” (la mắng trẻ em). Giáo dục con trẻ chưa bao giờ được xem là dễ dàng. Để giúp trẻ nghe lời, hiểu và làm những điều đúng cần rất nhiều sự kiên nhẫn và bình tĩnh từ bố mẹ và người lớn. Việc cha mẹ quát mắng con là A COMMON SITUATION (một tình huống phổ biến) ở nhiều gia đình trên thế giới. Nhiều bậc phụ huynh RAISE THEIR VOICES (lên giọng) hay quát tháo con cái họ khi họ FELL ANGRY OR AFRAID OR FRUSTRATED (cảm thấy giận dữ, sợ hãi hay chán nản). Việc la mắng con trẻ sẽ tốt khi ở mức độ vừa phải và cho trẻ con thấy việc HAVE EMOTIONS (biểu lộ cảm xúc) là hoàn toàn ổn. Nó chỉ không tốt khi khiến trẻ FEEL SHAME (cảm thấy xấu hổ).
    Đôi khi một người hét lớn lên để nói với thế giới rằng anh ấy POWERFUL AND IN CONTROL (có uy quyền và nắm quyền kiểm soát). Các bạn có tưởng tượng cảnh mình đứng trên nóc một tòa cao ốc hay trên đỉnh núi và hét lớn không? Rất thú vị phải không nào? Các mems hãy hét lên “I CAN DO IT! I CAN LEARN ENGLISH! I ENJOY LEARNING ENGLISH!” thật mạnh mẽ nhé :D.
    Các new members cùng gõ toàn bộ bài nghe vào file word rồi gửi đính kèm về weenjoylearningenglish@gmail.com với tiêu đề "ESL 40063 Tên bạn" nhé.
    Chúc cả nhà một tuần vui vẻ và tràn đầy năng lượng!`,
    source: 'Spotlight',
    narrator: 'Le Dieu Huong',
    imageUrl: 'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-9/70250807_2865993873415542_3327755512937709568_n.jpg?_nc_cat=104&_nc_oc=AQk2O6URyALOwDThGhXMZSzIA2kDDHOGaqSBI16nXRupykDDebtyGh9A7jR_iZ5oca8&_nc_ht=scontent.fhan5-4.fna&oh=40f0a049ecbb6aacc816902c494d59c7&oe=5E20C26F'
  },
  {
    key: 2,
    name: '[ESL 40063] Yelling at Children',
    description: `Pre-Beginner Course quay trở lại sau hai tuần vắng bóng rồi đây. Bài nghe thứ 4 của series, chúng ta hãy cùng nghe một đoạn trích nói về việc “YELLING AT CHILDREN” (la mắng trẻ em). Giáo dục con trẻ chưa bao giờ được xem là dễ dàng. Để giúp trẻ nghe lời, hiểu và làm những điều đúng cần rất nhiều sự kiên nhẫn và bình tĩnh từ bố mẹ và người lớn. Việc cha mẹ quát mắng con là A COMMON SITUATION (một tình huống phổ biến) ở nhiều gia đình trên thế giới. Nhiều bậc phụ huynh RAISE THEIR VOICES (lên giọng) hay quát tháo con cái họ khi họ FELL ANGRY OR AFRAID OR FRUSTRATED (cảm thấy giận dữ, sợ hãi hay chán nản). Việc la mắng con trẻ sẽ tốt khi ở mức độ vừa phải và cho trẻ con thấy việc HAVE EMOTIONS (biểu lộ cảm xúc) là hoàn toàn ổn. Nó chỉ không tốt khi khiến trẻ FEEL SHAME (cảm thấy xấu hổ).
    Đôi khi một người hét lớn lên để nói với thế giới rằng anh ấy POWERFUL AND IN CONTROL (có uy quyền và nắm quyền kiểm soát). Các bạn có tưởng tượng cảnh mình đứng trên nóc một tòa cao ốc hay trên đỉnh núi và hét lớn không? Rất thú vị phải không nào? Các mems hãy hét lên “I CAN DO IT! I CAN LEARN ENGLISH! I ENJOY LEARNING ENGLISH!” thật mạnh mẽ nhé :D.
    Các new members cùng gõ toàn bộ bài nghe vào file word rồi gửi đính kèm về weenjoylearningenglish@gmail.com với tiêu đề "ESL 40063 Tên bạn" nhé.
    Chúc cả nhà một tuần vui vẻ và tràn đầy năng lượng!`,
    source: 'Spotlight',
    narrator: 'Le Dieu Huong',
    imageUrl: 'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-9/70250807_2865993873415542_3327755512937709568_n.jpg?_nc_cat=104&_nc_oc=AQk2O6URyALOwDThGhXMZSzIA2kDDHOGaqSBI16nXRupykDDebtyGh9A7jR_iZ5oca8&_nc_ht=scontent.fhan5-4.fna&oh=40f0a049ecbb6aacc816902c494d59c7&oe=5E20C26F'
  },
]

const Wrapper = styled.ScrollView`
  height: 100%;
  width: 100%;
  color: yellow;
`;

const HeaderWrapper = styled.View`
  background-color: white;
  height: 32px;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0;
  
`;
const StyledBodyWrapper = styled.View`
  background-color: white;
  flex: 9;
  align-items: flex-start;
`;


const StyledSection = styled.View`
  width: 100%;
  margin: 0 ;
  background-color: white;
`;

const StyledSectionTitle = styled.Text`
  color: black;
  font-size: ${props=> props.position === 'top' ? '24px' : '20px' } ;
  font-weight: ${props=> props.position === 'top' ? 'bold' : '900' } ;
  padding-bottom: 16px;
  margin: ${props=> props.position === 'top' ? '-12px' : '28px' } 10px 0px 10px; 
  border-bottom-width: 1px;
  border-color: #d4d4d4;
`;

const StyledSectionContent = styled.View``;

const StyledPodcastWrapper = styled.View`
  background-color: white;
  height:  ${props=> props.size === 'big' ? '200px' : (props.size === 'medium' ? '180px' : '160px') } ;
  width: 100%;
  flex-direction: row;
  margin: 0;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #d4d4d4;
  padding-top: 10px;
`;

const StyledPodcastContent = styled.View`
  flex: 3;
  padding: 20px 10px 10px 10px ;
`;

const StyledImageWrapper = styled.View`
  flex: 2;
`;

const StyledPodcastImage = styled.Image`
  height: 90px;
  width: 120px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 16px;
`;

const DescriptionMain = styled.Text`
  font-size : 12px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const StyleSmallText = styled.Text`
  color: #a8a8a8;
`

const DescriptionSub = styled.Text`
  color: #787878;
  font-size: 10px;
`;

const StyledFeatherIcon = styled(FeatherIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 20px 0px 0px;
`;

const TrimText = text => {
  return text.substr(0, Math.min(text.length, 60)) + '...';
};
const Home = (props) => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <TouchableOpacity onPress={()=>{
          console.log('check props', props);
          props.navigation.navigate('UserProfile');
          console.log('okkk')}}>
          <View>
            <StyledFeatherIcon name={'settings'}/>
          </View>
        </TouchableOpacity>
      </HeaderWrapper>
      <StyledBodyWrapper>
        <StyledSection>
          <StyledSectionTitle position="top">Podcast this week</StyledSectionTitle>
          <StyledSectionContent>
            {FAKEDATA.map(e => {
              return (
                <TouchableOpacity key={e.key} onPress = {()=>{
                  props.navigation.navigate('PodcastDetail')
                }}>
                    <StyledPodcastWrapper size="big" >
                      <StyledPodcastContent>
                        <Title>{e.name}</Title>
                        <DescriptionMain>{TrimText(e.description)}</DescriptionMain>
                        <DescriptionSub>
                          {e.source} <StyleSmallText>dẫn bởi </StyleSmallText>{e.narrator}
                        </DescriptionSub>
                      </StyledPodcastContent>
                      <StyledImageWrapper>
                        <StyledPodcastImage
                          resizeMode= {"contain"}
                          source={{ uri: e.imageUrl }}
                        />
                      </StyledImageWrapper>
      
                    </StyledPodcastWrapper>
                </TouchableOpacity>
  
              );
            })}
          </StyledSectionContent>
        </StyledSection>

        <StyledSection>
          <StyledSectionTitle position="normal">Recently Played</StyledSectionTitle>
          <StyledSectionContent>
            {RECENT_PODCASTS.map(e => {
              return (
                <TouchableOpacity key={e.key} onPress = {()=>{
                  props.navigation.navigate('PodcastDetail')
                }}>
                  <StyledPodcastWrapper size="medium" >
                    <StyledPodcastContent>
                      <Title>{e.name}</Title>
                      <DescriptionMain>{TrimText(e.description)}</DescriptionMain>
                      <DescriptionSub>
                        {e.source} <StyleSmallText>dẫn bởi </StyleSmallText>{e.narrator}
                      </DescriptionSub>
                    </StyledPodcastContent>
                    <StyledImageWrapper>
                      <StyledPodcastImage
                        resizeMode= {"contain"}
                        source={{ uri: e.imageUrl }}
                      />
                    </StyledImageWrapper>
    
                  </StyledPodcastWrapper>
                </TouchableOpacity>

              );
            })}
          </StyledSectionContent>
        </StyledSection>


      </StyledBodyWrapper>
    </Wrapper>
  );
};

const HomeContainer = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      }
    },
    UserProfile: {
      screen: UserProfile,

    },
    PodcastDetail: {
      screen : PodcastDetail, 
    },
}, {
  initialRouteName : 'Home'
})
export default HomeContainer;
