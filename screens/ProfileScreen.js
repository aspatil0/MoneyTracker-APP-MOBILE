import React, {
    useEffect,
    useState,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';

import * as Sharing from 'expo-sharing';

import * as XLSX from 'xlsx';

export default function ProfileScreen() {

    const [name, setName] =
        useState('');

    const [email, setEmail] =
        useState('');

    const [mobile, setMobile] =
        useState('');

    const [month, setMonth] =
        useState(
            String(
                new Date().getMonth() + 1
            ).padStart(2, '0')
        );

    const [year, setYear] =
        useState(
            new Date()
                .getFullYear()
                .toString()
        );

    // LOAD PROFILE

    const loadProfile = async () => {

        try {

            const savedName =
                await AsyncStorage.getItem(
                    'profile_name'
                );

            const savedEmail =
                await AsyncStorage.getItem(
                    'profile_email'
                );

            const savedMobile =
                await AsyncStorage.getItem(
                    'profile_mobile'
                );

            if (savedName)
                setName(savedName);

            if (savedEmail)
                setEmail(savedEmail);

            if (savedMobile)
                setMobile(savedMobile);

        }

        catch (error) {

            console.log(error);

        }

    };

    // SAVE PROFILE

    const saveProfile = async () => {

        try {

            await AsyncStorage.setItem(
                'profile_name',
                name
            );

            await AsyncStorage.setItem(
                'profile_email',
                email
            );

            await AsyncStorage.setItem(
                'profile_mobile',
                mobile
            );

            Alert.alert(
                'Profile Saved'
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    // DOWNLOAD EXCEL

    const downloadExcel = async () => {

        try {

            const transactions =

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

            let finalData = [];

            // TRANSACTIONS

            transactions.forEach((item) => {

                const splitDate =
                    item.date.split('-');

                if (

                    splitDate[0] ===
                    year &&

                    splitDate[1] ===
                    month

                ) {

                    finalData.push({

                        Type:
                            item.type,

                        Title:
                            item.title,

                        Amount:
                            item.amount,

                        Date:
                            item.date,

                    });

                }

            });

            // INCOME

            incomeHistory.forEach((item) => {

                const splitDate =
                    item.date.split('-');

                if (

                    splitDate[0] ===
                    year &&

                    splitDate[1] ===
                    month

                ) {

                    finalData.push({

                        Type:
                            'income',

                        Title:
                            item.mode,

                        Amount:
                            item.amount,

                        Date:
                            item.date,

                    });

                }

            });

            if (
                finalData.length === 0
            ) {

                Alert.alert(
                    'No Data Found'
                );

                return;

            }

            // CREATE WORKBOOK

            const worksheet =

                XLSX.utils.json_to_sheet(
                    finalData
                );

            const workbook =

                XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(

                workbook,

                worksheet,

                'MoneyData'

            );

            const excelBinary =

                XLSX.write(

                    workbook,

                    {

                        type: 'base64',

                        bookType: 'xlsx',

                    }

                );

            const fileUri =

                FileSystem.documentDirectory +

                `MoneyManager_${month}_${year}.xlsx`;

            await FileSystem.writeAsStringAsync(

                fileUri,

                excelBinary,

                {

                    encoding:
                        FileSystem.EncodingType.Base64,

                }

            );

            await Sharing.shareAsync(
                fileUri
            );

        }

        catch (error) {

            console.log(error);

            Alert.alert(
                'Error generating excel'
            );

        }

    };

    useEffect(() => {

        loadProfile();

    }, []);

    return (

        <ScrollView
            style={styles.container}
        >

            {/* PROFILE */}

            <View style={styles.profileSection}>

                <Image

                    source={{
                        uri:
                            'https://i.pravatar.cc/300',
                    }}

                    style={styles.profileImage}

                />

                <Text style={styles.heading}>
                    Profile
                </Text>

            </View>

            {/* NAME */}

            <Text style={styles.label}>
                Name
            </Text>

            <TextInput

                value={name}

                onChangeText={setName}

                placeholder="Enter Name"

                placeholderTextColor="#64748b"

                style={styles.input}

            />

            {/* EMAIL */}

            <Text style={styles.label}>
                Email
            </Text>

            <TextInput

                value={email}

                onChangeText={setEmail}

                placeholder="Enter Email"

                placeholderTextColor="#64748b"

                style={styles.input}

            />

            {/* MOBILE */}

            <Text style={styles.label}>
                Mobile Number
            </Text>

            <TextInput

                value={mobile}

                onChangeText={setMobile}

                placeholder="Optional"

                placeholderTextColor="#64748b"

                keyboardType="numeric"

                style={styles.input}

            />

            {/* SAVE */}

            <TouchableOpacity

                style={styles.saveButton}

                onPress={saveProfile}

            >

                <Text style={styles.buttonText}>
                    Save Profile
                </Text>

            </TouchableOpacity>

            {/* DOWNLOAD */}

            <Text style={styles.downloadTitle}>
                Download Monthly Data
            </Text>

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

            {/* DOWNLOAD BUTTON */}

            <TouchableOpacity

                style={styles.downloadButton}

                onPress={downloadExcel}

            >

                <Text style={styles.buttonText}>
                    Download Excel
                </Text>

            </TouchableOpacity>

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

    profileSection: {

        alignItems: 'center',

        marginTop: 50,

        marginBottom: 30,

    },

    profileImage: {

        width: 110,

        height: 110,

        borderRadius: 60,

        marginBottom: 15,

    },

    heading: {

        color: 'white',

        fontSize: 32,

        fontWeight: 'bold',

    },

    label: {

        color: '#94a3b8',

        fontSize: 13,

        marginBottom: 8,

        marginTop: 12,

    },

    input: {

        backgroundColor: '#111827',

        borderRadius: 14,

        padding: 15,

        color: 'white',

        fontSize: 15,

    },

    saveButton: {

        backgroundColor: '#2563eb',

        padding: 16,

        borderRadius: 15,

        marginTop: 25,

        alignItems: 'center',

    },

    downloadButton: {

        backgroundColor: '#22c55e',

        padding: 16,

        borderRadius: 15,

        marginTop: 20,

        alignItems: 'center',

    },

    buttonText: {

        color: 'white',

        fontWeight: 'bold',

        fontSize: 15,

    },

    downloadTitle: {

        color: 'white',

        fontSize: 22,

        fontWeight: 'bold',

        marginTop: 35,

        marginBottom: 10,

    },

});