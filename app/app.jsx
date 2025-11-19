import{ StyleSheet, Text, View, Image, Pressable} from 'react-native'
import {Link} from 'expo-router'
    
    const Home = () =>{

        const waterQuality = "Good";
        const isGood = waterQuality === "Good";
        const beachName = "Name of beach";
        const personalLocation = "Personal Location";
        const qualityIndex = "index"

        return(
        <View style={styles.container}>

            <Text style={styles.title}>Smart Buoy App</Text>
            
            <View style={[
                styles.card,
                {backgroundColor: isGood ? "#4ade80" : '#ef4444'},
                ]}>
                <Text style={styles.beachName}>{beachName}</Text>
                <View style={styles.locationRow}>
                    <Text style={styles.locationText}>{personalLocation}</Text>
                </View>

                <View style={[
                    styles.circle,
                    {backgroundColor: isGood ? '#4ade80' : '#ef4444',
                        borderColor: isGood ? '#86efac' : '#fca5a5'
                    },
                    ]}>
                    <Text style={styles.status}>{isGood ? "Good" : "Bad"}</Text>
                    <Text style={styles.indexText}>{qualityIndex}</Text>
                </View>

                <Text style={styles.description}>
                    {isGood ? "The water quality is good\n" : "The water quality is bad\n"}
                <Text style={styles.bold}>
                    {isGood ? "You are safe to swim" : "Avoid swimming"}
                </Text>
                </Text>
            </View>

        
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
    export default Home

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        paddingTop: 40,
        /*justifyContent: 'center'*/
    },
    title:{
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 24
    },

    //CARD
    card:{
        //backgroundColor: '#4ade80',
        borderRadius: 24,
        padding: 64,
        alignItems: 'center',
        width: 340,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    },
    beachName:{
        color:"white",
        fontWeight: "700",
        fontSize: 20,
        marginBottom: 4,
    },
    locationRow:{
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.9,
        marginBottom: 24,
    },
    locationText:{
        color: 'white',
        fontSize: 13,
        marginLeft: 4,
    },
    circle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 16,
        borderColor: "#86efac",
        backgroundColor: '#4ade80',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
    },
    status: {
        color: "white",
        fontWeight: "700",
        fontSize: 40,
    },
    indexText: {
        color: "white",
        opacity: 0.8,
        fontSize: 16,
    },
    description: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
    },
    bold: {
        fontWeight: "700",
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
        paddingHorizontal: 32,
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


    btn: {
        backgroundColor: '#ff0000',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    pressed: {
        opacity: 0.8
    }
})