import{ StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import {Link} from 'expo-router'
import { TextInput } from 'react-native';
import {BarChart, LineChart} from "react-native-gifted-charts"
import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient'

const Historie = () => {

    //const beachName = "Brigthon Beach";
    //const data = [{value: 5, label: "Mon"}, {value: 8, label: "Tue"}, {value: 9, label: "Wed"}, {value: 6, label: "Thu"}, {value: 5, label:"Fri"}, {value: 5, label: "Sat"}, {value: 5, label: "Sun"}]

    //DUMMY CODE
    const beaches = [
    {
        name: "Brighton Beach",
        data: [
            { value: 5, label: "Mon", },
            { value: 8, label: "Tue", },
            { value: 9, label: "Wed", },
            { value: 6, label: "Thu", },
            { value: 5, label: "Fri", },
            { value: 5, label: "Sat", },
            { value: 5, label: "Sun", },
        ],
    },
    {
        name: "Bournemouth Beach",
        data: [
            { value: 3, label: "Mon" },
            { value: 7, label: "Tue" },
            { value: 6, label: "Wed" },
            { value: 4, label: "Thu" },
            { value: 2, label: "Fri" },
            { value: 3, label: "Sat" },
            { value: 4, label: "Sun" },
        ],
    },
    {
        name: "Whitby Beach",
        data: [
            { value: 6, label: "Mon" },
            { value: 8, label: "Tue" },
            { value: 7, label: "Wed" },
            { value: 5, label: "Thu" },
            { value: 4, label: "Fri" },
            { value: 6, label: "Sat" },
            { value: 7, label: "Sun" },
        ],
    },
    {
        name: "St Ives Bay",
        data: [
            { value: 4, label: "Mon" },
            { value: 5, label: "Tue" },
            { value: 3, label: "Wed" },
            { value: 6, label: "Thu" },
            { value: 7, label: "Fri" },
            { value: 6, label: "Sat" },
            { value: 5, label: "Sun" },
        ],
    },
];

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Historical Water Quality</Text>

            {/* Search Bar */}

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search beaches..."
                    //value={searchText}
                    //onChangeText={handleSearch}
                    placeholderTextColor="#9ca3af"
                />
                <Image
                    source={require("../assets/icons/search.png")}
                    style={styles.searchIcon}
                />
            </View>

            {/* Graph */}
            <ScrollView 
                style={{ width: "100%"}}
                contentContainerStyle={{
                    alignItems: "center",
                }}>
                {beaches.map((beach, index) => (
                    <View key= {index} style={styles.chartContainer}>
                        <Text style={styles.subtitle}>{beach.name}</Text>
                        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{maxHeight: 350}}>
                            <BarChart 
                                height = {260}
                                width = {320}
                                data = {beach.data}
                                noOfSections={4}
                                barBorderRadius={5}
                                yAxisThickness={0}
                                xAxisThickness={0}
                                xAxisLabelTextStyle={{
                                    color: "#9ca3af",
                                    fontSize: 12,
                                    fontWeight: "500"
                                }}
                                yAxisTextStyle={{
                                    color: "#9ca3af",
                                    fontSize: 12,
                                    fontWeight: "500"
                                }}
                            />
                        </ScrollView>
                    </View>
            ))}
            </ScrollView>

            


            {/* Navigation */}

            <View style={styles.bottomNav}>
                <Link href="/app" style={[styles.navText]}>
                    <View style={styles.navButton}>
                        <Image
                            source={require("../assets/icons/home.png")}
                            style={styles.icon}
                        />
                        <Text style={[styles.navText]}>Home</Text>
                    </View>
                </Link>
        
                <Link href="/map" style={[styles.navText]}>
                    <View style={styles.navButton}>
                        <Image
                            source={require("../assets/icons/map.png")}
                            style={styles.icon}
                        />
                        <Text style={[styles.navText]}>Map</Text>
                    </View>
                </Link>
        
                <Link href="/historie" style={[styles.navText]}>
                    <View style={styles.navButton}>
                        <Image
                            source={require("../assets/icons/time.png")}
                            style={styles.activeIcon}
                        />
                        <Text style={[styles.navText, styles.activeNav]}>Historie</Text>
                    </View>
                </Link>
        
            </View>
        </View>
    )
}

export default Historie
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 40
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'regular',
        textAlign: 'left',
        marginBottom: 24,
    },
    card:{
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 5,
        boxShadow: '4px 4px rgba(0,0,0,0.1)'
    },
    link:{
        marginVertical: 10,
        borderBottomWidth: 1
    },

    // SEARCH BAR STYLES
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: '90%',
        marginTop: 40,
        marginBottom: 40,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: '#9ca3af',
        marginLeft: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },

    //NAV
    bottomNav: {
        position: "absolute",
        bottom: 24,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 36,
        width: 280,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },
    navButton: {
        alignItems: "center",
    },
    icon: {
        width: 20,
        height: 20,
        marginBottom: 4,
        tintColor: "#9ca3af",
    },
    activeIcon: {
        width: 20,
        height: 20,
        marginBottom: 4,
        tintColor: "#000",
    },
    navText: {
        fontSize: 12,
        color: "#9ca3af",
    },
    activeNav: {
        color: "#000",
        fontWeight: "600",
    },


    //CHART
    chartContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 20,
        marginBottom: 40,
        alignItems: 'center',
        width: 360,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    }

})