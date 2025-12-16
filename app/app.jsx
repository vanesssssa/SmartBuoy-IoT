import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import { Link, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '../constants/api'

const Home = () => {
    const [savedBeach, setSavedBeach] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Get params from map screen
    const { beachName, beachId } = useLocalSearchParams();

    // Load saved beach on mount, or save new one if passed from map
    useEffect(() => {
        if (beachName && beachId) {
            // New beach selected from map - save it
            saveBeach(beachId, beachName);
        } else {
            // Load previously saved beach
            loadSavedBeach();
        }
    }, [beachName, beachId]);

    const saveBeach = async (id, name) => {
        try {
            const beachData = { id, name };
            await AsyncStorage.setItem('savedBeach', JSON.stringify(beachData));
            // Fetch full beach details from API
            fetchBeachDetails(id);
        } catch (err) {
            console.error('Error saving beach:', err);
        }
    };

    const loadSavedBeach = async () => {
        try {
            const saved = await AsyncStorage.getItem('savedBeach');
            if (saved) {
                const beachData = JSON.parse(saved);
                fetchBeachDetails(beachData.id);
            } else {
                setLoading(false);
            }
        } catch (err) {
            console.error('Error loading saved beach:', err);
            setLoading(false);
        }
    };

    const fetchBeachDetails = async (beachId) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/beaches/${beachId}`);
            if (response.ok) {
                const data = await response.json();
                setSavedBeach(data);
            }
        } catch (err) {
            console.error('Error fetching beach details:', err);
        } finally {
            setLoading(false);
        }
    };

    const clearSavedBeach = async () => {
        try {
            await AsyncStorage.removeItem('savedBeach');
            setSavedBeach(null);
        } catch (err) {
            console.error('Error clearing beach:', err);
        }
    };

    // Determine water quality status
    const getWaterQualityStatus = () => {
        if (!savedBeach?.waterQuality) return { isGood: true, status: 'Unknown' };
        
        const status = savedBeach.waterQuality.status;
        const classification = savedBeach.waterQuality.classification;
        
        if (status === 'safe' || classification === 'Excellent' || classification === 'Good') {
            return { isGood: true, status: 'Good' };
        } else if (status === 'caution' || classification === 'Sufficient') {
            return { isGood: false, status: 'Caution' };
        } else {
            return { isGood: false, status: 'Bad' };
        }
    };

    const { isGood, status } = getWaterQualityStatus();

    // Loading state
    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    // No beach saved - show prompt to select one
    if (!savedBeach) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Smart Buoy App</Text>
                
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyTitle}>No Beach Selected</Text>
                    <Text style={styles.emptyText}>
                        Go to the Map and select a beach to track its water quality here.
                    </Text>
                    <Link href="/map" asChild>
                        <Pressable style={styles.selectButton}>
                            <Text style={styles.selectButtonText}>Select a Beach</Text>
                        </Pressable>
                    </Link>
                </View>

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <Link href="/app" style={[styles.navText]}>
                        <View style={styles.navButton}>
                            <Image
                                source={require("../assets/icons/home.png")}
                                style={styles.activeIcon}
                            />
                            <Text style={[styles.navText, styles.activeNav]}>Home</Text>
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

                    <Link href="/history" style={[styles.navText]}>
                        <View style={styles.navButton}>
                            <Image
                                source={require("../assets/icons/time.png")}
                                style={styles.icon}
                            />
                            <Text style={[styles.navText]}>history</Text>
                        </View>
                    </Link>
                </View>
            </View>
        );
    }

    // Beach is saved - show water quality card
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Smart Buoy App</Text>
            
            {/* Water Quality Card */}
            <View style={[
                styles.card,
                { backgroundColor: isGood ? "#4ade80" : '#ef4444' },
            ]}>
                {/* Change Beach Button */}
                <Pressable style={styles.changeButton} onPress={clearSavedBeach}>
                    <Text style={styles.changeButtonText}>✕</Text>
                </Pressable>

                <Text style={styles.beachName}>{savedBeach.name}</Text>
                <View style={styles.locationRow}>
                    <Text style={styles.locationText}>{savedBeach.description}</Text>
                </View>

                <View style={[
                    styles.circle,
                    {
                        backgroundColor: isGood ? '#4ade80' : '#ef4444',
                        borderColor: isGood ? '#86efac' : '#fca5a5'
                    },
                ]}>
                    <Text style={styles.status}>{status}</Text>
                    <Text style={styles.indexText}>
                        {savedBeach.waterQuality?.classification || 'N/A'}
                    </Text>
                </View>

                <Text style={styles.description}>
                    {isGood 
                        ? "The water quality is good\n" 
                        : "The water quality is poor\n"}
                    <Text style={styles.bold}>
                        {isGood ? "You are safe to swim" : "Avoid swimming"}
                    </Text>
                </Text>

                {/* Extra info */}
                {savedBeach.waterQuality?.enterococci && (
                    <Text style={styles.extraInfo}>
                        Enterococci: {savedBeach.waterQuality.enterococci} CFU/100ml
                    </Text>
                )}
                {savedBeach.waterQuality?.lastTested && (
                    <Text style={styles.extraInfo}>
                        Last tested: {savedBeach.waterQuality.lastTested}
                    </Text>
                )}
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <Link href="/app" style={[styles.navText]}>
                    <View style={styles.navButton}>
                        <Image
                            source={require("../assets/icons/home.png")}
                            style={styles.activeIcon}
                        />
                        <Text style={[styles.navText, styles.activeNav]}>Home</Text>
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

                <Link href="/history" style={[styles.navText]}>
                    <View style={styles.navButton}>
                        <Image
                            source={require("../assets/icons/time.png")}
                            style={styles.icon}
                        />
                        <Text style={[styles.navText]}>history</Text>
                    </View>
                </Link>
            </View>
        </View>
    );
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        paddingTop: 40,
    },
    centered: {
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
    title: {
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 24
    },

    // EMPTY STATE
    emptyCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: 24,
        padding: 40,
        alignItems: 'center',
        width: 340,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#374151',
        marginBottom: 12,
    },
    emptyText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    selectButton: {
        backgroundColor: '#3b82f6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    // CARD
    card: {
        borderRadius: 24,
        padding: 64,
        alignItems: 'center',
        width: 340,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
        position: 'relative',
    },
    changeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    changeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    beachName: {
        color: "white",
        fontWeight: "700",
        fontSize: 20,
        marginBottom: 4,
        textAlign: 'center',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.9,
        marginBottom: 24,
    },
    locationText: {
        color: 'white',
        fontSize: 13,
        marginLeft: 4,
        textAlign: 'center',
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 16,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
    },
    status: {
        color: "white",
        fontWeight: "700",
        fontSize: 36,
    },
    indexText: {
        color: "white",
        opacity: 0.8,
        fontSize: 14,
    },
    description: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
    },
    bold: {
        fontWeight: "700",
    },
    extraInfo: {
        color: "white",
        opacity: 0.8,
        fontSize: 12,
        marginTop: 8,
    },

    // NAV
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
});