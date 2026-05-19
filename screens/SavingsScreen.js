// screens/SavingsScreen.js

import React, {
    useEffect,
    useState,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    LineChart,
} from 'react-native-chart-kit';

const screenWidth =
    Dimensions.get('window').width;

export default function SavingsScreen() {

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

    const [year, setYear] =
        useState(currentYear);

    const [month, setMonth] =
        useState(currentMonth);

    const [income, setIncome] =
        useState(0);

    const [credited, setCredited] =
        useState(0);

    const [debited, setDebited] =
        useState(0);

    const [monthSavings,
        setMonthSavings] =
        useState(0);

    const [yearlySavings,
        setYearlySavings] =
        useState(
            Array(12).fill(0)
        );

    const loadData = async () => {

        try {

            const incomeHistory =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'incomeHistory'
                    )

                ) || [];

            const transactions =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'transactions'
                    )

                ) || [];

            let totalIncome = 0;

            let totalCredit = 0;

            let totalDebit = 0;

            let yearlyArray =
                Array(12).fill(0);

            // INCOME

            incomeHistory.forEach((item) => {

                const splitDate =
                    item.date.split('-');

                const itemYear =
                    splitDate[0];

                const itemMonth =
                    splitDate[1];

                const monthIndex =
                    Number(itemMonth) - 1;

                if (
                    itemYear === year
                ) {

                    yearlyArray[
                        monthIndex
                    ] += Number(
                        item.amount
                    );

                }

                if (

                    itemYear === year &&

                    itemMonth === month

                ) {

                    totalIncome +=
                        Number(
                            item.amount
                        );

                }

            });

            // TRANSACTIONS

            transactions.forEach((item) => {

                const splitDate =
                    item.date.split('-');

                const itemYear =
                    splitDate[0];

                const itemMonth =
                    splitDate[1];

                const monthIndex =
                    Number(itemMonth) - 1;

                if (
                    itemYear === year
                ) {

                    if (
                        item.type ===
                        'credited'
                    ) {

                        yearlyArray[
                            monthIndex
                        ] += Number(
                            item.amount
                        );

                    }

                    if (
                        item.type ===
                        'debited'
                    ) {

                        yearlyArray[
                            monthIndex
                        ] -= Number(
                            item.amount
                        );

                    }

                }

                if (

                    itemYear === year &&

                    itemMonth === month

                ) {

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

            const finalMonthSavings =

                totalIncome +

                totalCredit -

                totalDebit;

            setIncome(totalIncome);

            setCredited(totalCredit);

            setDebited(totalDebit);

            setMonthSavings(
                finalMonthSavings
            );

            setYearlySavings(
                yearlyArray
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadData();

    }, [year, month]);

    return (

        <ScrollView
            style={styles.container}
        >

            <Text style={styles.heading}>
                Savings
            </Text>

            {/* YEAR */}

            <Text style={styles.label}>
                Year
            </Text>

            <TextInput

                value={year}

                onChangeText={setYear}

                placeholder="2025"

                placeholderTextColor="#64748b"

                keyboardType="numeric"

                style={styles.input}

            />

            {/* MONTH */}

            <Text style={styles.label}>
                Month
            </Text>

            <TextInput

                value={month}

                onChangeText={setMonth}

                placeholder="05"

                placeholderTextColor="#64748b"

                keyboardType="numeric"

                style={styles.input}

            />

            {/* MONTH SAVINGS */}

            <View style={styles.mainCard}>

                <Text style={styles.mainTitle}>
                    Monthly Savings
                </Text>

                <Text style={styles.mainAmount}>
                    ₹ {monthSavings}
                </Text>

            </View>

            {/* SMALL STATS */}

            <View style={styles.row}>

                <View style={styles.smallCard}>

                    <Text style={styles.smallTitle}>
                        Income
                    </Text>

                    <Text style={styles.greenText}>
                        ₹ {income}
                    </Text>

                </View>

                <View style={styles.smallCard}>

                    <Text style={styles.smallTitle}>
                        Credited
                    </Text>

                    <Text style={styles.blueText}>
                        ₹ {credited}
                    </Text>

                </View>

            </View>

            <View style={styles.smallCardFull}>

                <Text style={styles.smallTitle}>
                    Debited
                </Text>

                <Text style={styles.redText}>
                    ₹ {debited}
                </Text>

            </View>

            {/* GRAPH */}

            <Text style={styles.graphTitle}>
                Yearly Savings
            </Text>

            <LineChart

                data={{

                    labels: [

                        'J',
                        'F',
                        'M',
                        'A',
                        'M',
                        'J',

                        'J',
                        'A',
                        'S',
                        'O',
                        'N',
                        'D',

                    ],

                    datasets: [
                        {
                            data:
                                yearlySavings,
                        },
                    ],

                }}

                width={
                    screenWidth - 40
                }

                height={240}

                yAxisSuffix="₹"

                chartConfig={{

                    backgroundColor:
                        '#111827',

                    backgroundGradientFrom:
                        '#111827',

                    backgroundGradientTo:
                        '#111827',

                    decimalPlaces: 0,

                    color: (opacity = 1) =>

                        `rgba(59,130,246,${opacity})`,

                    labelColor: (
                        opacity = 1
                    ) =>

                        `rgba(255,255,255,${opacity})`,

                    propsForDots: {

                        r: '4',

                        strokeWidth: '2',

                        stroke: '#3b82f6',

                    },

                }}

                bezier

                style={styles.chart}

            />

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

        marginBottom: 25,

    },

    label: {

        color: '#94a3b8',

        fontSize: 13,

        marginBottom: 8,

        marginTop: 10,

    },

    input: {

        backgroundColor: '#111827',

        borderRadius: 14,

        padding: 14,

        color: 'white',

        marginBottom: 15,

        fontSize: 15,

    },

    mainCard: {

        backgroundColor: '#2563eb',

        padding: 25,

        borderRadius: 24,

        marginTop: 10,

    },

    mainTitle: {

        color: '#dbeafe',

        fontSize: 15,

        marginBottom: 10,

    },

    mainAmount: {

        color: 'white',

        fontSize: 42,

        fontWeight: 'bold',

    },

    row: {

        flexDirection: 'row',

        justifyContent: 'space-between',

        marginTop: 18,

    },

    smallCard: {

        width: '48%',

        backgroundColor: '#111827',

        padding: 18,

        borderRadius: 18,

    },

    smallCardFull: {

        backgroundColor: '#111827',

        padding: 18,

        borderRadius: 18,

        marginTop: 15,

    },

    smallTitle: {

        color: '#94a3b8',

        fontSize: 13,

        marginBottom: 10,

    },

    greenText: {

        color: '#22c55e',

        fontSize: 24,

        fontWeight: 'bold',

    },

    blueText: {

        color: '#3b82f6',

        fontSize: 24,

        fontWeight: 'bold',

    },

    redText: {

        color: '#ef4444',

        fontSize: 24,

        fontWeight: 'bold',

    },

    graphTitle: {

        color: 'white',

        fontSize: 20,

        fontWeight: 'bold',

        marginTop: 30,

        marginBottom: 15,

    },

    chart: {

        borderRadius: 22,

    },

});