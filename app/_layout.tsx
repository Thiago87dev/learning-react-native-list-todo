import Task from "@/components/Task";
import { colors } from "@/constants/colors";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
// import pimguin from "../assets/images/check.png";

const initialTasks = [
  { id: 1, completed: true, text: "Fazer café" },
  { id: 2, completed: false, text: "Estudar RN" },
  { id: 3, completed: false, text: "Malhar" },
];

export default function RootLayout() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState("");

  const addTask = () => {
    const newTask = { id: tasks.length + 1, completed: false, text };
    setTasks([...tasks, newTask]);
    setText("");
  };

  return (
    <View style={style.mainContainer}>
      <View style={style.rowContainer}>
        <Image
          style={style.image}
          source={require("@/assets/images/check.png")}
        />
        <Text style={style.title}>Olá Mundo!!</Text>
      </View>
      <View style={style.rowContainer}>
        <TextInput value={text} onChangeText={setText} style={style.input} />
        <Pressable
          style={({ pressed }) => [
            style.button,
            { backgroundColor: pressed ? "blue" : colors.primary },
          ]}
          onPress={addTask}
        >
          <Text style={style.buttonText}>+</Text>
        </Pressable>
      </View>
      <FlatList
        data={tasks}
        // keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Task initialCompleted={item.completed} text={item.text} />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 30,
    fontFamily: "Calibre",
    fontWeight: 600,
    color: colors.primary,
  },
  input: {
    height: 40,
    paddingHorizontal: 16,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    flexGrow: 1,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  mainContainer: {
    margin: 30,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
});
