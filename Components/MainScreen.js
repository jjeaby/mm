import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class MainScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>MainScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MainScreen;
