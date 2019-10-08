/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styled from 'styled-components'
import { TouchableOpacity } from 'react-native-gesture-handler';
const FAKEDATA = [
  {
    key: 1,
    name: '[ESL 40063] Yelling at Children', 
    description: `Pre-Beginner Course quay trở lại sau hai tuần vắng bóng rồi đây. Bài nghe thứ 4 của series, chúng ta hãy cùng nghe một đoạn trích nói về việc “YELLING AT CHILDREN” (la mắng trẻ em). Giáo dục con trẻ chưa bao giờ được xem là dễ dàng. Để giúp trẻ nghe lời, hiểu và làm những điều đúng cần rất nhiều sự kiên nhẫn và bình tĩnh từ bố mẹ và người lớn. Việc cha mẹ quát mắng con là A COMMON SITUATION (một tình huống phổ biến) ở nhiều gia đình trên thế giới. Nhiều bậc phụ huynh RAISE THEIR VOICES (lên giọng) hay quát tháo con cái họ khi họ FELL ANGRY OR AFRAID OR FRUSTRATED (cảm thấy giận dữ, sợ hãi hay chán nản). Việc la mắng con trẻ sẽ tốt khi ở mức độ vừa phải và cho trẻ con thấy việc HAVE EMOTIONS (biểu lộ cảm xúc) là hoàn toàn ổn. Nó chỉ không tốt khi khiến trẻ FEEL SHAME (cảm thấy xấu hổ).
    Đôi khi một người hét lớn lên để nói với thế giới rằng anh ấy POWERFUL AND IN CONTROL (có uy quyền và nắm quyền kiểm soát). Các bạn có tưởng tượng cảnh mình đứng trên nóc một tòa cao ốc hay trên đỉnh núi và hét lớn không? Rất thú vị phải không nào? Các mems hãy hét lên “I CAN DO IT! I CAN LEARN ENGLISH! I ENJOY LEARNING ENGLISH!” thật mạnh mẽ nhé :D.
    Các new members cùng gõ toàn bộ bài nghe vào file word rồi gửi đính kèm về weenjoylearningenglish@gmail.com với tiêu đề "ESL 40063 Tên bạn" nhé.
    Chúc cả nhà một tuần vui vẻ và tràn đầy năng lượng!`,
    source : 'Spotlight',
    narrator: 'Le Dieu Huong'

  }
]

const Wrapper = styled.View`
  height: 100%;
  width: 100%;
  color: yellow;
`

const HeaderWrapper = styled.View`
background-color: black;
height: 40px;
flex-direction: row;
padding: 0;
margin: 0;

`
const StyledBodyWrapper = styled.View`
background-color: blue;
flex: 9;
align-items: flex-start;
`
const StyledHeaderIcon = styled(Icon)`

    margin: 0 ;
    font-size: 20;
    padding: 5px 10px 5px 10px;
    height: 100%;
    text-align-vertical: center;
    color: white;
`

const StyledHeaderTitle = styled.Text`
    justify-content: center;
    text-align: center;
    align-items: center;
    text-align-vertical: center;
    font-size: 20;
    margin-left: 20px;
    font-weight: bold;
    color: white;
`

const StyledSection = styled.View`
    width: 100%;

`

const StyledSectionTitle = styled.Text`
    color: white;
    font-size: 20;
    font-weight: bold;
`

const StyledSectionContent = styled.View`
    
`

const StyledPodcastWrapper = styled.View`
    background-color: red;
    height: 200px;
    width: 100%;
    flex-direction: row;
`

const StyledPodcastContent = styled.View`
    flex: 3;
`

const StyledPodcastImage = styled.Image`
    background-color: yellow;
    flex: 2;
    height: 100px;
    width: 100px;
    margin-top: 20px;
`

const Title = styled.Text`

`

const DescriptionMain = styled.Text`

`

const DescriptionSub = styled.Text`

`

const TrimText = (text)=>{
    return text.substr(0, Math.min(text.length, 40))
}
const Home = () => {

  return (
    <Wrapper>
      <HeaderWrapper></HeaderWrapper>
      <StyledBodyWrapper>
            <StyledSection>
                <StyledSectionTitle>Podcast this week
                </StyledSectionTitle>
                <StyledSectionContent>
                    {FAKEDATA.map(e=>{
                        return <StyledPodcastWrapper key={e.key}>
                                <StyledPodcastContent>
                                    <Title>
                                        {e.name}
                                    </Title>
                                    <DescriptionMain>
                                        {TrimText(e.description)}
                                    </DescriptionMain>
                                    <DescriptionSub>
                                        {e.source} dẫn bởi {e.narrator}
                                    </DescriptionSub>
                                </StyledPodcastContent>
                                <StyledPodcastImage source={{ uri: 'https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}}>
                                    
                                </StyledPodcastImage>
                            </StyledPodcastWrapper>
                    })}
                </StyledSectionContent>
            </StyledSection>

      </StyledBodyWrapper>
    </Wrapper>
  );
};


export default Home;
