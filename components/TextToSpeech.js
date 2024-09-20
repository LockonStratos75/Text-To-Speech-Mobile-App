// components/TextToSpeech.js

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator, Alert, Text } from 'react-native';
import CustomPicker from './CustomPicker'; // Import the custom picker
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

    // Prepare items for the voice picker
    const voiceItems = voices.map((voice) => ({
        label: `${voice.name} (${voice.ssmlGender})`,
        value: voice.name,
    }));

    // Prepare items for the audio encoding picker
    const encodingItems = [
        { label: 'LINEAR16 (WAV)', value: 'LINEAR16' },
        { label: 'MULAW', value: 'MULAW' },
    ];

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter text here"
                multiline
                value={text}
                onChangeText={setText}
            />

            <CustomPicker
                label="Select Voice:"
                selectedValue={selectedVoice}
                onValueChange={setSelectedVoice}
                items={voiceItems}
            />

            <CustomPicker
                label="Select Audio Encoding:"
                selectedValue={audioEncoding}
                onValueChange={setAudioEncoding}
                items={encodingItems}
            />

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
});

export default TextToSpeech;
