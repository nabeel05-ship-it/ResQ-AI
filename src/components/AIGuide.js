import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import BrandLogo from "./BrandLogo";

const GUIDE_STEPS = {
  "English": [
    {
      "icon": "🚨",
      "title": "Welcome to Emergency Response AI!",
      "desc": "I'm ResQ AI — your 24/7 emergency guide. I'll help you stay calm and take the right steps in any crisis.",
      "tip": "Tip: Always call 112 for immediate emergency help!"
    },
    {
      "icon": "🌐",
      "title": "Multilingual Support",
      "desc": "You've selected your preferred language(s). I can understand and respond in your language — even in the chat!",
      "tip": "You can type in Hindi, English, or any selected language in the chat."
    },
    {
      "icon": "🆘",
      "title": "How to Get Help",
      "desc": "Type or speak your emergency. I'll give you step-by-step first-aid instructions instantly.",
      "tip": "Press the 🎤 mic button to speak your emergency!"
    },
    {
      "icon": "📍",
      "title": "Find Nearby Services",
      "desc": "Use 'Find Nearby' to locate hospitals, police stations, and fire departments near you.",
      "tip": "Allow location access for accurate nearby services."
    },
    {
      "icon": "📞",
      "title": "Quick Emergency Calls",
      "desc": "One-tap call buttons for 112 (All), 102 (Ambulance), 101 (Fire), 100 (Police) are always visible.",
      "tip": "Save these numbers: 112, 102, 101, 100"
    },
    {
      "icon": "✅",
      "title": "You're Ready!",
      "desc": "You're all set! Remember — in any emergency, stay calm, follow the steps, and call for help.",
      "tip": "This guide is available anytime from the home screen."
    }
  ],
  "Hindi": [
    {
      "icon": "🚨",
      "title": "आपातकालीन AI में आपका स्वागत है!",
      "desc": "मैं ResQ AI हूँ — आपका 24/7 आपातकालीन मार्गदर्शक। किसी भी संकट में मैं आपको शांत रहने और सही कदम उठाने में मदद करूँगा।",
      "tip": "टिप: तुरंत मदद के लिए हमेशा 112 पर कॉल करें!"
    },
    {
      "icon": "🌐",
      "title": "बहुभाषी समर्थन",
      "desc": "आपने अपनी पसंदीदा भाषा चुनी है। मैं आपकी भाषा में समझ और जवाब दे सकता हूँ — चैट में भी!",
      "tip": "चैट में हिंदी, अंग्रेजी या कोई भी चुनी भाषा में लिखें।"
    },
    {
      "icon": "🆘",
      "title": "मदद कैसे पाएं",
      "desc": "अपना आपातकाल टाइप करें या बोलें। मैं तुरंत चरण-दर-चरण प्राथमिक चिकित्सा निर्देश दूँगा।",
      "tip": "माइक बटन 🎤 दबाकर अपना आपातकाल बोलें!"
    },
    {
      "icon": "📍",
      "title": "पास की सेवाएं खोजें",
      "desc": "'नजदीकी खोजें' से अस्पताल, पुलिस स्टेशन और फायर स्टेशन खोजें।",
      "tip": "सटीक जानकारी के लिए लोकेशन की अनुमति दें।"
    },
    {
      "icon": "📞",
      "title": "त्वरित आपातकालीन कॉल",
      "desc": "112, 102 (एम्बुलेंस), 101 (अग्निशमन), 100 (पुलिस) के लिए एक-टैप कॉल उपलब्ध है।",
      "tip": "इन नंबरों को याद रखें: 112, 102, 101, 100"
    },
    {
      "icon": "✅",
      "title": "आप तैयार हैं!",
      "desc": "सब कुछ तैयार है! आपातकाल में शांत रहें, निर्देशों का पालन करें और मदद लें।",
      "tip": "यह गाइड कभी भी होम स्क्रीन से उपलब्ध है।"
    }
  ],
  "Kannada": [
    {
      "icon": "🚨",
      "title": "ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ AI ಗೆ ಸುಸ್ವಾಗತ!",
      "desc": "ನಾನು ResQ AI — ನಿಮ್ಮ 24/7 ತುರ್ತು ಮಾರ್ಗದರ್ಶಿ. ಯಾವುದೇ ಬಿಕ್ಕಟ್ಟಿನಲ್ಲಿ ಶಾಂತರಾಗಿರಲು ಮತ್ತು ಸರಿಯಾದ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",
      "tip": "ಸಲಹೆ: ತಕ್ಷಣದ ಸಹಾಯಕ್ಕಾಗಿ ಯಾವಾಗಲೂ 112 ಗೆ ಕರೆ ಮಾಡಿ!"
    },
    {
      "icon": "🌐",
      "title": "ಬಹುಭಾಷಾ ಬೆಂಬಲ",
      "desc": "ನೀವು ಕನ್ನಡವನ್ನು ಆಯ್ಕೆ ಮಾಡಿದ್ದೀರಿ. ನಾನು ಕನ್ನಡದಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬಲ್ಲೆ ಮತ್ತು ಉತ್ತರಿಸಬಲ್ಲೆ!",
      "tip": "ನೀವು ಚಾಟ್‌ನಲ್ಲಿ ಕನ್ನಡದಲ್ಲಿ ಟೈಪ್ ಮಾಡಬಹುದು ಅಥವಾ ಮಾತನಾಡಬಹುದು."
    },
    {
      "icon": "🆘",
      "title": "ಸಹಾಯ ಪಡೆಯುವುದು ಹೇಗೆ",
      "desc": "ನಿಮ್ಮ ತುರ್ತು ಪರಿಸ್ಥಿತಿಯನ್ನು ಬರೆಯಿರಿ ಅಥವಾ ಮಾತನಾಡಿ. ನಾನು ತಕ್ಷಣ ಪ್ರಥಮ ಚಿಕಿತ್ಸಾ ಹಂತಗಳನ್ನು ನೀಡುತ್ತೇನೆ.",
      "tip": "ಮಾತನಾಡಲು 🎤 ಮೈಕ್ ಬಟನ್ ಒತ್ತಿರಿ!"
    },
    {
      "icon": "📍",
      "title": "ಹತ್ತಿರದ ಸೇವೆಗಳು",
      "desc": "ನಿಮ್ಮ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು, ಪೊಲೀಸ್ ಠಾಣೆಗಳು ಮತ್ತು ಅಗ್ನಿಶಾಮಕ ದಳಗಳನ್ನು ಹುಡುಕಿ.",
      "tip": "ನಿಖರ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ಲೊಕೇಶನ್ ಅನುಮತಿ ನೀಡಿ."
    },
    {
      "icon": "📞",
      "title": "ತ್ವರಿತ ತುರ್ತು ಕರೆಗಳು",
      "desc": "112, 102 (ಆಂಬ್ಯುಲೆನ್ಸ್), 101 (ಅಗ್ನಿಶಾಮಕ) ಗೆ ಒಂದೇ ಟ್ಯಾಪ್‌ನಲ್ಲಿ ಕರೆ ಮಾಡಿ.",
      "tip": "ಈ ಸಂಖ್ಯೆಗಳನ್ನು ನೆನಪಿಡಿ: 112, 102, 101"
    },
    {
      "icon": "✅",
      "title": "ನೀವು ಸಿದ್ಧರಿದ್ದೀರಿ!",
      "desc": "ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಧೈರ್ಯವಾಗಿರಿ, ಹಂತಗಳನ್ನು ಅನುಸರಿಸಿ ಮತ್ತು ಸಹಾಯ ಪಡೆಯಿರಿ.",
      "tip": "ಈ ಮಾರ್ಗದರ್ಶಿ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಲಭ್ಯವಿದೆ."
    }
  ],
  "Marathi": [
    {
      "icon": "🚨",
      "title": "इमर्जन्सी रिस्पॉन्स AI मध्ये आपले स्वागत आहे!",
      "desc": "मी ResQ AI — आपला २४/७ आपत्कालीन मार्गदर्शक. संकटात शांत राहून योग्य पावले उचलण्यास मी मदत करेन.",
      "tip": "टीप: त्वरित मदतीसाठी नेहमी ११२ वर कॉल करा!"
    },
    {
      "icon": "🌐",
      "title": "बहुभाषिक सहाय्य",
      "desc": "मी मराठीत समजू शकतो आणि उत्तर देऊ शकतो — अगदी चॅटमध्येही!",
      "tip": "आपण चॅटमध्ये मराठीत टाईप करू शकता."
    },
    {
      "icon": "🆘",
      "title": "मदत कशी मिळवायची",
      "desc": "आपली समस्या लिहा किंवा बोला. मी लगेच प्रथमोपचाराची माहिती देईन.",
      "tip": "बोलण्यासाठी 🎤 माइक बटण दाबा!"
    },
    {
      "icon": "📍",
      "title": "जवळची रुग्णालये आणि सेवा",
      "desc": "जवळचे रुग्णालय, पोलीस ठाणे आणि अग्निशामक दल सहज शोधा.",
      "tip": "अचूकतेसाठी लोकेशन परवानगी द्या."
    },
    {
      "icon": "📞",
      "title": "जलद आपत्कालीन कॉल",
      "desc": "११२, १०२ (रुग्णवाहिका), १०१ (अग्निशामक) साठी एक-टॅप कॉल.",
      "tip": "हे क्रमांक लक्षात ठेवा: ११२, १०२, १०१"
    },
    {
      "icon": "✅",
      "title": "आपण सज्ज आहात!",
      "desc": "संकटात शांत राहा, सूचनांचे पालन करा आणि मदत मिळवा.",
      "tip": "हे मार्गदर्शन होम स्क्रीनवरून नेहमी उपलब्ध आहे."
    }
  ],
  "Bengali": [
    {
      "icon": "🚨",
      "title": "জরুরী রেসপন্স AI-তে স্বাগতম!",
      "desc": "আমি ResQ AI — আপনার ২৪/৭ জরুরী সহায়ক। যেকোনো সংকটে শান্ত থেকে সঠিক পদক্ষেপ নিতে সাহায্য করব।",
      "tip": "টিপ: তাৎক্ষণিক সাহায্যের জন্য সর্বদা ১১২ ডায়াল করুন!"
    },
    {
      "icon": "🌐",
      "title": "বহুভাষিক সহায়তা",
      "desc": "আমি বাংলায় বুঝতে এবং উত্তর দিতে পারি — চ্যাটেও!",
      "tip": "চ্যাটে বাংলায় লিখতে বা বলতে পারেন।"
    },
    {
      "icon": "🆘",
      "title": "সাহায্য পাওয়ার উপায়",
      "desc": "আপনার সমস্যা লিখুন বা বলুন। আমি ধাপে ধাপে প্রাথমিক চিকিৎসার পরামর্শ দেব।",
      "tip": "কথা বলতে 🎤 মাইক বোতাম চাপুন!"
    },
    {
      "icon": "📍",
      "title": "কাছের জরুরী সেবা",
      "desc": "কাছের হাসপাতাল, পুলিশ স্টেশন এবং দমকল কেন্দ্র খুঁজুন।",
      "tip": "সঠিক তথ্যের জন্য লোকেশন অন রাখুন।"
    },
    {
      "icon": "📞",
      "title": "জরুরী নম্বরসমূহ",
      "desc": "১১২, ১০২ (অ্যাম্বুলেন্স), ১০১ (দমকল) নম্বরে সরাসরি কল করুন।",
      "tip": "নম্বরগুলি মনে রাখুন: ১১২, ১০২, ১০১"
    },
    {
      "icon": "✅",
      "title": "আপনি প্রস্তুত!",
      "desc": "জরুরী অবস্থায় শান্ত থাকুন, নির্দেশাবলী অনুসরণ করুন।",
      "tip": "এই গাইড হোম স্ক্রিন থেকে যেকোনো সময় পাবেন।"
    }
  ],
  "Tamil": [
    {
      "icon": "🚨",
      "title": "ResQ AI அவசர வழிகாட்டிக்கு நல்வரவு!",
      "desc": "நான் ResQ AI — உங்கள் 24/7 அவசர வழிகாட்டி. எந்தவொரு அவசரநிலையிலும் அமைதியாக சரியான படிகளை எடுக்க உதவுவேன்.",
      "tip": "உதவிக்கு எப்போதும் 112 ஐ அழைக்கவும்!"
    },
    {
      "icon": "🌐",
      "title": "தமிழ் மொழி ஆதரவு",
      "desc": "நான் தமிழில் புரிந்து கொண்டு பதிலளிப்பேன் — அரட்டையிலும்!",
      "tip": "தமிழில் தட்டச்சு செய்யவும் அல்லது பேசவும் முடியும்."
    },
    {
      "icon": "🆘",
      "title": "உதவி பெறுவது எப்படி",
      "desc": "உங்கள் அவசரநிலையை தட்டச்சு செய்யவும் அல்லது பேசவும். முதலுதவி படிகளை உடனே தருகிறேன்.",
      "tip": "பேச 🎤 மைக் பொத்தானை அழுத்தவும்!"
    },
    {
      "icon": "📍",
      "title": "அருகிலுள்ள அவசர சேவைகள்",
      "desc": "அருகிலுள்ள மருத்துவமனைகள், காவல் நிலையங்கள் மற்றும் தீயணைப்பு நிலையங்களைக் கண்டறியவும்.",
      "tip": "துல்லியத்திற்கு இருப்பிட அனுமதியை வழங்கவும்."
    },
    {
      "icon": "📞",
      "title": "விரைவு அழைப்புகள்",
      "desc": "112, 102 (ஆம்புலன்ஸ்), 101 (தீயணைப்பு) எண்களுக்கு ஒரே தட்டலில் அழைக்கலாம்.",
      "tip": "இந்த எண்களை நினைவில் கொள்ளுங்கள்: 112, 102, 101"
    },
    {
      "icon": "✅",
      "title": "நீங்கள் தயார்!",
      "desc": "அவசரத்தில் அமைதியாக இருங்கள், படிகளைப் பின்பற்றுங்கள்.",
      "tip": "இந்த வழிகாட்டி எப்போதும் முகப்புத் திரையில் கிடைக்கும்."
    }
  ],
  "Telugu": [
    {
      "icon": "🚨",
      "title": "ఎమర్జెన్సీ రెస్పాన్స్ AI కి స్వాగతం!",
      "desc": "నేను ResQ AI — మీ 24/7 అత్యవసర సహాయకుడిని. ఆపదలో ప్రశాంతంగా సరైన చర్యలు తీసుకోవడానికి సహాయం చేస్తాను.",
      "tip": "తక్షణ సహాయం కోసం ఎల్లప్పుడూ 112 కి కాల్ చేయండి!"
    },
    {
      "icon": "🌐",
      "title": "తెలుగు భాషా మద్దతు",
      "desc": "నేను తెలుగులో అర్థం చేసుకుని సమాధానం ఇవ్వగలను!",
      "tip": "మీరు చాట్‌లో తెలుగులో టైప్ చేయవచ్చు లేదా మాట్లాడవచ్చు."
    },
    {
      "icon": "🆘",
      "title": "సహాయం పొందడం ఎలా",
      "desc": "మీ పరిస్థితిని చెప్పండి లేదా టైప్ చేయండి. తక్షణ ప్రథమ చికిత్స దశలను అందిస్తాను.",
      "tip": "మాట్లాడటానికి 🎤 మైక్ బటన్ నొక్కండి!"
    },
    {
      "icon": "📍",
      "title": "సమీప అత్యవసర సేవలు",
      "desc": "దగ్గరలోని ఆసుపత్రులు, పోలీస్ స్టేషన్లు మరియు అగ్నిమాపక కేంద్రాలను కనుగొనండి.",
      "tip": "ఖచ్చితమైన సేవల కోసం లొకేషన్ ఆన్ చేయండి."
    },
    {
      "icon": "📞",
      "title": "త్వరిత అత్యవసర కాల్స్",
      "desc": "112, 102 (అంబులెన్స్), 101 (ఫైర్) నంబర్లకు ఒకే ట్యాప్‌తో కాల్ చేయండి.",
      "tip": "ఈ నంబర్లను గుర్తుంచుకోండి: 112, 102, 101"
    },
    {
      "icon": "✅",
      "title": "మీరు సిద్ధంగా ఉన్నారు!",
      "desc": "ఆపదలో ప్రశాంతంగా ఉండండి, సూచనలను పాటించండి.",
      "tip": "ఈ గైడ్ ఎప్పుడైనా హోమ్ స్క్రీన్ నుండి అందుబాటులో ఉంటుంది."
    }
  ],
  "Gujarati": [
    {
      "icon": "🚨",
      "title": "ઇમરજન્સી રિસ્પોન્સ AI માં આપનું સ્વાગત છે!",
      "desc": "હું ResQ AI છું — તમારો 24/7 કટોકટી માર્ગદર્શક. સંકટ સમયે યોગ્ય પગલાં લેવામાં મદદ કરીશ.",
      "tip": "તરત મદદ માટે હંમેશા 112 પર કૉલ કરો!"
    },
    {
      "icon": "🌐",
      "title": "ગુજરાતી ભાષા સપોર્ટ",
      "desc": "હું ગુજરાતીમાં સમજી શકું છું અને જવાબ આપી શકું છું!",
      "tip": "તમે ચેટમાં ગુજરાતીમાં લખી કે બોલી શકો છો."
    },
    {
      "icon": "🆘",
      "title": "મદદ કેવી રીતે મેળવવી",
      "desc": "તમારી કટોકટી લખો અથવા બોલો. હું પ્રાથમિક સારવારના પગલાં તરત જ આપીશ.",
      "tip": "બોલવા માટે 🎤 માઇક બટન દબાવો!"
    },
    {
      "icon": "📍",
      "title": "નજીકની સુવિધાઓ",
      "desc": "નજીકની હોસ્પિટલ, પોલીસ સ્ટેશન અને ફાયર સ્ટેશન શોધો.",
      "tip": "ચોક્કસ માહિતી માટે લોકેશન ચાલુ રાખો."
    },
    {
      "icon": "📞",
      "title": "ઝડપી ઇમરજન્સી કૉલ",
      "desc": "112, 102 (એમ્બ્યુલન્સ), 101 (ફાયર) માટે એક-ક્લિક કૉલ.",
      "tip": "આ નંબરો યાદ રાખો: 112, 102, 101"
    },
    {
      "icon": "✅",
      "title": "તમે તૈયાર છો!",
      "desc": "કટોકટીમાં શાંત રહો અને સૂચનાઓનું પાલન કરો.",
      "tip": "આ ગાઇડ હંમેશા હોમ સ્ક્રીન પર ઉપલબ્ધ છે."
    }
  ],
  "Punjabi": [
    {
      "icon": "🚨",
      "title": "ਐਮਰਜੈਂਸੀ ਰਿਸਪਾਂਸ AI ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ!",
      "desc": "ਮੈਂ ResQ AI ਹਾਂ — ਤੁਹਾਡਾ 24/7 ਐਮਰਜੈਂਸੀ ਸਾਥੀ। ਸੰਕਟ ਸਮੇਂ ਸਹੀ ਕਦਮ ਚੁੱਕਣ ਵਿੱਚ ਮਦਦ ਕਰਾਂਗਾ।",
      "tip": "ਤੁਰੰਤ ਮਦਦ ਲਈ ਹਮੇਸ਼ਾ 112 'ਤੇ ਕਾਲ ਕਰੋ!"
    },
    {
      "icon": "🌐",
      "title": "ਪੰਜਾਬੀ ਭਾਸ਼ਾ ਸਹਾਇਤਾ",
      "desc": "ਮੈਂ ਪੰਜਾਬੀ ਵਿੱਚ ਸਮਝ ਅਤੇ ਜਵਾਬ ਦੇ ਸਕਦਾ ਹਾਂ!",
      "tip": "ਤੁਸੀਂ ਚੈਟ ਵਿੱਚ ਪੰਜਾਬੀ ਵਿੱਚ ਲਿਖ ਜਾਂ ਬੋਲ ਸਕਦੇ ਹੋ।"
    },
    {
      "icon": "🆘",
      "title": "ਮਦਦ ਕਿਵੇਂ ਪ੍ਰਾਪਤ ਕਰੀਏ",
      "desc": "ਆਪਣੀ ਐਮਰਜੈਂਸੀ ਦੱਸੋ ਜਾਂ ਲਿਖੋ। ਮੈਂ ਤੁਰੰਤ ਫਸਟ-ਏਡ ਕਦਮ ਦੱਸਾਂਗਾ।",
      "tip": "ਬੋਲਣ ਲਈ 🎤 ਮਾਈਕ ਬਟਨ ਦਬਾਓ!"
    },
    {
      "icon": "📍",
      "title": "ਨੇੜਲੀਆਂ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ",
      "desc": "ਨੇੜਲੇ ਹਸਪਤਾਲ, ਪੁਲਿਸ ਥਾਣੇ ਅਤੇ ਫਾਇਰ ਸਟੇਸ਼ਨ ਲੱਭੋ।",
      "tip": "ਸਹੀ ਸੇਵਾਵਾਂ ਲਈ ਲੋਕੇਸ਼ਨ ਆਨ ਰੱਖੋ।"
    },
    {
      "icon": "📞",
      "title": "ਜ਼ਰੂਰੀ ਕਾਲਾਂ",
      "desc": "112, 102 (ਐਂਬੂਲੈਂਸ), 101 (ਫਾਇਰ) ਲਈ ਇੱਕ-ਟੈਪ ਕਾਲ।",
      "tip": "ਇਹ ਨੰਬਰ ਯਾਦ ਰੱਖੋ: 112, 102, 101"
    },
    {
      "icon": "✅",
      "title": "ਤੁਸੀਂ ਤਿਆਰ ਹੋ!",
      "desc": "ਐਮਰਜੈਂਸੀ ਵਿੱਚ ਸ਼ਾਂਤ ਰਹੋ ਅਤੇ ਨਿਰਦੇਸ਼ਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ।",
      "tip": "ਇਹ ਗਾਈਡ ਹਮੇਸ਼ਾ ਹੋਮ ਸਕ੍ਰੀਨ 'ਤੇ ਉਪਲਬਧ ਹੈ।"
    }
  ],
  "Malayalam": [
    {
      "icon": "🚨",
      "title": "എമർജൻസി റെസ്‌പോൺസ് AI-ലേക്ക് സ്വാഗതം!",
      "desc": "ഞാൻ ResQ AI — നിങ്ങളുടെ 24/7 അടിയന്തര സഹായി. ഏത് പ്രതിസന്ധിയിലും ശരിയായ നടപടികൾ സ്വീകരിക്കാൻ സഹായിക്കും.",
      "tip": "ഉടൻ സഹായത്തിന് 112 വിളിക്കുക!"
    },
    {
      "icon": "🌐",
      "title": "മലയാളം പിന്തുണ",
      "desc": "എനിക്ക് മലയാളത്തിൽ മനസ്സിലാക്കാനും മറുപടി നൽകാനും കഴിയും!",
      "tip": "നിങ്ങൾക്ക് മലയാളത്തിൽ സംസാരിക്കുകയോ ടൈപ്പ് ചെയ്യുകയോ ചെയ്യാം."
    },
    {
      "icon": "🆘",
      "title": "സഹായം എങ്ങനെ നേടാം",
      "desc": "വിവരം പറയുക അല്ലെങ്കിൽ എഴുതുക. ഉടനടി പ്രഥമശുശ്രൂഷാ ഘട്ടങ്ങൾ നൽകാം.",
      "tip": "സംസാരിക്കാൻ 🎤 മൈക്ക് ബട്ടൺ അമർത്തുക!"
    },
    {
      "icon": "📍",
      "title": "സമീപത്തെ സേവനങ്ങൾ",
      "desc": "അടുത്തുള്ള ആശുപത്രികൾ, പോലീസ് സ്റ്റേഷനുകൾ, ഫയർ സ്റ്റേഷനുകൾ എന്നിവ കണ്ടെത്തുക.",
      "tip": "കൃത്യതയ്ക്കായി ലൊക്കേഷൻ ഓൺ ചെയ്യുക."
    },
    {
      "icon": "📞",
      "title": "അടിയന്തര കോളുകൾ",
      "desc": "112, 102 (ആംബുലൻസ്), 101 (ഫയർ) എന്നിവ ഒറ്റ ടാപ്പിൽ വിളിക്കാം.",
      "tip": "ഈ നമ്പറുകൾ ഓർക്കുക: 112, 102, 101"
    },
    {
      "icon": "✅",
      "title": "നിങ്ങൾ തയ്യാറാണ്!",
      "desc": "അടിയന്തര ഘട്ടത്തിൽ ശാന്തത പാലിക്കുക, നിർദ്ദേശങ്ങൾ പാലിക്കുക.",
      "tip": "ഈ ഗൈഡ് ഹോം സ്ക്രീനിൽ എപ്പോഴും ലഭ്യമാണ്."
    }
  ],
  "Urdu": [
    {
      "icon": "🚨",
      "title": "ایمرجنسی رسپانس AI میں خوش آمدید!",
      "desc": "میں ResQ AI ہوں — آپ کا 24/7 ہنگامی ساتھی۔ کسی بھی بحران میں درست رہنمائی فراہم کروں گا۔",
      "tip": "فوری مدد کے لیے ہمیشہ 112 پر کال کریں!"
    },
    {
      "icon": "🌐",
      "title": "اردو زبان کی سہولت",
      "desc": "میں اردو میں سمجھ اور جواب دے سکتا ہوں!",
      "tip": "آپ چیٹ میں اردو میں بول یا لکھ سکتے ہیں۔"
    },
    {
      "icon": "🆘",
      "title": "مدد کیسے حاصل کریں",
      "desc": "اپنی صورتحال بتائیں یا لکھیں۔ میں فوری فرسٹ ایڈ اقدامات بتاؤں گا۔",
      "tip": "بولنے کے لیے 🎤 مائیک بٹن دبائیں!"
    },
    {
      "icon": "📍",
      "title": "قریبی ہنگامی خدمات",
      "desc": "قریبی ہسپتال، پولیس اسٹیشن اور فائر اسٹیشن تلاش کریں۔",
      "tip": "درست نتائج کے لیے لوکیشن کی اجازت دیں۔"
    },
    {
      "icon": "📞",
      "title": "فوری ایمرجنسی کالز",
      "desc": "112, 102 (ایمبولینس), 101 (فائر) کے لیے ایک ٹچ کال۔",
      "tip": "یہ نمبرز یاد رکھیں: 112, 102, 101"
    },
    {
      "icon": "✅",
      "title": "آپ تیار ہیں!",
      "desc": "ہنگامی حالت میں پرسکون رہیں اور ہدایات پر عمل کریں۔",
      "tip": "یہ گائیڈ ہوم اسکرین پر ہمیشہ دستیاب ہے۔"
    }
  ],
  "Odia": [
    {
      "icon": "🚨",
      "title": "ଜରୁରୀକାଳୀନ AI କୁ ସ୍ୱାଗତ!",
      "desc": "ମୁଁ ResQ AI — ଆପଣଙ୍କର ୨୪/୭ ସହାୟକ। ଯେକୌଣସି ବିପଦରେ ଶାନ୍ତ ରହି ସଠିକ୍ ପଦକ୍ଷେପ ନେବାରେ ସାହାଯ୍ୟ କରିବି।",
      "tip": "ତୁରନ୍ତ ସାହାଯ୍ୟ ପାଇଁ ସର୍ବଦା 112 କଲ୍ କରନ୍ତୁ!"
    },
    {
      "icon": "🌐",
      "title": "ଓଡ଼ିଆ ଭାଷା ସହାୟତା",
      "desc": "ମୁଁ ଓଡ଼ିଆରେ ବୁଝିପାରିବି ଏବଂ ଉତ୍ତର ଦେଇପାରିବି!",
      "tip": "ଆପଣ ଓଡ଼ିଆରେ କହିପାରିବେ କିମ୍ବା ଲେଖିପାରିବେ।"
    },
    {
      "icon": "🆘",
      "title": "ସାହାଯ୍ୟ କିପରି ପାଇବେ",
      "desc": "ଆପଣଙ୍କର ଅସୁବିଧା କୁହନ୍ତୁ ବା ଲେଖନ୍ତୁ। ତୁରନ୍ତ ପ୍ରାଥମିକ ଚିକିତ୍ସା ପରାମର୍ଶ ମିଳିବ।",
      "tip": "କହିବା ପାଇଁ 🎤 ମାଇକ୍ ବଟନ୍ ଦବାନ୍ତୁ!"
    },
    {
      "icon": "📍",
      "title": "ନିକଟସ୍ଥ ଜରୁରୀକାଳୀନ ସେବା",
      "desc": "ନିକଟସ୍ଥ ଡାକ୍ତରଖାନା, ଥାନା ଓ ଦମକଳ କେନ୍ଦ୍ର ଖୋଜନ୍ତୁ।",
      "tip": "ସଠିକ୍ ଫଳାଫଳ ପାଇଁ ଲୋକେସନ୍ ଅନ୍ ରଖନ୍ତୁ।"
    },
    {
      "icon": "📞",
      "title": "ତ୍ୱରିତ କଲ୍",
      "desc": "112, 102 (ଆମ୍ବୁଲାନ୍ସ), 101 (ଦମକଳ) କୁ ଗୋଟିଏ କ୍ଲିକ୍‌ରେ କଲ୍ କରନ୍ତୁ।",
      "tip": "ଏହି ନମ୍ବରଗୁଡ଼ିକ ମନେ ରଖନ୍ତୁ: 112, 102, 101"
    },
    {
      "icon": "✅",
      "title": "ଆପଣ ପ୍ରସ୍ତୁତ!",
      "desc": "ବିପଦରେ ଶାନ୍ତ ରୁହନ୍ତୁ, ପଦକ୍ଷେପ ଅନୁସରଣ କରନ୍ତୁ।",
      "tip": "ଏହି ଗାଇଡ୍ ମୁଖ୍ୟ ପୃଷ୍ଠାରେ ସବୁବେଳେ ଉପଲବ୍ଧ।"
    }
  ]
};

