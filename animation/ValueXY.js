import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Animated
} from 'react-native';
let { width, height } = Dimensions.get('window');
const SQUARE_DIMENSIONS = 30;
const SPRING_CONFIG = { tension: 2, friction: 3 };//spring()相关的参数

export default class AnimatedSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY
    }
  }

  componentDidMount() {
    this.startAndRepeat();
  }

  startAndRepeat = () => {
    this.triggerAnimation(this.startAndRepeat);
  }

  getStyle = () => {
    return [
      styles.square,
      {
        transform: this.state.pan.getTranslateTransform()
      }
    ];
  }

  triggerAnimation = (cb) => {
    Animated.sequence([
      Animated.spring(this.state.pan, {
        ...SPRING_CONFIG,
        toValue: { x: 0, y: height - SQUARE_DIMENSIONS } //animate to bottom left
      }),
      Animated.spring(this.state.pan, {
        ...SPRING_CONFIG,
        toValue: { x: width - SQUARE_DIMENSIONS, y: height - SQUARE_DIMENSIONS } // animated to bottom right
      }),
      Animated.spring(this.state.pan, {
        ...SPRING_CONFIG,
        toValue: { x: width - SQUARE_DIMENSIONS, y: 0 } //animate to top right
      }),
      Animated.spring(this.state.pan, {
        ...SPRING_CONFIG,
        toValue: { x: 0, y: 0 } // return to start
      })
    ]).start(cb);//无限循环
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={this.getStyle()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  square: {
    width: SQUARE_DIMENSIONS,
    height: SQUARE_DIMENSIONS,
    backgroundColor: 'blue'
  }
});