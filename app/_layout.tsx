import Task from "@/components/Task";
import { colors } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface TaskType {
  id: number
  completed: boolean
  text: string
}

export default function RootLayout() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const getTaskAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("tasks");
        if (jsonValue !== null) {
          setTasks(JSON.parse(jsonValue));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTaskAsyncStorage()
  }, []);

  useEffect(() => {
    const setTaskAsyncStorage = async () => {
      try {
        const jsonValue = JSON.stringify(tasks);
        await AsyncStorage.setItem("tasks", jsonValue);
      } catch (error) {
        console.log(error);
      }
    };
    setTaskAsyncStorage();
  }, [tasks]);

  const addTask = () => {
    const newTask = { id: tasks.length + 1, completed: false, text };
    setTasks([...tasks, newTask]);
    setText("");
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={style.mainContainer}>
        <View style={style.rowContainer}>
          <Image
            style={style.image}
            source={require("@/assets/images/check.png")}
          />
          <Text style={style.title}>Olá Mundo!!</Text>
        </View>
        <View style={style.rowContainer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={style.input}
            keyboardType="default" // default é o padrão e não necessario
          />
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
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Task
              initialCompleted={item.completed}
              text={item.text}
              deleteTask={() =>
                setTasks(tasks.filter((task) => task.id !== item.id))
              }
              toggleTask={() =>
                setTasks(
                  tasks.map((task) => task.id === item.id ? {...task, completed: !task.completed} : task)
                )
              }
            />
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
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