const getGuideSteps = (lang) => GUIDE_STEPS[lang] || GUIDE_STEPS["English"];

export default function AIGuide({ onClose }) {
  const { primaryLang, t } = useAppContext();
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const steps = getGuideSteps(primaryLang);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  const goNext = () => {
    setAnimating(true);
    setTimeout(() => {
      if (isLast) {
        onClose();
      } else {
        setStep((s) => s + 1);
        setAnimating(false);
      }
    }, 250);
  };

  const goPrev = () => {
    if (step === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setAnimating(false);
    }, 250);
  };

  const stepLabel = t?.triage?.step || "Step";
  const ofLabel = t?.triage?.of || "/";
  const prevLabel = t?.triage?.prevStep || "Back";
  const nextLabel = t?.triage?.nextStep || "Next →";
  const startLabel = t?.auth?.continueBtn ? `${t.auth.continueBtn} 🚀` : "Get Started 🚀";

  return (
    <div style={overlay}>
      <div style={modal}>
        {/* Close */}
        <button style={closeBtn} onClick={onClose} aria-label="Close">×</button>

        {/* Progress */}
        <div style={progressBar}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                ...progressDot,
                background: i <= step ? "#667eea" : "#e2e8f0",
                width: i === step ? "24px" : "8px",
              }}
            />
          ))}
        </div>

        {/* Step Counter */}
        <p style={stepCounter}>
          {stepLabel} {step + 1} {ofLabel} {steps.length}
        </p>

        {/* Content */}
        <div style={{ ...contentBox, opacity: animating ? 0 : 1, transition: "opacity 0.25s" }}>
          {step === 0 ? (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <BrandLogo variant="icon" size={60} isDecorative={true} alt="" />
            </div>
          ) : (
            <div style={iconCircle}>{current.icon}</div>
          )}
          <h2 style={title}>{current.title}</h2>
          <p style={desc}>{current.desc}</p>
          <div style={tipBox}>
            <span style={tipIcon}>💡</span>
            <span style={tipText}>{current.tip}</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={btnRow}>
          {step > 0 && (
            <button style={prevBtn} onClick={goPrev}>
              ← {prevLabel}
            </button>
          )}
          <button style={{ ...nextBtn, marginLeft: step === 0 ? "auto" : "0" }} onClick={goNext}>
            {isLast ? startLabel : nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,0.7)",
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: "20px",
};

