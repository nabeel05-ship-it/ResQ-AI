import { 
  SUPPORTED_LANGUAGES, 
  TRANSLATIONS, 
  getTranslation, 
  DEFAULT_LANGUAGE 
} from './translations';
import { TRIAGE_TREES, getTriageContent } from '../data/triageTrees';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

describe('ResQ AI Multilingual & Internationalization Suite', () => {
  const ALL_12_LANGUAGES = [
    "English", "Hindi", "Kannada", "Marathi", "Bengali", "Tamil",
    "Telugu", "Gujarati", "Punjabi", "Malayalam", "Urdu", "Odia"
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  test('all 12 advertised languages are defined with native script identifiers', () => {
    expect(SUPPORTED_LANGUAGES.length).toBe(12);
    
    const EXPECTED_SCRIPTS = {
      English: 'EN',
      Hindi: 'हिं',
      Kannada: 'ಕ',
      Tamil: 'த',
      Telugu: 'తె',
      Malayalam: 'മ',
      Marathi: 'म',
      Bengali: 'বা',
      Gujarati: 'ગુ',
      Punjabi: 'ਪੰ',
      Odia: 'ଓ',
      Urdu: 'اُر',
    };

    ALL_12_LANGUAGES.forEach(lang => {
      const found = SUPPORTED_LANGUAGES.find(l => l.name === lang);
      expect(found).toBeDefined();
      expect(found.nativeName).toBeTruthy();
      expect(found.scriptId).toBe(EXPECTED_SCRIPTS[lang]);
    });
  });

  test('every language dictionary has all 8 core namespaces', () => {
    const requiredNamespaces = ['nav', 'auth', 'home', 'sos', 'guidance', 'triage', 'nearby', 'video'];
    
    ALL_12_LANGUAGES.forEach(lang => {
      const t = getTranslation(lang);
      requiredNamespaces.forEach(ns => {
        expect(t[ns]).toBeDefined();
        expect(typeof t[ns]).toBe('object');
      });
    });
  });

  test('emergency triage trees provide localized content across all 12 languages', () => {
    const treeKeys = Object.keys(TRIAGE_TREES);
    expect(treeKeys.length).toBe(5);

    treeKeys.forEach(treeKey => {
      const tree = TRIAGE_TREES[treeKey];
      ALL_12_LANGUAGES.forEach(lang => {
        const content = getTriageContent(tree, lang);
        expect(content).toBeDefined();
        expect(content.title).toBeTruthy();
        expect(content.callLabel).toBeTruthy();
        expect(content.steps).toBeDefined();
        expect(content.steps.length).toBeGreaterThan(0);
        expect(content.redFlags).toBeDefined();
        expect(content.redFlags.length).toBeGreaterThan(0);
      });
    });
  });

  test('deep merge fallback returns English value if language has missing field', () => {
    const fallbackTranslation = getTranslation('NonExistentLang');
    expect(fallbackTranslation.nav.home).toBe('Home');
    expect(fallbackTranslation.sos.btnIdle).toBe('Hold to send SOS');
  });

  test('clicking a language in modal immediately switches single active language without extra save step', async () => {
    render(<App />);

    // Initially in English
    const loginHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(loginHeadings.some(h => h.textContent.includes('Welcome back'))).toBe(true);

    // Open language picker on login screen using title or aria-label
    const langBtn = screen.getByTitle(/change languages/i);
    expect(langBtn).toBeInTheDocument();
    fireEvent.click(langBtn);

    // Select Hindi card: clicking it immediately activates Hindi and closes modal
    const hindiCard = await screen.findByText('हिन्दी');
    fireEvent.click(hindiCard);

    // Login heading should now update immediately to Hindi: "वापसी पर स्वागत है"
    await waitFor(() => {
      expect(screen.getByText(/वापसी पर स्वागत है/i)).toBeInTheDocument();
    });

    // Check single active language localStorage persistence
    const savedSingle = localStorage.getItem('er_lang');
    expect(savedSingle).toBe('Hindi');
    const savedArray = JSON.parse(localStorage.getItem('er_langs'));
    expect(savedArray).toEqual(['Hindi']);
  });

  test('switching to Kannada inside AppShell updates navigation tabs immediately', async () => {
    render(<App />);

    // Log in with Demo button
    const demoButton = screen.getByRole('button', { name: /demo login.*dhruv/i });
    fireEvent.click(demoButton);

    await waitFor(() => {
      expect(screen.getByText('Dhruv')).toBeInTheDocument();
    });

    // Navigation should initially show "Home"
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();

    // Click language switcher in header
    const langBtn = screen.getByTitle(/change languages/i);
    fireEvent.click(langBtn);

    // Click Kannada (ಕನ್ನಡ) card -> switches single active language immediately
    const kannadaCard = await screen.findByText('ಕನ್ನಡ');
    fireEvent.click(kannadaCard);

    // Header nav link should now be in Kannada: "ಮುಖಪುಟ"
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /ಮುಖಪುಟ/i })).toBeInTheDocument();
    });

    // LocalStorage should persist Kannada as single active language
    expect(localStorage.getItem('er_lang')).toBe('Kannada');
  });

  test('Urdu language sets document direction to rtl', () => {
    const urdu = SUPPORTED_LANGUAGES.find(l => l.name === 'Urdu');
    expect(urdu.dir).toBe('rtl');
    expect(urdu.scriptId).toBe('اُر');
  });
});
