import { StyleSheet, Text, View, Image, Modal, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import { Link } from 'expo-router'
import { TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';

// Your backend API URL - change this to your deployed server later
const API_URL = 'http://localhost:3000';

const router = useRouter();

// Get all beaches from database
app.get('/api/beaches', async (req, res) => {
    try {
      const { rows } = await pool.query(`
        SELECT 
          eubwid,
          name,
          latitude,
          longitude,
          country,
          region,
          county,
          district
        FROM bw_bathing_water
        ORDER BY name
      `);
  
      // Format the data to match your app's expected structure
      const beaches = rows.map(row => ({
        id: row.eubwid,
        name: row.name,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
        description: [row.district, row.county, row.region].filter(Boolean).join(', '),
        rating: 4.0,
        facilities: ["Parking", "Toilets"],
        waterQuality: {
          classification: null,
          status: "safe",
          enterococci: null,
          ecoli: null,
          lastTested: null,
          waterType: "coastal"
        }
      }));
  
      res.json(beaches);
    } catch (err) {
      console.error('Error fetching beaches:', err);
      res.status(500).json({ error: err.message });
    }
  });
  {

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
                    latitude: 54.0,
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
                        pinColor={getStatusColor(beach.waterQuality?.status)}
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
                                        { backgroundColor: getStatusColor(selectedBeach.waterQuality?.status) + '20' }
                                    ]}>
                                        <Text style={[
                                            styles.statusText,
                                            { color: getStatusColor(selectedBeach.waterQuality?.status) }
                                        ]}>
                                            {getStatusEmoji(selectedBeach.waterQuality?.status)} {selectedBeach.waterQuality?.status?.toUpperCase() || 'UNKNOWN'}
                                        </Text>
                                    </View>
                                    <Text style={styles.waterQualityDetail}>
                                        Classification: {selectedBeach.waterQuality?.classification || 'N/A'}
                                    </Text>
                                    <Text style={styles.waterQualityDetail}>
                                        Enterococci: {selectedBeach.waterQuality?.enterococci || 'N/A'} per 100ml
                                    </Text>
                                    <Text style={styles.waterQualityDetail}>
                                        Last Tested: {selectedBeach.waterQuality?.lastTested || 'N/A'}
                                    </Text>
                                </View>

                                {/*Button to add beach to mainscreen*/}
                                <Text style={styles.ButtonAddBeachDescription}>
                                    Save this beach to access it from your homescreen
                                </Text>
                                <Pressable
                                    style={styles.ButtonAddBeachPressable}
                                    onPress={() => {
                                        router.push({
                                            pathname: '/app',
                                            params: {
                                                beachName: selectedBeach.name,
                                                beachId: selectedBeach.id,
                                            },
                                        });
                                    }}
                                >
                                    <Text style={styles.ButtonAddBeachText}>Add to homescreen</Text>
                                </Pressable>


                                {/* Facilities Section */}
                                <Text style={styles.facilitiesTitle}>Facilities:</Text>
                                <View style={styles.facilitiesContainer}>
                                    {selectedBeach.facilities?.map((facility, index) => (
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
        fontSize: 24,
        marginTop: 50,
        marginBottom: 12,
    },
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
    map: {
        width: '100%',
        flex: 1,
    },
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
    ButtonAddBeachPressable:{
        backgroundColor: '#10b981',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 8,
    },
    ButtonAddBeachText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    ButtonAddBeachDescription:{
        fontSize: 13,
        color: '#6b7280',
        textAlign:'center',
        marginBottom: 16,
        lineHeight: 18,
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