const modal = {
  background: "#fff",
  borderRadius: "28px",
  padding: "28px 24px 24px",
  width: "100%",
  maxWidth: "400px",
  boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
  position: "relative",
  textAlign: "center",
};

const closeBtn = {
  position: "absolute",
  top: "16px",
  right: "16px",
  background: "#f1f5f9",
  border: "none",
  borderRadius: "50%",
  width: "32px",
  height: "32px",
  fontSize: "18px",
  cursor: "pointer",
  color: "#64748b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const progressBar = {
  display: "flex",
  justifyContent: "center",
  gap: "6px",
  marginBottom: "12px",
  alignItems: "center",
};

const progressDot = {
  height: "8px",
  borderRadius: "4px",
  transition: "all 0.3s ease",
};

const stepCounter = {
  fontSize: "11px",
  fontWeight: "700",
  color: "#94a3b8",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: "16px",
};

const contentBox = {
  minHeight: "220px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const iconCircle = {
  fontSize: "44px",
  marginBottom: "12px",
  lineHeight: 1,
};

const title = {
  fontSize: "18px",
  fontWeight: "800",
  color: "#0f172a",
  marginBottom: "10px",
  lineHeight: "1.3",
};

const desc = {
  fontSize: "14px",
  color: "#475569",
  lineHeight: "1.6",
  marginBottom: "16px",
  maxWidth: "320px",
};

const tipBox = {
  background: "#f0fdf4",
  border: "1px solid #bbf7d0",
  borderRadius: "12px",
  padding: "8px 14px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  maxWidth: "320px",
  textAlign: "left",
};

const tipIcon = {
  fontSize: "14px",
  flexShrink: 0,
};

const tipText = {
  fontSize: "12px",
  color: "#166534",
  fontWeight: "500",
  lineHeight: "1.4",
};

const btnRow = {
  display: "flex",
  gap: "10px",
  marginTop: "24px",
};

const prevBtn = {
  flex: 1,
  padding: "12px",
  borderRadius: "14px",
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  color: "#475569",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
};

const nextBtn = {
  flex: 2,
  padding: "12px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
};
