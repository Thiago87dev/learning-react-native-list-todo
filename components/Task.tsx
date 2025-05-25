import { colors } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TaskProps {
  text: string;
  initialCompleted: boolean;
}

const Task = ({ text, initialCompleted }: TaskProps) => {
  const [completed, setCompleted] = useState(initialCompleted);
  return (
    <View style={style.rowContainer}>
      <Pressable onPress={() => setCompleted(!completed)}>
        {completed ? (
          <AntDesign name="checkcircleo" size={32} color={colors.primary} />
        ) : (
          <Entypo name="circle" size={32} color="black" />
        )}
      </Pressable>
      <Text onPress={() => setCompleted(!completed)}>{text}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: "10",
    marginBottom: 10,
  },
});

export default Task;
