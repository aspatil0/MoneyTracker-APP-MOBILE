// screens/ProfileScreen.js

import {
    useEffect,
    useState,
} from 'react';

import {
    Alert,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {

    const [name, setName] =
        useState('Adityaraj Patil');

    const [email, setEmail] =
        useState('adityaraj@gmail.com');

    const [mobile,
        setMobile] =
        useState('');

    const [showWarning,
        setShowWarning] =
        useState(false);

    // LOAD PROFILE

    const loadProfile = async () => {

        try {

            const storedName =

                await AsyncStorage.getItem(
                    'profile_name'
                );

            const storedEmail =

                await AsyncStorage.getItem(
                    'profile_email'
                );

            const storedMobile =

                await AsyncStorage.getItem(
                    'profile_mobile'
                );

            if (storedName) {

                setName(
                    storedName
                );

            }

            if (storedEmail) {

                setEmail(
                    storedEmail
                );

            }

            if (storedMobile) {

                setMobile(
                    storedMobile
                );

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadProfile();

    }, []);

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
                'Profile Updated'
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <ScrollView
            style={styles.container}
        >

            {/* WARNING ICON */}

            <TouchableOpacity

                style={styles.warningIcon}

                onPress={() =>
                    setShowWarning(true)
                }

            >

                <Text style={styles.warningEmoji}>
                    ⚠
                </Text>

            </TouchableOpacity>

            {/* PROFILE IMAGE */}

            <View
                style={
                    styles.imageContainer
                }
            >

                <Image

                    source={{

                        uri:
                            'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',

                    }}

                    style={
                        styles.profileImage
                    }

                />

            </View>

            {/* TITLE */}

            <Text style={styles.heading}>
                Profile
            </Text>

            {/* NAME */}

            <Text style={styles.label}>
                Name
            </Text>

            <TextInput

                value={name}

                onChangeText={
                    setName
                }

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

                onChangeText={
                    setEmail
                }

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

                onChangeText={
                    setMobile
                }

                placeholder="Optional"

                placeholderTextColor="#64748b"

                keyboardType="phone-pad"

                style={styles.input}

            />

            {/* SAVE BUTTON */}

            <TouchableOpacity

                style={styles.saveButton}

                onPress={saveProfile}

            >

                <Text style={styles.saveText}>
                    Save Profile
                </Text>

            </TouchableOpacity>

            {/* DOWNLOAD */}

            <TouchableOpacity
                style={
                    styles.downloadButton
                }
            >

                <Text
                    style={
                        styles.downloadText
                    }
                >

                    Download Monthly Data

                </Text>

                <Text
                    style={
                        styles.comingSoon
                    }
                >

                    Coming Soon

                </Text>

            </TouchableOpacity>

            {/* WARNING MODAL */}

            <Modal

                visible={showWarning}

                transparent

                animationType="fade"

            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalCard}>

                        <Text style={styles.modalTitle}>
                            Warning
                        </Text>

                        <Text style={styles.modalText}>

                            Do not clear app cache
                            or uninstall app.

                            {'\n\n'}

                            All app data is currently
                            stored locally on your
                            device.

                            {'\n\n'}

                            Database backup system
                            is not added yet.

                        </Text>

                        <TouchableOpacity

                            style={styles.closeButton}

                            onPress={() =>
                                setShowWarning(false)
                            }

                        >

                            <Text style={styles.closeText}>
                                Close
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

            <View
                style={{
                    height: 100,
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

    warningIcon: {

        position: 'absolute',

        right: 20,

        top: 60,

        zIndex: 10,

    },

    warningEmoji: {

        fontSize: 26,

    },

    imageContainer: {

        alignItems: 'center',

        marginTop: 50,

        marginBottom: 20,

    },

    profileImage: {

        width: 120,

        height: 120,

        borderRadius: 60,

        backgroundColor: '#1e293b',

    },

    heading: {

        color: 'white',

        fontSize: 34,

        fontWeight: 'bold',

        textAlign: 'center',

        marginBottom: 30,

    },

    label: {

        color: '#94a3b8',

        fontSize: 14,

        marginBottom: 8,

        marginTop: 12,

    },

    input: {

        backgroundColor: '#111827',

        borderRadius: 16,

        padding: 16,

        color: 'white',

        fontSize: 15,

    },

    saveButton: {

        backgroundColor: '#22c55e',

        padding: 18,

        borderRadius: 18,

        alignItems: 'center',

        marginTop: 30,

    },

    saveText: {

        color: 'white',

        fontSize: 16,

        fontWeight: 'bold',

    },

    downloadButton: {

        backgroundColor: '#2563eb',

        padding: 18,

        borderRadius: 18,

        marginTop: 30,

        alignItems: 'center',

    },

    downloadText: {

        color: 'white',

        fontSize: 16,

        fontWeight: 'bold',

    },

    comingSoon: {

        color: '#cbd5e1',

        marginTop: 6,

        fontSize: 12,

    },

    modalOverlay: {

        flex: 1,

        backgroundColor:
            'rgba(0,0,0,0.7)',

        justifyContent: 'center',

        alignItems: 'center',

        padding: 20,

    },

    modalCard: {

        backgroundColor: '#111827',

        width: '100%',

        borderRadius: 24,

        padding: 25,

    },

    modalTitle: {

        color: '#ef4444',

        fontSize: 24,

        fontWeight: 'bold',

        marginBottom: 15,

    },

    modalText: {

        color: '#fca5a5',

        lineHeight: 24,

        fontSize: 15,

    },

    closeButton: {

        backgroundColor: '#ef4444',

        padding: 15,

        borderRadius: 16,

        alignItems: 'center',

        marginTop: 25,

    },

    closeText: {

        color: 'white',

        fontWeight: 'bold',

        fontSize: 15,

    },

});