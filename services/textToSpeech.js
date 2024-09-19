// services/textToSpeech.js

import axios from 'axios';
import { GOOGLE_CLOUD_API_KEY } from '@env';

/**
 * Fetch available voices from Google Cloud Text-to-Speech API
 */
export const getAvailableVoices = async () => {
    const url = `https://texttospeech.googleapis.com/v1/voices?key=${GOOGLE_CLOUD_API_KEY}`;

    try {
        const response = await axios.get(url);
        return response.data.voices; // returns an array of voices
    } catch (error) {
        console.error('Error fetching available voices:', error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Synthesize speech using Google Cloud Text-to-Speech API
 * @param {string} text - The text to synthesize
 * @param {string} selectedVoice - The name of the selected voice
 * @param {string} audioEncoding - The desired audio encoding format
 * @returns {string} - Base64-encoded audio content
 */
export const getSpeech = async (text, selectedVoice, audioEncoding = 'LINEAR16') => {
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_CLOUD_API_KEY}`;

    const data = {
        input: { text },
        voice: {
            languageCode: 'en-US',
            name: selectedVoice, // Use the selected voice
            ssmlGender: 'NEUTRAL', // Optional, can be set based on the selected voice gender
        },
        audioConfig: {
            audioEncoding: audioEncoding, // Use the specified encoding
        },
    };

    try {
        const response = await axios.post(url, data);
        return response.data.audioContent;
    } catch (error) {
        console.error('Error synthesizing speech:', error.response ? error.response.data : error.message);
        throw error;
    }
};
