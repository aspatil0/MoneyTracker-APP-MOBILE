// screens/SplitScreen.js

import {
    useEffect,
    useState,
} from 'react';

import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplitScreen() {

    const [activeTab,
        setActiveTab] =
        useState('borrow');

    // BORROW

    const [borrowLoans,
        setBorrowLoans] =
        useState([]);

    // GET PAYMENT

    const [payments,
        setPayments] =
        useState([]);

    // GROUP SPLIT

    const [groupSplits,
        setGroupSplits] =
        useState([]);

    const [selectedSplit,
        setSelectedSplit] =
        useState(null);

    // COMMON

    const [showForm,
        setShowForm] =
        useState(false);

    const [showDetails,
        setShowDetails] =
        useState(false);

    const [name, setName] =
        useState('');

    const [person,
        setPerson] =
        useState('');

    const [amount,
        setAmount] =
        useState('');

    const [date, setDate] =
        useState(
            new Date()
                .toISOString()
                .split('T')[0]
        );

    // GROUP SPLIT

    const [splitName,
        setSplitName] =
        useState('');

    const [friends,
        setFriends] =
        useState([
            {
                name: '',
                amount: '',
                paid: false,
            },
        ]);

    // LOAD

    const loadData = async () => {

        try {

            const storedBorrow =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'borrowLoans'
                    )

                ) || [];

            const storedPayments =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'getPayments'
                    )

                ) || [];

            const storedSplits =

                JSON.parse(

                    await AsyncStorage.getItem(
                        'groupSplits'
                    )

                ) || [];

            setBorrowLoans(
                storedBorrow
            );

            setPayments(
                storedPayments
            );

            setGroupSplits(
                storedSplits
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadData();

    }, []);

    // ADD ENTRY

    const addEntry = async () => {

        if (

            !name ||

            !person ||

            !amount ||

            !date

        ) {

            Alert.alert(
                'Fill all fields'
            );

            return;

        }

        try {

            const newEntry = {

                id: Date.now(),

                name,

                person,

                amount:
                    Number(amount),

                date,

                paid: false,

            };

            // BORROW

            if (
                activeTab ===
                'borrow'
            ) {

                const updated = [

                    newEntry,

                    ...borrowLoans,

                ];

                await AsyncStorage.setItem(

                    'borrowLoans',

                    JSON.stringify(
                        updated
                    )

                );

                setBorrowLoans(
                    updated
                );

            }

            // PAYMENT

            if (
                activeTab ===
                'payment'
            ) {

                const updated = [

                    newEntry,

                    ...payments,

                ];

                await AsyncStorage.setItem(

                    'getPayments',

                    JSON.stringify(
                        updated
                    )

                );

                setPayments(updated);

            }

            setName('');

            setPerson('');

            setAmount('');

            Alert.alert(
                'Added Successfully'
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    // MARK PAID

    const markDone = async (
        id
    ) => {

        try {

            // BORROW

            if (
                activeTab ===
                'borrow'
            ) {

                const updated =

                    borrowLoans.map(
                        (item) => {

                            if (
                                item.id ===
                                id
                            ) {

                                return {

                                    ...item,

                                    paid: true,

                                };

                            }

                            return item;

                        }
                    );

                await AsyncStorage.setItem(

                    'borrowLoans',

                    JSON.stringify(
                        updated
                    )

                );

                setBorrowLoans(
                    updated
                );

            }

            // PAYMENT

            if (
                activeTab ===
                'payment'
            ) {

                const updated =

                    payments.map(
                        (item) => {

                            if (
                                item.id ===
                                id
                            ) {

                                return {

                                    ...item,

                                    paid: true,

                                };

                            }

                            return item;

                        }
                    );

                await AsyncStorage.setItem(

                    'getPayments',

                    JSON.stringify(
                        updated
                    )

                );

                setPayments(updated);

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    // CURRENT DATA

    const currentData =

        activeTab ===
            'borrow'

            ? borrowLoans

            : payments;

    // TOTAL

    let totalAmount = 0;

    currentData.forEach((item) => {

        if (!item.paid) {

            totalAmount +=
                Number(item.amount);

        }

    });

    // SUMMARY

    const summary = {};

    currentData.forEach((item) => {

        if (!item.paid) {

            if (
                summary[
                item.person
                ]
            ) {

                summary[
                    item.person
                ].amount +=
                    Number(
                        item.amount
                    );

                summary[
                    item.person
                ].count += 1;

            }

            else {

                summary[
                    item.person
                ] = {

                    amount:
                        Number(
                            item.amount
                        ),

                    count: 1,

                };

            }

        }

    });

    // GROUP SPLIT

    const addFriendRow = () => {

        setFriends([

            ...friends,

            {
                name: '',
                amount: '',
                paid: false,
            },

        ]);

    };

    const updateFriend = (
        index,
        field,
        value
    ) => {

        const updated =
            [...friends];

        updated[index][field] =
            value;

        setFriends(updated);

    };

    const saveGroupSplit = async () => {

        if (
            !splitName ||
            !amount
        ) {

            Alert.alert(
                'Fill all details'
            );

            return;

        }

        try {

            const newSplit = {

                id: Date.now(),

                splitName,

                totalAmount:
                    Number(amount),

                createdDate:
                    new Date()
                        .toISOString()
                        .split('T')[0],

                friends,

            };

            const updatedSplits = [

                newSplit,

                ...groupSplits,

            ];

            await AsyncStorage.setItem(

                'groupSplits',

                JSON.stringify(
                    updatedSplits
                )

            );

            setGroupSplits(
                updatedSplits
            );

            setSplitName('');

            setAmount('');

            setFriends([
                {
                    name: '',
                    amount: '',
                    paid: false,
                },
            ]);

            Alert.alert(
                'Group Split Added'
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    const markFriendPaid = async (
        splitId,
        friendIndex
    ) => {

        try {

            const updatedSplits =

                groupSplits.map(
                    (split) => {

                        if (
                            split.id ===
                            splitId
                        ) {

                            const updatedFriends =

                                split.friends.map(
                                    (
                                        friend,
                                        index
                                    ) => {

                                        if (
                                            index ===
                                            friendIndex
                                        ) {

                                            return {

                                                ...friend,

                                                paid: true,

                                            };

                                        }

                                        return friend;

                                    }
                                );

                            return {

                                ...split,

                                friends:
                                    updatedFriends,

                            };

                        }

                        return split;

                    }
                );

            await AsyncStorage.setItem(

                'groupSplits',

                JSON.stringify(
                    updatedSplits
                )

            );

            setGroupSplits(
                updatedSplits
            );

            const updatedSelected =

                updatedSplits.find(
                    (item) =>
                        item.id ===
                        splitId
                );

            setSelectedSplit(
                updatedSelected
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

            {/* TOP BUTTONS */}

            <View style={styles.buttonRow}>

                <TouchableOpacity

                    style={
                        activeTab ===
                            'borrow'

                            ? styles.activeButton

                            : styles.topButton
                    }

                    onPress={() => {

                        setActiveTab(
                            'borrow'
                        );

                        setShowForm(false);

                        setShowDetails(false);

                    }}

                >

                    <Text style={styles.buttonText}>
                        Borrow
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity

                    style={
                        activeTab ===
                            'payment'

                            ? styles.activeButton

                            : styles.topButton
                    }

                    onPress={() => {

                        setActiveTab(
                            'payment'
                        );

                        setShowForm(false);

                        setShowDetails(false);

                    }}

                >

                    <Text style={styles.buttonText}>
                        Get Payment
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity

                    style={
                        activeTab ===
                            'group'

                            ? styles.activeButton

                            : styles.topButton
                    }

                    onPress={() => {

                        setActiveTab(
                            'group'
                        );

                        setShowForm(false);

                        setShowDetails(false);

                    }}

                >

                    <Text style={styles.buttonText}>
                        Group Split
                    </Text>

                </TouchableOpacity>

            </View>

            {/* GROUP SPLIT TAB */}

            {
                activeTab ===
                    'group' ? (

                    <>

                        <TouchableOpacity

                            style={styles.addButton}

                            onPress={() =>
                                setShowForm(
                                    !showForm
                                )
                            }

                        >

                            <Text style={styles.buttonText}>
                                Add Split
                            </Text>

                        </TouchableOpacity>

                        {/* FORM */}

                        {
                            showForm && (

                                <View style={styles.form}>

                                    <TextInput

                                        placeholder="Split Name"

                                        placeholderTextColor="#64748b"

                                        value={splitName}

                                        onChangeText={
                                            setSplitName
                                        }

                                        style={styles.input}

                                    />

                                    <TextInput

                                        placeholder="Total Payment"

                                        placeholderTextColor="#64748b"

                                        keyboardType="numeric"

                                        value={amount}

                                        onChangeText={
                                            setAmount
                                        }

                                        style={styles.input}

                                    />

                                    {
                                        friends.map(
                                            (
                                                friend,
                                                index
                                            ) => (

                                                <View
                                                    key={index}
                                                >

                                                    <TextInput

                                                        placeholder="Friend Name"

                                                        placeholderTextColor="#64748b"

                                                        value={
                                                            friend.name
                                                        }

                                                        onChangeText={(
                                                            value
                                                        ) =>
                                                            updateFriend(
                                                                index,
                                                                'name',
                                                                value
                                                            )
                                                        }

                                                        style={
                                                            styles.input
                                                        }

                                                    />

                                                    <TextInput

                                                        placeholder="Amount"

                                                        placeholderTextColor="#64748b"

                                                        keyboardType="numeric"

                                                        value={
                                                            friend.amount
                                                        }

                                                        onChangeText={(
                                                            value
                                                        ) =>
                                                            updateFriend(
                                                                index,
                                                                'amount',
                                                                value
                                                            )
                                                        }

                                                        style={
                                                            styles.input
                                                        }

                                                    />

                                                </View>

                                            )
                                        )
                                    }

                                    <TouchableOpacity

                                        style={
                                            styles.plusButton
                                        }

                                        onPress={
                                            addFriendRow
                                        }

                                    >

                                        <Text
                                            style={
                                                styles.plusText
                                            }
                                        >

                                            +

                                        </Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity

                                        style={
                                            styles.doneButton
                                        }

                                        onPress={
                                            saveGroupSplit
                                        }

                                    >

                                        <Text
                                            style={
                                                styles.buttonText
                                            }
                                        >

                                            Done

                                        </Text>

                                    </TouchableOpacity>

                                </View>

                            )
                        }

                        {/* HISTORY */}

                        <Text style={styles.historyTitle}>
                            Split History
                        </Text>

                        {
                            groupSplits.map(
                                (split) => (

                                    <TouchableOpacity

                                        key={split.id}

                                        style={
                                            styles.historyCard
                                        }

                                        onPress={() => {

                                            // HIDE / UNHIDE

                                            if (
                                                selectedSplit?.id ===
                                                split.id
                                            ) {

                                                setSelectedSplit(
                                                    null
                                                );

                                            }

                                            else {

                                                setSelectedSplit(
                                                    split
                                                );

                                            }

                                        }}

                                    >

                                        <View>

                                            <Text
                                                style={
                                                    styles.personText
                                                }
                                            >

                                                {
                                                    split.splitName
                                                }

                                            </Text>

                                            <Text
                                                style={
                                                    styles.dateText
                                                }
                                            >

                                                {
                                                    split.createdDate
                                                }

                                            </Text>

                                        </View>

                                        {/* REMAINING */}

                                        <Text
                                            style={
                                                styles.amountText
                                            }
                                        >

                                            ₹ {

                                                split.friends.reduce(

                                                    (
                                                        total,
                                                        friend
                                                    ) => {

                                                        if (
                                                            !friend.paid
                                                        ) {

                                                            return (

                                                                total +

                                                                Number(
                                                                    friend.amount
                                                                )

                                                            );

                                                        }

                                                        return total;

                                                    },

                                                    0

                                                )

                                            }

                                        </Text>

                                    </TouchableOpacity>

                                )
                            )
                        }

                        {/* DETAILS */}

                        {
                            selectedSplit && (

                                <View
                                    style={
                                        styles.form
                                    }
                                >

                                    <Text
                                        style={
                                            styles.historyTitle
                                        }
                                    >

                                        {
                                            selectedSplit.splitName
                                        }

                                    </Text>

                                    {
                                        selectedSplit.friends.map(
                                            (
                                                friend,
                                                index
                                            ) => (

                                                <View
                                                    key={index}
                                                    style={
                                                        styles.historyCard
                                                    }
                                                >

                                                    <View>

                                                        <Text
                                                            style={
                                                                styles.personText
                                                            }
                                                        >

                                                            {
                                                                friend.name
                                                            }

                                                        </Text>

                                                        <Text
                                                            style={
                                                                styles.amountText
                                                            }
                                                        >

                                                            ₹ {
                                                                friend.amount
                                                            }

                                                        </Text>

                                                    </View>

                                                    {
                                                        friend.paid ? (

                                                            <View
                                                                style={
                                                                    styles.paidTag
                                                                }
                                                            >

                                                                <Text
                                                                    style={
                                                                        styles.paidText
                                                                    }
                                                                >

                                                                    Paid

                                                                </Text>

                                                            </View>

                                                        ) : (

                                                            <TouchableOpacity

                                                                style={
                                                                    styles.payButton
                                                                }

                                                                onPress={() =>
                                                                    markFriendPaid(
                                                                        selectedSplit.id,
                                                                        index
                                                                    )
                                                                }

                                                            >

                                                                <Text
                                                                    style={
                                                                        styles.payText
                                                                    }
                                                                >

                                                                    Tick Paid

                                                                </Text>

                                                            </TouchableOpacity>

                                                        )
                                                    }

                                                </View>

                                            )
                                        )
                                    }

                                </View>

                            )
                        }

                    </>

                ) : (

                    <>

                        {/* TOTAL */}

                        <View style={styles.totalCard}>

                            <Text style={styles.totalTitle}>

                                {
                                    activeTab ===
                                        'borrow'

                                        ? 'Total Payable'

                                        : 'Total Return To You'
                                }

                            </Text>

                            <Text style={styles.totalAmount}>
                                ₹ {totalAmount}
                            </Text>

                        </View>

                        {/* ADD */}

                        <TouchableOpacity

                            style={styles.addButton}

                            onPress={() =>
                                setShowForm(
                                    !showForm
                                )
                            }

                        >

                            <Text style={styles.buttonText}>
                                Add New
                            </Text>

                        </TouchableOpacity>

                        {/* FORM */}

                        {
                            showForm && (

                                <View style={styles.form}>

                                    <TextInput

                                        placeholder="Loan / Payment Name"

                                        placeholderTextColor="#64748b"

                                        value={name}

                                        onChangeText={
                                            setName
                                        }

                                        style={styles.input}

                                    />

                                    <TextInput

                                        placeholder={

                                            activeTab ===
                                                'borrow'

                                                ? 'From Whom'

                                                : 'To Whom'

                                        }

                                        placeholderTextColor="#64748b"

                                        value={person}

                                        onChangeText={
                                            setPerson
                                        }

                                        style={styles.input}

                                    />

                                    <TextInput

                                        placeholder="Amount"

                                        placeholderTextColor="#64748b"

                                        keyboardType="numeric"

                                        value={amount}

                                        onChangeText={
                                            setAmount
                                        }

                                        style={styles.input}

                                    />

                                    <TextInput

                                        placeholder="Return Date"

                                        placeholderTextColor="#64748b"

                                        value={date}

                                        onChangeText={
                                            setDate
                                        }

                                        style={styles.input}

                                    />

                                    <TouchableOpacity

                                        style={
                                            styles.doneButton
                                        }

                                        onPress={addEntry}

                                    >

                                        <Text
                                            style={
                                                styles.buttonText
                                            }
                                        >

                                            Done

                                        </Text>

                                    </TouchableOpacity>

                                </View>

                            )
                        }

                        {/* DETAIL */}

                        <TouchableOpacity

                            style={styles.detailButton}

                            onPress={() =>
                                setShowDetails(
                                    !showDetails
                                )
                            }

                        >

                            <Text style={styles.buttonText}>
                                Detailed
                            </Text>

                        </TouchableOpacity>

                        {/* DETAILS */}

                        {
                            showDetails &&

                            Object.keys(summary).map(
                                (
                                    person,
                                    index
                                ) => (

                                    <View
                                        key={index}
                                        style={
                                            styles.detailCard
                                        }
                                    >

                                        <Text
                                            style={
                                                styles.personText
                                            }
                                        >

                                            {person}

                                        </Text>

                                        <Text
                                            style={
                                                styles.amountText
                                            }
                                        >

                                            ₹ {
                                                summary[
                                                    person
                                                ].amount
                                            }

                                        </Text>

                                        <Text
                                            style={
                                                styles.dateText
                                            }
                                        >

                                            (
                                            {
                                                summary[
                                                    person
                                                ].count
                                            }
                                            )

                                        </Text>

                                    </View>

                                )
                            )
                        }

                        {/* HISTORY */}

                        <Text style={styles.historyTitle}>
                            History
                        </Text>

                        {
                            currentData.map(
                                (item) => (

                                    <View
                                        key={item.id}
                                        style={
                                            styles.historyCard
                                        }
                                    >

                                        <View>

                                            <Text
                                                style={
                                                    styles.amountText
                                                }
                                            >

                                                ₹ {
                                                    item.amount
                                                }

                                            </Text>

                                            <Text
                                                style={
                                                    styles.personText
                                                }
                                            >

                                                {
                                                    activeTab ===
                                                        'borrow'

                                                        ? `From ${item.person}`

                                                        : `To ${item.person}`
                                                }

                                            </Text>

                                            <Text
                                                style={
                                                    styles.dateText
                                                }
                                            >

                                                {
                                                    item.date
                                                }

                                            </Text>

                                        </View>

                                        {
                                            item.paid ? (

                                                <View
                                                    style={
                                                        styles.paidTag
                                                    }
                                                >

                                                    <Text
                                                        style={
                                                            styles.paidText
                                                        }
                                                    >

                                                        Paid

                                                    </Text>

                                                </View>

                                            ) : (

                                                <TouchableOpacity

                                                    style={
                                                        styles.payButton
                                                    }

                                                    onPress={() =>
                                                        markDone(
                                                            item.id
                                                        )
                                                    }

                                                >

                                                    <Text
                                                        style={
                                                            styles.payText
                                                        }
                                                    >

                                                        Mark Paid

                                                    </Text>

                                                </TouchableOpacity>

                                            )
                                        }

                                    </View>

                                )
                            )
                        }

                    </>

                )
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

    buttonRow: {

        flexDirection: 'row',

        justifyContent: 'space-between',

        marginTop: 50,

    },

    topButton: {

        backgroundColor: '#111827',

        padding: 12,

        borderRadius: 14,

        width: '31%',

        alignItems: 'center',

    },

    activeButton: {

        backgroundColor: '#2563eb',

        padding: 12,

        borderRadius: 14,

        width: '31%',

        alignItems: 'center',

    },

    buttonText: {

        color: 'white',

        fontWeight: 'bold',

        fontSize: 12,

    },

    totalCard: {

        backgroundColor: '#1e293b',

        padding: 25,

        borderRadius: 24,

        marginTop: 30,

    },

    totalTitle: {

        color: '#94a3b8',

        fontSize: 14,

    },

    totalAmount: {

        color: '#22c55e',

        fontSize: 42,

        fontWeight: 'bold',

        marginTop: 10,

    },

    addButton: {

        backgroundColor: '#2563eb',

        padding: 16,

        borderRadius: 16,

        alignItems: 'center',

        marginTop: 25,

    },

    form: {

        marginTop: 20,

    },

    input: {

        backgroundColor: '#111827',

        borderRadius: 14,

        padding: 15,

        color: 'white',

        marginBottom: 15,

    },

    doneButton: {

        backgroundColor: '#7c3aed',

        padding: 16,

        borderRadius: 16,

        alignItems: 'center',

    },

    detailButton: {

        backgroundColor: '#7c3aed',

        padding: 15,

        borderRadius: 15,

        alignItems: 'center',

        marginTop: 20,

    },

    detailCard: {

        backgroundColor: '#111827',

        padding: 18,

        borderRadius: 16,

        marginTop: 15,

        flexDirection: 'row',

        justifyContent: 'space-between',

    },

    historyTitle: {

        color: 'white',

        fontSize: 24,

        fontWeight: 'bold',

        marginTop: 30,

        marginBottom: 10,

    },

    historyCard: {

        backgroundColor: '#1e293b',

        padding: 18,

        borderRadius: 18,

        marginTop: 15,

        flexDirection: 'row',

        justifyContent: 'space-between',

        alignItems: 'center',

    },

    amountText: {

        color: '#22c55e',

        fontSize: 20,

        fontWeight: 'bold',

    },

    personText: {

        color: 'white',

        fontSize: 16,

        fontWeight: 'bold',

    },

    dateText: {

        color: '#94a3b8',

        marginTop: 5,

        fontSize: 12,

    },

    payButton: {

        backgroundColor: '#22c55e',

        padding: 12,

        borderRadius: 12,

    },

    payText: {

        color: 'white',

        fontSize: 12,

        fontWeight: 'bold',

    },

    paidTag: {

        backgroundColor: '#334155',

        padding: 12,

        borderRadius: 12,

    },

    paidText: {

        color: '#22c55e',

        fontWeight: 'bold',

    },

    plusButton: {

        backgroundColor: '#22c55e',

        width: 55,

        height: 55,

        borderRadius: 30,

        justifyContent: 'center',

        alignItems: 'center',

        alignSelf: 'center',

        marginBottom: 20,

    },

    plusText: {

        color: 'white',

        fontSize: 28,

        fontWeight: 'bold',

    },

});