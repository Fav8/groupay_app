import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { Route, useRoute } from "@react-navigation/native";

const Calculate = () => {
  const [owes, setOwes] = useState([]);
  const route = useRoute();
  const { expenses } = route.params;
  function splitPayments(expenses) {
    let payments = {};
    for (let expense of expenses) {
      payments[expense.payerName] = expense.value;
    }
    const people = Object.keys(payments);
    const valuesPaid = Object.values(payments);

    const sum = valuesPaid.reduce((acc, curr) => curr + acc);
    const mean = sum / people.length;

    const sortedPeople = people.sort(
      (personA, personB) => payments[personA] - payments[personB]
    );
    const sortedValuesPaid = sortedPeople.map(
      (person) => payments[person] - mean
    );

    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;
    let owesArr = [];
    while (i < j) {
      debt = Math.min(-sortedValuesPaid[i], sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;

      owesArr.push(
        `${sortedPeople[i]} owes ${sortedPeople[j]} €${debt.toFixed(2)}`
      );

      if (sortedValuesPaid[i] === 0) {
        i++;
      }

      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
    setOwes(owesArr);
  }
  useEffect(() => {
    splitPayments(expenses);
  }, [expenses]);

  return (
    <View>
      {owes.map((owe, i) => (
        <View style={[styles.card, styles.elevation]}>
          <View>
            <Text key={i} style={styles.heading}>
              {owe}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Calculate;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 13,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
  },
  elevation: {
    elevation: 20,
    shadowColor: "#52006A",
  },
});
