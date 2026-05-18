import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default function LoginScreen({ navigation }) {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Money Manager</Text>

            <TextInput
                placeholder="Email"
                placeholderTextColor="#94a3b8"
                style={styles.input}
            />

            <TextInput
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Dashboard')}
            >
                <Text style={styles.buttonText}>
                    Login
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.link}>
                    Don't have account? Register
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
        justifyContent: 'center',
        padding: 20,
    },

    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 50,
    },

    input: {
        backgroundColor: '#1e293b',
        color: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
    },

    button: {
        backgroundColor: '#2563eb',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },

    link: {
        color: '#60a5fa',
        textAlign: 'center',
    },
});