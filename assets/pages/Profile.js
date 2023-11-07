import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
export default function Profile({ route, navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Set initial values when the component mounts
    if (route.params) {
      setFullName(route.params.fullName);
      setEmail(route.params.email);
      setContacts(route.params.contacts);
    }
  }, [route.params]);

  const handleUpdate = () => {
    setIsEditing(false);
    route.params.updateUser({
      fullName: fullName,
      email: email,
      contacts: contacts,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 16 }}>
        User Profile
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          marginBottom: 10,
        }}
      >
        Full Name: {fullName}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          marginBottom: 10,
        }}
      >
        Email: {email}
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          marginBottom: 10,
        }}
      >
        Contacts: {contacts}
      </Text>

      {isEditing ? (
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
              marginBottom: 12,
              padding: 8,
            }}
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
              marginBottom: 12,
              padding: 8,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
              marginBottom: 12,
              padding: 8,
            }}
            value={contacts}
            onChangeText={(text) => setContacts(text)}
          />
        </View>
      ) : null}

      <Pressable
        style={{
          width: "100%",
          padding: 10,
          alignItems: "center",
          backgroundColor: "#FD6A02",
          marginBottom: 5,
          borderRadius: 15,
        }}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Text>
      </Pressable>

      {isEditing && (
        <Pressable
          style={{
            width: "100%",
            padding: 10,
            alignItems: "center",
            backgroundColor: "#FD6A02",
            marginBottom: 5,
            borderRadius: 15,
          }}
          onPress={handleUpdate}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            Update
          </Text>
        </Pressable>
      )}

      <Pressable
        style={{
          width: "100%",
          padding: 10,
          alignItems: "center",
          backgroundColor: "#FD6A02",
          marginBottom: 5,
          borderRadius: 15,
        }}
        onPress={() => navigation.navigate("Records")}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          Back
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 15, flex: 1, padding: 16 },
});
