import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Route, useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import apiService from "../services/apiService";
import groupSvg from "../assets/people-fill.svg"


const HomeScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const [userGroups, setUserGroups] = useState([]);
  const { uid, token } = route.params;

  useEffect(() => {
    if (token) {
      apiService.getGroups(token, uid).then((items) => {
        console.log(items, "item");
        let groups = [...items];
        setUserGroups(groups);
      });
    }
  }, [token]);

  function handleClick(group) {
    navigation.navigate("Group", {
      token: token,
      uid: uid,
      groupId: group._id,
    });
  }

  return (
    <View style={styles.list}>
      <FlatList
        data={userGroups}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[styles.card, styles.elevation]} >
          <View>
            <View style={styles.flex}>
            <Text style={styles.heading}>
            {item.groupName}
            </Text>
            <Text style={styles.heading}>
            🧑‍🤝‍🧑: {Math.floor(Math.random() * (5 - 2 + 1) + 2)}
            </Text>
            </View>
            <Pressable onPress={() => handleClick(item)} style={styles.ButtonContainer}>
              <Text style={styles.ButtonText}>
              Visit Group
              </Text>
              </Pressable>
          </View>
        </View>
        )}
      />
      <Pressable style={styles.ButtonPlus}>
              <Text style={styles.ButtonTextPlus}>
              +
              </Text>
              </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  elevation: {
    elevation: 10,
    shadowColor: '#52006A',
  },
  ButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  flex:{
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  list: {
    maxHeight: '99%',
  overflow: "hidden",},

  ButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  ButtonTextPlus: {
    fontSize: 35,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  ButtonPlus: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 20
  }
});
