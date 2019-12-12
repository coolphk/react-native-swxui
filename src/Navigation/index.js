import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import {Easing, Animated} from 'react-native'
import {createAppContainer, createStackNavigator} from "react-navigation";
import HomePage from '../View/homePage'
import Outer from '../View/outerLayer'

const StackNavigator = createStackNavigator(

  {
    Outer: {screen: Outer},
    HomePage: {screen: HomePage}
  },
  {
    //initialRouteName: process.env.NODE_ENV === "development" ? "Outer" : "HomePage",
    initialRouteParams: {
      url: "",
      type: "",
      pageNum: 1,
      fromApp: true
    },
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig: (() => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      }
    }))
  }
);


const AppContainer = createAppContainer(StackNavigator);

export default AppContainer
