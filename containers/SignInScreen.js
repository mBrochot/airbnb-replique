import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";

import { SimpleLineIcons } from "@expo/vector-icons";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={110}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView style={{ backgroundColor: "#FF495B", flex: 1 }}>
        <View
          style={{
            height: 600,
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <SimpleLineIcons name="home" size={100} color="white" />
          <TextInput
            style={styles.input}
            placeholder="name@airbnb-api.com"
            placeholderTextColor="white"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <TouchableOpacity
            title="Sign in"
            style={styles.button}
            onPress={async () => {
              const response = await axios.post(
                "https://express-airbnb-api.herokuapp.com/user/log_in",
                { email: email, password: password }
              );
              await AsyncStorage.setItem("userToken", response.data.token);
              await AsyncStorage.setItem("userId", response.data.id);
              setToken(response.data.token);
            }}
          >
            <Text style={{ color: "#F35960", fontSize: 24 }}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "white",
                textDecorationLine: "underline",
              }}
            >
              Pas de compte ? S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
  },
  input: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 320,
    color: "white",
  },
  button: {
    marginTop: 50,
    width: 190,
    height: 65,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
