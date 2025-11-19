import{ StyleSheet, Text, View, Image, ScrollView} from 'react-native'
import {Link} from 'expo-router'
import { TextInput } from 'react-native';
import {BarChart, LineChart} from "react-native-gifted-charts"
import { LinearGradient } from 'expo-linear-gradient'

const Historie = () => {

    const data = [{value: 5, label: "Mon"}, {value: 8, label: "Tue"}, {value: 9, label: "Wed"}, {value: 6, label: "Thu"}, {value: 5, label:"Fri"}, {value: 5, label: "Sat"}, {value: 5, label: "Sun"}]

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

            <View style={styles.chartContainer}>
                <Text style={styles.subtitle}>Brighton Beach</Text>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <BarChart 
                        data = {data}
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
        justifyContent: 'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18
    },
    subtitle: {
        fintSize: 14,
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
        width: 240,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },
    navItem: {
        alignItems: "center",
    },
    navButton: {
        alignItems: "center",
    },
    icon:{
        width: 20,
        height: 20,
        marginBottom: 4,
        tintColor: "#9ca3af",
    },
    activeIcon:{
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
    link:{
        marginVertical: 10,
        borderBottomWidth: 1
    },


    //CHART
    chartContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 20,
        alignItems: 'center',
        width: 340,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    }

})