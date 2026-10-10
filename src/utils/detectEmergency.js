import emergencyData from "../data/emergencyData";

const MULTILINGUAL_ALIASES = {
  heart_attack: ["दिल", "सीने", "cardiac", "chest pain", "dil", "seena dard", "heart attack", "heart"],
  choking: ["गला घुटना", "दम घुटना", "सांस", "choking", "choke", "throat", "gala", "cannot breathe", "saans"],
  unconscious: ["बेहोश", "बेहोशी", "faint", "behosh", "unconscious", "collapsed", "passed out"],
  burns: ["जलना", "जला", "आग", "burn", "burns", "jalan", "scalding", "aag"],
  bleeding: ["खून", "रक्त", "bleeding", "bleed", "blood", "khoon", "cut"],
  stroke: ["लकवा", "स्ट्रोक", "stroke", "paralysis", "face drooping"],
  seizure: ["दौरा", "मिर्गी", "seizure", "convulsion", "fits"],
  asthma: ["अस्थमा", "दमा", "asthma", "wheezing"],
  poisoning: ["ज़हर", "विष", "poison", "poisoning", "toxic"],
  house_fire: ["आग", "fire", "building fire", "smoke"],
  gas_leak: ["गैस लीक", "lpg leak", "gas leak", "cylinder"],
  road_accident: ["दुर्घटना", "एक्सीडेंट", "accident", "crash", "collision", "hit"],
  fracture: ["हड्डी टूटना", "फ्रैक्चर", "fracture", "broken bone", "haddi"],
  electric_shock: ["बिजली का झटका", "करंट", "electric shock", "electrocution", "current"],
  snake_bite: ["सांप का काटना", "सांप", "snake bite", "snake", "saanp"],
};

export const detectEmergency = (userInput) => {
  const input = (userInput || "").toLowerCase().trim();

  if (!input) return null;

  let bestMatch = null;
  let highestScore = 0;

  Object.entries(emergencyData).forEach(([catKey, category]) => {
    Object.entries(category.subcategories).forEach(([subKey, sub]) => {
      let score = 0;
      const allKeywords = [...(sub.keywords || []), ...(MULTILINGUAL_ALIASES[subKey] || [])];
      
      allKeywords.forEach((keyword) => {
        const kw = keyword.toLowerCase();
        if (input.includes(kw)) {
          score += kw.split(/\s+/).length * 2;
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = {
          categoryKey: catKey,
          category: category,
          subcategoryKey: subKey,
          subcategory: sub,
          confidence: score,
        };
      }
    });
  });

  return highestScore > 0 ? bestMatch : null;
};

export const getAllCategories = () => {
  return Object.values(emergencyData).map((cat) => ({
    id: cat.id,
    title: cat.title,
    icon: cat.icon,
    color: cat.color,
    emergencyNumber: cat.emergencyNumber,
    numberLabel: cat.numberLabel,
  }));
};

export const getCategoryById = (id) => {
  return emergencyData[id] || null;
};