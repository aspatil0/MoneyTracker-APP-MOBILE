import { useState } from "react";

import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function SipScreen() {
  const [amount, setAmount] = useState("");

  const [years, setYears] = useState("");

  const [rate, setRate] = useState("12");

  const [topup, setTopup] = useState("");

  const [result, setResult] = useState(null);

  const calculateSIP = () => {
    const P = Number(amount);

    const annualRate = Number(rate);

    const Y = Number(years);

    const topupAmount = Number(topup || 0);

    const monthlyRate = annualRate / 12 / 100;

    const months = Y * 12;

    let futureValue = 0;

    let totalInvested = 0;

    let yearlyGrowth = [];

    let currentSIP = P;

    for (let i = 1; i <= months; i++) {
      futureValue = (futureValue + currentSIP) * (1 + monthlyRate);

      totalInvested += currentSIP;

      if (i % 12 === 0) {
        yearlyGrowth.push({
          year: i / 12,

          amount: Math.round(futureValue),
        });

        currentSIP += topupAmount;
      }
    }

    setResult({
      invested: Math.round(totalInvested),

      returns: Math.round(futureValue - totalInvested),

      total: Math.round(futureValue),

      growth: yearlyGrowth,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>SIP Calculator</Text>

      <Text style={styles.sub}>Build wealth slowly with discipline</Text>

      {/* AMOUNT */}

      <View style={styles.labelRow}>
        <Text style={styles.label}>Monthly SIP Amount</Text>

        <Ionicons name="information-circle" size={20} color="#3b82f6" />
      </View>

      <TextInput
        placeholder="Minimum ₹100"
        placeholderTextColor="#64748b"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />

      {/* YEARS */}

      <View style={styles.labelRow}>
        <Text style={styles.label}>Investment Years</Text>

        <Ionicons name="information-circle" size={20} color="#3b82f6" />
      </View>

      <TextInput
        placeholder="Years"
        placeholderTextColor="#64748b"
        keyboardType="numeric"
        style={styles.input}
        value={years}
        onChangeText={setYears}
      />

      {/* RATE */}

      <View style={styles.labelRow}>
        <Text style={styles.label}>Expected Return %</Text>

        <Ionicons name="information-circle" size={20} color="#3b82f6" />
      </View>

      <TextInput
        placeholder="12"
        placeholderTextColor="#64748b"
        keyboardType="numeric"
        style={styles.input}
        value={rate}
        onChangeText={setRate}
      />

      {/* TOPUP */}

      <View style={styles.labelRow}>
        <Text style={styles.label}>Yearly Topup</Text>

        <Ionicons name="information-circle" size={20} color="#3b82f6" />
      </View>

      <TextInput
        placeholder="Optional"
        placeholderTextColor="#64748b"
        keyboardType="numeric"
        style={styles.input}
        value={topup}
        onChangeText={setTopup}
      />

      {/* BUTTON */}

      <TouchableOpacity style={styles.button} onPress={calculateSIP}>
        <Text style={styles.buttonText}>Calculate SIP</Text>
      </TouchableOpacity>

      {/* RESULT */}

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Your Wealth Growth</Text>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Total Invested</Text>

            <Text style={styles.resultValue}>₹{result.invested}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Wealth Gained</Text>

            <Text style={styles.green}>₹{result.returns}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Final Amount</Text>

            <Text style={styles.blue}>₹{result.total}</Text>
          </View>

          <Text style={styles.growthTitle}>Year Wise Growth</Text>

          {result.growth.map((item, index) => (
            <View key={index} style={styles.yearRow}>
              <Text style={styles.yearText}>Year {item.year}</Text>

              <Text style={styles.yearAmount}>₹{item.amount}</Text>
            </View>
          ))}
        </View>
      )}

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

    padding: 20,
  },

  heading: {
    color: "white",

    fontSize: 34,

    fontWeight: "bold",

    marginTop: 60,
  },

  sub: {
    color: "#64748b",

    marginBottom: 30,

    marginTop: 8,
  },

  labelRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 8,
  },

  label: {
    color: "white",

    fontSize: 15,

    fontWeight: "600",
  },

  input: {
    backgroundColor: "#111827",

    borderRadius: 18,

    padding: 16,

    color: "white",

    marginBottom: 20,

    fontSize: 16,
  },

  button: {
    backgroundColor: "#2563eb",

    padding: 18,

    borderRadius: 20,

    alignItems: "center",

    marginTop: 10,
  },

  buttonText: {
    color: "white",

    fontWeight: "bold",

    fontSize: 16,
  },

  resultCard: {
    backgroundColor: "#111827",

    borderRadius: 30,

    padding: 24,

    marginTop: 30,
  },

  resultTitle: {
    color: "white",

    fontSize: 24,

    fontWeight: "bold",

    marginBottom: 25,
  },

  resultRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 18,
  },

  resultLabel: {
    color: "#94a3b8",

    fontSize: 15,
  },

  resultValue: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },

  green: {
    color: "#22c55e",

    fontSize: 18,

    fontWeight: "bold",
  },

  blue: {
    color: "#3b82f6",

    fontSize: 18,

    fontWeight: "bold",
  },

  growthTitle: {
    color: "white",

    fontSize: 20,

    fontWeight: "bold",

    marginTop: 25,

    marginBottom: 20,
  },

  yearRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    backgroundColor: "#1e293b",

    padding: 14,

    borderRadius: 16,

    marginBottom: 12,
  },

  yearText: {
    color: "white",
  },

  yearAmount: {
    color: "#22c55e",

    fontWeight: "bold",
  },
});
