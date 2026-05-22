// screens/HistoryScreen.js

import { useEffect, useState } from "react";

import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState([]);

  const [banks, setBanks] = useState([]);

  const [selectedBank, setSelectedBank] = useState("All");

  const [showBankList, setShowBankList] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedBank]);

  const loadData = async () => {
    const incomeHistory =
      JSON.parse(await AsyncStorage.getItem("incomeHistory")) || [];

    const transactionHistory =
      JSON.parse(await AsyncStorage.getItem("transactions")) || [];

    const savedBanks = JSON.parse(await AsyncStorage.getItem("banks")) || [];

    setBanks(savedBanks);

    const allData = [...incomeHistory, ...transactionHistory];

    // SORT LATEST FIRST

    allData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // FILTER

    let filtered = allData;

    if (selectedBank !== "All") {
      filtered = allData.filter((item) => item.bankName === selectedBank);
    }

    setTransactions(filtered);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Transaction History</Text>

          <Text style={styles.subtitle}>Track all bank activities</Text>
        </View>

        {/* REFRESH BUTTON */}

        <TouchableOpacity style={styles.refreshBtn} onPress={loadData}>
          <Ionicons name="refresh" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* BANK SELECTOR */}

      <TouchableOpacity
        style={styles.bankSelector}
        onPress={() => setShowBankList(!showBankList)}
      >
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <Ionicons name="card" size={18} color="#3b82f6" />

          <Text style={styles.bankText}>{selectedBank}</Text>
        </View>

        <Ionicons name="chevron-down" size={18} color="white" />
      </TouchableOpacity>

      {/* DROPDOWN */}

      {showBankList && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.bankItem}
            onPress={() => {
              setSelectedBank("All");

              setShowBankList(false);
            }}
          >
            <Text style={styles.bankItemText}>All Banks</Text>
          </TouchableOpacity>

          {banks.map((bank) => (
            <TouchableOpacity
              key={bank.id}
              style={styles.bankItem}
              onPress={() => {
                setSelectedBank(bank.name);

                setShowBankList(false);
              }}
            >
              <Text style={styles.bankItemText}>{bank.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* HISTORY */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {transactions.length === 0 && (
          <View style={styles.emptyBox}>
            <Ionicons name="document-text" size={55} color="#475569" />

            <Text style={styles.emptyText}>No Transactions</Text>
          </View>
        )}

        {transactions.map((item, index) => (
          <View key={index} style={styles.card}>
            {/* TOP */}

            <View style={styles.topRow}>
              <View
                style={{
                  flex: 1,
                }}
              >
                {/* TITLE */}

                <View style={styles.titleBox}>
                  <Ionicons name="receipt" size={15} color="#f8fafc" />

                  <Text style={styles.transactionTitle}>
                    {item.title
                      ? item.title
                      : item.mode
                        ? item.mode
                        : item.type === "income"
                          ? "Income Added"
                          : "Transaction"}
                  </Text>
                </View>

                {/* AMOUNT */}

                <Text style={styles.mainAmount}>₹{item.amount}</Text>

                {/* DATE */}

                <Text style={styles.date}>{item.date}</Text>
              </View>

              {/* TYPE */}

              <View
                style={[
                  styles.typeBadge,

                  item.type === "debited" && {
                    backgroundColor: "#7f1d1d",
                  },

                  item.type === "credited" && {
                    backgroundColor: "#14532d",
                  },

                  item.type === "income" && {
                    backgroundColor: "#1e3a8a",
                  },
                ]}
              >
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
            </View>

            {/* BANK */}

            <View style={styles.infoRow}>
              <Ionicons name="business" size={15} color="#94a3b8" />

              <Text style={styles.infoText}>{item.bankName}</Text>
            </View>

            {/* BEFORE */}

            <View style={styles.infoRow}>
              <Ionicons name="arrow-back" size={15} color="#94a3b8" />

              <Text style={styles.infoText}>Before: ₹{item.beforeBalance}</Text>
            </View>

            {/* AFTER */}

            <View style={styles.infoRow}>
              <Ionicons name="arrow-forward" size={15} color="#94a3b8" />

              <Text style={styles.infoText}>After: ₹{item.afterBalance}</Text>
            </View>
          </View>
        ))}

        <View
          style={{
            height: 100,
          }}
        />
      </ScrollView>
    </View>
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

    marginBottom: 20,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  title: {
    color: "white",

    fontSize: 30,

    fontWeight: "bold",
  },

  subtitle: {
    color: "#64748b",

    marginTop: 4,
  },

  refreshBtn: {
    width: 48,

    height: 48,

    borderRadius: 24,

    backgroundColor: "#2563eb",

    justifyContent: "center",

    alignItems: "center",
  },

  bankSelector: {
    backgroundColor: "#111827",

    padding: 16,

    borderRadius: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 20,
  },

  bankText: {
    color: "white",

    marginLeft: 10,

    fontWeight: "600",

    fontSize: 15,
  },

  dropdown: {
    backgroundColor: "#111827",

    borderRadius: 20,

    padding: 10,

    marginBottom: 20,
  },

  bankItem: {
    padding: 14,

    borderBottomWidth: 1,

    borderBottomColor: "#1e293b",
  },

  bankItemText: {
    color: "white",

    fontSize: 15,
  },

  card: {
    backgroundColor: "#111827",

    borderRadius: 26,

    padding: 20,

    marginBottom: 18,

    borderWidth: 1,

    borderColor: "#1e293b",
  },

  topRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",

    marginBottom: 14,
  },

  titleBox: {
    backgroundColor: "#1e293b",

    paddingHorizontal: 12,

    paddingVertical: 8,

    borderRadius: 16,

    flexDirection: "row",

    alignItems: "center",

    alignSelf: "flex-start",

    marginBottom: 12,
  },

  transactionTitle: {
    color: "white",

    fontSize: 14,

    marginLeft: 8,

    fontWeight: "700",
  },

  mainAmount: {
    color: "white",

    fontSize: 30,

    fontWeight: "bold",
  },

  date: {
    color: "#94a3b8",

    marginTop: 6,

    fontSize: 12,
  },

  typeBadge: {
    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 20,
  },

  typeText: {
    color: "white",

    fontWeight: "bold",

    textTransform: "capitalize",
  },

  infoRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 12,
  },

  infoText: {
    color: "#cbd5e1",

    marginLeft: 10,

    fontSize: 14,
  },

  emptyBox: {
    marginTop: 120,

    alignItems: "center",
  },

  emptyText: {
    color: "#64748b",

    marginTop: 14,

    fontSize: 16,
  },
});
