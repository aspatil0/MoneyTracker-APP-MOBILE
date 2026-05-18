import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

export default function MoneyBackScreen0({ navigation }) {

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.heading}>
                Money Back
            </Text>

            <View style={styles.totalCard}>

                <Text style={styles.label}>
                    Total Money Pending
                </Text>

                <Text style={styles.amount}>
                    ₹ 12000
                </Text>

            </View>

            <TouchableOpacity
                style={styles.button}

                onPress={() =>
                    navigation.navigate('AddMoneyBack')
                }
            >
                <Text style={styles.buttonText}>
                    Add New
                </Text>

            </TouchableOpacity>

            <Text style={styles.historyHeading}>
                History
            </Text>

            <View style={styles.historyCard}>

                <Text style={styles.name}>
                    Given To Akash
                </Text>

                <Text style={styles.info}>
                    ₹ 4000
                </Text>

                <Text style={styles.info}>
                    Return Date : 25 May 2026
                </Text>

                <TouchableOpacity style={styles.returnButton}>

                    <Text style={styles.returnText}>
                        Money Returned
                    </Text>

                </TouchableOpacity>

            </View>

        </ScrollView>

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
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 25,
    },

    totalCard: {
        backgroundColor: '#1e293b',
        padding: 25,
        borderRadius: 20,
    },

    label: {
        color: '#94a3b8',
    },

    amount: {
        color: '#22c55e',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 10,
    },

    button: {
        backgroundColor: '#2563eb',
        padding: 18,
        borderRadius: 18,
        marginTop: 25,
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    historyHeading: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 35,
        marginBottom: 20,
    },

    historyCard: {
        backgroundColor: '#1e293b',
        padding: 22,
        borderRadius: 18,
    },

    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    info: {
        color: '#94a3b8',
        marginTop: 8,
    },

    returnButton: {
        backgroundColor: '#16a34a',
        padding: 14,
        borderRadius: 14,
        marginTop: 18,
    },

    returnText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },

});