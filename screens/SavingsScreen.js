import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { useState } from 'react';

import {
    LineChart,
} from 'react-native-chart-kit';

export default function SavingsScreen() {

    const [selectedYear, setSelectedYear] =
        useState('2026');

    const [selectedMonth, setSelectedMonth] =
        useState('March');

    const [showYears, setShowYears] =
        useState(false);

    const [showMonths, setShowMonths] =
        useState(false);

    const years = [
        '2026',
        '2025',
        '2024',
        '2023',
    ];

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const savingsData = {

        January: 10000,
        February: 15000,
        March: 9000,
        April: 18000,
        May: 23000,
        June: 12000,
        July: 16000,
        August: 21000,
        September: 13000,
        October: 25000,
        November: 17000,
        December: 30000,

    };

    const currentSavings =
        savingsData[selectedMonth] || 0;

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.heading}>
                Savings
            </Text>

            {/* YEAR SELECTION */}

            <View style={styles.selectBox}>

                <Text style={styles.selectLabel}>
                    Select Year
                </Text>

                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() =>
                        setShowYears(!showYears)
                    }
                >

                    <Text style={styles.dropdownText}>
                        {selectedYear} ▼
                    </Text>

                </TouchableOpacity>

                {
                    showYears && (

                        <View style={styles.optionBox}>

                            {
                                years.map((year) => (

                                    <TouchableOpacity
                                        key={year}

                                        style={styles.optionButton}

                                        onPress={() => {

                                            setSelectedYear(year);

                                            setShowYears(false);

                                        }}
                                    >

                                        <Text style={styles.optionText}>
                                            {year}
                                        </Text>

                                    </TouchableOpacity>

                                ))
                            }

                        </View>

                    )
                }

            </View>

            {/* MONTH SELECTION */}

            <View style={styles.selectBox}>

                <Text style={styles.selectLabel}>
                    Select Month
                </Text>

                <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() =>
                        setShowMonths(!showMonths)
                    }
                >

                    <Text style={styles.dropdownText}>
                        {selectedMonth} ▼
                    </Text>

                </TouchableOpacity>

                {
                    showMonths && (

                        <View style={styles.optionBox}>

                            {
                                months.map((month) => (

                                    <TouchableOpacity
                                        key={month}

                                        style={styles.optionButton}

                                        onPress={() => {

                                            setSelectedMonth(month);

                                            setShowMonths(false);

                                        }}
                                    >

                                        <Text style={styles.optionText}>
                                            {month}
                                        </Text>

                                    </TouchableOpacity>

                                ))
                            }

                        </View>

                    )
                }

            </View>

            {/* SAVINGS CARD */}

            <View style={styles.card}>

                <Text style={styles.label}>
                    Savings of {selectedMonth} {selectedYear}
                </Text>

                <Text style={styles.savings}>
                    ₹ {currentSavings}
                </Text>

            </View>

            {/* DETAILS */}

            <View style={styles.detailCard}>

                <Text style={styles.detailText}>
                    Income : ₹ 30000
                </Text>

                <Text style={styles.detailText}>
                    Credited : ₹ 5000
                </Text>

                <Text style={styles.detailText}>
                    Debited : ₹ 12000
                </Text>

            </View>

            {/* CHART */}

            <Text style={styles.chartHeading}>
                Savings Overview
            </Text>

            <LineChart

                data={{

                    labels: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                    ],

                    datasets: [
                        {
                            data: [
                                10000,
                                15000,
                                9000,
                                18000,
                                23000,
                            ],
                        },
                    ],

                }}

                width={
                    Dimensions.get('window').width - 40
                }

                height={260}

                yAxisLabel="₹"

                chartConfig={{

                    backgroundColor: '#1e293b',

                    backgroundGradientFrom: '#1e293b',

                    backgroundGradientTo: '#1e293b',

                    decimalPlaces: 0,

                    color: (opacity = 1) =>
                        `rgba(37,99,235,${opacity})`,

                    labelColor: (opacity = 1) =>
                        `rgba(255,255,255,${opacity})`,

                    style: {
                        borderRadius: 20,
                    },

                    propsForDots: {
                        r: '5',
                    },

                }}

                bezier

                style={{
                    borderRadius: 20,
                    marginTop: 20,
                    marginBottom: 50,
                }}

            />

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

    selectBox: {
        marginBottom: 20,
    },

    selectLabel: {
        color: '#94a3b8',
        marginBottom: 10,
        fontSize: 15,
    },

    dropdown: {
        backgroundColor: '#1e293b',
        padding: 16,
        borderRadius: 15,
    },

    dropdownText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    optionBox: {
        backgroundColor: '#1e293b',
        marginTop: 10,
        borderRadius: 15,
        padding: 10,
    },

    optionButton: {
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
    },

    optionText: {
        color: 'white',
        fontSize: 16,
    },

    card: {
        backgroundColor: '#1e293b',
        padding: 28,
        borderRadius: 22,
        marginTop: 10,
        marginBottom: 20,
    },

    label: {
        color: '#94a3b8',
        fontSize: 16,
    },

    savings: {
        color: '#22c55e',
        fontSize: 44,
        fontWeight: 'bold',
        marginTop: 15,
    },

    detailCard: {
        backgroundColor: '#1e293b',
        padding: 25,
        borderRadius: 22,
        marginBottom: 30,
    },

    detailText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 14,
    },

    chartHeading: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },

});