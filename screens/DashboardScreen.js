import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }) {

    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [todayCredit, setTodayCredit] = useState(0);
    const [todayDebit, setTodayDebit] = useState(0);
    const [balance, setBalance] = useState(0);
    const [incomeHistory, setIncomeHistory] = useState([]);

    useEffect(() => {
        loadData();

        const unsubscribe = navigation.addListener('focus', () => {
            loadData();
        });

        return unsubscribe;
    }, []);

    const loadData = async () => {

        const incomes = JSON.parse(
            await AsyncStorage.getItem('incomeHistory')
        ) || [];

        const transactions = JSON.parse(
            await AsyncStorage.getItem('transactions')
        ) || [];

        setIncomeHistory(incomes);

        let totalIncome = 0;

        incomes.forEach((item) => {
            totalIncome += Number(item.amount);
        });

        setMonthlyIncome(totalIncome);

        const today = new Date().toISOString().split('T')[0];

        let credit = 0;
        let debit = 0;

        transactions.forEach((item) => {

            if (item.date === today) {

                if (item.type === 'credited') {
                    credit += Number(item.amount);
                }

                if (item.type === 'debited') {
                    debit += Number(item.amount);
                }
            }
        });

        setTodayCredit(credit);
        setTodayDebit(debit);

        let totalCredit = 0;
        let totalDebit = 0;

        transactions.forEach((item) => {

            if (item.type === 'credited') {
                totalCredit += Number(item.amount);
            }

            if (item.type === 'debited') {
                totalDebit += Number(item.amount);
            }
        });

        const currentBalance =
            totalIncome + totalCredit - totalDebit;

        setBalance(currentBalance);
    };

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.heading}>
                Money Manager
            </Text>

            <Text style={styles.subHeading}>
                By Adityaraj Patil
            </Text>

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

            <View style={styles.balanceCard}>
                <Text style={styles.balanceTitle}>
                    Current Monthly Balance
                </Text>

                <Text style={styles.balanceAmount}>
                    ₹ {balance}
                </Text>
            </View>

            <View style={styles.balanceCard}>
                <Text style={styles.balanceTitle}>
                    Monthly Income
                </Text>

                <Text style={styles.creditText}>
                    ₹ {monthlyIncome}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.incomeButton}
                onPress={() =>
                    navigation.navigate('AddIncome')
                }
            >
                <Text style={styles.buttonText}>
                    Add Income
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.transactionButton}
                onPress={() =>
                    navigation.navigate('AddTransaction')
                }
            >
                <Text style={styles.buttonText}>
                    Add Transaction
                </Text>
            </TouchableOpacity>

            <View style={styles.historyHeader}>

                <Text style={styles.historyTitle}>
                    Income History
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('History')
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

            <View style={{ height: 80 }} />

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

    subHeading: {
        color: '#64748b',
        fontSize: 14,
        marginTop: 5,
        marginBottom: 25,
        letterSpacing: 1,
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
        fontSize: 12,
        marginBottom: 10,
    },

    creditText: {
        color: '#22c55e',
        fontSize: 30,
        fontWeight: 'bold',
    },

    debitText: {
        color: '#ef4444',
        fontSize: 30,
        fontWeight: 'bold',
    },

    balanceCard: {
        backgroundColor: '#1e293b',
        marginTop: 20,
        padding: 22,
        borderRadius: 20,
    },

    balanceTitle: {
        color: '#94a3b8',
        fontSize: 15,
    },

    balanceAmount: {
        color: 'white',
        fontSize: 45,
        fontWeight: 'bold',
        marginTop: 15,
    },

    incomeButton: {
        backgroundColor: '#16a34a',
        marginTop: 22,
        padding: 18,
        borderRadius: 16,
        alignItems: 'center',
    },

    transactionButton: {
        backgroundColor: '#2563eb',
        marginTop: 15,
        padding: 18,
        borderRadius: 16,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    historyHeader: {
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    historyTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

    fullHistory: {
        color: '#3b82f6',
        fontSize: 13,
        fontWeight: '600',
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

    historyAmount: {
        color: '#22c55e',
        fontSize: 28,
        fontWeight: 'bold',
    },

    historyDate: {
        color: '#94a3b8',
        marginTop: 6,
    },

    historyMode: {
        color: 'white',
        fontWeight: 'bold',
    },

});