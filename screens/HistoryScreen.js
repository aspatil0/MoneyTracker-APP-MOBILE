// screens/HistoryScreen.js

import React, {
    useEffect,
    useState,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {

    const [transactions, setTransactions] =
        useState([]);

    const [selectedDate, setSelectedDate] =
        useState(
            new Date()
                .toISOString()
                .split('T')[0]
        );

    const loadHistory = async () => {

        try {

            const storedTransactions =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'transactions'
                    )

                ) || [];

            const incomeHistory =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'incomeHistory'
                    )

                ) || [];

            // INCOME DATA FORMAT

            const formattedIncome =

                incomeHistory.map((item) => ({

                    id: item.id,

                    title: 'Income Added',

                    amount: item.amount,

                    type: 'credited',

                    date: item.date,

                    mode: item.mode,

                }));

            // MERGE

            const allData = [

                ...storedTransactions,

                ...formattedIncome,

            ];

            // FILTER DATE

            const filteredData =

                allData.filter(

                    (item) =>

                        item.date ===
                        selectedDate

                );

            // SORT NEWEST

            filteredData.sort(
                (a, b) => b.id - a.id
            );

            setTransactions(
                filteredData
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadHistory();

    }, [selectedDate]);

    // REFRESH

    const refreshHistory = async () => {

        loadHistory();

    };

    // CLEAR HISTORY

    const clearHistory = async () => {

        Alert.alert(

            'Clear History',

            'Delete all transaction history?',

            [

                {
                    text: 'Cancel',
                    style: 'cancel',
                },

                {

                    text: 'Yes',

                    onPress: async () => {

                        try {

                            await AsyncStorage.removeItem(
                                'transactions'
                            );

                            setTransactions([]);

                            Alert.alert(
                                'History Cleared'
                            );

                        }

                        catch (error) {

                            console.log(error);

                        }

                    },

                },

            ]

        );

    };

    // TOTALS

    let totalCredit = 0;
    let totalDebit = 0;

    transactions.forEach((item) => {

        if (
            item.type === 'credited'
        ) {

            totalCredit +=
                Number(item.amount);

        }

        else {

            totalDebit +=
                Number(item.amount);

        }

    });

    return (

        <ScrollView
            style={styles.container}
        >

            {/* HEADING */}

            <Text style={styles.heading}>
                History
            </Text>

            {/* BUTTONS */}

            <View style={styles.topButtons}>

                <TouchableOpacity

                    style={styles.refreshButton}

                    onPress={refreshHistory}

                >

                    <Text style={styles.buttonText}>
                        Refresh
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity

                    style={styles.clearButton}

                    onPress={clearHistory}

                >

                    <Text style={styles.buttonText}>
                        Clear History
                    </Text>

                </TouchableOpacity>

            </View>

            {/* DATE */}

            <Text style={styles.label}>
                Please Select Date To Check
                Transaction History
            </Text>

            <TextInput

                value={selectedDate}

                onChangeText={
                    setSelectedDate
                }

                placeholder="YYYY-MM-DD"

                placeholderTextColor="#94a3b8"

                style={styles.input}

            />

            {/* TOTALS */}

            <View style={styles.totalRow}>

                <View style={styles.totalCard}>

                    <Text style={styles.smallTitle}>
                        Credited
                    </Text>

                    <Text style={styles.creditText}>
                        ₹ {totalCredit}
                    </Text>

                </View>

                <View style={styles.totalCard}>

                    <Text style={styles.smallTitle}>
                        Debited
                    </Text>

                    <Text style={styles.debitText}>
                        ₹ {totalDebit}
                    </Text>

                </View>

            </View>

            {/* NO DATA */}

            {
                transactions.length === 0 && (

                    <Text style={styles.noData}>
                        No Money Activity On
                        This Date
                    </Text>

                )
            }

            {/* HISTORY */}

            {
                transactions.map(
                    (item, index) => (

                        <View
                            key={index}
                            style={styles.card}
                        >

                            <View>

                                <Text style={styles.title}>
                                    {item.title}
                                </Text>

                                <Text style={styles.date}>
                                    {item.date}
                                </Text>

                            </View>

                            <Text

                                style={

                                    item.type ===
                                        'credited'

                                        ? styles.creditAmount

                                        : styles.debitAmount

                                }

                            >

                                ₹ {item.amount}

                            </Text>

                        </View>

                    )
                )
            }

            <View style={{ height: 100 }} />

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

        marginBottom: 20,

    },

    topButtons: {

        flexDirection: 'row',

        justifyContent: 'space-between',

        marginBottom: 20,

    },

    refreshButton: {

        backgroundColor: '#2563eb',

        padding: 12,

        borderRadius: 12,

        width: '48%',

        alignItems: 'center',

    },

    clearButton: {

        backgroundColor: '#dc2626',

        padding: 12,

        borderRadius: 12,

        width: '48%',

        alignItems: 'center',

    },

    buttonText: {

        color: 'white',

        fontWeight: 'bold',

    },

    label: {

        color: '#cbd5e1',

        marginBottom: 10,

        fontSize: 14,

    },

    input: {

        backgroundColor: '#1e293b',

        borderRadius: 12,

        padding: 15,

        color: 'white',

        marginBottom: 20,

    },

    totalRow: {

        flexDirection: 'row',

        justifyContent: 'space-between',

        marginBottom: 25,

    },

    totalCard: {

        width: '48%',

        backgroundColor: '#1e293b',

        padding: 15,

        borderRadius: 15,

    },

    smallTitle: {

        color: '#94a3b8',

        marginBottom: 10,

    },

    creditText: {

        color: '#22c55e',

        fontSize: 24,

        fontWeight: 'bold',

    },

    debitText: {

        color: '#ef4444',

        fontSize: 24,

        fontWeight: 'bold',

    },

    noData: {

        color: '#94a3b8',

        textAlign: 'center',

        marginTop: 50,

        fontSize: 16,

    },

    card: {

        backgroundColor: '#1e293b',

        padding: 18,

        borderRadius: 15,

        marginBottom: 15,

        flexDirection: 'row',

        justifyContent: 'space-between',

        alignItems: 'center',

    },

    title: {

        color: 'white',

        fontSize: 18,

        fontWeight: 'bold',

    },

    date: {

        color: '#94a3b8',

        marginTop: 5,

    },

    creditAmount: {

        color: '#22c55e',

        fontSize: 20,

        fontWeight: 'bold',

    },

    debitAmount: {

        color: '#ef4444',

        fontSize: 20,

        fontWeight: 'bold',

    },

});