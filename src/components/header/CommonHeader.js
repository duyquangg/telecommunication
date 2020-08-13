import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import gui from '../../lib/gui';
import LinearGradient from 'react-native-linear-gradient';
const CommonHeader = (props) => {
    let {
        onPressLeft,
        onPressRight,
        leftContent,
        rightContent,
        title,
        textStyle,
        heightHeader,
        marginTop
    } = props;
    return (
        <LinearGradient
            colors={gui.linearMain}
            style={[styles.header, { marginTop }]}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.viewBack}
                    onPress={onPressLeft}>
                    {leftContent}
                </TouchableOpacity>
                <View style={styles.viewTitle}>
                    <Text style={[styles.titleTextHeader, textStyle]}>{title}</Text>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPressRight}
                style={styles.viewRight}>
                {rightContent}
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        height: gui.navBarHeight,
        width: gui.screenWidth,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: gui.marginTop
    },
    viewBack: {
        width: 90,
        height: 25,
        paddingLeft: 16,
        justifyContent: 'center',
    },
    viewRight: {
        width: 90,
        height: 25,
        paddingRight: 16,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    viewTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -30,
    },
    titleTextHeader: {
        fontSize: 18,
        fontWeight: '700',
    },
});

export default CommonHeader;
