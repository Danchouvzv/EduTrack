# EduTrack 🚀

![EduTrack Logo](https://via.placeholder.com/800x400?text=EduTrack+Platform)

## Overview

EduTrack is a comprehensive educational platform designed to track student progress, provide personalized learning recommendations, and facilitate communication between students, parents, and educational institutions. Using AI-powered analytics and multilingual support, EduTrack helps students reach their full potential through targeted learning strategies.

## Features ✨

- **Personalized Learning Paths** - AI-generated recommendations based on individual progress
- **Performance Analytics** - Visual representation of progress across subjects and topics
- **AI Chatbot Assistant** - Powered by Google's Gemini API to answer educational questions
- **Multilingual Support** - Available in English, Russian, and Kazakh
- **Growth Stories** - Real-world examples of student improvement
- **Parent Dashboard** - Monitor children's progress and receive AI-generated advice
- **School Management Tools** - Comprehensive tools for educators
- **Subscription Plans** - Flexible pricing tiers for different needs

## Tech Stack 🛠️

- **Frontend**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Localization**: i18next
- **Charts**: Chart.js with react-chartjs-2
- **AI Integration**: Google Gemini API

## Screenshots 📱

![Home Page](https://via.placeholder.com/800x400?text=Home+Page)
![Analytics Dashboard](https://via.placeholder.com/800x400?text=Analytics+Dashboard)
![AI Chat](https://via.placeholder.com/800x400?text=AI+Chat+Assistant)
![Subscription Plans](https://via.placeholder.com/800x400?text=Subscription+Plans)

## Getting Started 🚀

### Prerequisites

- Node.js v14 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Danchouvzv/EduTrack.git
cd EduTrack
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173/`

## Project Structure 📂

```
src/
├── components/         # Reusable UI components
├── context/            # React context providers
├── pages/              # Page components
├── services/           # API services and utilities
│   ├── authService.ts  # Authentication service
│   ├── firestoreService.ts # Database service
│   └── geminiService.ts # AI service
├── locales/            # Translation files
│   ├── en.json         # English translations
│   ├── ru.json         # Russian translations
│   └── kz.json         # Kazakh translations
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Multilingual Support 🌐

EduTrack offers complete interface translations in:
- English
- Russian
- Kazakh

Language can be changed from the navbar, and the selection is persisted between sessions.

## AI Chat Functionality 🤖

The AI chat assistant is powered by Google's Gemini API and provides:
- Educational assistance across various subjects
- Contextual responses based on educational topics
- Support in all three platform languages

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Roadmap 🗺️

- Mobile app versions for iOS and Android
- Integration with popular LMS platforms
- Expanded AI capabilities with custom-trained models
- Virtual reality learning environments
- Enhanced gamification elements

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact 📧

Danial - [@Danchouvzv](https://github.com/Danchouvzv)

Project Link: [https://github.com/Danchouvzv/EduTrack](https://github.com/Danchouvzv/EduTrack)
