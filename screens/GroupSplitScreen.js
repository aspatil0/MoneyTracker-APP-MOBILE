import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

export default function GroupSplitScreen({ navigation }) {

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.heading}>
                Group Splits
            </Text>

            <TouchableOpacity
                style={styles.button}

                onPress={() =>
                    navigation.navigate('CreateGroup')
                }
            >
                <Text style={styles.buttonText}>
                    Create Group Budget
                </Text>

            </TouchableOpacity>

            <View style={styles.groupCard}>

                <Text style={styles.groupName}>
                    Goa Trip
                </Text>

                <Text style={styles.groupInfo}>
                    Total Budget : ₹ 12000
                </Text>

                <Text style={styles.groupInfo}>
                    Pending Members : 2
                </Text>

            </View>

            <View style={styles.memberCard}>

                <Text style={styles.memberName}>
                    Rahul
                </Text>

                <Text style={styles.memberAmount}>
                    ₹ 2000 Pending
                </Text>

            </View>

            <View style={styles.memberCard}>

                <Text style={styles.memberName}>
                    Akash
                </Text>

                <Text style={styles.memberAmount}>
                    ₹ Paid
                </Text>

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
        marginBottom: 30,
    },

    button: {
        backgroundColor: '#2563eb',
        padding: 18,
        borderRadius: 18,
        marginBottom: 30,
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    groupCard: {
        backgroundColor: '#1e293b',
        padding: 24,
        borderRadius: 20,
        marginBottom: 20,
    },

    groupName: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },

    groupInfo: {
        color: '#94a3b8',
        marginTop: 10,
    },

    memberCard: {
        backgroundColor: '#1e293b',
        padding: 20,
        borderRadius: 18,
        marginBottom: 15,
    },

    memberName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    memberAmount: {
        color: '#22c55e',
        marginTop: 10,
        fontWeight: 'bold',
    },

});