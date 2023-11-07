import React from "react";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import audiopic from "../Pictures/Audio.jpg";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={audiopic}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{
              backgroundColor: "orange",
              borderRadius: 50,
              width: "80%",
              margin: 10,
              padding: 10,
            }}
            onPress={() => navigation.navigate("Register")}
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
              backgroundColor: "orange",
              padding: 10,
              borderRadius: 50,
              width: "80%",
            }}
            onPress={() => navigation.navigate("Login")}
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
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
