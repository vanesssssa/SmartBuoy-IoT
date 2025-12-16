import { StyleSheet, Text, View, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import { Link } from 'expo-router'
import { TextInput } from 'react-native';
import { BarChart } from "react-native-gifted-charts"
import React, { useState, useEffect } from "react";
import { API_URL } from '../constants/api';


const history = () => {

    const [searchText, setSearchText] = useState("");
    const [selectedWeek, setSelectedWeek] = useState({});
    const [beaches, setBeaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data when component mounts
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_URL}/api/beaches/history`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch history');
            }
            
            const data = await response.json();
            setBeaches(data);
        } catch (err) {
            console.error('Error fetching history:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // GET NEEDED WEEK
    const getSelectedWeek = (beachName) => {
        return selectedWeek[beachName] || 0;
    };

    // SET WEEK FOR BEACH
    const setWeekForBeach = (beachName, weekIndex) => {
        setSelectedWeek(prev => ({
            ...prev,
            [beachName]: weekIndex
        }));
    };

    const filteredBeaches = beaches.filter(
        beach => beach.name && beach.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Show loading spinner
    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text style={styles.loadingText}>Loading history...</Text>
            </View>
        );
    }

    // Show error message
    if (error) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <Pressable style={styles.retryButton} onPress={fetchHistory}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </Pressable>
            </View>
        );
    }

    return (
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
                style={{ width: "100%" }}
                contentContainerStyle={{
                    alignItems: "center",
                    paddingBottom: 100,
                }}>

                {/* SEARCH BEACHES */}
                {filteredBeaches.length === 0 ? (
                    <Text style={{ marginTop: 20, color: "#9ca3af", fontSize: 16 }}>
                        No beaches found.
                    </Text>
                ) : (
                    filteredBeaches.map((beach, index) => {
                        const currentWeekIndex = getSelectedWeek(beach.name);
                        const currentWeek = beach.weeks[currentWeekIndex];

                        if (!currentWeek) return null;

                        return (
                            <View
                                style={styles.chartContainer}
                                key={`${beach.name}-week-${currentWeekIndex}`}>
                                <Text style={styles.subtitle}>{beach.name}</Text>

                                {/* LEGEND */}
                                <View style={styles.legendContainer}>
                                    <View style={styles.legendItem}>
                                        <View style={[styles.legendBox, { backgroundColor: "#47679eff" }]}></View>
                                        <Text style={styles.legendText}>E. coli Bacteria</Text>
                                    </View>
                                    <View style={styles.legendItem}>
                                        <View style={[styles.legendBox, { backgroundColor: "#6ba7e7ff" }]}></View>
                                        <Text style={styles.legendText}>Intestinal Enterococci</Text>
                                    </View>
                                </View>

                                {/* CHANGE WEEKS */}
                                <View style={styles.weekSelector}>
                                    <Pressable
                                        style={styles.arrowButton}
                                        onPress={() => {
                                            const currentWeek = getSelectedWeek(beach.name);
                                            const newWeek = currentWeek > 0 ? currentWeek - 1 : beach.weeks.length - 1;
                                            setWeekForBeach(beach.name, newWeek);
                                        }}
                                    >
                                        <Text style={styles.arrowText}>{"<"}</Text>
                                    </Pressable>
                                    <Text style={styles.weekLabel}>
                                        {currentWeek.weekLabel}
                                    </Text>
                                    <Pressable
                                        style={styles.arrowButton}
                                        onPress={() => {
                                            const currentWeek = getSelectedWeek(beach.name);
                                            const newWeek = currentWeek < beach.weeks.length - 1 ? currentWeek + 1 : 0;
                                            setWeekForBeach(beach.name, newWeek);
                                        }}
                                    >
                                        <Text style={styles.arrowText}>{">"}</Text>
                                    </Pressable>
                                </View>

                                {/* CHART */}
                                <BarChart
                                    key={`${beach.name}-week-chart-${currentWeekIndex}`}
                                    height={260}
                                    width={320}
                                    data={currentWeek.data}
                                    isAnimated
                                    barWidth={22}
                                    spacing={30}
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
                        );
                    })
                )}
            </ScrollView>

            {/* NAVIGATION */}
            <View style={styles.bottomNav}>
                <Link href="/app" style={styles.navLink}>
                    <View style={styles.navButton}>
                        <Image
                            source={require("../assets/icons/home.png")}
                            style={styles.icon}
                        />
                        <Text style={styles.navText}>Home</Text>
                    </View>
                </Link>

                <Link href="/map" style={styles.navLink}>
                    <View style={styles.navButton}>
                        <Image
                            source={require("../assets/icons/map.png")}
                            style={styles.icon}
                        />
                        <Text style={styles.navText}>Map</Text>
                    </View>
                </Link>

                <Link href="/history" style={styles.navLink}>
                    <View style={styles.navButton}>
                        <Image
                            source={require("../assets/icons/time.png")}
                            style={styles.activeIcon}
                        />
                        <Text style={[styles.navText, styles.activeNav]}>history</Text>
                    </View>
                </Link>
            </View>
        </View>
    )
}

export default history

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    centered: {
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: '#ef4444',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#3b82f6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
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