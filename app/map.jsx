import { StyleSheet, Text, View, Image, Modal, ScrollView, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { TextInput } from 'react-native';
import { useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';

// TEMPORARY: Mock beach data - Replace with cloud database later
const MOCK_BEACHES = [
    {
        id: 1,
        name: "Brighton Beach",
        latitude: 50.8225,
        longitude: -0.1372,
        description: "Famous pebble beach with pier and vibrant seafront",
        rating: 4.5,
        facilities: ["Parking", "Toilets", "Cafes"],
        waterQuality: {
            classification: "Good",
            status: "safe", // safe, caution, unsafe
            enterococci: 85, // per 100ml
            lastTested: "2024-11-28",
            waterType: "coastal"
        }
    },
    {
        id: 2,
        name: "Bournemouth Beach",
        latitude: 50.7155,
        longitude: -1.8797,
        description: "Seven miles of golden sand",
        rating: 4.7,
        facilities: ["Parking", "Toilets", "Lifeguard"],
        waterQuality: {
            classification: "Excellent",
            status: "safe",
            enterococci: 18,
            lastTested: "2024-11-29",
            waterType: "coastal"
        }
    },
    {
        id: 3,
        name: "Whitby Beach",
        latitude: 54.4858,
        longitude: -0.6206,
        description: "Sandy beach with historic abbey backdrop",
        rating: 4.3,
        facilities: ["Parking", "Toilets"],
        waterQuality: {
            classification: "Sufficient",
            status: "caution",
            enterococci: 165,
            lastTested: "2024-11-27",
            waterType: "coastal"
        }
    },
    {
        id: 4,
        name: "St Ives Bay",
        latitude: 50.2105,
        longitude: -5.4777,
        description: "Stunning Cornish beach with turquoise waters",
        rating: 4.8,
        facilities: ["Parking", "Toilets", "Cafes", "Lifeguard"],
        waterQuality: {
            classification: "Excellent",
            status: "safe",
            enterococci: 12,
            lastTested: "2024-11-30",
            waterType: "coastal"
        }
    },
    {
        id: 5,
        name: "Bamburgh Beach",
        latitude: 55.6090,
        longitude: -1.7090,
        description: "Beautiful Northumberland beach with castle views",
        rating: 4.9,
        facilities: ["Parking", "Toilets"],
        waterQuality: {
            classification: "Poor",
            status: "unsafe",
            enterococci: 245,
            lastTested: "2024-11-26",
            waterType: "coastal"
        }
    }
];

// Helper function to get status color
const getStatusColor = (status) => {
    switch (status) {
        case 'safe': return '#10b981'; // green
        case 'caution': return '#10b981'; // amber
        case 'unsafe': return '#ef4444'; // red
        default: return '#6b7280'; // gray
    }
};

// Helper function to get status emoji
const getStatusEmoji = (status) => {
    switch (status) {
        case 'safe': return '✓';
        case 'caution': return '⚠️';
        case 'unsafe': return '✗';
        default: return '?';
    }
};

const Contact = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedBeach, setSelectedBeach] = useState(null);
    const [beaches, setBeaches] = useState(MOCK_BEACHES);
    const mapRef = useRef(null);

    // Filter beaches based on search
    const filteredBeaches = beaches.filter(beach =>
        beach.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Handle beach marker press
    const handleBeachPress = (beach) => {
        setSelectedBeach(beach);
    };

    // Handle search - move map to first result
    const handleSearch = (text) => {
        setSearchText(text);
        if (text.length > 0) {
            const firstMatch = beaches.find(beach =>
                beach.name.toLowerCase().includes(text.toLowerCase())
            );
            if (firstMatch && mapRef.current) {
                mapRef.current.animateToRegion({
                    latitude: firstMatch.latitude,
                    longitude: firstMatch.longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }, 1000);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Beach Map</Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search beaches..."
                    value={searchText}
                    onChangeText={handleSearch}
                    placeholderTextColor="#9ca3af"
                />
                <Image
                    source={require("../assets/icons/search.png")}
                    style={styles.searchIcon}
                />
            </View>

            {/* Map View */}
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 54.0, // Center of UK
                    longitude: -2.0,
                    latitudeDelta: 8,
                    longitudeDelta: 8,
                }}
            >
                {filteredBeaches.map((beach) => (
                    <Marker
                        key={beach.id}
                        coordinate={{
                            latitude: beach.latitude,
                            longitude: beach.longitude,
                        }}
                        title={beach.name}
                        pinColor={getStatusColor(beach.waterQuality.status)}
                        onPress={() => handleBeachPress(beach)}
                    />
                ))}
            </MapView>

            {/* Beach Info Modal */}
            <Modal
                visible={selectedBeach !== null}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSelectedBeach(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedBeach && (
                            <>
                                <Text style={styles.beachName}>{selectedBeach.name}</Text>
                                <Text style={styles.beachRating}>⭐ {selectedBeach.rating}/5</Text>
                                <Text style={styles.beachDescription}>{selectedBeach.description}</Text>
                                
                                {/* Water Quality Section */}
                                <View style={styles.waterQualitySection}>
                                    <Text style={styles.sectionTitle}>Water Quality</Text>
                                    <View style={[
                                        styles.statusBadge, 
                                        { backgroundColor: getStatusColor(selectedBeach.waterQuality.status) + '20' }
                                    ]}>
                                        <Text style={[
                                            styles.statusText,
                                            { color: getStatusColor(selectedBeach.waterQuality.status) }
                                        ]}>
                                            {getStatusEmoji(selectedBeach.waterQuality.status)} {selectedBeach.waterQuality.status.toUpperCase()}
                                        </Text>
                                    </View>
                                    <Text style={styles.waterQualityDetail}>
                                        Classification: {selectedBeach.waterQuality.classification}
                                    </Text>
                                    <Text style={styles.waterQualityDetail}>
                                        Enterococci: {selectedBeach.waterQuality.enterococci} per 100ml
                                    </Text>
                                    <Text style={styles.waterQualityDetail}>
                                        Last Tested: {selectedBeach.waterQuality.lastTested}
                                    </Text>
                                </View>

                                {/* Facilities Section */}
                                <Text style={styles.facilitiesTitle}>Facilities:</Text>
                                <View style={styles.facilitiesContainer}>
                                    {selectedBeach.facilities.map((facility, index) => (
                                        <View key={index} style={styles.facilityTag}>
                                            <Text style={styles.facilityText}>{facility}</Text>
                                        </View>
                                    ))}
                                </View>

                                <Pressable
                                    style={styles.closeButton}
                                    onPress={() => setSelectedBeach(null)}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Bottom Navigation */}
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
                            style={styles.activeIcon}
                        />
                        <Text style={[styles.navText, styles.activeNav]}>Map</Text>
                    </View>
                </Link>
            
                <Link href="/historie" style={[styles.navText]}>
                    <View style={styles.navButton}>
                        <Image
                            source={require("../assets/icons/time.png")}
                            style={styles.icon}
                        />
                        <Text style={[styles.navText]}>Historie</Text>
                    </View>
                </Link>
            </View>
        </View>
    )
}

export default Contact

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 50,
        marginBottom: 12,
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
        marginBottom: 12,
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

    // MAP STYLES
    map: {
        width: '100%',
        flex: 1,
    },

    // MODAL STYLES
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        minHeight: 400,
    },
    beachName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    beachRating: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
    },
    beachDescription: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        marginBottom: 16,
    },

    // WATER QUALITY STYLES
    waterQualitySection: {
        backgroundColor: '#f9fafb',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    statusBadge: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '700',
    },
    waterQualityDetail: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 6,
    },

    // FACILITIES STYLES
    facilitiesTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    facilitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    facilityTag: {
        backgroundColor: '#e0f2fe',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    facilityText: {
        color: '#0369a1',
        fontSize: 14,
    },
    closeButton: {
        backgroundColor: '#3b82f6',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    // NAV STYLES
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
})