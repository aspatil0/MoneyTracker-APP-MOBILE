import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default function AddMoneyBackScreen() {

    return (

        <View style={styles.container}>

            <Text style={styles.heading}>
                Add Money Given
            </Text>

            <TextInput
                placeholder="Amount"
                placeholderTextColor="#94a3b8"
                style={styles.input}
            />

            <TextInput
                placeholder="Return Date"
                placeholderTextColor="#94a3b8"
                style={styles.input}
            />

            <TextInput
                placeholder="Giving To"
                placeholderTextColor="#94a3b8"
                style={styles.input}
            />

            <TouchableOpacity style={styles.button}>

                <Text style={styles.buttonText}>
                    Save
                </Text>

            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#020617',
        padding: 20,
    },

    heading: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 30,
    },

    input: {
        backgroundColor: '#1e293b',
        color: 'white',
        padding: 18,
        borderRadius: 15,
        marginBottom: 18,
    },

    button: {
        backgroundColor: '#2563eb',
        padding: 18,
        borderRadius: 18,
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },

});