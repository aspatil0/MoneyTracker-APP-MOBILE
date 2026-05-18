import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

export default function SplitScreen({ navigation }) {

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.heading}>
                Split & Loans
            </Text>

            {/* BORROW */}

            <TouchableOpacity
                style={styles.card}

                onPress={() =>
                    navigation.navigate('Borrow')
                }
            >

                <Text style={styles.title}>
                    Borrow From Someone
                </Text>

                <Text style={styles.text}>
                    Track your pending loans
                </Text>

            </TouchableOpacity>

            {/* MONEY BACK */}

            <TouchableOpacity
                style={styles.card}

                onPress={() =>
                    navigation.navigate('MoneyBack')
                }
            >

                <Text style={styles.title}>
                    Get Payment Back
                </Text>

                <Text style={styles.text}>
                    Track money others owe you
                </Text>

            </TouchableOpacity>

            {/* GROUP SPLIT */}

            <TouchableOpacity
                style={styles.card}

                onPress={() =>
                    navigation.navigate('GroupSplit')
                }
            >

                <Text style={styles.title}>
                    Group Split
                </Text>

                <Text style={styles.text}>
                    Split expenses with friends
                </Text>

            </TouchableOpacity>

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
        fontSize: 34,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 30,
    },

    card: {
        backgroundColor: '#1e293b',
        padding: 25,
        borderRadius: 20,
        marginBottom: 20,
    },

    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },

    text: {
        color: '#94a3b8',
        marginTop: 10,
        fontSize: 15,
    },

});