// UNIKORN360 Multilingual i18n Dictionary & Translation Engine

export interface TranslationDictionary {
  [key: string]: {
    [lang: string]: string;
  };
}

export const translations: TranslationDictionary = {
  // Navigation & Header
  solutions: {
    EN: 'AI Solutions',
    HI: 'एआई समाधान',
    TA: 'AI தீர்வுகள்',
    TE: 'AI పరిష్కారాలు',
    KN: 'AI ಪರಿಹಾರಗಳು',
    MR: 'AI उपाय',
    ES: 'Soluciones AI',
    FR: 'Solutions IA',
    DE: 'KI-Lösungen',
    AR: 'حلول الذكاء الاصطناعي',
  },
  aiBrain: {
    EN: 'Digital Business Brain',
    HI: 'डिजिटल बिजनेस ब्रेन',
    TA: 'டிஜிட்டல் பிசினஸ் மூளை',
    TE: 'డిజిటల్ బిజినెస్ బ్రెయిన్',
    KN: 'ಡಿಜಿಟಲ್ ಬಿಸಿನೆಸ್ ಮೆದುಳು',
    MR: 'डिजिटल बिझनेस ब्रेन',
    ES: 'Cerebro Digital de Negocios',
    FR: 'Cerveau Digital d\'Entreprise',
    DE: 'Digitales Unternehmensgehirn',
    AR: 'العقل الرقمي للأعمال',
  },
  concierge: {
    EN: 'Ask UNIKORN360 AI',
    HI: 'UNIKORN360 AI से पूछें',
    TA: 'UNIKORN360 AI இடம் கேளுங்கள்',
    TE: 'UNIKORN360 AI ని అడగండి',
    KN: 'UNIKORN360 AI ಅನ್ನು ಕೇಳಿ',
    MR: 'UNIKORN360 AI ला विचारा',
    ES: 'Preguntar a UNIKORN360 AI',
    FR: 'Demander à UNIKORN360 AI',
    DE: 'UNIKORN360 KI Fragen',
    AR: 'اسأل UNIKORN360 AI',
  },
  bookDemo: {
    EN: 'Book Executive Demo',
    HI: 'डेमो बुक करें',
    TA: 'டெமோ முன்பதிவு செய்க',
    TE: 'డెమో బుక్ చేయండి',
    KN: 'ಡೆಮೊ బుక్ ಮಾಡಿ',
    MR: 'डेमो बुक करा',
    ES: 'Reservar Demo',
    FR: 'Réserver une Démo',
    DE: 'Demo Buchen',
    AR: 'حجز العرض التوضيحي',
  },
  signIn: {
    EN: 'Sign In',
    HI: 'साइन इन करें',
    TA: 'உள்நுழைக',
    TE: 'సైన్ ఇన్ చేయండి',
    KN: 'ಸೈನ್ ಇನ್ ಮಾಡಿ',
    MR: 'साइन इन करा',
    ES: 'Iniciar Sesión',
    FR: 'Se Connecter',
    DE: 'Anmelden',
    AR: 'تسجيل الدخول',
  },
  portal: {
    EN: 'Client Portal',
    HI: 'ग्राहक पोर्टल',
    TA: 'வாடிக்கையாளர் போர்டல்',
    TE: 'క్లయింట్ పోర్టల్',
    KN: 'ಕ್ಲೈಂಟ್ ಪೋರ್ಟಲ್',
    MR: 'क्लायंट पोर्टल',
    ES: 'Portal de Clientes',
    FR: 'Portail Client',
    DE: 'Kundenportal',
    AR: 'بوابة العملاء',
  },
  adminCenter: {
    EN: 'Admin Command Center',
    HI: 'एडमिन कमांड सेंटर',
    TA: 'நிர்வாகக் கட்டளை மையம்',
    TE: 'అడ్మిన్ కమాండ్ సెంటర్',
    KN: 'ಅಡ್ಮಿನ್ ಕಮಾಂಡ್ ಸೆಂಟರ್',
    MR: 'ॲडमिन कमांड सेंटर',
    ES: 'Centro de Comando de Admin',
    FR: 'Centre de Commandement Admin',
    DE: 'Admin-Kommandozentrale',
    AR: 'مركز قيادة المسؤول',
  },
  signOut: {
    EN: 'Sign Out',
    HI: 'साइन आउट',
    TA: 'வெளியேறு',
    TE: 'సైన్ అవుట్',
    KN: 'ಸೈನ್ ಔಟ್',
    MR: 'साइन आउट',
    ES: 'Cerrar Sesión',
    FR: 'Déconnexion',
    DE: 'Abmelden',
    AR: 'تسجيل الخروج',
  },

  // Auth Modal
  authHeading: {
    EN: 'Welcome to UNIKORN360 AI Solutions',
    HI: 'UNIKORN360 AI सॉल्यूशंस में आपका स्वागत है',
    TA: 'UNIKORN360 AI தீர்வுகளுக்கு நல்வரவு',
    TE: 'UNIKORN360 AI సొల్యూషన్స్‌కు స్వాగతం',
    KN: 'UNIKORN360 AI ಸೊಲ್ಯೂಷನ್ಸ್‌ಗೆ സ്വാగತ',
    MR: 'UNIKORN360 AI सोल्यूशन्समध्ये तुमचे स्वागत आहे',
    ES: 'Bienvenido a UNIKORN360 AI Solutions',
    FR: 'Bienvenue sur UNIKORN360 AI Solutions',
    DE: 'Willkommen bei UNIKORN360 KI Solutions',
    AR: 'مرحبًا بك في حلول UNIKORN360 للذكاء الاصطناعي',
  },
  authSubheading: {
    EN: 'Sign in securely using your Google Workspace or Google account.',
    HI: 'अपने गूगल वर्कस्पेस या गूगल खाते का उपयोग करके सुरक्षित रूप से साइन इन करें।',
    TA: 'உங்கள் Google Workspace அல்லது Google கணக்கைப் பயன்படுத்தி பாதுகாப்பாக உள்நுழையவும்.',
    TE: 'మీ Google Workspace లేదా Google ఖాతాను ఉపయోగించి సురక్షితంగా సైన్ ఇన్ చేయండి.',
    KN: 'ನಿಮ್ಮ Google Workspace ಅಥವಾ Google ಖಾತೆಯನ್ನು ಬಳಸಿ ಸುರಕ್ಷಿತವಾಗಿ ಸೈನ್ ಇನ್ ಮಾಡಿ.',
    MR: 'तुमच्या Google Workspace किंवा Google खात्याचा वापर करून सुरक्षितपणे साइन इन करा.',
    ES: 'Inicie sesión de forma segura con su cuenta de Google Workspace o Google.',
    FR: 'Connectez-vous en toute sécurité avec votre compte Google Workspace ou Google.',
    DE: 'Melden Sie sich sicher mit Ihrem Google Workspace- oder Google-Konto an.',
    AR: 'سجّل الدخول بأمان باستخدام حساب Google Workspace أو حساب Google الخاص بك.',
  },
  continueGoogle: {
    EN: 'Continue with Google',
    HI: 'गूगल के साथ जारी रखें',
    TA: 'Google மூலம் தொடரவும்',
    TE: 'Google తో కొనసాగండి',
    KN: 'Google ನೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ',
    MR: 'Google सह पुढे जा',
    ES: 'Continuar con Google',
    FR: 'Continuer avec Google',
    DE: 'Mit Google Fortfahren',
    AR: 'المتابعة باستخدام Google',
  },

  // Hero Section
  heroBadge: {
    EN: 'ENTERPRISE AI & AUTONOMOUS AGENT ECOSYSTEM',
    HI: 'एंटरप्राइज एआई और स्वायत्त एजेंट पारिस्थितिकी तंत्र',
    TA: 'என்டர்பிரைஸ் AI மற்றும் தன்னாட்சி ஏஜென்ட் சூழல்மைவு',
    TE: 'ఎంటర్‌ప్రైజ్ AI & స్వయంప్రతిపత్తి ఏజెంట్ పర్యావరణ వ్యవస్థ',
    KN: 'ಎಂಟರ್‌ಪ್ರೈಸ್ AI & ಸ್ವಾಯತ್ತ ಏಜೆಂಟ್ ಪರಿಸರ ವ್ಯವಸ್ಥೆ',
    MR: 'एंटरप्राइज AI आणि स्वायत्त एजंट इकोसिस्टम',
    ES: 'ECOSISTEMA DE IA EMPRESARIAL Y AGENTES AUTÓNOMOS',
    FR: 'ÉCOSYSTÈME D\'IA D\'ENTREPRISE ET D\'AGENTS AUTONOMES',
    DE: 'ENTERPRISE KI UND AUTONOME AGENTEN-ÖKOSYSTEM',
    AR: 'منظومة الذكاء الاصطناعي للمؤسسات والوكلاء المستقلين',
  },
  heroTitle: {
    EN: 'Engineering Autonomous AI Intelligence for Tomorrow\'s Enterprise',
    HI: 'भविष्य के उद्यम के लिए स्वायत्त एआई बुद्धिमत्ता का निर्माण',
    TA: 'நாளை நிறுவனத்திற்கான தன்னாட்சி AI நுண்ணறிவை உருவாக்குதல்',
    TE: 'రేపటి ఎంటర్‌ప్రైజ్ కోసం స్వయంప్రతిపత్తి గల AI ఇంటెలిజెన్స్‌ను రూపొందించడం',
    KN: 'ನಾಳೆಯ ಎಂಟರ್‌ಪ್ರೈಸ್‌ಗಾಗಿ ಸ್ವಾಯತ್ತ AI ಬುದ್ಧಿವಂತಿಕೆಯನ್ನು ರೂಪಿಸುವುದು',
    MR: 'उद्याच्या एंटरप्राइजसाठी स्वायत्त एआय इंटेलिजन्सची निर्मिती',
    ES: 'Ingeniería de Inteligencia Artificial Autónoma para las Empresas del Mañana',
    FR: 'Ingénierie de l\'IA Autonome pour l\'Entreprise de Demain',
    DE: 'Entwicklung Autonomer KI-Intelligenz für das Unternehmen von Morgen',
    AR: 'هندسة الذكاء الاصطناعي المستقل لمؤسسات الغد',
  },
  heroSubtitle: {
    EN: 'UNIKORN360 deploys bespoke Multi-Agent Systems, Cognitive Business Process Automation, and Sovereign Neural Architectures to double operational velocity.',
    HI: 'UNIKORN360 परिचालन गति को दोगुना करने के लिए बीस्पोक मल्टी-एजेंट सिस्टम और संज्ञानात्मक स्वचालन तैनात करता है।',
    TA: 'செயல்பாட்டு வேகத்தை இரட்டிப்பாக்க UNIKORN360 பிரத்யேக மல்டி-ஏஜென்ட் அமைப்புகளைப் பயன்படுத்துகிறது.',
    TE: 'ఆపరేషనల్ వేగాన్ని రెట్టింపు చేయడానికి UNIKORN360 బహుళ-ఏజెంట్ సిస్టమ్‌లను నియోగిస్తుంది.',
    KN: 'ಕಾರ್ಯಾಚರಣೆಯ ವೇಗವನ್ನು ದ್ವಿಗುಣಗೊಳಿಸಲು UNIKORN360 ಮಲ್ಟಿ-ಏಜೆಂಟ್ ಸಿಸ್ಟಮ್‌ಗಳನ್ನು ನಿಯೋಜಿಸುತ್ತದೆ.',
    MR: 'कार्यक्षमतेचा वेग दुप्पट करण्यासाठी UNIKORN360 सानुकूल मल्टी-एजंट सिस्टम तैनात करते.',
    ES: 'UNIKORN360 despliega sistemas multi-agente personalizados y automatización cognitiva para duplicar la velocidad operativa.',
    FR: 'UNIKORN360 déploie des systèmes multi-agents sur mesure et une automatisation cognitive pour doubler la vitesse opérationnelle.',
    DE: 'UNIKORN360 setzt maßgeschneiderte Multi-Agenten-Systeme und kognitive Automatisierung ein, um die operative Geschwindigkeit zu verdoppeln.',
    AR: 'تطلق UNIKORN360 أنظمة متعددة الوكلاء وأتمتة العمليات المعرفية لمضاعفة السرعة التشغيلية.',
  },

  // Buttons & Controls
  exploreSolutions: {
    EN: 'Explore Solutions',
    HI: 'समाधान देखें',
    TA: 'தீர்வுகளை ஆராய்க',
    TE: 'పరిష్కారాలను అన్వేషించండి',
    KN: 'ಪರಿಹಾರಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    MR: 'उपाय शोधा',
    ES: 'Explorar Soluciones',
    FR: 'Explorer les Solutions',
    DE: 'Lösungen Erkunden',
    AR: 'استكشاف الحلول',
  },
  takeAssessment: {
    EN: 'Take Readiness Assessment',
    HI: 'तत्परता मूल्यांकन लें',
    TA: 'தயார்நிலை மதிப்பீட்டை எடுங்கள்',
    TE: 'సన్నద్ధత అంచనా వేయండి',
    KN: 'ಸಿದ್ಧತೆಯ ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ',
    MR: 'तयारीचे मूल्यमापन करा',
    ES: 'Realizar Evaluación de Preparación',
    FR: 'Faire l\'Évaluation de Préparation',
    DE: 'Bereitschaftsbewertung Starten',
    AR: 'إجراء تقييم الجاهزية',
  },
  searchPlaceholder: {
    EN: 'Search AI solutions, frameworks & documents...',
    HI: 'एआई समाधान, ढांचे और दस्तावेज खोजें...',
    TA: 'AI தீர்வுகள், கட்டமைப்புகள் & ஆவணங்களைத் தேடுங்கள்...',
    TE: 'AI పరిష్కారాలు, ఫ్రేమ్‌వర్క్‌లు & డాక్యుమెంట్‌లను శోధించండి...',
    KN: 'AI ಪರಿಹಾರಗಳು, ಫ್ರೇಮ್‌ವರ್ಕ್‌ಗಳು ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಹುಡುಕಿ...',
    MR: 'एआय सोल्यूशन्स, फ्रेमवर्क आणि कागदपत्रे शोधा...',
    ES: 'Buscar soluciones, marcos y documentos de IA...',
    FR: 'Rechercher des solutions, frameworks et documents IA...',
    DE: 'KI-Lösungen, Frameworks & Dokumente suchen...',
    AR: 'البحث في حلول الذكاء الاصطناعي والأطر والوثائق...',
  }
};

/**
 * Get translated text for a given key and language code.
 * Falls back to English if key or language is missing.
 */
export function translate(key: string, langCode: string = 'EN'): string {
  const code = (langCode || 'EN').toUpperCase();
  if (translations[key]) {
    return translations[key][code] || translations[key]['EN'] || key;
  }
  return key;
}

/**
 * Maps standard 2-letter language codes to Google Translate codes
 */
const GOOGLE_LANG_MAP: { [key: string]: string } = {
  EN: 'en',
  HI: 'hi',
  TA: 'ta',
  TE: 'te',
  KN: 'kn',
  MR: 'mr',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  AR: 'ar',
};

/**
 * Trigger dynamic Google Page Translation or cookie update
 */
export function applyGoogleTranslation(langCode: string) {
  const targetLang = GOOGLE_LANG_MAP[langCode.toUpperCase()] || 'en';
  
  // Set Google Translate cookie
  document.cookie = `googtrans=/en/${targetLang}; path=/; domain=${window.location.hostname}`;
  document.cookie = `googtrans=/en/${targetLang}; path=/`;

  // Trigger Google Translate select element if present
  const gtSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (gtSelect) {
    gtSelect.value = targetLang;
    gtSelect.dispatchEvent(new Event('change'));
  }
}
