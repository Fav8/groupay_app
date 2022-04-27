import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Route, useRoute } from "@react-navigation/native";
import apiServices from "../services/apiService";

const CreateExpense = () => {
  const route = useRoute();
  const { uid, token, groupId } = route.params;
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurr] = useState("");
  const [tag, setTag] = useState("🏷️ Tag");
  const navigation = useNavigation();

  async function handlePress() {
    const newExpense = {
      title: title,
      value: Number(amount),
      curr: currency,
      tag: tag,
      payer: uid,
      payerName: "Leonardo", //mock data, to be switched with a call to get the user name
    };
    let created = await apiServices.createNewExpense(
      token,
      uid,
      groupId,
      newExpense
    );
    console.log(created, "created");
    navigation.navigate("Group", { token: token, uid: uid, groupId: groupId });
  }

  const curr = [{ value: "EUR" }, { value: "GBP" }, { value: "USD" }];
  return (
    <View style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Expense Name"
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Amount"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          style={styles.input}
        />
        <View style={styles.currencies}>
          <TouchableOpacity style={styles.curr} onPress={() => setCurr("EUR")}>
            <Text style={styles.buttonText2}>€ EUR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.curr} onPress={() => setCurr("GBP")}>
            <Text style={styles.buttonText2}>£ GBP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.curr} onPress={() => setCurr("USD")}>
            <Text style={styles.buttonText2}>$ USD</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tags}>
          <TouchableOpacity style={styles.tag} onPress={() => setTag("💵")}>
            <Text style={styles.buttonText2}>💵 Bill</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag} onPress={() => setTag("🏠")}>
            <Text style={styles.buttonText2}>🏠 House</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag} onPress={() => setTag("⚽")}>
            <Text style={styles.buttonText2}>⚽ Fun</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag} onPress={() => setTag("🍕")}>
            <Text style={styles.buttonText2}>🍕 Restaurant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag} onPress={() => setTag("🥦")}>
            <Text style={styles.buttonText2}>🥦 Groceries</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag} onPress={() => setTag("🏷️")}>
            <Text style={styles.buttonText2}>🏷️ Other</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  inputContainer: {
    width: "80%",
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText2: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  currencies: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  curr: {},
  tag: {
    padding: 7
  },
  tags: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
});
