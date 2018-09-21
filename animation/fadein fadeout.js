import React, { PureComponent } from 'react';
import { Animated, Text, View, Button } from 'react-native';

export default class Demo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),  // 透明度初始值设为0
      opacityV: 1
    }
  }
  animationHandler = () => {
    this.setState(({ opacityV }) => ({
      opacityV: opacityV ? 0 : 1
    }), () => {
      Animated.timing(// 随时间变化而执行动画
        this.state.fadeAnim,// 动画中的变量值
        {
          toValue: this.state.opacityV, // 透明度最终变为1，即完全不透明
          duration: 1000, // 让动画持续一段时间
        }
      ).start(); // 开始执行动画
    });
  }
  render() {
    let { fadeAnim } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View
          style={{
            width: 250, height: 50, backgroundColor: 'powderblue',
            opacity: fadeAnim,         // 将透明度指定为动画变量值
          }}
        >
          <Text
            style={{ fontSize: 28, textAlign: 'center', margin: 10 }}
          >
            Fading in
          </Text>
        </Animated.View>
        <Button title='click' onPress={this.animationHandler}>
        </Button>
      </View>
    );
  }
}