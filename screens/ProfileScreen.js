import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {

    return (

        <View style={styles.container}>

            <Text style={styles.name}>
                Adityaraj
            </Text>

            <Text style={styles.email}>
                aditya@gmail.com
            </Text>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#020617',
        justifyContent: 'center',
        alignItems: 'center',
    },

    name: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },

    email: {
        color: '#94a3b8',
        marginTop: 10,
    },

});