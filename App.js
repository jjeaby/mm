
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
            url: 'https://naver.com',
            jsCode: event.toString() + 'event();',
        }
    }


    componentDidMount() {

     }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Web App</Text>
                {/*<MainScreen />*/}
                <WebView
                    source={{ uri: 'https://facebook.github.io/react-native/' }}
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
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 50,
        backgroundColor: "#EEE",
    },
    title: {
        fontWeight: "800",
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 20,
    }
});
