
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainScreen from './Components/MainScreen';


export default class App extends React.Component {
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
                        console.warn("----")
                    }}
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