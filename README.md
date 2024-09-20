# TextToSpeech App

TextToSpeech App is a React Native application built with Expo, enabling users to convert written text into spoken audio using Google Cloud's Text-to-Speech API. Designed to operate smoothly within the Expo Dev Client, the app avoids native modules by utilizing custom JavaScript components, ensuring easy development and deployment across both Android and iOS platforms.

## 📖 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Text Input:** Enter or paste any text to convert into speech.
- **Voice Selection:** Choose from a variety of English voices filtered based on specific criteria.
- **Audio Encoding Options:** Select your preferred audio encoding format, including LINEAR16 (WAV) and MULAW.
- **Speech Synthesis:** Convert the entered text into speech using Google Cloud's Text-to-Speech API.
- **Audio Playback:** Listen to the synthesized speech directly within the app using Expo's AV module.
- **Custom Pickers:** Navigate voice and encoding options with custom-built pickers ensuring compatibility with Expo Dev Client.
- **Error Handling:** Receive alerts for any issues during voice fetching or speech synthesis processes.

## Demo

![App Screenshot](./assets/screenshot.png)

*Note: Replace the above image path with your actual screenshot.*

## Technologies Used

- **React Native:** Framework for building native apps using React.
- **Expo:** A platform for making universal React applications.
- **Google Cloud Text-to-Speech API:** Service to convert text into natural-sounding speech.
- **Axios:** Promise-based HTTP client for making API requests.
- **Expo AV:** Audio and Video API for playback and recording.
- **Custom JavaScript Pickers:** Built-in components to replace native pickers, ensuring compatibility with Expo Dev Client.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/TextToSpeech-App.git
   cd TextToSpeech-App
   ```

2. **Install Dependencies**

   Ensure you have [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/get-started/installation/) installed.

   ```bash
   npm install -g expo-cli
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add your Google Cloud API key:

   ```env
   GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key
   ```

   *Ensure you replace `your_google_cloud_api_key` with your actual API key.*

4. **Run the App**

   ```bash
   expo start
   ```

   Use the Expo Go app on your mobile device or an emulator to view the app.

## Usage

1. **Enter Text:**
   - Type or paste the text you want to convert to speech in the text input field.

2. **Select Voice:**
   - Choose from the list of available English voices. The voices are filtered based on predefined criteria to ensure quality and relevance.

3. **Select Audio Encoding:**
   - Choose your preferred audio encoding format:
     - **LINEAR16 (WAV):** Suitable for high-quality audio.
     - **MULAW:** Optimized for telephony applications.

4. **Convert to Speech:**
   - Press the "Convert to Speech" button.
   - The app will synthesize the speech and play it back to you.

5. **Listen:**
   - Enjoy the audio playback of your synthesized speech.

## Configuration

### Environment Variables

The app uses environment variables to securely manage sensitive information like API keys. Ensure you have a `.env` file set up with the necessary variables.

```env
GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key
```

### Babel Configuration

Ensure your `babel.config.js` is set up to handle environment variables without introducing native dependencies.

```javascript
module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env',
                    path: '.env',
                    blacklist: null,
                    whitelist: null,
                    safe: false,
                    allowUndefined: true,
                },
            ],
        ],
    };
};
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add some feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

## License

This project is licensed under the [MIT License](./LICENSE).
