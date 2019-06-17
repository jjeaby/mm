
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity,  View, TextInput, Text, Button, Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainScreen from './Components/MainScreen';

import { event } from './injectJS/event.js';




export default class App extends React.Component {

    constructor(props){

        // alert(event.toString())
        super(props);
        // console.log(event.toString());


        this.state = {
            url: '',
            startUrl: 'https://www.topbots.com/category/articles',
            jsCode: event.toString() + 'event();',
            screenWidth: 0,
            screenHeight: 0,
        }
        this.state.screenWidth = Dimensions.get('window').width; //full width
        this.state.screenHeight = Dimensions.get('window').height; //full height
    }


    componentDidMount() {

     }

    _onPressGo=() => {
        // alert(this.state.url);
        // this.state.startUrl = this.state.url;

        let redirectCode = `window.location = '${this.state.url}';`;
        this.webview.injectJavaScript(redirectCode);
    }
    _onPressBack=() => {
        this.webview.goBack();
    }
    _onPressForword=() => {
        this.webview.go();
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={{
                    height:40,
                    flexDirection: 'row',
                    paddingTop: 0,
                    paddingBottom: 0,

                }}>
                    <View style={{
                        paddingLeft:5,
                    }} >
                            <TextInput
                                onChangeText={(url) => this.setState({url})}

                                editable = {true}
                                maxLength = {255}
                                multiline = {false}
                                style = {{
                                    marginRight:6,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    paddingLeft: 5,
                                    borderWidth: 1,

                                    height: 40,
                                    width: this.state.screenWidth - 120,
                                    // justifyContent:'flex-end'

                                    // fontSize: 30,
                                }}
                                underlineColorAndroid = "transparent"
                                placeholder = "url"
                                placeholderTextColor = "#9a73ef"
                                autoCapitalize = "none"

                                >
                                {this.state.startUrl}
                            </TextInput>
                    </View>
                    <View style={{
                        paddingTop: 1,
                        paddingBottom: 0,
                        paddingRight: 5,

                    }} >
                        <View style={{
                            flexDirection: 'row',

                        }}>

                            <Button
                                style={{
                                    padding: 5,

                                }}
                                onPress={this._onPressGo}
                                title="GO"
                                color="#841584"
                            />
                            <Button
                                style={{
                                    padding: 5,

                                }}
                                onPress={this._onPressBack}
                                title="<"
                                color="#841584"
                            />
                            <Button
                                style={{
                                    padding: 5,

                                }}
                                onPress={this._onPressGo}
                                title=">"
                                color="#841584"
                            />
                        </View>

                    </View>
                </View>

                <WebView
                    ref={ref => this.webview = ref}

                    style={{
                        marginTop:5,
                        marginBottom: 15,
                        marginLeft: 5,
                        marginEnd: 5,
                    }}
                    source={
                        {
                            uri: this.state.startUrl,
                            headers: {"custom-app-header": "react-native-ios-app"}

                        }
                    }
                    onLoadEnd={syntheticEvent => {
                        // update component to be aware of loading status
                        const { nativeEvent } = syntheticEvent;
                        this.isLoading = nativeEvent.loading;
                        // this.state.jsCode = event.toString() + 'event();'
                    }}
                    onMessage={(event)=> console.warn(event.nativeEvent.data)}
                    javaScriptEnabled={true}
                    injectedJavaScript={this.state.jsCode}
                />
            {/*</View>*/}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 40,
        backgroundColor: "#EEE",
        paddingLeft:5,
        paddingRight:5,
    },


});
