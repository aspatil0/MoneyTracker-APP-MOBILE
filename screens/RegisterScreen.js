import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default function RegisterScreen({ navigation }) {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Create Account</Text>

            <TextInput
                placeholder="Full Name"
                placeholderTextColor="#94a3b8"
                style={styles.input}
            />

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

            <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>
                    Register
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.link}>
                    Already have account? Login
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
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
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