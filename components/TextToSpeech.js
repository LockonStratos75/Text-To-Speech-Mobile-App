// components/TextToSpeech.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator, Alert, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Ensure this is installed via `expo install @react-native-picker/picker`
import { getSpeech, getAvailableVoices } from '../services/textToSpeech';
import { Audio } from 'expo-av';

const TextToSpeech = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [voices, setVoices] = useState([]); // Store available voices
    const [selectedVoice, setSelectedVoice] = useState(''); // Store selected voice
    const [audioEncoding, setAudioEncoding] = useState('LINEAR16'); // Store selected audio encoding

    // Fetch available voices when the component mounts
    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const availableVoices = await getAvailableVoices();
                setVoices(availableVoices);
                if (availableVoices.length > 0) {
                    setSelectedVoice(availableVoices[0].name); // Default to first voice
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to load voices.');
            }
        };
        fetchVoices();
    }, []);

    const handleSpeak = async () => {
        if (!text.trim()) {
            Alert.alert('Input Required', 'Please enter some text to convert to speech.');
            return;
        }

        setLoading(true);
        try {
            const audioContent = await getSpeech(text, selectedVoice, audioEncoding);

            let mimeType;
            if (audioEncoding === 'LINEAR16') {
                mimeType = 'audio/wav'; // LINEAR16 is typically wrapped in WAV
            } else if (audioEncoding === 'MULAW') {
                mimeType = 'audio/mulaw';
            } else {
                mimeType = 'audio/mp3'; // Fallback
            }

            const { sound } = await Audio.Sound.createAsync(
                { uri: `data:${mimeType};base64,${audioContent}` },
                { shouldPlay: true }
            );

            // Optionally, handle sound lifecycle
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
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

            <Text style={styles.label}>Select Voice:</Text>
            <Picker
                selectedValue={selectedVoice}
                onValueChange={(itemValue) => setSelectedVoice(itemValue)}
                style={styles.picker}
            >
                {voices.map((voice) => (
                    <Picker.Item
                        key={voice.name}
                        label={`${voice.name} (${voice.ssmlGender})`}
                        value={voice.name}
                    />
                ))}
            </Picker>

            <Text style={styles.label}>Select Audio Encoding:</Text>
            <Picker
                selectedValue={audioEncoding}
                onValueChange={(itemValue) => setAudioEncoding(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="LINEAR16 (WAV)" value="LINEAR16" />
                <Picker.Item label="MULAW" value="MULAW" />
            </Picker>

            <Button
                title={loading ? 'Processing...' : 'Convert to Speech'}
                onPress={handleSpeak}
                disabled={loading}
            />
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
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
});

export default TextToSpeech;
