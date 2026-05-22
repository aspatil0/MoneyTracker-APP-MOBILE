import { useEffect, useState } from "react";

import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddTransactionScreen({ navigation }) {
  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [type, setType] = useState("debited");

  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
    loadBank();
  }, []);

  const loadBank = async () => {
    const bank = JSON.parse(await AsyncStorage.getItem("selectedBank"));

    setSelectedBank(bank);
  };

  const saveTransaction = async () => {
    if (!title || !amount) {
      Alert.alert("Fill all fields");

      return;
    }

    const transactionAmount = Number(amount);

    const banks = JSON.parse(await AsyncStorage.getItem("banks")) || [];

    const updatedBanks = banks.map((bank) => {
      if (bank.id === selectedBank.id) {
        let updatedBalance = bank.balance;

        if (type === "credited") {
          updatedBalance += transactionAmount;
        } else {
          updatedBalance -= transactionAmount;
        }

        return {
          ...bank,

          balance: updatedBalance,
        };
      }

      return bank;
    });

    const updatedSelected = updatedBanks.find((b) => b.id === selectedBank.id);

    await AsyncStorage.setItem(
      "banks",

      JSON.stringify(updatedBanks),
    );

    await AsyncStorage.setItem(
      "selectedBank",

      JSON.stringify(updatedSelected),
    );

    const oldTransactions =
      JSON.parse(await AsyncStorage.getItem("transactions")) || [];

    const transaction = {
      title,

      amount: transactionAmount,

      type,

      bankName: selectedBank.name,

      beforeBalance: selectedBank.balance,

      afterBalance: updatedSelected.balance,

      date: new Date().toISOString().split("T")[0],
    };

    oldTransactions.push(transaction);

    await AsyncStorage.setItem(
      "transactions",

      JSON.stringify(oldTransactions),
    );

    Alert.alert("Success", "Transaction Added");

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Transaction</Text>

      <Text style={styles.bank}>Active Bank: {selectedBank?.name}</Text>

      <TextInput
        placeholder="Title"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Amount"
        placeholderTextColor="#94a3b8"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />

      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[
            styles.typeBtn,

            type === "credited" && {
              backgroundColor: "#16a34a",
            },
          ]}
          onPress={() => setType("credited")}
        >
          <Text style={styles.typeText}>Credited</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeBtn,

            type === "debited" && {
              backgroundColor: "#dc2626",
            },
          ]}
          onPress={() => setType("debited")}
        >
          <Text style={styles.typeText}>Debited</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={saveTransaction}>
        <Text style={styles.btnText}>Save Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#020617",

    padding: 20,

    justifyContent: "center",
  },

  title: {
    color: "white",

    fontSize: 30,

    fontWeight: "bold",

    marginBottom: 12,
  },

  bank: {
    color: "#3b82f6",

    marginBottom: 25,

    fontSize: 15,
  },

  input: {
    backgroundColor: "#111827",

    borderRadius: 18,

    padding: 16,

    color: "white",

    marginBottom: 16,
  },

  typeRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 20,
  },

  typeBtn: {
    width: "48%",

    backgroundColor: "#1e293b",

    padding: 18,

    borderRadius: 16,

    alignItems: "center",
  },

  typeText: {
    color: "white",

    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#2563eb",

    padding: 18,

    borderRadius: 18,

    alignItems: "center",
  },

  btnText: {
    color: "white",

    fontWeight: "bold",

    fontSize: 16,
  },
});
