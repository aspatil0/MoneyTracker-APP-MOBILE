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

export default function AddTransactionScreen({
    navigation,
}) {

    const [title, setTitle] =
        useState('');

    const [amount, setAmount] =
        useState('');

    const [type, setType] =
        useState('credited');

    const [date, setDate] =
        useState(
            new Date()
                .toISOString()
                .split('T')[0]
        );

    const saveTransaction = async () => {

        if (
            !title ||
            !amount ||
            !date
        ) {

            Alert.alert(
                'Please fill all fields'
            );

            return;

        }

        try {

            const oldTransactions =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'transactions'
                    )

                ) || [];

            const newTransaction = {

                id: Date.now(),

                title: title,

                amount: Number(amount),

                type: type,

                date: date,

            };

            const updatedTransactions = [

                newTransaction,

                ...oldTransactions,

            ];

            await AsyncStorage.setItem(

                'transactions',

                JSON.stringify(
                    updatedTransactions
                )

            );

            Alert.alert(
                'Transaction Added Successfully'
            );

            navigation.goBack();

        }

        catch (error) {

            console.log(error);

            Alert.alert(
                'Error saving transaction'
            );

        }

    };

    return (

        <ScrollView
            style={styles.container}
        >

            <Text style={styles.heading}>
                Add Transaction
            </Text>

            {/* TITLE */}

            <TextInput

                placeholder="Enter Item Name"

                placeholderTextColor="#94a3b8"

                style={styles.input}

                value={title}

                onChangeText={setTitle}

            />

            {/* AMOUNT */}

            <TextInput

                placeholder="Enter Amount"

                placeholderTextColor="#94a3b8"

                style={styles.input}

                keyboardType="numeric"

                value={amount}

                onChangeText={setAmount}

            />

            {/* DATE */}

            <Text style={styles.label}>
                Select Transaction Date
            </Text>

            <TextInput

                value={date}

                onChangeText={setDate}

                placeholder="YYYY-MM-DD"

                placeholderTextColor="#94a3b8"

                style={styles.input}

            />

            {/* CREDIT */}

            <TouchableOpacity

                style={[

                    styles.typeButton,

                    type === 'credited' &&
                    styles.creditButton,

                ]}

                onPress={() =>
                    setType('credited')
                }

            >

                <Text style={styles.buttonText}>
                    Credited
                </Text>

            </TouchableOpacity>

            {/* DEBIT */}

            <TouchableOpacity

                style={[

                    styles.typeButton,

                    type === 'debited' &&
                    styles.debitButton,

                ]}

                onPress={() =>
                    setType('debited')
                }

            >

                <Text style={styles.buttonText}>
                    Debited
                </Text>

            </TouchableOpacity>

            {/* SAVE */}

            <TouchableOpacity

                style={styles.saveButton}

                onPress={saveTransaction}

            >

                <Text style={styles.buttonText}>
                    Save Transaction
                </Text>

            </TouchableOpacity>

            <View style={{ height: 100 }} />

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

    typeButton: {

        backgroundColor: '#334155',

        padding: 16,

        borderRadius: 12,

        alignItems: 'center',

        marginBottom: 14,

    },

    creditButton: {

        backgroundColor: '#16a34a',

    },

    debitButton: {

        backgroundColor: '#dc2626',

    },

    saveButton: {

        backgroundColor: '#2563eb',

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