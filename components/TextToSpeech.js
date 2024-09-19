import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getSpeech } from '../services/textToSpeech';
import { Audio } from 'expo-av';
import { GOOGLE_CLOUD_API_KEY } from '@env';


const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSpeak = async () => {
        console.log(GOOGLE_CLOUD_API_KEY);
        if (!text.trim()) {
            Alert.alert('Input Required', 'Please enter some text to convert to speech.');
            return;
        }

        setLoading(true);
        try {
            const audioContent = await getSpeech(text);

            const { sound } = await Audio.Sound.createAsync(
                { uri: `data:audio/mp3;base64,${audioContent}` },
                { shouldPlay: true }
            );

            // Optionally, handle sound lifecycle
            // sound.setOnPlaybackStatusUpdate((status) => {
            //   if (status.didJustFinish) {
            //     sound.unloadAsync();
            //   }
            // });
        } catch (error) {
            Alert.alert('Error', 'Failed to synthesize speech.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter text here"
                multiline
                value={text}
                onChangeText={setText}
            />
            <Button title={loading ? 'Processing...' : 'Convert to Speech'} onPress={handleSpeak} disabled={loading} />
            {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
});

export default TextToSpeech;
