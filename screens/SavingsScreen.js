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

export default function SavingsScreen() {
  const [banks, setBanks] = useState([]);

  const [selectedBank, setSelectedBank] = useState("All");

  const [showBankList, setShowBankList] = useState(false);

  const [totalBalance, setTotalBalance] = useState(0);

  const [totalIncome, setTotalIncome] = useState(0);

  const [totalCredit, setTotalCredit] = useState(0);

  const [totalDebit, setTotalDebit] = useState(0);

  const [monthlySaving, setMonthlySaving] = useState(0);

  const [savingPercent, setSavingPercent] = useState(0);

  const [yearlyData, setYearlyData] = useState([]);

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

    const currentDate = new Date();

    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");

    const currentYear = currentDate.getFullYear().toString();

    // FILTER DATA

    let filteredIncome = incomeHistory;

    let filteredTransactions = transactionHistory;

    if (selectedBank !== "All") {
      filteredIncome = incomeHistory.filter(
        (item) => item.bankName === selectedBank,
      );

      filteredTransactions = transactionHistory.filter(
        (item) => item.bankName === selectedBank,
      );
    }

    // TOTAL BALANCE

    let bankBalance = 0;

    if (selectedBank === "All") {
      savedBanks.forEach((bank) => {
        bankBalance += Number(bank.balance);
      });
    } else {
      const active = savedBanks.find((b) => b.name === selectedBank);

      bankBalance = active?.balance || 0;
    }

    setTotalBalance(bankBalance);

    // TOTAL INCOME

    let income = 0;

    filteredIncome.forEach((item) => {
      const split = item.date.split("-");

      if (split[0] === currentYear && split[1] === currentMonth) {
        income += Number(item.amount);
      }
    });

    setTotalIncome(income);

    // CREDIT / DEBIT

    let credit = 0;

    let debit = 0;

    filteredTransactions.forEach((item) => {
      const split = item.date.split("-");

      if (split[0] === currentYear && split[1] === currentMonth) {
        if (item.type === "credited") {
          credit += Number(item.amount);
        }

        if (item.type === "debited") {
          debit += Number(item.amount);
        }
      }
    });

    setTotalCredit(credit);

    setTotalDebit(debit);

    // SAVING

    // const saving = income + credit - debit;
    const saving = bankBalance;

    setMonthlySaving(saving);

    setMonthlySaving(saving);

    // PERCENTAGE

    // const totalFlow = income + credit;

    // if (totalFlow > 0) {
    //   const percent = ((saving / totalFlow) * 100).toFixed(1);

    //   setSavingPercent(percent);
    // } else {
    //   setSavingPercent(0);
    // }
    let totalFlow = income + credit;

    if (totalFlow <= 0) {
      totalFlow = bankBalance;
    }

    if (totalFlow > 0) {
      const percent = ((bankBalance / totalFlow) * 100).toFixed(1);

      setSavingPercent(percent);
    } else {
      setSavingPercent(0);
    }

    // YEARLY DATA

    //     const months = [
    //       "Jan",
    //       "Feb",
    //       "Mar",
    //       "Apr",
    //       "May",
    //       "Jun",
    //       "Jul",
    //       "Aug",
    //       "Sep",
    //       "Oct",
    //       "Nov",
    //       "Dec",
    //     ];

    //     const chartData = [];

    //     for (let i = 1; i <= 12; i++) {
    //       let monthSaving = 0;

    //       filteredIncome.forEach((item) => {
    //         const split = item.date.split("-");

    //         if (Number(split[1]) === i) {
    //           monthSaving += Number(item.amount);
    //         }
    //       });

    //       filteredTransactions.forEach((item) => {
    //         const split = item.date.split("-");

    //         if (Number(split[1]) === i) {
    //           if (item.type === "credited") {
    //             monthSaving += Number(item.amount);
    //           }

    //           if (item.type === "debited") {
    //             monthSaving -= Number(item.amount);
    //           }
    //         }
    //       });

    //       chartData.push({
    //         month: months[i - 1],

    //         amount: monthSaving,
    //       });
    //     }

    //     setYearlyData(chartData);
    //   };
    // YEARLY DATA

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const chartData = [];

    for (let i = 1; i <= 12; i++) {
      let monthSaving = 0;

      // ADD INCOME

      filteredIncome.forEach((item) => {
        const split = item.date.split("-");

        if (Number(split[1]) === i) {
          monthSaving += Number(item.amount);
        }
      });

      // ADD TRANSACTIONS

      filteredTransactions.forEach((item) => {
        const split = item.date.split("-");

        if (Number(split[1]) === i) {
          if (item.type === "credited") {
            monthSaving += Number(item.amount);
          }

          if (item.type === "debited") {
            monthSaving -= Number(item.amount);
          }
        }
      });

      // CURRENT MONTH SHOW BANK BALANCE

      if (i === currentDate.getMonth() + 1) {
        if (monthSaving <= 0) {
          monthSaving = bankBalance;
        }
      }

      chartData.push({
        month: months[i - 1],

        amount: monthSaving,
      });
    }

    setYearlyData(chartData);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Savings Analysis</Text>

          <Text style={styles.subtitle}>Smart finance overview</Text>
        </View>

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

      {/* TOTAL BALANCE */}

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>

        <Text style={styles.balanceAmount}>₹ {totalBalance}</Text>
      </View>

      {/* ANALYSIS */}

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Income</Text>

          <Text style={styles.green}>₹ {totalIncome}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Credited</Text>

          <Text style={styles.blue}>₹ {totalCredit}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Debited</Text>

          <Text style={styles.red}>₹ {totalDebit}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Saving %</Text>

          <Text style={styles.yellow}>{savingPercent}%</Text>
        </View>
      </View>

      {/* MONTH SAVING */}

      <View style={styles.savingCard}>
        <Text style={styles.savingTitle}>This Month Saving</Text>

        <Text style={styles.savingAmount}>₹ {monthlySaving}</Text>
      </View>

      {/* YEARLY CHART */}

      <Text style={styles.chartTitle}>Yearly Savings</Text>

      {yearlyData.map((item, index) => (
        <View key={index} style={styles.chartRow}>
          <Text style={styles.month}>{item.month}</Text>

          <View style={styles.chartBarContainer}>
            <View
              style={[
                styles.chartBar,

                {
                  width: `${Math.min(Math.abs(item.amount) / 100, 100)}%`,
                },
              ]}
            />
          </View>

          <Text style={styles.chartAmount}>₹{item.amount}</Text>
        </View>
      ))}

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

  balanceCard: {
    backgroundColor: "#111827",

    padding: 30,

    borderRadius: 28,

    marginBottom: 20,
  },

  balanceLabel: {
    color: "#94a3b8",

    fontSize: 14,
  },

  balanceAmount: {
    color: "white",

    fontSize: 38,

    fontWeight: "bold",

    marginTop: 10,
  },

  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 18,
  },

  card: {
    width: "48%",

    backgroundColor: "#111827",

    borderRadius: 24,

    padding: 20,
  },

  cardTitle: {
    color: "#94a3b8",

    marginBottom: 10,
  },

  green: {
    color: "#22c55e",

    fontSize: 24,

    fontWeight: "bold",
  },

  blue: {
    color: "#3b82f6",

    fontSize: 24,

    fontWeight: "bold",
  },

  red: {
    color: "#ef4444",

    fontSize: 24,

    fontWeight: "bold",
  },

  yellow: {
    color: "#facc15",

    fontSize: 24,

    fontWeight: "bold",
  },

  savingCard: {
    backgroundColor: "#111827",

    padding: 28,

    borderRadius: 28,

    marginBottom: 24,
  },

  savingTitle: {
    color: "#94a3b8",

    fontSize: 14,
  },

  savingAmount: {
    color: "#22c55e",

    fontSize: 38,

    fontWeight: "bold",

    marginTop: 12,
  },

  chartTitle: {
    color: "white",

    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 20,
  },

  chartRow: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 16,
  },

  month: {
    color: "white",

    width: 40,
  },

  chartBarContainer: {
    flex: 1,

    height: 12,

    backgroundColor: "#1e293b",

    borderRadius: 10,

    overflow: "hidden",

    marginHorizontal: 12,
  },

  chartBar: {
    height: 12,

    backgroundColor: "#22c55e",

    borderRadius: 10,
  },

  chartAmount: {
    color: "white",

    width: 80,

    textAlign: "right",

    fontSize: 12,
  },
});
