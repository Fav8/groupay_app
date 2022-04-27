import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Route, useNavigation, useRoute } from "@react-navigation/native";
import apiService from "../services/apiService";
import { SafeAreaView } from "react-native-safe-area-context";

const GroupPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [userGroup, setUserGroup] = useState([]);
  const { uid, token, groupId } = route.params;
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    apiService.getExpenses(token, uid, groupId).then((items) => {
      let expenses = [...items];
      setUserGroup(expenses);
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    if (token) {
      apiService.getExpenses(token, uid, groupId).then((items) => {
        let expenses = [...items];
        setUserGroup(expenses);
      });
    }
  }, [token]);
  function createExpense() {
    navigation.navigate("CreateExpense", {
      token: token,
      uid: uid,
      groupId: groupId,
    });
  }
  function calculate() {
    navigation.navigate("Calculate", {
      expenses: userGroup,
    });
  }

  return (
    <View>
      <View style={styles.list}>
        <FlatList
          data={userGroup}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={[styles.card, styles.elevation]}>
              <View>
                <Text style={styles.heading}>
                  {item.tag} {item.title}
                </Text>
              </View>
              <Text>
                €{item.value} paid by {item.payerName}
              </Text>
            </View>
          )}
        />
      </View>
      <View style={styles.buttons}>
        <Pressable onPress={createExpense} style={styles.ButtonContainer}>
          <Text style={styles.ButtonText}>➕</Text>
        </Pressable>
        <Pressable onPress={calculate} style={styles.ButtonContainer}>
          <Text style={styles.ButtonText}>💲</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GroupPage;

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
  ButtonContainer: {
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  ButtonText: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  cointainer: {
    flex: 1,
  },
  list: {
    maxHeight: "90%",
    overflow: "hidden",
  },
  buttons:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-around"
  }
});
