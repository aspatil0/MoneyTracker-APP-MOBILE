import {
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    Animated,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function SplashScreen({
    navigation,
}) {

    const [progress,
        setProgress] =
        useState(0);

    const rotateAnim =
        useRef(
            new Animated.Value(0)
        ).current;

    useEffect(() => {

        // ROTATION

        Animated.loop(

            Animated.timing(
                rotateAnim,
                {

                    toValue: 1,

                    duration: 1200,

                    useNativeDriver: true,

                }
            )

        ).start();

        // LOADING %

        let value = 0;

        const interval =
            setInterval(() => {

                value += 2;

                setProgress(value);

                if (value >= 100) {

                    clearInterval(
                        interval
                    );

                    setTimeout(() => {

                        navigation.replace(
                            'Main'
                        );

                    }, 300);

                }

            }, 40);

    }, []);

    const rotate =

        rotateAnim.interpolate({

            inputRange: [0, 1],

            outputRange: [
                '0deg',
                '360deg',
            ],

        });

    return (

        <View style={styles.container}>

            {/* LOADING CIRCLE */}

            <Animated.View

                style={[

                    styles.loader,

                    {

                        transform: [
                            {
                                rotate,
                            },
                        ],

                    },

                ]}

            />

            {/* TITLE */}

            <Text style={styles.title}>
                Money Manager
            </Text>

            <Text style={styles.subtitle}>
                By Adityaraj Patil
            </Text>

            {/* PERCENT */}

            <Text style={styles.percent}>
                {progress}%
            </Text>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {

        flex: 1,

        backgroundColor: '#020617',

        justifyContent: 'center',

        alignItems: 'center',

    },

    loader: {

        width: 90,

        height: 90,

        borderWidth: 8,

        borderColor: '#1e293b',

        borderTopColor: '#2563eb',

        borderRadius: 50,

        marginBottom: 40,

    },

    title: {

        color: 'white',

        fontSize: 38,

        fontWeight: 'bold',

        letterSpacing: 1,

    },

    subtitle: {

        color: '#94a3b8',

        fontSize: 16,

        marginTop: 12,

    },

    percent: {

        color: '#2563eb',

        fontSize: 28,

        fontWeight: 'bold',

        marginTop: 35,

    },

});