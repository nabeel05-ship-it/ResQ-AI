# ResQ AI — Emergency First-Response

> AI-powered emergency first-response in your language. **Works offline.** One-tap SOS to your loved ones.

## The problem we solve

In India, the average ambulance response time in cities is 25–30 minutes. In rural areas it can exceed an hour. For cardiac arrest, **every minute without help reduces survival by ~10%**. The first 4–6 minutes are decided by whoever is standing next to the patient — usually a panicked family member with no training.

ResQ AI puts a first-aid expert in everyone's pocket — and crucially, **works when the network doesn't**.

## What's in it

| Feature | Why it matters |
|---|---|
| 🆘 **Hold-to-SOS** | One 2-second hold sends your live GPS + emergency type to pre-saved contacts via WhatsApp/SMS or native share |
| 📴 **Offline first-aid** | 5 critical guides (heart attack, choking, severe bleeding, burns, unconscious) bundled into the app — render with **zero network** |
| 🛡️ **Offline Emergency Matcher** | Multilingual keyword & alias detection (English, Hindi, Romanized) falls back to structured first-aid guidance with zero API latency |
| 🤖 **AI Guidance** | When online: Groq-powered fast LLM with chat history, urgency detection, and direct first-responder action steps |
| 📷 **Camera & Vision Triage** | Point your camera or upload injury photos — multimodal vision classifies emergencies and routes directly to triage trees |
| 🎙️ **Voice Input & Whisper STT** | Push-to-talk voice recording transcribed via Groq Whisper Large v3 Turbo across Indian and global languages, with text-to-speech audio guidance |
| 🌐 **12+ Indian Languages** | Hindi, Tamil, Telugu, Bengali, Marathi, Kannada, Gujarati, Punjabi, Malayalam, Urdu, Odia + English. AI replies in the user's selected language |
| 🥁 **CPR Metronome** | Built-in 100 bpm beat (Web Audio API synth + haptic pulses) during cardiac/unconscious flows — push to the rhythm |
| 📞 **Quick-Call Tiles** | 112 (All), 102 (Ambulance), 101 (Fire), 100 (Police) — one tap dials directly |
| 📍 **Nearby Services & Routing** | Live OpenStreetMap Overpass queries for hospitals, police, fire, pharmacies & clinics + Leaflet interactive map with OSRM turn-by-turn routes & curated fallbacks |
| 📺 **YouTube Video Tutorials** | RapidAPI-powered first-aid video tutorials tailored to the emergency type and query context |
| 📱 **Installable PWA & Android APK** | Service Worker cache-first app shell + native Capacitor Android wrapper with GPS & haptics |

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│ React 19 PWA (CRA)                                           │
│  ├─ Routing: react-router v7                                 │
│  ├─ State:   AppContext + localStorage                       │
│  ├─ Maps:    Leaflet + OSRM routing + OpenStreetMap Overpass │
│  └─ Service Worker: cache-first app shell + triage data      │
└──────────────────────────────────────────────────────────────┘
                │
                ├── Online (APIs configured)
                │    ├─ Groq Chat & Vision: Llama 3.1 8B Instant / Qwen / Llama 4
                │    ├─ Groq Audio: Whisper Large v3 Turbo (speech-to-text)
                │    ├─ RapidAPI: YouTube video tutorials (optional)
                │    └─ Overpass API: Live nearby hospitals, police, fire, clinics
                │
                └── Offline / Network Resilient
                     ├─ Bundled triage trees (src/data/triageTrees.js)
                     ├─ Multilingual emergency detector & keyword matcher
                     ├─ CPR metronome audio + haptic cadence (100 bpm)
                     ├─ Web Speech API text-to-speech
                     └─ IndexedDB / localStorage for contacts & profile state
```

## Quickstart (web)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local

# 3. Start local development server
npm start                       # dev server on http://localhost:3000
```

### Environment Configuration (`.env.local`)

ResQ AI is built with Create React App, which exposes variables prefixed with `REACT_APP_` to the client-side bundle. Copy `.env.example` to `.env.local` in the project root:

```bash
cp .env.example .env.local
```

