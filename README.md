# EasyTranslation 🌐

> AI-powered Kannada, Kanglish & English → Malayalam translation assistant.

EasyTranslation is a mobile translation application designed to make communication between Kannada/English speakers and Malayalam speakers easier.

The app supports:

* Kannada written in Kannada script
* Kannada written using English characters (Kanglish)
* English
* Malayalam translation powered by an LLM

The goal is to provide a simple, natural and user-friendly translation experience, especially for everyday conversations.

---

## ✨ Features

### Current Features

*  Project initialization
*  Mobile application setup
*  Kannada → Malayalam translation
*  Kanglish → Malayalam translation
*  English → Malayalam translation

### Planned Features

*  Automatic language detection
*  LLM-powered translation
*  Kannada script and Kanglish support
*  Copy translated text
*  Clear input
*  Translation history
*  Favorite translations
*  Malayalam text-to-speech
*  Voice input
*  Dark mode
*  Responsive mobile UI
*  Translation quality evaluation
*  Cloud deployment

---

##  Motivation

EasyTranslation is being developed as a practical language-assistance application for everyday communication.

Many existing translation applications work well with standard languages and scripts, but transliterated regional-language input such as Kanglish can be challenging.

EasyTranslation aims to handle inputs such as:

```text
Kannada:
ನನಗೆ ಕನ್ನಡ ಗೊತ್ತಿಲ್ಲ

Kanglish:
nanage kannada gothilla

English:
I don't know Kannada.
```

and produce a natural Malayalam translation.

Example:

```text
എനിക്ക് കന്നഡ അറിയില്ല.
```

---

##  How It Works

The application follows a mobile-client + backend + LLM architecture.

```text
                 ┌─────────────────────┐
                 │   React Native App  │
                 │       (Expo)        │
                 └──────────┬──────────┘
                            │
                            │ HTTPS
                            ▼
                 ┌─────────────────────┐
                 │    FastAPI Backend  │
                 │       (Python)      │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │      LLM Layer      │
                 │     Gemini API      │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Malayalam Response  │
                 └─────────────────────┘
```

The API key is kept on the backend and is never exposed directly inside the mobile application.

---

##  Project Architecture

```text
EasyTranslation/
│
├── mobile/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── services/
│   ├── hooks/
│   ├── assets/
│   └── ...
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   └── schemas/
│   │
│   ├── requirements.txt
│   └── .env.example
│
├── docs/
│   ├── architecture.md
│   ├── api.md
│   └── evaluation.md
│
├── .gitignore
├── README.md
└── LICENSE
```

---

##  Tech Stack

### Mobile Application

* React Native
* Expo
* TypeScript
* Expo Router

### Backend

* Python
* FastAPI
* Pydantic

### AI / NLP

* Large Language Model (LLM)
* Gemini API
* Kannada/Kanglish language normalization
* Malayalam translation

### Database

* SQLite during development
* PostgreSQL for production, if required

### Development

* Git
* GitHub
* VS Code
* REST API
* JSON

### Deployment

* Expo / EAS for mobile builds
* Cloud deployment for the FastAPI backend

---

##  Translation Pipeline

The translation process is designed to handle multiple input formats.

```text
User Input
    │
    ▼
Language Detection
    │
    ├── Kannada Script
    │
    ├── Kanglish
    │
    └── English
    │
    ▼
Input Normalization
    │
    ▼
LLM Translation
    │
    ▼
Malayalam Output
    │
    ▼
Display to User
```

---

##  Example

### Kannada Input

```text
ನನಗೆ ಕನ್ನಡ ಗೊತ್ತಿಲ್ಲ
```

### Kanglish Input

```text
nanage kannada gothilla
```

### English Input

```text
I don't know Kannada.
```

### Malayalam Output

```text
എനിക്ക് കന്നഡ അറിയില്ല.
```

---

##  Security

API keys and other secrets must never be stored directly in the mobile application.

Environment variables will be used for sensitive configuration.

Example:

```text
GEMINI_API_KEY=your_api_key_here
```

The actual `.env` file should never be committed to GitHub.

---

##  Testing

Testing will cover:

* Kannada translation
* Kanglish translation
* English translation
* Malayalam output correctness
* Empty input handling
* Invalid requests
* API failures
* Long text
* Mixed-language input

A small evaluation dataset will eventually be created to compare translation quality across different input types.

---

## 🗺️ Roadmap

### Phase 1 — Project Setup

* [x] Create GitHub repository
* [x] Add README
* [x] Add license
* [ ] Initialize Expo mobile project
* [ ] Initialize FastAPI backend
* [ ] Create project architecture

### Phase 2 — Mobile UI

* [ ] Create home screen
* [ ] Add input area
* [ ] Add language selector
* [ ] Add translate button
* [ ] Add output area
* [ ] Add loading state
* [ ] Add error state
* [ ] Make UI mobile-friendly

### Phase 3 — LLM Integration

* [ ] Create translation API
* [ ] Integrate Gemini
* [ ] Implement language detection
* [ ] Implement Kanglish handling
* [ ] Implement Malayalam translation
* [ ] Add structured API responses
* [ ] Add error handling

### Phase 4 — User Features

* [ ] Copy translation
* [ ] Clear input
* [ ] Translation history
* [ ] Favorites
* [ ] Dark mode
* [ ] Text-to-speech
* [ ] Voice input

### Phase 5 — Evaluation

* [ ] Create translation test dataset
* [ ] Test Kannada inputs
* [ ] Test Kanglish inputs
* [ ] Test English inputs
* [ ] Evaluate translation quality
* [ ] Improve prompts
* [ ] Compare LLM output with traditional translation models

### Phase 6 — Deployment

* [ ] Deploy backend
* [ ] Configure production environment
* [ ] Build Android application
* [ ] Test on physical device
* [ ] Create release build
* [ ] Add screenshots to README
* [ ] Add demo video

---

##  Contributing

Contributions, suggestions and improvements are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the changes.
5. Create a pull request.

---

##  License

This project is licensed under the MIT License.

---

##  Author

**Shivanandana A**

GitHub: [Shivanandana138](https://github.com/Shivanandana138)

---

## Project Status

 **Currently under active development**

EasyTranslation is being developed incrementally, with new features, improvements and experiments being added throughout the project.
