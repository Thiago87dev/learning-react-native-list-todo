import { colors } from "@/constants/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface TaskProps {
  text: string;
  initialCompleted: boolean;
  deleteTask: () => void;
  toggleTask: () => void
}

const Task = ({ text, initialCompleted, deleteTask, toggleTask }: TaskProps) => {
  const [completed, setCompleted] = useState(initialCompleted);
  const tranlateX = useSharedValue(0);

  const flingGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(() => {
      tranlateX.value = withTiming(500, { duration: 300 }, (finished) => {
        if (finished) {
          runOnJS(deleteTask)();
        }
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tranlateX.value }],
  }));

  const handleToggle = () => {
    setCompleted(!completed)
    toggleTask()
  }

  return (
    <GestureDetector gesture={flingGesture}>
      <Animated.View
        style={[style.rowContainer, animatedStyle]}
      >
        <Pressable onPress={handleToggle}>
          {completed ? (
            <AntDesign name="checkcircleo" size={32} color={colors.primary} />
          ) : (
            <Entypo name="circle" size={32} color="black" />
          )}
        </Pressable>
        <Text onPress={handleToggle}>{text}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const style = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    elevation: 3, // Android
    shadowColor: "#000", //Ios
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "#f1f0f0",
    padding: 10,
  },
});

export default Task;
