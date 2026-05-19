import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IncomeScreen({
    navigation,
}) {

    const [amount, setAmount] =
        useState('');

    const [mode, setMode] =
        useState('');

    const [date, setDate] =
        useState(
            new Date()
                .toISOString()
                .split('T')[0]
        );

    const saveIncome = async () => {

        if (
            !amount ||
            !mode ||
            !date
        ) {

            Alert.alert(
                'Please fill all fields'
            );

            return;

        }

        try {

            const oldIncome =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'incomeHistory'
                    )

                ) || [];

            const incomeData = {

                id: Date.now(),

                amount: Number(amount),

                mode: mode,

                date: date,

            };

            const updatedIncome = [

                incomeData,

                ...oldIncome,

            ];

            await AsyncStorage.setItem(

                'incomeHistory',

                JSON.stringify(
                    updatedIncome
                )

            );

            Alert.alert(
                'Income Added Successfully'
            );

            navigation.goBack();

        }

        catch (error) {

            console.log(error);

            Alert.alert(
                'Error saving income'
            );

        }

    };

    return (

        <ScrollView
            style={styles.container}
        >

            <Text style={styles.heading}>
                Add Income
            </Text>

            <TextInput

                placeholder="Enter Income Amount"

                placeholderTextColor="#94a3b8"

                style={styles.input}

                keyboardType="numeric"

                value={amount}

                onChangeText={setAmount}

            />

            <TextInput

                placeholder="Income Mode"

                placeholderTextColor="#94a3b8"

                style={styles.input}

                value={mode}

                onChangeText={setMode}

            />

            <Text style={styles.label}>
                Select Income Date
            </Text>

            <TextInput

                value={date}

                onChangeText={setDate}

                placeholder="YYYY-MM-DD"

                placeholderTextColor="#94a3b8"

                style={styles.input}

            />

            <TouchableOpacity

                style={styles.saveButton}

                onPress={saveIncome}

            >

                <Text style={styles.buttonText}>
                    Save Income
                </Text>

            </TouchableOpacity>

        </ScrollView>

    );

}

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: '#020B2D',

        padding: 20,

    },

    heading: {

        color: '#fff',

        fontSize: 28,

        fontWeight: 'bold',

        marginTop: 60,

        marginBottom: 30,

    },

    input: {

        backgroundColor: '#1c2942',

        borderRadius: 12,

        padding: 16,

        color: '#fff',

        marginBottom: 18,

    },

    label: {

        color: '#fff',

        marginBottom: 10,

        fontWeight: '600',

    },

    saveButton: {

        backgroundColor: '#16a34a',

        padding: 16,

        borderRadius: 12,

        alignItems: 'center',

        marginTop: 10,

    },

    buttonText: {

        color: '#fff',

        fontWeight: 'bold',

        fontSize: 16,

    },

});