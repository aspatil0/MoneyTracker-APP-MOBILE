import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {

    const todayDate = new Date().toISOString().split('T')[0];

    const [selectedDate, setSelectedDate] = useState(todayDate);

    const [transactions, setTransactions] = useState([]);
    const [creditTotal, setCreditTotal] = useState(0);
    const [debitTotal, setDebitTotal] = useState(0);

    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        loadHistory(selectedDate);
    }, [selectedDate]);

    const loadHistory = async (date) => {

        const storedTransactions =
            JSON.parse(
                await AsyncStorage.getItem('transactions')
            ) || [];

        const storedIncome =
            JSON.parse(
                await AsyncStorage.getItem('incomeHistory')
            ) || [];

        const allData = [];

        storedTransactions.forEach((item) => {
            allData.push({
                ...item,
                category: 'transaction',
            });
        });

        storedIncome.forEach((item) => {
            allData.push({
                ...item,
                type: 'income',
                title: item.mode,
                category: 'income',
            });
        });

        const filteredData = allData.filter(
            (item) => item.date === date
        );

        setTransactions(filteredData.reverse());

        let credit = 0;
        let debit = 0;

        filteredData.forEach((item) => {

            if (
                item.type === 'credited' ||
                item.type === 'income'
            ) {
                credit += Number(item.amount);
            }

            if (item.type === 'debited') {
                debit += Number(item.amount);
            }
        });

        setCreditTotal(credit);
        setDebitTotal(debit);
    };

    const generateDates = () => {

        const dates = [];

        for (let i = 0; i < 30; i++) {

            const d = new Date();

            d.setDate(d.getDate() - i);

            dates.push(
                d.toISOString().split('T')[0]
            );
        }

        return dates;
    };

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.heading}>
                History
            </Text>

            <Text style={styles.subHeading}>
                Select date to check transaction history
            </Text>

            <TouchableOpacity
                style={styles.dateButton}
                onPress={() =>
                    setShowPicker(!showPicker)
                }
            >
                <Text style={styles.dateText}>
                    {selectedDate}
                </Text>
            </TouchableOpacity>

            {
                showPicker && (
                    <View style={styles.datePickerBox}>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >

                            {
                                generateDates().map(
                                    (date, index) => (

                                        <TouchableOpacity
                                            key={index}
                                            style={
                                                selectedDate === date
                                                    ? styles.activeDate
                                                    : styles.normalDate
                                            }
                                            onPress={() => {
                                                setSelectedDate(date);
                                                setShowPicker(false);
                                            }}
                                        >

                                            <Text
                                                style={styles.dateItemText}
                                            >
                                                {date}
                                            </Text>

                                        </TouchableOpacity>
                                    )
                                )
                            }

                        </ScrollView>

                    </View>
                )
            }

            <View style={styles.summaryCard}>

                <Text style={styles.credit}>
                    Credit : ₹ {creditTotal}
                </Text>

                <Text style={styles.debit}>
                    Debit : ₹ {debitTotal}
                </Text>

            </View>

            {
                transactions.length === 0 ? (

                    <View style={styles.emptyBox}>

                        <Text style={styles.emptyText}>
                            No money activity found
                        </Text>

                    </View>

                ) : (

                    transactions.map((item, index) => (

                        <View
                            key={index}
                            style={styles.historyCard}
                        >

                            <View>

                                <Text style={styles.title}>
                                    {
                                        item.title ||
                                        item.mode
                                    }
                                </Text>

                                <Text style={styles.typeText}>

                                    {
                                        item.type === 'credited'
                                            ? 'Credit'

                                            : item.type === 'debited'
                                                ? 'Debit'

                                                : 'Income'
                                    }

                                </Text>

                            </View>

                            <Text
                                style={
                                    item.type === 'debited'
                                        ? styles.debitAmount
                                        : styles.creditAmount
                                }
                            >

                                {
                                    item.type === 'debited'
                                        ? '-₹ '

                                        : '+₹ '
                                }

                                {item.amount}

                            </Text>

                        </View>
                    ))
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
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 50,
    },

    subHeading: {
        color: '#94a3b8',
        marginTop: 10,
        marginBottom: 20,
    },

    dateButton: {
        backgroundColor: '#2563eb',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
    },

    dateText: {
        color: 'white',
        fontWeight: 'bold',
    },

    datePickerBox: {
        marginTop: 15,
        marginBottom: 10,
    },

    normalDate: {
        backgroundColor: '#1e293b',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginRight: 10,
    },

    activeDate: {
        backgroundColor: '#2563eb',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginRight: 10,
    },

    dateItemText: {
        color: 'white',
        fontSize: 12,
    },

    summaryCard: {
        backgroundColor: '#1e293b',
        padding: 18,
        borderRadius: 18,
        marginTop: 20,
    },

    credit: {
        color: '#22c55e',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    debit: {
        color: '#ef4444',
        fontSize: 22,
        fontWeight: 'bold',
    },

    historyCard: {
        backgroundColor: '#1e293b',
        marginTop: 15,
        borderRadius: 18,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    typeText: {
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

    emptyBox: {
        backgroundColor: '#1e293b',
        padding: 25,
        borderRadius: 18,
        marginTop: 20,
        alignItems: 'center',
    },

    emptyText: {
        color: '#94a3b8',
        fontSize: 16,
    },

});