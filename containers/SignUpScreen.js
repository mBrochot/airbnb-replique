import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUpScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Les mots de passe ne sont pas identiques");
      } else {
        const response = await axios.post(
          `https://express-airbnb-api.herokuapp.com/user/sign_up`,
          { email, username, name, description, password }
        );
        console.log(response.data);

        if (response.data.token) {
          setToken(response.data.token);
          setId(response.data.id);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={110}
      contentContainerStyle={styles.container}
    >
      <SafeAreaView style={{ backgroundColor: "#FF495B", flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 24,
              color: "white",
              marginTop: 30,
              marginBottom: 55,
            }}
          >
            Rejoignez-nous !
          </Text>
          <View
            style={{
              height: 620,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="email"
              placeholderTextColor="white"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="username"
              placeholderTextColor="white"
              autoCapitalize="none"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="name"
              placeholderTextColor="white"
              autoCapitalize="none"
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <View style={styles.box}>
              <TextInput
                style={{
                  width: 320,
                  color: "white",
                  fontSize: 16,
                  padding: 10,
                }}
                placeholder="présentez-vous en quelques mots..."
                placeholderTextColor="white"
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                }}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="mot de passe"
              placeholderTextColor="white"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="confirmez le mot de passe"
              placeholderTextColor="white"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
            />
            <TouchableOpacity
              title="Sign up"
              style={styles.button}
              onPress={handleSubmit}
            >
              <Text style={{ color: "#F35960", fontSize: 24 }}>
                Se connecter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                  textDecorationLine: "underline",
                }}
              >
                Déjà un compte ? Se connecter
              </Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 16,
    padding: 10,
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
  box: {
    width: 318,
    height: 117,
    borderColor: "white",
    borderWidth: 1,
  },
});
