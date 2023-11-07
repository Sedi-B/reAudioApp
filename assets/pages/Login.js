import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../Config/firebase";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("You're now logged in");
      navigation.navigate("Records");
    } catch (error) {
      console.log(error);
      alert("failed to log in" + error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "400",
          alignSelf: "center",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        Login to your account
      </Text>
      <TextInput
        placeholder="Enter Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={{
          width: "80%",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
      />
      <TextInput
        placeholder="Enter Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        style={{
          width: "80%",
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
      />
      <Pressable
        style={{
          width: "80%",
          padding: 10,
          alignItems: "center",
          borderRadius: 5,
          backgroundColor: "#FD6A02",
          borderRadius: 25,
        }}
        onPress={handleLogin}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "900",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          Login
        </Text>
      </Pressable>
      <Pressable
        style={{
          width: "80%",
          padding: 10,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          Don't have an account, create account.
        </Text>
      </Pressable>
    </View>
  );
}
