
import { StyleSheet, Text, View } from "react-native";

export default function SwpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SWP Calculator</Text>

      <Text style={styles.sub}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#020617",
  },

  title: {
    color: "white",

    fontSize: 32,

    fontWeight: "bold",
  },

  sub: {
    color: "#64748b",

    marginTop: 10,

    fontSize: 16,
  },
});
