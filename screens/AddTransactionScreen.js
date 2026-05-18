// screens/AddTransactionScreen.js

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

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const AddTransactionScreen = ({ navigation }) => {

    const [itemName, setItemName] = useState('');

    const [amount, setAmount] = useState('');

    const [type, setType] = useState('credit');

    const [selectedDate, setSelectedDate] =
        useState(new Date());

    const formatDate = (date) => {

        return `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, '0')}-${String(
            date.getDate()
        ).padStart(2, '0')}`;

    };

    const saveTransaction = async () => {

        if (!itemName || !amount) {

            Alert.alert(
                'Please enter all fields'
            );

            return;

        }

        try {

            const existingTransactions =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'transactions'
                    )

                ) || [];

            const currentBalance =

                Number(

                    await AsyncStorage.getItem(
                        'currentBalance'
                    )

                ) || 0;

            const transactionAmount =
                Number(amount);

            const newTransaction = {

                id: Date.now(),

                title: itemName,

                amount: transactionAmount,

                type: type,

                date: formatDate(
                    selectedDate
                ),

            };

            const updatedTransactions = [

                newTransaction,

                ...existingTransactions,

            ];

            await AsyncStorage.setItem(

                'transactions',

                JSON.stringify(
                    updatedTransactions
                )

            );

            let updatedBalance =
                currentBalance;

            if (type === 'credit') {

                updatedBalance =
                    currentBalance +
                    transactionAmount;

            }

            else {

                updatedBalance =
                    currentBalance -
                    transactionAmount;

            }

            await AsyncStorage.setItem(

                'currentBalance',

                updatedBalance.toString()

            );

            Alert.alert(
                'Transaction Saved Successfully'
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

            contentContainerStyle={{
                paddingBottom: 400,
            }}

            keyboardShouldPersistTaps="handled"

        >

            <Text style={styles.heading}>
                Add Transaction
            </Text>

            <TextInput

                placeholder="Enter Item Name"

                placeholderTextColor="#8f9bb3"

                style={styles.input}

                value={itemName}

                onChangeText={setItemName}

            />

            <TextInput

                placeholder="Enter Amount"

                placeholderTextColor="#8f9bb3"

                style={styles.input}

                keyboardType="numeric"

                value={amount}

                onChangeText={setAmount}

            />

            <Text style={styles.label}>
                Select Transaction Date
            </Text>

            <View style={styles.dateContainer}>

                <DatePicker

                    selected={selectedDate}

                    onChange={(date) => {

                        setSelectedDate(date);

                        if (
                            document &&
                            document.activeElement
                        ) {

                            document.activeElement.blur();

                        }

                    }}

                    dateFormat="yyyy-MM-dd"

                    popperPlacement="top-start"

                    wrapperClassName="datePicker"

                    className="custom-datepicker"

                />

            </View>

            <TouchableOpacity

                style={[

                    styles.typeButton,

                    type === 'credit' &&
                    styles.creditButton,

                ]}

                onPress={() =>
                    setType('credit')
                }

            >

                <Text style={styles.buttonText}>
                    Credited
                </Text>

            </TouchableOpacity>

            <TouchableOpacity

                style={[

                    styles.typeButton,

                    type === 'debit' &&
                    styles.debitButton,

                ]}

                onPress={() =>
                    setType('debit')
                }

            >

                <Text style={styles.buttonText}>
                    Debited
                </Text>

            </TouchableOpacity>

            <TouchableOpacity

                style={styles.saveButton}

                onPress={saveTransaction}

            >

                <Text style={styles.buttonText}>
                    Save Transaction
                </Text>

            </TouchableOpacity>

        </ScrollView>

    );

};

export default AddTransactionScreen;

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: '#020B2D',

        padding: 20,

    },

    heading: {

        color: '#fff',

        fontSize: 24,

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

    dateContainer: {

        zIndex: 99999,

        marginBottom: 20,

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

    },

});