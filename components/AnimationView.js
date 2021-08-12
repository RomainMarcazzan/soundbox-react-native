import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated } from "react-native";

const AnimationView = (props) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [anim]);
  return (
    <Animated.View style={{ ...props.style, opacity: anim }}>
      {props.children}
    </Animated.View>
  );
};

export default AnimationView;

const styles = StyleSheet.create({});
