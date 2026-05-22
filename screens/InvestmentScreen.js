import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function InvestmentScreen({ navigation }) {
  const investments = [
    {
      title: "SIP",
      icon: "trending-up",
      color: "#2563eb",
      screen: "Sip",
    },

    {
      title: "FD",
      icon: "wallet",
      color: "#16a34a",
      screen: "FD",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Learn & Invest</Text>

      <Text style={styles.subHeading}>Smart financial growth tools</Text>

      <View style={styles.grid}>
        {investments.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,

              {
                borderColor: item.color,
              },
            ]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View
              style={[
                styles.iconBox,

                {
                  backgroundColor: item.color,
                },
              ]}
            >
              <Ionicons name={item.icon} size={32} color="white" />
            </View>

            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
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

  subHeading: {
    color: "#64748b",

    marginTop: 8,

    marginBottom: 30,
  },

  grid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",
  },

  card: {
    width: "48%",

    backgroundColor: "#111827",

    borderRadius: 30,

    padding: 24,

    alignItems: "center",

    marginBottom: 20,

    borderWidth: 2,
  },

  iconBox: {
    width: 75,

    height: 75,

    borderRadius: 40,

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 18,
  },

  cardTitle: {
    color: "white",

    fontSize: 20,

    fontWeight: "bold",
  },
});
