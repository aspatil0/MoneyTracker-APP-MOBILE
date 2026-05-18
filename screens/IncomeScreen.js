import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

import AsyncStorage
    from '@react-native-async-storage/async-storage';

import DateTimePicker
    from '@react-native-community/datetimepicker';

export default function IncomeScreen({
    navigation,
}) {

    const today = new Date();

    const [incomeAmount, setIncomeAmount] =
        useState('');

    const [mode, setMode] =
        useState('');

    const [showDate, setShowDate] =
        useState(false);

    const [selectedDate, setSelectedDate] =
        useState(today);

    // FORMAT DATE

    const formatDate = (date) => {

        const year = date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, '0');

        const day =
            String(
                date.getDate()
            ).padStart(2, '0');

        return `${year}-${month}-${day}`;

    };

    // SAVE INCOME

    const saveIncome = async () => {

        try {

            if (
                incomeAmount === '' ||
                mode === ''
            ) {

                alert('Please fill all fields');

                return;

            }

            // GET OLD INCOME

            const oldIncome =
                await AsyncStorage.getItem(
                    'monthlyIncome'
                );

            const parsedOldIncome =
                oldIncome
                    ? Number(oldIncome)
                    : 0;

            // ADD NEW + OLD

            const updatedIncome =

                parsedOldIncome +

                Number(incomeAmount);

            // SAVE TOTAL

            await AsyncStorage.setItem(

                'monthlyIncome',

                updatedIncome.toString()

            );

            // GET OLD HISTORY

            const oldHistory =
                await AsyncStorage.getItem(
                    'incomeHistory'
                );

            let incomeHistory =

                oldHistory
                    ? JSON.parse(oldHistory)
                    : [];

            // NEW ENTRY

            const newIncome = {

                id: Date.now(),

                amount: incomeAmount,

                date:
                    formatDate(
                        selectedDate
                    ),

                mode,

            };

            incomeHistory.push(newIncome);

            // SAVE HISTORY

            await AsyncStorage.setItem(

                'incomeHistory',

                JSON.stringify(
                    incomeHistory
                )

            );

            alert('Income Added');

            navigation.goBack();

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <View style={styles.container}>

            <Text style={styles.heading}>
                Add Income
            </Text>

            {/* AMOUNT */}

            <TextInput

                placeholder="Enter Income Amount"

                placeholderTextColor="#94a3b8"

                keyboardType="numeric"

                value={incomeAmount}

                onChangeText={setIncomeAmount}

                style={styles.input}
            />

            {/* DATE */}

            <Text style={styles.label}>
                Select Income Date
            </Text>

            <TouchableOpacity

                style={styles.dateButton}

                onPress={() =>
                    setShowDate(true)
                }

            >

                <Text style={styles.dateText}>

                    {
                        formatDate(
                            selectedDate
                        )
                    }

                </Text>

            </TouchableOpacity>

            {/* DATE PICKER */}

            {
                showDate && (

                    <DateTimePicker

                        value={selectedDate}

                        mode="date"

                        display={
                            Platform.OS === 'ios'
                                ? 'spinner'
                                : 'default'
                        }

                        onChange={(
                            event,
                            pickedDate
                        ) => {

                            setShowDate(false);

                            if (pickedDate) {

                                setSelectedDate(
                                    pickedDate
                                );

                            }

                        }}
                    />

                )
            }

            {/* MODE */}

            <TextInput

                placeholder="Income Mode"

                placeholderTextColor="#94a3b8"

                value={mode}

                onChangeText={setMode}

                style={styles.input}
            />

            {/* BUTTON */}

            <TouchableOpacity

                style={styles.button}

                onPress={saveIncome}

            >

                <Text style={styles.buttonText}>
                    Save Income
                </Text>

            </TouchableOpacity>

        </View>

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
        marginBottom: 35,
    },

    input: {
        backgroundColor: '#1e293b',
        color: 'white',
        padding: 18,
        borderRadius: 15,
        marginBottom: 22,
        fontSize: 16,
    },

    label: {
        color: '#94a3b8',
        marginBottom: 10,
        fontSize: 15,
    },

    dateButton: {
        backgroundColor: '#1e293b',
        padding: 18,
        borderRadius: 15,
        marginBottom: 25,
    },

    dateText: {
        color: 'white',
        fontSize: 16,
    },

    button: {
        backgroundColor: '#16a34a',
        padding: 18,
        borderRadius: 15,
        marginTop: 10,
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
    },

});