| Variable Name | Required / Optional | Description |
|---|---|---|
| `REACT_APP_GROQ_API_KEY` | Required for online AI | Groq API key used for Llama 3.1 8B Instant chat guidance, multimodal vision classification, and Whisper Large v3 Turbo audio transcription. Get a key at [console.groq.com/keys](https://console.groq.com/keys). |
| `REACT_APP_RAPIDAPI_KEY` | Optional | RapidAPI key used for fetching relevant first-aid video tutorials in `RelatedVideos.js`. Get a key at [rapidapi.com](https://rapidapi.com). |
| `REACT_APP_RAPIDAPI_HOST` | Optional | RapidAPI host (default: `youtube-v2.p.rapidapi.com`; alternatively supports `youtube-v31.p.rapidapi.com`). |

> **Security Note:** Never commit `.env.local` to Git. The `.gitignore` file is configured to keep your credentials strictly local. When keys are not configured or the network is offline, the app automatically activates its offline emergency matcher and bundled triage trees.

### Production Build & PWA Testing

For the offline / installable PWA experience, build and serve the production bundle:

```bash
npm run build
npx serve -s build              # service worker registers in production mode
```

Then open in Chrome → DevTools → Application → Service Workers (verify "activated") → toggle "Offline" → reload → app still works without an active internet connection.

## Mobile app (Android via Capacitor)

ResQ AI ships as both a PWA and a real Android app. The Android wrapper reuses 100% of the React UI and adds native APIs (high-accuracy GPS, haptics, system share sheet, splash screen, status-bar tinting).

### Prerequisites
- **Android Studio** (download free from developer.android.com/studio) — required to compile the APK and run the emulator
- **JDK 17+** (Android Studio bundles this)
- **An Android device or emulator**

### Build & open the Android project
```bash
npm run android:sync          # builds web bundle and syncs to android/
npm run android:open          # opens the project in Android Studio
```

In Android Studio: hit **Run ▶** to deploy to a connected device or emulator.

To produce a shareable APK without Android Studio's UI:
```bash
cd android
./gradlew assembleDebug       # APK at: android/app/build/outputs/apk/debug/app-debug.apk
```

### Native features active inside the wrapper
| Feature | Web fallback | Native (Capacitor) |
|---|---|---|
| **SOS hold-to-trigger haptics** | `navigator.vibrate` | Capacitor Haptics — ImpactStyle.Light + NotificationType.Success |
| **Live location capture** | `navigator.geolocation` (lower accuracy) | Capacitor Geolocation — high-accuracy GPS with explicit permission flow |
| **Share live-location SOS** | Web Share API → wa.me deep link | Native system share sheet (WhatsApp, SMS, Email, Signal, etc.) |
| **Status bar / splash** | n/a | Branded splash + dark-on-white status bar |
| **Offline first-aid** | Service Worker | Bundled directly in app assets (no SW needed) |
| **Permissions** | Browser prompt | AndroidManifest.xml — INTERNET, ACCESS_FINE/COARSE_LOCATION, VIBRATE, CAMERA, RECORD_AUDIO |

### Bundle id & app name
Configured in [capacitor.config.json](capacitor.config.json):
- App ID: `ai.resq.app`
- App Name: `ResQ AI`

### iOS
Building iOS requires macOS + Xcode. Add the platform with:
```bash
npm install @capacitor/ios
npx cap add ios
npx cap open ios
```

## Demo script (90 seconds)

1. **"The network fails when you need it most."** Toggle airplane mode in DevTools → tap **Choking** tile → step-by-step guide loads instantly.
2. **"In your language."** Switch primary language to Tamil → reload triage screen → guide is now in Tamil.
3. **"One tap if you can't speak."** Add a teammate's WhatsApp number as emergency contact → hold the SOS button → teammate's phone buzzes with the live Google Maps link.
4. **"And we still have AI when you have signal."** Re-enable wifi → open Guidance → snap a photo of (a fake) burn → AI grades severity and gives steps.

## Project structure

```
src/
├── App.js                       Routes + auth guard
├── index.js                     Service worker registration
├── theme.js                     Clinical design system tokens & layout constants
├── context/
│   └── AppContext.js            Auth, language, contacts state
├── components/
│   ├── AppShell.js              Responsive layout wrapper & global navigation
│   ├── SOSButton.js             Hold-to-SOS + emergency contacts CRUD
│   ├── AIGuide.js               In-app emergency guidance walkthrough
│   ├── LangPickerModal.js       Multi-language selector modal (12+ languages)
│   ├── LeafletMap.js            Interactive OpenStreetMap viewer with route polyline
│   ├── LocationMap.js           Static / preview coordinate map component
│   └── RelatedVideos.js         YouTube first-aid video carousel with inline player
├── pages/
│   ├── Login.js                 Email + demo auth + language onboarding
│   ├── Home.js                  Hub: SOS, categories, offline guides, quick calls
│   ├── Triage.js                Offline first-aid step renderer + CPR metronome
│   ├── Guidance.js              AI chat, camera triage, voice STT, & offline fallback
│   └── Nearby.js                Overpass API services + Leaflet map + OSRM directions
├── data/
│   ├── emergencyData.js         Emergency categories, numbers & subcategories
│   └── triageTrees.js           Bundled offline first-aid decision trees (EN/HI)
└── utils/
    ├── detectEmergency.js       Multilingual keyword & alias emergency matcher
    ├── groqVision.js            Groq vision triage classifier & image handling
    ├── groqAudio.js             Groq Whisper Large v3 Turbo audio transcription
    ├── speech.js                Web Speech API synthesis (TTS) & STT fallback
    ├── recorder.js              Audio recorder with volume level analysis
    ├── queryExtract.js          Emergency query transformer for video search
    ├── places.js                Overpass API nearby place queries (5km radius)
    ├── routing.js               OSRM driving/walking/cycling routing engine
    ├── youtube.js               RapidAPI YouTube video search client
    └── native.js                Capacitor native API bridges (GPS, haptics, share)
public/
├── manifest.json                PWA install metadata
└── service-worker.js            Cache-first app shell, network-bypass for API
```

## Hackathon credentials checklist

- [x] Real-world life-saving feature (SOS + offline triage)
- [x] AI integration (Groq + vision)
- [x] Multilingual (12+ languages)
- [x] PWA / installable
- [x] Offline-first
- [x] Accessibility: keyboard-navigable, large tap targets, high-contrast critical CTAs
- [x] No secrets in source — `.env.local` ignored
- [x] Mobile-first responsive layout

## Roadmap (post-hackathon, in priority order)

1. **Serverless API proxy** — move Groq and RapidAPI keys off the client (Vercel/Cloudflare Worker)
2. **Real Firebase Auth** — replace the demo localStorage auth (dependencies already installed)
3. **Google Places API optional fallback** — complement OpenStreetMap Overpass with Google Places for ratings & operating hours
4. **Continuous voice mode** — hands-free emergency listening ("Hey ResQ, my dad fell")
5. **Family/caregiver dashboard** — multi-device SOS notifications across family members
6. **Crowdsourced incident map** — Firestore-backed real-time hazard layer
7. **Push notifications** — first-aid drill reminders and local civil defense alerts
8. **Expanded triage trees** — drowning, electric shock, stroke FAST, seizures, snake bite

## Recent Improvements

- **Offline Emergency Matching Fallback**: If the Groq API is unreachable, unconfigured, or offline, user prompts are automatically parsed via `detectEmergency` across English, Hindi, and Romanized aliases to provide immediate structured first-aid guidance.
- **Chat Contrast & Accessibility Fix**: Restructured user message bubbles in the AI Guidance interface to ensure high-contrast white text (`#FFFFFF`) against dark backgrounds with robust word-break handling.
- **Groq Model Modernization**: Upgraded model identifiers to active Groq endpoints across chat (`openai/gpt-oss-20b`), multimodal vision (`qwen/qwen3.8-27b`), and audio transcription (`whisper-large-v3-turbo`).
- **Interactive OpenStreetMap & OSRM Routing**: Integrated dynamic Overpass API queries for emergency facilities within 5 km and Leaflet turn-by-turn route calculations with curated offline fallbacks.
- **Video Query Transformer**: Automatic compression and translation of multilingual emergency prompts into focused English tutorial queries for YouTube integration.

## Disclaimer

This app is a **first-response aid**, not a substitute for professional medical care. Always call emergency services. Steps are based on standard first-aid guidance (American Heart Association / Red Cross style) but may not apply to every situation.

## License

Hackathon prototype — no license declared yet.
