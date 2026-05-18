import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

export default function BorrowScreen({ navigation }) {

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.heading}>
                Borrowed Loans
            </Text>

            <View style={styles.totalCard}>

                <Text style={styles.label}>
                    Total Pending Loan
                </Text>

                <Text style={styles.amount}>
                    ₹ 15000
                </Text>

            </View>

            <TouchableOpacity
                style={styles.button}

                onPress={() =>
                    navigation.navigate('AddLoan')
                }
            >
                <Text style={styles.buttonText}>
                    Add New Loan
                </Text>

            </TouchableOpacity>

            <Text style={styles.historyHeading}>
                Loan History
            </Text>

            <View style={styles.historyCard}>

                <Text style={styles.name}>
                    From Rahul
                </Text>

                <Text style={styles.info}>
                    ₹ 5000
                </Text>

                <Text style={styles.info}>
                    Date : 17 May 2026
                </Text>

                <TouchableOpacity style={styles.paidButton}>

                    <Text style={styles.paidText}>
                        Mark Paid
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
        fontSize: 16,
    },

    amount: {
        color: '#ef4444',
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
        fontSize: 16,
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

    paidButton: {
        backgroundColor: '#16a34a',
        padding: 14,
        borderRadius: 14,
        marginTop: 18,
    },

    paidText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },

});