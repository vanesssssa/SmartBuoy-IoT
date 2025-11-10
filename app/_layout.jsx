import { Slot, Stack } from 'expo-router'
import {StyleSheet, Text, View} from 'react-native'

const RootLayout = () => {
    return (
        <Stack screenOPtions={{
            headerStyle: {backgroundColor: '#ddd'},
            headerTintColor: '#333',
        }}>
            <Stack.Screen name="app" options={{title: 'Home'}}/>
            <Stack.Screen name="map" options={{title: 'Map'}}/>
            <Stack.Screen name="historie" options={{title: 'Historical Data'}}/>
        </Stack>
    )
}

export default RootLayout

const styles = StyleSheet.create({})