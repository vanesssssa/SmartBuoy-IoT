import{ StyleSheet, Text, View, Image} from 'react-native'
import {Link} from 'expo-router'

const Historie = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Historical Data</Text>

            <Link href="/app" style={styles.link}>back home</Link>

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

})