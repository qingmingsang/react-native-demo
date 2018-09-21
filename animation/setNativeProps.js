import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    LayoutAnimation,
    TouchableOpacity,
    Image,
    UIManager,
    Platform
} from "react-native";

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        width: 100,
        height: 100
    };
  }
  startAnimation() {
    var count = 0;
    while (++count < 50) {
        requestAnimationFrame(() =>{
          this._image.setNativeProps({
                style: {
                    width: this.state.width++,
                    height: this.state.height++
                }
            });
        });
    }
  }
  render() {
      return ( 
        <View style = {styles.container}> 
          <Image 
          ref={(el)=>{this._image=el}}
          source = { { uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png' } }
              style={{width: this.state.width, height: this.state.height}}/>
          <TouchableOpacity style={styles.instructions} onPress={()=>this.startAnimation()}>
              <Text style={{alignSelf: 'center', color: '#FFFFFF'}}>Press me!</Text> 
          </TouchableOpacity>
          </View> 
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        backgroundColor: '#00FF00',
        width: 150,
        height: 80,
    },
    instructions: {
        backgroundColor: '#FF0000',
        width: 80,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
});