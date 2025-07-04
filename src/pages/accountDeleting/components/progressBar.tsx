// components/ProgressBar.tsx
import React from 'react';
import { Animated, ViewStyle } from 'react-native';

type ProgressBarProps = {
    progress: Animated.Value;
    containerStyle?: ViewStyle;
    fillStyle?: ViewStyle;
};

export default function ProgressBar({ progress, containerStyle, fillStyle }: ProgressBarProps) {
    const progressWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    return (
        <Animated.View style={[containerStyle]}>
            <Animated.View style={[fillStyle, { width: progressWidth }]} />
        </Animated.View>
    );
}
