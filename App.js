import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { data } from "./data";
import { Audio } from "expo-av";
import AnimationView from "./components/AnimationView";

export default function App() {
  const [sound, setSound] = React.useState();
  async function playSound(srcItem) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(srcItem);
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView>
      <Image
        style={styles.imageCannes}
        source={require("./assets/images/cannes.jpg")}
      />
      <AnimationView
        style={{
          position: "absolute",
          top: 25,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
        }}
      >
        <Image
          style={styles.imageLudo}
          source={require("./assets/images/ludo.png")}
        />
      </AnimationView>
      <View style={styles.listContainer}>
        <View style={styles.mainTitleContainer}>
          <Text style={styles.maintTitle}>Ludo Soundbox</Text>
        </View>
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                playSound(item.src);
              }}
            >
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageCannes: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
    zIndex: -1,
  },
  imageLudo: {
    height: 100,
    width: 100,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 100,
  },
  listContainer: {
    position: "relative",
    backgroundColor: "#ff0322",
    paddingTop: 60,
    paddingBottom: 20,
    marginTop: -50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  mainTitleContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  maintTitle: {
    fontWeight: "bold",
    fontSize: 35,
  },
  item: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
  },
});
