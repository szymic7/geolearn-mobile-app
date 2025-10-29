import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import Colors from "../../utils/colors";

export default function Timer({ startSeconds = 30, onFinish, disabled = false }) {
    const [seconds, setSeconds] = useState(startSeconds);

    useEffect(() => {
        if (disabled) return;

        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    if (onFinish) onFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [disabled]);

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const remainingSeconds = secs % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return <Text style={styles.timerText}>{formatTime(seconds)}</Text>;
}

const styles = StyleSheet.create({
    timerText: {
        fontSize: 13,
        fontFamily: "Montserrat",
        fontWeight: "500",
        color: Colors.textPrimary,
    },
});