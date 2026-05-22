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

export default function FdScreen() {
  const [amount, setAmount] = useState("");

  const [years, setYears] = useState("");

  const [rate, setRate] = useState("7");

  const [result, setResult] = useState(null);

  const banks = [
    {
      name: "SBI",

      rate: "6.50%",
    },

    {
      name: "HDFC",

      rate: "7.00%",
    },

    {
      name: "ICICI",

      rate: "7.10%",
    },

    {
      name: "Axis",

      rate: "7.20%",
    },

    {
      name: "Kotak",

      rate: "6.70%",
    },

    {
      name: "IDFC First",

      rate: "7.25%",
    },

    {
      name: "BOB",

      rate: "6.50%",
    },
  ];

  const calculateFD = () => {
    const P = Number(amount);

    const R = Number(rate);

    const T = Number(years);

    const maturity = P * Math.pow(1 + R / 100, T);

    const interest = maturity - P;

    const yearly = interest / T;

    const monthly = yearly / 12;

    const daily = yearly / 365;

    setResult({
      maturity: Math.round(maturity),

      interest: Math.round(interest),

      yearly: Math.round(yearly),

      monthly: Math.round(monthly),

      daily: Math.round(daily),
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>FD Calculator</Text>

      <Text style={styles.sub}>Safe fixed deposit investment planner</Text>

      {/* BANK SUGGESTIONS */}

      <Text style={styles.sectionTitle}>Popular FD Rates</Text>

      {banks.map((item, index) => (
        <View key={index} style={styles.bankCard}>
          <View>
            <Text style={styles.bankName}>{item.name}</Text>

            <Text style={styles.bankSub}>Fixed Deposit</Text>
          </View>

          <Text style={styles.bankRate}>{item.rate}</Text>
        </View>
      ))}

      {/* AMOUNT */}

      <View style={styles.labelRow}>
        <Text style={styles.label}>FD Amount</Text>

        <Ionicons name="information-circle" size={20} color="#3b82f6" />
      </View>

      <TextInput
        placeholder="Minimum ₹100000"
        placeholderTextColor="#64748b"
        keyboardType="numeric"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
      />

      {/* YEARS */}

      <View style={styles.labelRow}>
        <Text style={styles.label}>FD Years</Text>

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
        <Text style={styles.label}>Interest Rate %</Text>

        <Ionicons name="information-circle" size={20} color="#3b82f6" />
      </View>

      <TextInput
        placeholder="7"
        placeholderTextColor="#64748b"
        keyboardType="numeric"
        style={styles.input}
        value={rate}
        onChangeText={setRate}
      />

      {/* BUTTON */}

      <TouchableOpacity style={styles.button} onPress={calculateFD}>
        <Text style={styles.buttonText}>Calculate FD</Text>
      </TouchableOpacity>

      {/* RESULT */}

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>FD Growth Analysis</Text>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Maturity Amount</Text>

            <Text style={styles.blue}>₹{result.maturity}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Total Interest</Text>

            <Text style={styles.green}>₹{result.interest}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Yearly Return</Text>

            <Text style={styles.resultValue}>₹{result.yearly}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Monthly Return</Text>

            <Text style={styles.resultValue}>₹{result.monthly}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Daily Return</Text>

            <Text style={styles.resultValue}>₹{result.daily}</Text>
          </View>
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

    marginTop: 8,

    marginBottom: 30,
  },

  sectionTitle: {
    color: "white",

    fontSize: 22,

    fontWeight: "bold",

    marginBottom: 18,
  },

  bankCard: {
    backgroundColor: "#111827",

    borderRadius: 22,

    padding: 18,

    marginBottom: 14,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  bankName: {
    color: "white",

    fontSize: 18,

    fontWeight: "bold",
  },

  bankSub: {
    color: "#64748b",

    marginTop: 4,
  },

  bankRate: {
    color: "#22c55e",

    fontSize: 20,

    fontWeight: "bold",
  },

  labelRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 8,

    marginTop: 18,
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

    fontSize: 16,
  },

  button: {
    backgroundColor: "#16a34a",

    padding: 18,

    borderRadius: 22,

    alignItems: "center",

    marginTop: 30,
  },

  buttonText: {
    color: "white",

    fontSize: 16,

    fontWeight: "bold",
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

    marginBottom: 24,
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
});
