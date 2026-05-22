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

export default function AddIncomeScreen({ navigation }) {
  const [amount, setAmount] = useState("");

  const [mode, setMode] = useState("");

  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
    loadBank();
  }, []);

  const loadBank = async () => {
    const bank = JSON.parse(await AsyncStorage.getItem("selectedBank"));

    setSelectedBank(bank);
  };

  const addIncome = async () => {
    if (!amount || !mode) {
      Alert.alert("Fill all fields");

      return;
    }

    const incomeAmount = Number(amount);

    const banks = JSON.parse(await AsyncStorage.getItem("banks")) || [];

    const updatedBanks = banks.map((bank) => {
      if (bank.id === selectedBank.id) {
        return {
          ...bank,

          balance: bank.balance + incomeAmount,
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

    const oldIncome =
      JSON.parse(await AsyncStorage.getItem("incomeHistory")) || [];

    const newIncome = {
      amount: incomeAmount,

      mode,

      type: "income",

      bankName: selectedBank.name,

      beforeBalance: selectedBank.balance,

      afterBalance: updatedSelected.balance,

      date: new Date().toISOString().split("T")[0],
    };

    oldIncome.push(newIncome);

    await AsyncStorage.setItem(
      "incomeHistory",

      JSON.stringify(oldIncome),
    );

    Alert.alert("Success", "Income Added");

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Income</Text>

      <Text style={styles.bank}>Active Bank: {selectedBank?.name}</Text>

      <TextInput
        placeholder="Amount"
        placeholderTextColor="#94a3b8"
        keyboardType="numeric"
        style={styles.input}
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

      <TouchableOpacity style={styles.button} onPress={addIncome}>
        <Text style={styles.btnText}>Save Income</Text>
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

  button: {
    backgroundColor: "#16a34a",

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
