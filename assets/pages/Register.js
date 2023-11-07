import React, { useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
import app from "../Config/firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
export default function Register({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = getAuth(app);

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords don't match");
      } else {
        const response = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
        console.log(response);
        alert("Check Mails");
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
      alert("Registration falied" + error);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "400",
          alignSelf: "center",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        Create an Account
      </Text>
      <TextInput
        placeholder="Full Name"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        style={{ width: "80%", borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={{ width: "80%", borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        style={{ width: "80%", borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <TextInput
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
        style={{ width: "80%", borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Pressable
        style={{
          backgroundColor: "orange",
          width: "80%",
          padding: 10,
          alignItems: "center",
          borderRadius: 25,
        }}
        onPress={handleRegister}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "900",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          Register
        </Text>
      </Pressable>
      <Pressable
        style={{
          width: "80%",
          padding: 10,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          Already have an account, go to Login
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
