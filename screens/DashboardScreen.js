// screens/DashboardScreen.js

import React, {
    useEffect,
    useState,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({
    navigation,
}) {

    const [monthlyIncome, setMonthlyIncome] =
        useState(0);

    const [todayCredit, setTodayCredit] =
        useState(0);

    const [todayDebit, setTodayDebit] =
        useState(0);

    const [currentBalance, setCurrentBalance] =
        useState(0);

    const [incomeHistory, setIncomeHistory] =
        useState([]);

    const loadData = async () => {

        try {

            const currentDate =
                new Date();

            const currentMonth =
                String(
                    currentDate.getMonth() + 1
                ).padStart(2, '0');

            const currentYear =
                currentDate
                    .getFullYear()
                    .toString();

            const today =
                currentDate
                    .toISOString()
                    .split('T')[0];

            // INCOME HISTORY

            const incomes =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'incomeHistory'
                    )

                ) || [];

            // FILTER CURRENT MONTH INCOME

            const currentMonthIncome =

                incomes.filter((item) => {

                    const splitDate =
                        item.date.split('-');

                    return (

                        splitDate[0] ===
                        currentYear &&

                        splitDate[1] ===
                        currentMonth

                    );

                });

            setIncomeHistory(
                currentMonthIncome
            );

            let totalIncome = 0;

            currentMonthIncome.forEach(
                (item) => {

                    totalIncome +=
                        Number(
                            item.amount
                        );

                }
            );

            setMonthlyIncome(totalIncome);

            // TRANSACTIONS

            const transactions =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'transactions'
                    )

                ) || [];

            let todayCreditAmount = 0;

            let todayDebitAmount = 0;

            let totalCredit = 0;

            let totalDebit = 0;

            transactions.forEach((item) => {

                const splitDate =
                    item.date.split('-');

                const itemYear =
                    splitDate[0];

                const itemMonth =
                    splitDate[1];

                // CURRENT MONTH ONLY

                if (

                    itemYear ===
                    currentYear &&

                    itemMonth ===
                    currentMonth

                ) {

                    // TODAY DATA

                    if (
                        item.date === today
                    ) {

                        if (
                            item.type ===
                            'credited'
                        ) {

                            todayCreditAmount +=
                                Number(
                                    item.amount
                                );

                        }

                        if (
                            item.type ===
                            'debited'
                        ) {

                            todayDebitAmount +=
                                Number(
                                    item.amount
                                );

                        }

                    }

                    // MONTH TOTAL

                    if (
                        item.type ===
                        'credited'
                    ) {

                        totalCredit +=
                            Number(
                                item.amount
                            );

                    }

                    if (
                        item.type ===
                        'debited'
                    ) {

                        totalDebit +=
                            Number(
                                item.amount
                            );

                    }

                }

            });

            setTodayCredit(
                todayCreditAmount
            );

            setTodayDebit(
                todayDebitAmount
            );

            // CURRENT MONTH BALANCE

            const balance =

                totalIncome +

                totalCredit -

                totalDebit;

            setCurrentBalance(balance);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        const unsubscribe =
            navigation.addListener(
                'focus',
                loadData
            );

        return unsubscribe;

    }, []);

    // CLEAR DATA

    const clearAllData = async () => {

        Alert.alert(

            'Clear All Data',

            'Delete all money history?',

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

                            await AsyncStorage.removeItem(
                                'incomeHistory'
                            );

                            setMonthlyIncome(0);

                            setTodayCredit(0);

                            setTodayDebit(0);

                            setCurrentBalance(0);

                            setIncomeHistory([]);

                            Alert.alert(
                                'All Data Cleared'
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

    return (

        <ScrollView
            style={styles.container}
        >

            {/* TITLE */}

            <Text style={styles.heading}>
                Money Manager
            </Text>

            {/* DATE */}

            <Text style={styles.dateText}>

                {
                    new Date().toLocaleDateString(
                        'en-IN',
                        {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }
                    )
                }

            </Text>

            {/* NAME */}

            <View style={styles.nameRow}>

                <Text style={styles.subHeading}>
                    By Adityaraj Patil
                </Text>

                <TouchableOpacity
                    onPress={clearAllData}
                    style={styles.clearIcon}
                >

                    <Text style={styles.clearIconText}>
                        🗑
                    </Text>

                </TouchableOpacity>

            </View>

            {/* TODAY */}

            <View style={styles.row}>

                <View style={styles.smallCard}>

                    <Text style={styles.smallTitle}>
                        Today Credited
                    </Text>

                    <Text style={styles.creditText}>
                        ₹ {todayCredit}
                    </Text>

                </View>

                <View style={styles.smallCard}>

                    <Text style={styles.smallTitle}>
                        Today Debited
                    </Text>

                    <Text style={styles.debitText}>
                        ₹ {todayDebit}
                    </Text>

                </View>

            </View>

            {/* CURRENT BALANCE */}

            <View style={styles.balanceCard}>

                <Text style={styles.balanceTitle}>
                    Current Month Balance
                </Text>

                <Text style={styles.balanceAmount}>
                    ₹ {currentBalance}
                </Text>

            </View>

            {/* MONTHLY INCOME */}

            <View style={styles.balanceCard}>

                <Text style={styles.balanceTitle}>
                    Current Month Income
                </Text>

                <Text style={styles.creditText}>
                    ₹ {monthlyIncome}
                </Text>

            </View>

            {/* BUTTONS */}

            <TouchableOpacity

                style={styles.incomeButton}

                onPress={() =>
                    navigation.navigate(
                        'AddIncome'
                    )
                }

            >

                <Text style={styles.buttonText}>
                    Add Income
                </Text>

            </TouchableOpacity>

            <TouchableOpacity

                style={styles.transactionButton}

                onPress={() =>
                    navigation.navigate(
                        'AddTransaction'
                    )
                }

            >

                <Text style={styles.buttonText}>
                    Add Transaction
                </Text>

            </TouchableOpacity>

            {/* INCOME HISTORY */}

            <View style={styles.historyHeader}>

                <Text style={styles.historyTitle}>
                    Current Month Income
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate(
                            'History'
                        )
                    }
                >

                    <Text style={styles.fullHistory}>
                        See Full History
                    </Text>

                </TouchableOpacity>

            </View>

            {
                incomeHistory

                    .slice(0, 3)

                    .reverse()

                    .map((item, index) => (

                        <View
                            key={index}
                            style={styles.historyCard}
                        >

                            <View>

                                <Text style={styles.historyAmount}>
                                    ₹ {item.amount}
                                </Text>

                                <Text style={styles.historyDate}>
                                    {item.date}
                                </Text>

                            </View>

                            <Text style={styles.historyMode}>
                                {item.mode}
                            </Text>

                        </View>

                    ))
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

        fontSize: 38,

        fontWeight: 'bold',

        marginTop: 50,

    },

    dateText: {

        color: '#cbd5e1',

        fontSize: 14,

        marginTop: 8,

        marginBottom: 5,

    },

    nameRow: {

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'space-between',

        marginBottom: 25,

    },

    subHeading: {

        color: '#64748b',

        fontSize: 14,

    },

    clearIcon: {

        backgroundColor: '#dc2626',

        width: 35,

        height: 35,

        borderRadius: 20,

        justifyContent: 'center',

        alignItems: 'center',

    },

    clearIconText: {

        fontSize: 16,

    },

    row: {

        flexDirection: 'row',

        justifyContent: 'space-between',

    },

    smallCard: {

        width: '48%',

        backgroundColor: '#1e293b',

        padding: 15,

        borderRadius: 18,

    },

    smallTitle: {

        color: '#94a3b8',

        marginBottom: 10,

        fontSize: 13,

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

    balanceCard: {

        backgroundColor: '#1e293b',

        padding: 20,

        borderRadius: 18,

        marginTop: 20,

    },

    balanceTitle: {

        color: '#94a3b8',

        marginBottom: 10,

        fontSize: 13,

    },

    balanceAmount: {

        color: 'white',

        fontSize: 36,

        fontWeight: 'bold',

    },

    incomeButton: {

        backgroundColor: '#16a34a',

        padding: 18,

        borderRadius: 15,

        marginTop: 20,

        alignItems: 'center',

    },

    transactionButton: {

        backgroundColor: '#2563eb',

        padding: 18,

        borderRadius: 15,

        marginTop: 15,

        alignItems: 'center',

    },

    buttonText: {

        color: 'white',

        fontWeight: 'bold',

    },

    historyHeader: {

        marginTop: 35,

        flexDirection: 'row',

        justifyContent: 'space-between',

    },

    historyTitle: {

        color: 'white',

        fontSize: 20,

        fontWeight: 'bold',

    },

    fullHistory: {

        color: '#3b82f6',

    },

    historyCard: {

        backgroundColor: '#1e293b',

        padding: 18,

        borderRadius: 15,

        marginTop: 15,

        flexDirection: 'row',

        justifyContent: 'space-between',

    },

    historyAmount: {

        color: '#22c55e',

        fontSize: 22,

        fontWeight: 'bold',

    },

    historyDate: {

        color: '#94a3b8',

        marginTop: 5,

        fontSize: 12,

    },

    historyMode: {

        color: 'white',

        fontWeight: 'bold',

    },

});