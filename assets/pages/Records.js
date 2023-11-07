import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Records({ navigation }) {
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [sound, setSound] = useState();
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    Audio.requestPermissionsAsync();
    [];
  });

  async function playRecording(item, index) {
    try {
      if (!item.sound) {
        console.warn("Sound not available");
        return;
      }

      if (playingIndex === index) {
        await sound.stopAsync();
        setPlayingIndex(null);
        return;
      }

      if (sound) {
        await sound.stopAsync();
      }

      const { sound: playbackSound, isLoaded } =
        await item.sound.getStatusAsync();

      if (isLoaded) {
        await item.sound.replayAsync();
        setPlayingIndex(index);
        setSound(item.sound);
        console.log("Playback started");
      } else {
        console.warn("no sound");
      }
    } catch (error) {
      console.error("Failed to play", error);
    }
  }

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status == "granted")
        console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      setSound(sound);
      let updateRecordings = [...recordings];
      updateRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI(),
      });
      setRecordings(updateRecordings);
      setRecording(null);
      console.log("Recording Stopped");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  function getDurationFormatted(millis) {
    const seconds = Math.floor((millis / 1000) % 60);
    const minutes = Math.floor((millis / (1000 * 60)) % 60);
    const hours = Math.floor((millis / (1000 * 60 * 60)) % 24);
    const days = Math.floor(millis / (1000 * 60 * 60 * 24));

    return `${hours}:${minutes}:${seconds}:${days}`;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          alignSelf: "flex-end",
          top: 20,
          marginLeft: 10,
        }}
      >
        <MaterialCommunityIcons
          style={{ margin: 5 }}
          name="account-circle-outline"
          size={50}
          color={"orange"}
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
      <Text
        style={{
          padding: 20,
          fontSize: 25,
          fontWeight: "800",
          alignSelf: "center",
          marginTop: 40,
          color: "orange",
        }}
      >
        Your recordings
      </Text>
      <ScrollView
        style={{
          borderRadius: 50,
          marginBottom: 15,
          width: "100%",
        }}
      >
        {recordings.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                padding: 10,
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "transparent",
                borderWidth: 1,
                borderRadius: 15,
                margin: 5,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "700", flex: 1 }}>
                {index + 1} {item.duration}
              </Text>
              <Pressable onPress={() => playRecording(item, index)}>
                {playingIndex === index ? (
                  <MaterialCommunityIcons
                    name="stop"
                    size={24}
                    color="orange"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="play"
                    size={24}
                    color="orange"
                  />
                )}
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          borderRadius: 50,
          marginBottom: 5,
          backgroundColor: "#FFD6A5",
          alignItems: "center",
          justifyContent: "center",
          height: "50%",
          width: "100%",
        }}
      >
        <Pressable
          style={{
            width: 90,
            height: 90,
            borderRadius: 90 / 2,
            padding: 20,
            backgroundColor: "orange",
            borderRadius: 80,
            alignItems: "center",
          }}
          onPress={recording ? stopRecording : startRecording}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}
          >
            {recording ? "Stop" : "Rec"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#FFFEC4",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
