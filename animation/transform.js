import React, { PureComponent } from 'react';
import { Animated, Text, View, Button } from 'react-native';

export default class Demo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      /*
       初始化动画值
       * */
      animValue: new Animated.Value(1),
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
          opacity: this.state.animValue, //透明度动画
          transform: [ //位置动画（可以思考一下：下面的元素顺序不同会有不同效果）
            {
              translateX: this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0] //线性插值，0对应300，1对应0
              })
            }, {
              scale: this.state.animValue, //大小动画
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
              Animated.timing(this.state.animValue, {
                toValue: this.state.currentValue,
                duration: 1500,
              }).start()
            });
          }} />
      </View>
    )
  }
}