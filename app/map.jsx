import{ StyleSheet, Text, View, Pressable, Image} from 'react-native'
import {Link} from 'expo-router'
import { TextInput } from 'react-native';
import {useState} from 'react';

const Contact = () => {

    const [searchText, setSearchText] = useState('');

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Map</Text>

{/*Search Bar*/}
            <View style = {styles.searchContainer}>
                
                <TextInput
                    style = {styles.searchInput}
                    placeholder = "Search beaches..."
                    value = {searchText}
                    onChangeText = {setSearchText}
                    placeholerTextColor = "#9ca3af"
                />
                <Image
                    source={require("../assets/icons/search.png")}
                    style={styles.searchIcon}
                />
            </View>

            <Link href="/app" style={styles.link}>back home</Link>

            {/*<Pressable style={({pressed}) => [styles.btn, pressed && styles.pressed ]}>
                <Text style={{color: '#f2f2f2'}}>Button</Text>
            </Pressable>*/}

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
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 18,
    },

    //SEARCH BAR STYLES
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 6,
        width: 380,
        marginBottom: 20
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: '#9ca3af',
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
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
    btn: {
        backgroundColor: '#ff0000',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    pressed: {
        opacity: 0.8
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