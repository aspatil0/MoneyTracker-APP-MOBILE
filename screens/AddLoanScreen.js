import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default function AddLoanScreen() {

    return (

        <View style={styles.container}>

            <Text style={styles.heading}>
                Add New Loan
            </Text>

            <TextInput
                placeholder="Loan Amount"
                placeholderTextColor="#94a3b8"
                style={styles.input}
            />

            <TextInput
                placeholder="Date"
                placeholderTextColor="#94a3b8"
                style={styles.input}
            />

            <TextInput
                placeholder="From Whom"
                placeholderTextColor="#94a3b8"
                style={styles.input}
            />

            <TouchableOpacity style={styles.button}>

                <Text style={styles.buttonText}>
                    Save Loan
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
        marginTop: 10,
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },

});