import styled from "styled-components";

export default {
    Container: styled.SafeAreaView`
        flex:1;
        background-color: #F5F6FA;
    `,
    Scroller: styled.ScrollView`
        flex: 1;
        padding: 20px;
    `,
    LoadingIcon: styled.ActivityIndicator``,
    HeadTitle: styled.Text`
        font-size: 16px;
        color: #000;
        text-align: center;
        margin-top: 10px;
    `,
    BigArea: styled.View`
        margin: 50px 0;
        align-items: center;
    `,
    ExitButtonArea: styled.TouchableOpacity`
        background-color: #8863e6;
        padding: 15px;
        justify-content: center;
        align-items: center;
    `,
    ExitButtonText: styled.Text`
        color: #fff;
        font-weight: bold;
        font-size: 15px;
    `,
    PropertyList: styled.View`
        margin: 20px 0;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #fff;
        border-width: 2px;
        border-color: #e8e9dd;
        border-radius: 20px;
        padding: 15px;
        align-items: center;
        margin-bottom: 10px;
    `,
    ButtonText: styled.Text`
        color: #000;
        font-size: 15px;
        font-weight: bold;
    `,
}