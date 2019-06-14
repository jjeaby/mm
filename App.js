
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainScreen from './Components/MainScreen';


export default class App extends React.Component {
    render() {
        let jsCode = `
          var node = document;
          var longpress = false;
          var presstimer = null;
          var longtarget = null;
          
          var cancel = function(e) {
              if (presstimer !== null) {
                  clearTimeout(presstimer);
                  presstimer = null;
              }
          
          };
          
          var click = function(e) {
              if (presstimer !== null) {
                  clearTimeout(presstimer);
                  presstimer = null;
              }
          
          
              if (longpress) {
                  return false;
              }
          
              // alert("press");              
              
          };
          
          
          var start = function(e) {
              if (e.type === "click" && e.button !== 0) {
                  return;
              }
              // alert(e.target.textContent);          

              longpress = false;
          
              if (presstimer === null) {
                  presstimer = setTimeout(function() {
                      // alert("long click");
                      
fetch('https://api.github.com/orgs/nodejs')
.then(response => response.json())
.then(data => {
  // Prints result from \`response.json()\` in getRequest
  // alert(data.login) 
  e.target.textContent = data.login;
})
.catch(error => console.error(error))
                      // alert(e.target.textContent);          
                      longpress = true;
                      return;
                  }, 130);
              }
          
              return false;
          }; 
          
          node.addEventListener("mousedown", start);
          node.addEventListener("click", click);
          node.addEventListener("touchstart", start);
          node.addEventListener("mouseout", cancel);
          node.addEventListener("touchend", cancel);
          node.addEventListener("touchleave", cancel);
          node.addEventListener("touchcancel", cancel);
          
          node.oncontextmenu = function (e) {
            e.preventDefault();
          };
          `
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
                    }}
                    onMessage={(event)=> console.warn(event.nativeEvent.data)}
                    javaScriptEnabled={true}
                    injectedJavaScript={jsCode}
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