// services/textToSpeech.js

import axios from 'axios';
import { GOOGLE_CLOUD_API_KEY } from '@env';

export const getSpeech = async (text) => {
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_CLOUD_API_KEY}`;

    const data = {
        input: { text },
        voice: {
            languageCode: 'en-US',
            ssmlGender: 'NEUTRAL',
        },
        audioConfig: {
            audioEncoding: 'MP3',
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
