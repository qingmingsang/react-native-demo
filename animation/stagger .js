import React, { PureComponent } from 'react';
import { Animated, Text, View, Button } from 'react-native';

export default class Demo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      /*
       初始化动画值
       * */
      skyAnimValue: new Animated.Value(1),
      redAnimValue: new Animated.Value(1),
      greenAnimValue: new Animated.Value(1),
      currentValue: 1, //标志位
    }
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Animated.View style={{
          width: '50%',
          height: '50%',
          backgroundColor: 'skyblue',
          /*
           将动画值绑定到style的属性
          * */
          opacity: this.state.redAnimValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1]
          }),
          transform: [ //位置动画（可以思考一下：下面的元素顺序不同会有不同效果）
            {
              translateX: this.state.redAnimValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0] //线性插值
              })
            }, {
              scale: this.state.greenAnimValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1]
              })
            },
          ]
        }} />
        <Button title="touch me"
          onPress={() => {
            /*
             处理动画值，并启动动画
             * */
            this.setState(({ currentValue }) => ({
              currentValue: currentValue ? 0 : 1
            }), () => {
              const animations = [
                Animated.timing(
                  this.state.greenAnimValue,
                  {
                    toValue: this.state.currentValue,
                  }),
                Animated.timing(
                  this.state.redAnimValue,
                  {
                    toValue: this.state.currentValue,
                  }),
                Animated.timing(
                  this.state.skyAnimValue,
                  {
                    toValue: this.state.currentValue,
                  })
              ]
              Animated.stagger(250, animations).start()
            });
          }} />
      </View>
    )
  }
}