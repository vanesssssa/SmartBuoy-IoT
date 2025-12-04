import{ StyleSheet, Text, View, Image, ScrollView, Pressable} from 'react-native'
import {Link} from 'expo-router'
import { TextInput } from 'react-native';
import {BarChart, LineChart} from "react-native-gifted-charts"
import React, { useState } from "react";

const Historie = () => {

    const [searchText, setSearchText] = useState("");
    const [selectedWeek, setSelectedWeek] = useState({});

    //GET NEEDED WEEK
    const getSelectedWeek = (beachName) => {
        return selectedWeek[beachName] || 0;
    };

    //SET WEEK FOR BEACH
    const setWeekForBeach = (beachName, weekIndex) => {
        setSelectedWeek(prev => ({
            ...prev,
            [beachName]: weekIndex
        }));
    };

    //DUMMY CODE
    const beaches = [
    {
        name: "Brighton Beach",
        weeks: [
            {
                weekLabel: "Week 1",
                data: [
                    { value: 2, label: "Mon", frontColor: "#47679eff", spacing: 2 },
                    { value: 4, frontColor: "#6ba7e7ff" },
                    { value: 7, label: "Tue", frontColor: "#47679eff", spacing: 2 },
                    { value: 7, frontColor: "#6ba7e7ff" },
                    { value: 4, label: "Wed", frontColor: "#47679eff", spacing: 2 },
                    { value: 8, frontColor: "#6ba7e7ff" },
                    { value: 6, label: "Thu", frontColor: "#47679eff", spacing: 2 },
                    { value: 4, frontColor: "#6ba7e7ff" },
                    { value: 8, label: "Fri", frontColor: "#47679eff", spacing: 2 },
                    { value: 2, frontColor: "#6ba7e7ff" },
                    { value: 3, label: "Sat", frontColor: "#47679eff", spacing: 2 },
                    { value: 7, frontColor: "#6ba7e7ff" },
                    { value: 9, label: "Sun", frontColor: "#47679eff", spacing: 2 },
                    { value: 1, frontColor: "#6ba7e7ff" },
                ]
            },
            {
                weekLabel: "Week 2",
                data: [
                    { value: 5, label: "Mon", frontColor: "#47679eff", spacing: 2 },
                    { value: 3, frontColor: "#6ba7e7ff" },
                    { value: 6, label: "Tue", frontColor: "#47679eff", spacing: 2 },
                    { value: 5, frontColor: "#6ba7e7ff" },
                    { value: 7, label: "Wed", frontColor: "#47679eff", spacing: 2 },
                    { value: 4, frontColor: "#6ba7e7ff" },
                    { value: 8, label: "Thu", frontColor: "#47679eff", spacing: 2 },
                    { value: 2, frontColor: "#6ba7e7ff" },
                    { value: 6, label: "Fri", frontColor: "#47679eff", spacing: 2 },
                    { value: 5, frontColor: "#6ba7e7ff" },
                    { value: 4, label: "Sat", frontColor: "#47679eff", spacing: 2 },
                    { value: 6, frontColor: "#6ba7e7ff" },
                    { value: 7, label: "Sun", frontColor: "#47679eff", spacing: 2 },
                    { value: 3, frontColor: "#6ba7e7ff" },
                ]
            },
            {
                weekLabel: "Week 3",
                data: [
                    { value: 3, label: "Mon", frontColor: "#47679eff", spacing: 2 },
                    { value: 6, frontColor: "#6ba7e7ff" },
                    { value: 4, label: "Tue", frontColor: "#47679eff", spacing: 2 },
                    { value: 7, frontColor: "#6ba7e7ff" },
                    { value: 5, label: "Wed", frontColor: "#47679eff", spacing: 2 },
                    { value: 5, frontColor: "#6ba7e7ff" },
                    { value: 6, label: "Thu", frontColor: "#47679eff", spacing: 2 },
                    { value: 4, frontColor: "#6ba7e7ff" },
                    { value: 7, label: "Fri", frontColor: "#47679eff", spacing: 2 },
                    { value: 3, frontColor: "#6ba7e7ff" },
                    { value: 5, label: "Sat", frontColor: "#47679eff", spacing: 2 },
                    { value: 5, frontColor: "#6ba7e7ff" },
                    { value: 8, label: "Sun", frontColor: "#47679eff", spacing: 2 },
                    { value: 2, frontColor: "#6ba7e7ff" },
                ]
            },
            {
                weekLabel: "Week 4",
                data: [
                    { value: 6, label: "Mon", frontColor: "#47679eff", spacing: 2 },
                    { value: 4, frontColor: "#6ba7e7ff" },
                    { value: 8, label: "Tue", frontColor: "#47679eff", spacing: 2 },
                    { value: 2, frontColor: "#6ba7e7ff" },
                    { value: 7, label: "Wed", frontColor: "#47679eff", spacing: 2 },
                    { value: 3, frontColor: "#6ba7e7ff" },
                    { value: 5, label: "Thu", frontColor: "#47679eff", spacing: 2 },
                    { value: 5, frontColor: "#6ba7e7ff" },
                    { value: 9, label: "Fri", frontColor: "#47679eff", spacing: 2 },
                    { value: 1, frontColor: "#6ba7e7ff" },
                    { value: 6, label: "Sat", frontColor: "#47679eff", spacing: 2 },
                    { value: 4, frontColor: "#6ba7e7ff" },
                    { value: 8, label: "Sun", frontColor: "#47679eff", spacing: 2 },
                    { value: 2, frontColor: "#6ba7e7ff" },
                ]
            }
        ]
    },
    {
        name: "Bournemouth Beach",
        weeks: [ 
            {
                weekLabel: "01.12.-07.12.2025",
                data: [
                    { value: 4, label: "Mon", frontColor: "#47679eff", spacing: 2 },
                    { value: 6, frontColor: "#6ba7e7ff" },
                    { value: 7, label: "Tue", frontColor: "#47679eff", spacing: 2 },
                    { value: 3, frontColor: "#6ba7e7ff" },
                    { value: 5, label: "Wed", frontColor: "#47679eff", spacing: 2 },
                    { value: 5, frontColor: "#6ba7e7ff" },
                    { value: 6, label: "Thu", frontColor: "#47679eff", spacing: 2 },
                    { value: 4, frontColor: "#6ba7e7ff" },
                    { value: 8, label: "Fri", frontColor: "#47679eff", spacing: 2 },
                    { value: 2, frontColor: "#6ba7e7ff" },
                    { value: 3, label: "Sat", frontColor: "#47679eff", spacing: 2 },
                    { value: 7, frontColor: "#6ba7e7ff" },
                    { value: 9, label: "Sun", frontColor: "#47679eff", spacing: 2 },
                    { value: 1, frontColor: "#6ba7e7ff" },
                ]
            },
            {
                weekLabel: "24.11.-30.11.2025",
                data: [
                    { value: 5, label: "Mon", frontColor: "#47679eff", spacing: 2 },
                    { value: 5, frontColor: "#6ba7e7ff" },
                    { value: 6, label: "Tue", frontColor: "#47679eff", spacing: 2 },
                    { value: 4, frontColor: "#6ba7e7ff" },
                    { value: 7, label: "Wed", frontColor: "#47679eff", spacing: 2 },
                    { value: 3, frontColor: "#6ba7e7ff" },
                    { value: 8, label: "Thu", frontColor: "#47679eff", spacing: 2 },
                    { value: 2, frontColor: "#6ba7e7ff" },
                    { value: 6, label: "Fri", frontColor: "#47679eff", spacing: 2 },
                    { value: 4, frontColor: "#6ba7e7ff" },
                    { value: 4, label: "Sat", frontColor: "#47679eff", spacing: 2 },
                    { value: 6, frontColor: "#6ba7e7ff" },
                    { value: 7, label: "Sun", frontColor: "#47679eff", spacing: 2 },
                    { value: 3, frontColor: "#6ba7e7ff" },
                ]
            },
            {
                weekLabel: "17.11-23.11.2025",
                data: [
                    { value: 3, label: "Mon", frontColor: "#47679eff", spacing: 2 },
                    { value: 7, frontColor: "#6ba7e7ff" },
                    { value: 4, label: "Tue", frontColor: "#47679eff", spacing: 2 },
                    { value: 6, frontColor: "#6ba7e7ff" },
                    { value: 5, label: "Wed", frontColor: "#47679eff", spacing: 2 },
                    { value: 5, frontColor: "#6ba7e7ff" },
                    { value: 6, label: "Thu", frontColor: "#47679eff", spacing: 2 },
                    { value: 4, frontColor: "#6ba7e7ff" },
                    { value: 7, label: "Fri", frontColor: "#47679eff", spacing: 2 },
                    { value: 3, frontColor: "#6ba7e7ff" },
                    { value: 5, label: "Sat", frontColor: "#47679eff", spacing: 2 },
                    { value: 5, frontColor: "#6ba7e7ff" },
                    { value: 8, label: "Sun", frontColor: "#47679eff", spacing: 2 },
                    { value: 2, frontColor: "#6ba7e7ff" },
                ]
            },
            {
                weekLabel: "10.11.-16.11.2025",
                data: [
                    { value: 3, label: "Mon", frontColor: "#47679eff", spacing: 2 },
                    { value: 7, frontColor: "#6ba7e7ff" },
                    { value: 4, label: "Tue", frontColor: "#47679eff", spacing: 2 },
                    { value: 6, frontColor: "#6ba7e7ff" },
                    { value: 5, label: "Wed", frontColor: "#47679eff", spacing: 2 },
                    { value: 5, frontColor: "#6ba7e7ff" },
                    { value: 6, label: "Thu", frontColor: "#47679eff", spacing: 2 },
                    { value: 4, frontColor: "#6ba7e7ff" },
                    { value: 7, label: "Fri", frontColor: "#47679eff", spacing: 2 },
                    { value: 3, frontColor: "#6ba7e7ff" },
                    { value: 5, label: "Sat", frontColor: "#47679eff", spacing: 2 },
                    { value: 5, frontColor: "#6ba7e7ff" },
                    { value: 8, label: "Sun", frontColor: "#47679eff", spacing: 2 },
                    { value: 2, frontColor: "#6ba7e7ff" },
                ]
            }
        ]
    }   
];


    const filteredBeaches = beaches.filter(
        beach => beach.name && beach.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Historical Water Quality</Text>

            {/* SEARCH BAR */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search beaches..."
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor="#9ca3af"
                />
                <Image
                    source={require("../assets/icons/search.png")}
                    style={styles.searchIcon}
                />
            </View>

            {/* GRAPH */}
            <ScrollView 
                style={{ width: "100%"}}
                contentContainerStyle={{
                    alignItems: "center",
                }}>
                
                {/* SEARCH BEACHES */}
                {filteredBeaches.length === 0 ? (
                    <Text style = {{marginTop: 20, color: "#9ca3af", fontSize: 16}}>
                        No beaches found.
                    </Text>
                ) :
                    (filteredBeaches.map((beach, index) => (
                        <View 
                            style={styles.chartContainer}
                            key = {`${beach.name}-week-${getSelectedWeek(beach.name)}`}>
                            <Text style={styles.subtitle}>{beach.name}</Text>

                                 {/*LEGEND */}
                                <View style={styles.legendContainer}>
                                    <View style={styles.legendItem}>
                                        <View style={[styles.legendBox, {backgroundColor: "#47679eff"}]}></View>
                                        <Text style={styles.legendText}>E. coli Bacteria</Text>
                                    </View>
                                    <View style={styles.legendItem}>
                                        <View style={[styles.legendBox, {backgroundColor: "#6ba7e7ff"}]}></View>
                                        <Text style={styles.legendText}>Intestinal Enterococci</Text>
                                    </View>
                                </View>

                                {/*CHANGE WEEKS*/}
                                <View style={styles.weekSelector}>
                                        <Pressable
                                           style={styles.arrowButton}
                                            onPress={() => {
                                                const currentWeek = getSelectedWeek(beach.name);
                                                const newWeek = currentWeek > 0 ? currentWeek -1 : beach.weeks.length -1;
                                                setWeekForBeach(beach.name, newWeek);
                                            }}
                                        >
                                            <Text style={styles.arrowText}>{"<"}</Text>
                                        </Pressable>
                                        <Text style={styles.weekLabel}>
                                            {beach.weeks[getSelectedWeek(beach.name)].weekLabel}
                                        </Text>
                                        <Pressable
                                            style={styles.arrowButton}
                                            onPress={()=> {
                                                const currentWeek = getSelectedWeek(beach.name);
                                                const newWeek = currentWeek < beach.weeks.length -1 ? currentWeek + 1 : 0;
                                                setWeekForBeach(beach.name, newWeek);
                                            }}
                                        >
                                            <Text style={styles.arrowText}>{">"}</Text>
                                        </Pressable>
                                    
                                </View>

                                {/* CHART */}
                                <BarChart 
                                    key={`${beach.name}-week-chart-${getSelectedWeek(beach.name)}`}
                                    height = {260}
                                    width = {320}
                                    data = {beach.weeks[getSelectedWeek(beach.name)].data}
                                    isAnimated
                                    barWidth = {22}
                                    spacing = {30}
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
                        </View>
                ))
            )}
            </ScrollView>


            {/* NAVIGATION */}

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
        overflow: 'hidden',
    },

    //LEGEND
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
        flexWrap: 'wrap',
        gap: 12,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendBox: {
        width: 14,
        height: 14,
        borderRadius: 3,
        marginRight: 6,
    },
    legendText: {
        fontSize: 11,
        color: '#666'
    },

    // WEEK SELECTOR
    weekSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        gap: 20,
    },
    arrowButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    arrowText: {
        fontSize: 20,
        color: '#333',
        fontWeight: '600',
    },
    weekLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        minWidth: 80,
        textAlign: 'center',
    },
})