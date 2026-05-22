import { useEffect, useState } from "react";

import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function DashboardScreen({ navigation }) {
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  const [todayCredit, setTodayCredit] = useState(0);

  const [todayDebit, setTodayDebit] = useState(0);

  const [currentBalance, setCurrentBalance] = useState(0);

  const [incomeHistory, setIncomeHistory] = useState([]);

  const [showIncome, setShowIncome] = useState(true);

  const [banks, setBanks] = useState([]);

  const [selectedBank, setSelectedBank] = useState(null);

  const [showBankList, setShowBankList] = useState(false);

  const [showBankModal, setShowBankModal] = useState(false);

  const [bankName, setBankName] = useState("");

  const [bankAmount, setBankAmount] = useState("");

  const loadBanks = async () => {
    const savedBanks = JSON.parse(await AsyncStorage.getItem("banks")) || [];

    const activeBank = JSON.parse(await AsyncStorage.getItem("selectedBank"));

    setBanks(savedBanks);

    if (activeBank) {
      setSelectedBank(activeBank);

      setCurrentBalance(activeBank.balance);
    }
  };

  const saveBank = async () => {
    if (!bankName || !bankAmount) {
      Alert.alert("Fill all fields");

      return;
    }

    const newBank = {
      id: Date.now(),

      name: bankName,

      balance: Number(bankAmount),
    };

    const updatedBanks = [...banks, newBank];

    setBanks(updatedBanks);

    await AsyncStorage.setItem(
      "banks",

      JSON.stringify(updatedBanks),
    );

    if (!selectedBank) {
      setSelectedBank(newBank);

      await AsyncStorage.setItem(
        "selectedBank",

        JSON.stringify(newBank),
      );
    }

    setBankName("");

    setBankAmount("");

    setShowBankModal(false);
  };

  const selectBank = async (bank) => {
    setSelectedBank(bank);

    setCurrentBalance(bank.balance);

    setShowBankList(false);

    await AsyncStorage.setItem(
      "selectedBank",

      JSON.stringify(bank),
    );
  };
  // REPLACE ONLY loadData FUNCTION
  // inside DashboardScreen.js

  const loadData = async () => {
    try {
      const currentDate = new Date();

      const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");

      const currentYear = currentDate.getFullYear().toString();

      const today = currentDate.toISOString().split("T")[0];

      // RESET VALUES

      let todayCreditAmount = 0;

      let todayDebitAmount = 0;

      let totalIncome = 0;

      // LOAD INCOME

      const incomes =
        JSON.parse(await AsyncStorage.getItem("incomeHistory")) || [];

      // LOAD TRANSACTIONS

      const transactions =
        JSON.parse(await AsyncStorage.getItem("transactions")) || [];

      // FILTER ACTIVE BANK INCOME

      const filteredIncome = incomes.filter((item) => {
        const splitDate = item.date.split("-");

        return (
          splitDate[0] === currentYear &&
          splitDate[1] === currentMonth &&
          item.bankName === selectedBank?.name
        );
      });

      setIncomeHistory(filteredIncome);

      // TOTAL MONTHLY INCOME

      filteredIncome.forEach((item) => {
        totalIncome += Number(item.amount);
      });

      setMonthlyIncome(totalIncome);

      // TRANSACTION LOOP

      transactions.forEach((item) => {
        const splitDate = item.date.split("-");

        const itemYear = splitDate[0];

        const itemMonth = splitDate[1];

        // FILTER ACTIVE BANK

        if (
          item.bankName === selectedBank?.name &&
          itemYear === currentYear &&
          itemMonth === currentMonth
        ) {
          // TODAY ONLY

          if (item.date === today) {
            if (item.type === "credited") {
              todayCreditAmount += Number(item.amount);
            }

            if (item.type === "debited") {
              todayDebitAmount += Number(item.amount);
            }
          }
        }
      });

      // FINAL VALUES

      setTodayCredit(todayCreditAmount);

      setTodayDebit(todayDebitAmount);

      // ACTIVE BANK BALANCE

      if (selectedBank) {
        setCurrentBalance(selectedBank.balance);
      } else {
        setCurrentBalance(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadBanks();

      loadData();
    });

    return unsubscribe;
  }, [selectedBank]);

  const clearAllData = async () => {
    Alert.alert(
      "Clear",

      "Delete all data?",

      [
        {
          text: "Cancel",
        },

        {
          text: "Clear",

          onPress: async () => {
            await AsyncStorage.removeItem("transactions");

            await AsyncStorage.removeItem("incomeHistory");

            loadData();
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Money Manager</Text>

          <Text style={styles.date}>{new Date().toDateString()}</Text>

          <Text style={styles.by}>By Adityaraj Patil</Text>

          <View style={styles.bankRow}>
            <TouchableOpacity
              style={styles.bankSelector}
              onPress={() => setShowBankList(!showBankList)}
            >
              <Ionicons name="card" size={16} color="#3b82f6" />

              <Text style={styles.bankText}>{selectedBank?.name}</Text>

              <Ionicons name="chevron-down" size={16} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addBankBtn}
              onPress={() => setShowBankModal(true)}
            >
              <Ionicons name="add" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.clearBtn} onPress={clearAllData}>
          <Ionicons name="trash" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {showBankList && (
        <View style={styles.dropdown}>
          {banks.map((bank) => (
            <TouchableOpacity
              key={bank.id}
              style={styles.bankItem}
              onPress={() => selectBank(bank)}
            >
              <View>
                <Text style={styles.bankName}>{bank.name}</Text>

                <Text style={styles.bankBal}>₹{bank.balance}</Text>
              </View>

              {selectedBank?.id === bank.id && (
                <Ionicons name="checkmark-circle" size={20} color="#2563eb" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>{selectedBank?.name} Balance</Text>

        <Text style={styles.balance}>₹ {currentBalance}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text style={styles.cardTitle}>Today Credited</Text>

          <Text style={styles.green}>₹ {todayCredit}</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.cardTitle}>Today Debited</Text>

          <Text style={styles.red}>₹ {todayDebit}</Text>
        </View>
      </View>

      <View style={styles.incomeCard}>
        <View style={styles.incomeHeader}>
          <Text style={styles.cardTitle}>Current Month Income</Text>

          <TouchableOpacity onPress={() => setShowIncome(!showIncome)}>
            <Ionicons
              name={showIncome ? "eye" : "eye-off"}
              size={22}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.green}>
          {showIncome ? `₹ ${monthlyIncome}` : "₹ •••••"}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.incomeBtn}
          onPress={() => navigation.navigate("AddIncome")}
        >
          <Ionicons name="wallet" size={24} color="white" />

          <Text style={styles.btnText}>Add Income</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.transBtn}
          onPress={() => navigation.navigate("AddTransaction")}
        >
          <Ionicons name="add-circle" size={24} color="white" />

          <Text style={styles.btnText}>Transaction</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showBankModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Bank</Text>

            <TextInput
              placeholder="Bank Name"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              value={bankName}
              onChangeText={setBankName}
            />

            <TextInput
              placeholder="Amount"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              style={styles.input}
              value={bankAmount}
              onChangeText={setBankAmount}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={saveBank}>
              <Text style={styles.saveText}>Save Bank</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View
        style={{
          height: 120,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#020617",

    padding: 18,
  },

  header: {
    marginTop: 50,

    flexDirection: "row",

    justifyContent: "space-between",
  },

  heading: {
    color: "white",

    fontSize: 32,

    fontWeight: "bold",
  },

  date: {
    color: "#cbd5e1",

    marginTop: 5,
  },

  by: {
    color: "#64748b",

    marginTop: 4,
  },

  bankRow: {
    flexDirection: "row",

    marginTop: 16,
  },

  bankSelector: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#111827",

    padding: 12,

    borderRadius: 16,
  },

  bankText: {
    color: "white",

    marginHorizontal: 10,
  },

  addBankBtn: {
    width: 44,

    height: 44,

    backgroundColor: "#2563eb",

    borderRadius: 14,

    justifyContent: "center",

    alignItems: "center",

    marginLeft: 12,
  },

  clearBtn: {
    width: 45,

    height: 45,

    borderRadius: 14,

    backgroundColor: "#dc2626",

    justifyContent: "center",

    alignItems: "center",
  },

  dropdown: {
    backgroundColor: "#111827",

    borderRadius: 22,

    marginTop: 20,

    padding: 16,
  },

  bankItem: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 12,
  },

  bankName: {
    color: "white",

    fontWeight: "bold",
  },

  bankBal: {
    color: "#94a3b8",

    marginTop: 4,
  },

  balanceCard: {
    backgroundColor: "#0f172a",

    padding: 28,

    borderRadius: 28,

    marginTop: 24,
  },

  balanceTitle: {
    color: "#94a3b8",
  },

  balance: {
    color: "white",

    fontSize: 40,

    fontWeight: "bold",

    marginTop: 10,
  },

  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 20,
  },

  smallCard: {
    width: "48%",

    backgroundColor: "#111827",

    padding: 20,

    borderRadius: 22,
  },

  cardTitle: {
    color: "#94a3b8",
  },

  green: {
    color: "#22c55e",

    fontSize: 28,

    fontWeight: "bold",

    marginTop: 10,
  },

  red: {
    color: "#ef4444",

    fontSize: 28,

    fontWeight: "bold",

    marginTop: 10,
  },

  incomeCard: {
    backgroundColor: "#111827",

    borderRadius: 24,

    padding: 24,

    marginTop: 20,
  },

  incomeHeader: {
    flexDirection: "row",

    justifyContent: "space-between",
  },

  buttonRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 24,
  },

  incomeBtn: {
    backgroundColor: "#16a34a",

    width: "48%",

    padding: 20,

    borderRadius: 24,

    alignItems: "center",
  },

  transBtn: {
    backgroundColor: "#2563eb",

    width: "48%",

    padding: 20,

    borderRadius: 24,

    alignItems: "center",
  },

  btnText: {
    color: "white",

    marginTop: 8,

    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.6)",

    justifyContent: "center",

    alignItems: "center",
  },

  modalBox: {
    width: "88%",

    backgroundColor: "#111827",

    borderRadius: 30,

    padding: 24,
  },

  modalTitle: {
    color: "white",

    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 20,
  },

  input: {
    backgroundColor: "#1e293b",

    borderRadius: 18,

    padding: 16,

    color: "white",

    marginBottom: 16,
  },

  saveBtn: {
    backgroundColor: "#2563eb",

    padding: 18,

    borderRadius: 18,

    alignItems: "center",
  },

  saveText: {
    color: "white",

    fontWeight: "bold",
  },
});
