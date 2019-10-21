/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React , {useState , useEffect } from 'react';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { connect } from "react-redux";

import { getPodcast } from "../redux/actions/podcast"


import { View, TouchableOpacity } from 'react-native';



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
    imageUrl: 'https://scontent.fhan5-4.fna.fbcdn.net/v/t1.0-9/70250807_2865993873415542_3327755512937709568_n.jpg?_nc_cat=104&_nc_oc=AQk2O6URyALOwDThGhXMZSzIA2kDDHOGaqSBI16nXRupykDDebtyGh9A7jR_iZ5oca8&_nc_ht=scontent.fhan5-4.fna&oh=40f0a049ecbb6aacc816902c494d59c7&oe=5E20C26F'
}

const Wrapper = styled.ScrollView`
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
  
`;
const StyledBodyWrapper = styled.View`
  background-color: white;
  flex: 9;
  align-items: flex-start;
  padding: 10px 10px 10px 20px;
`;


const StyledContent = styled.View`
  width: 100%;
  margin: 0 ;
  background-color: white;
  flex-direction: column;
`;



const StyledUserWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #d4d4d4;
  flex: 1;
`;


const StyledPodcastImage = styled.Image`
  height: 140;
  width: 68%;
  border-radius: 10;
  margin: 10px 0px 20px 0px;
`;

const StyledAntDesignIcon = styled(AntDesignIcon)`
  font-size: 28px;
  color: #a8a8a8;
  margin: 4px 0px 0px 10px;
`;

const StyledName = styled.Text`
  width: 80%;
  text-align: left;
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: bold; 
  margin-bottom: 20px;
`

const DescriptionInfo = styled.Text`
  color: #787878;
  font-size: 10px;
  margin-bottom: 20px;
`;

const DescriptionMain = styled.Text`
    color: #7a7a7a;
    letter-spacing: 1px;
    font-size: 12px;

`

const StyleSmallText = styled.Text`
  color: #a8a8a8;
`

const reFormatText = (text)=>{
    return text.replace(/\n/g, '\n\n')
}

const trimText = (text)=>{
    return text.substr(0, Math.min(text.length, 180)) + '...' ;
}

const StyledDescriptionWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
`

const StyledReadmore = styled.Text`
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const StyledPlayButton = styled.View`
    background-color: #25bf1d;
    width: 100px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    margin-bottom: 10px;
`

const StyledText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 3px;
    color: #ededed;
`

const PodcastDetail = (props) => {

  const [isBrief, setIsBrief] = useState(true)


  useEffect(() => {

    console.log('check aaaaaaa', props)
    props.getPodcast(PODCAST)
  }, [])

  const onPressPlayHandle = async ()=>{
    await props.navigation.navigate('Player')
  }
  return <React.Fragment>
    {
      props.podcast && (
        <Wrapper>
          <HeaderWrapper>
            <TouchableOpacity onPress={() => {
              props.navigation.navigate('Home')
            }}>
              <View>
                <StyledAntDesignIcon name={'arrowleft'} />
              </View>
            </TouchableOpacity>
          </HeaderWrapper>
    
    
          <StyledBodyWrapper>
              <StyledContent>
                    <StyledUserWrapper size="big" >
                        <StyledPodcastImage
                            resizeMode={"stretch"}
                            source={{ uri: props.podcast.imageUrl }}
                        />
                        <StyledName>
                            {props.podcast.name}
                        </StyledName>
    
                        <DescriptionInfo>
                            {props.podcast.source} <StyleSmallText>dẫn bởi </StyleSmallText>{props.podcast.narrator}
                        </DescriptionInfo>
                        <TouchableOpacity onPress={onPressPlayHandle}>
                          <StyledPlayButton>
                              <StyledText >Play</StyledText>
                          </StyledPlayButton>
                        </TouchableOpacity>
    
                    </StyledUserWrapper>
    
                    <StyledDescriptionWrapper>
                        <DescriptionMain>
                        {/* { trimText(reFormatText(PODCAST.description)) } */}
                        { isBrief ? trimText(reFormatText(props.podcast.description)) :  reFormatText(props.podcast.description) }
    
                        </DescriptionMain>
    
                        <TouchableOpacity>
                            <StyledReadmore onPress={()=> setIsBrief(!isBrief)}>{isBrief ? 'Read more ' : 'See less'}</StyledReadmore>
                        </TouchableOpacity>
    
    
                    </StyledDescriptionWrapper>
    
              </StyledContent>
          </StyledBodyWrapper>
    
    
        </Wrapper>
      )
    }
  </React.Fragment>
};

PodcastDetail.navigationOptions = {
  header: null
};


function mapStateToProps (state) {
  return {
    podcast: state.podcast.currentPodcast,
    list: state.podcast.listPodcast,
  }
}



function mapDispatchToProps (dispatch) {
  return {
    getPodcast: (podcast)=> dispatch(getPodcast(podcast))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PodcastDetail);

