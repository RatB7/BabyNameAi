import { BabyName } from "./types";

export const COUNTRIES = [
  "United States", "Israel", "India", "Japan", "China", "South Korea", 
  "United Kingdom", "Canada", "Australia", "France", "Germany", "Italy", 
  "Spain", "Brazil", "Mexico", "Saudi Arabia", "United Arab Emirates", 
  "Egypt", "Turkey", "Pakistan", "Bangladesh", "Indonesia", "Philippines", 
  "Thailand", "Vietnam", "Malaysia", "Singapore", "Ireland", "Scotland", 
  "Sweden", "Norway", "Denmark", "Finland", "Netherlands", "Belgium", 
  "Switzerland", "Austria", "Greece", "Poland", "Ukraine", "Czech Republic", 
  "Hungary", "Portugal", "Russia", "Argentina", "Colombia", "Peru", 
  "Chile", "South Africa", "Nigeria", "Kenya", "Ethiopia", "Morocco", 
  "Ghana", "Senegal", "Uganda", "Jordan", "Lebanon", "Iraq", "Iran", 
  "Qatar", "Kuwait", "Oman", "Bahrain", "Armenia", "Georgia", "New Zealand", 
  "Fiji", "Jamaica", "Cuba", "Puerto Rico", "Costa Rica", "Guatemala"
];

export const RELIGIONS = [
  "Secular", "Christian", "Hindu", "Muslim", "Jewish", 
  "Buddhist", "Sikh", "Jain", "Shinto", "Taoist", 
  "Zoroastrian", "Bahá'í", "Celtic", "Norse", "Spiritual"
];

export const LANGUAGES = [
  "English", "Hebrew", "Yiddish", "Aramaic", "Japanese", "Korean", 
  "Chinese (Mandarin)", "Chinese (Cantonese)", "Hindi", "Sanskrit", 
  "Bengali", "Urdu", "Punjabi", "Tamil", "Telugu", "Gujarati", 
  "Marathi", "Malayalam", "Kannada", "Nepali", "Sinhalese", "Arabic", 
  "Persian (Farsi)", "Turkish", "Kurdish", "Pashto", "French", "Spanish", 
  "Portuguese", "Italian", "German", "Dutch", "Russian", "Ukrainian", 
  "Polish", "Czech", "Hungarian", "Romanian", "Greek", "Swedish", 
  "Norwegian", "Danish", "Finnish", "Gaelic / Irish", "Welsh", "Swahili", 
  "Amharic", "Yoruba", "Igbo", "Hausa", "Tagalog / Filipino", "Vietnamese", 
  "Thai", "Indonesian", "Malay", "Latin"
];

export const ZODIACS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export const ALPHABET = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
  "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

export const INITIAL_CURATED_NAMES: BabyName[] = [
  {
    name: "Aria",
    meaning: "An elegant Italian name meaning 'air' or 'melody'. In Hebrew, it derives from Ariel meaning 'lioness of God', and in Persian, it translates to 'noble'.",
    origin: "Italian / Hebrew",
    religion: "Secular / Christian / Jewish",
    language: "Italian / Hebrew",
    gender: "Girl",
    popularityScore: 98,
    pronunciation: "Ah-rye-ah",
    similarNames: ["Arya", "Aurelia", "Amara"],
    zodiac: "Leo, Libra",
    numerology: "3 - The Creative Communicator",
    historicalFact: "A modern classic that blends theatrical elegance with soft musical vibes.",
    isBestMatch: false
  },
  {
    name: "Leo",
    meaning: "The classic Latin word for 'Lion', signifying fearlessness, leadership, and a warm, golden spirit.",
    origin: "Latin",
    religion: "Secular / Christian",
    language: "Latin",
    gender: "Boy",
    popularityScore: 96,
    pronunciation: "Lee-oh",
    similarNames: ["Leon", "Liam", "Lucas", "Leonardo"],
    zodiac: "Leo, Aries",
    numerology: "8 - The Strong Leader",
    historicalFact: "Borne by thirteen popes, Roman emperors, and the Renaissance master Leonardo da Vinci."
  },
  {
    name: "Siddharth",
    meaning: "One who has achieved their goal or found the true path to wisdom and spiritual fulfillment.",
    origin: "Sanskrit",
    religion: "Hindu / Buddhist",
    language: "Sanskrit",
    gender: "Boy",
    popularityScore: 91,
    pronunciation: "Sid-dharth",
    similarNames: ["Sid", "Samir", "Kabir", "Aditya"],
    zodiac: "Sagittarius, Pisces",
    numerology: "9 - The Selfless Humanitarian",
    historicalFact: "The personal name of Gautama Buddha, the sage who founded Buddhism in ancient India."
  },
  {
    name: "Amara",
    meaning: "An extremely beautiful global name. In Igbo (Nigeria) it means 'grace'; in Sanskrit it means 'immortal'; and in Italian/Spanish it means 'ever-unfading beauty'.",
    origin: "Multicultural (Igbo / Sanskrit / Latin)",
    religion: "Secular / Spiritual",
    language: "Yoruba / Sanskrit / Italian",
    gender: "Girl",
    popularityScore: 94,
    pronunciation: "Ah-mah-rah",
    similarNames: ["Amaya", "Alara", "Samara", "Adara"],
    zodiac: "Taurus, Pisces",
    numerology: "5 - The Dynamic Free Spirit",
    historicalFact: "A cross-cultural gem representing eternal beauty and elegance across three distinct continents."
  },
  {
    name: "Zayn",
    meaning: "A timeless Arabic name translating to 'beauty', 'grace', and 'spiritual excellence'.",
    origin: "Arabic",
    religion: "Muslim / Spiritual",
    language: "Arabic",
    gender: "Boy",
    popularityScore: 93,
    pronunciation: "Zane",
    similarNames: ["Zaid", "Zander", "Zayan", "Zain"],
    zodiac: "Gemini",
    numerology: "7 - The Analytical Thinker",
    historicalFact: "Broadly popularized in modern global culture, moving from traditional Arabic heritage to mainstream charts."
  },
  {
    name: "Kaelen",
    meaning: "A Gaelic/celtic name signifying a 'slender, fair warrior' or a trustworthy companion of nature.",
    origin: "Gaelic / Celtic",
    religion: "Secular / Spiritual",
    language: "Gaelic",
    gender: "Unisex",
    popularityScore: 85,
    pronunciation: "Kay-lin",
    similarNames: ["Kael", "Caelan", "Kieran", "Kellen"],
    zodiac: "Aquarius, Cancer",
    numerology: "11 - The Intuitive Visionary",
    historicalFact: "Derives from old Irish clan names, offering a highly modern, gender-neutral phonetic beauty."
  },
  {
    name: "Soraya",
    meaning: "A gorgeous Persian name referring to the Pleiades (the Seven Sisters star cluster). It signifies radiance, high aspirations, and celestial beauty.",
    origin: "Persian",
    religion: "Spiritual / Muslim",
    language: "Persian",
    gender: "Girl",
    popularityScore: 89,
    pronunciation: "Soh-rye-ah",
    similarNames: ["Suria", "Selena", "Layla"],
    zodiac: "Taurus, Scorpio",
    numerology: "6 - The Harmonious Nurturer",
    historicalFact: "Highly prominent name in mid-century Iranian royalty, bringing an aura of noble starlight."
  },
  {
    name: "Mateo",
    meaning: "A highly rhythmic Spanish name of Hebrew origin, translating to 'Gift of God'.",
    origin: "Spanish / Hebrew",
    religion: "Christian",
    language: "Spanish",
    gender: "Boy",
    popularityScore: 97,
    pronunciation: "Mah-tay-oh",
    similarNames: ["Matteo", "Matthew", "Matias"],
    zodiac: "Sagittarius, Virgo",
    numerology: "9 - The Compassionate Soul",
    historicalFact: "Has recently soared to the top charts across both Europe and the Americas."
  },
  {
    name: "Freya",
    meaning: "Derived from the Old Norse word for 'noble woman' or 'lady'. In Norse mythology, Freya is the radiant goddess of love, beauty, and destiny.",
    origin: "Norse / Scandinavian",
    religion: "Secular / Spiritual / Norse",
    language: "Swedish / Norwegian",
    gender: "Girl",
    popularityScore: 95,
    pronunciation: "Fray-ah",
    similarNames: ["Freyja", "Frida", "Fiona"],
    zodiac: "Taurus, Libra",
    numerology: "6 - The Loving Protector",
    historicalFact: "Consistently ranked in the top 10 names across Scandinavia and the UK."
  },
  {
    name: "Kenzo",
    meaning: "A strong Japanese name meaning 'wise, strong, and healthy' or 'three children'.",
    origin: "Japanese",
    religion: "Secular / Spiritual",
    language: "Japanese",
    gender: "Boy",
    popularityScore: 87,
    pronunciation: "Ken-zoh",
    similarNames: ["Kaito", "Ren", "Kobe"],
    zodiac: "Capricorn, Aries",
    numerology: "1 - The Visionary Creator",
    historicalFact: "Famous globally through iconic fashion, architecture, and art masters."
  },
  {
    name: "Mei-Ling",
    meaning: "A beautiful Chinese name translating to 'beautiful jade' or 'charming chime', representing grace, virtue, and purity.",
    origin: "Chinese",
    religion: "Secular / Spiritual",
    language: "Chinese (Mandarin)",
    gender: "Girl",
    popularityScore: 92,
    pronunciation: "May-Ling",
    similarNames: ["Mei", "Li-Wei", "Xiu"],
    zodiac: "Gemini, Libra",
    numerology: "5 - The Graceful Communicator",
    historicalFact: "Cherished across Chinese literature for its delicate musical resonance and noble symbolism."
  },
  {
    name: "Ji-Woo",
    meaning: "A top Korean name meaning 'wisdom, purpose, and divine protection' (Ji) combined with 'universe or rain' (Woo).",
    origin: "Korean",
    religion: "Secular / Spiritual",
    language: "Korean",
    gender: "Unisex",
    popularityScore: 96,
    pronunciation: "Jee-Woo",
    similarNames: ["Seo-Jun", "Eun-Ji", "Min-Woo"],
    zodiac: "Aquarius, Pisces",
    numerology: "7 - The Wise Thinker",
    historicalFact: "Consistently holds top positions in modern South Korean baby name rankings."
  },
  {
    name: "Wei",
    meaning: "A powerful, classic Chinese name meaning 'extraordinary, towering, or majestic strength'.",
    origin: "Chinese",
    religion: "Secular",
    language: "Chinese (Mandarin)",
    gender: "Boy",
    popularityScore: 90,
    pronunciation: "Way",
    similarNames: ["Li-Wei", "Jian", "Chen"],
    zodiac: "Leo, Aries",
    numerology: "1 - The Towering Leader",
    historicalFact: "A prominent name throughout Chinese history, worn by poets, generals, and scholars."
  },
  {
    name: "Sakura",
    meaning: "The poetic Japanese name for 'cherry blossom', symbolizing renewal, spring beauty, and the precious fleeting moments of life.",
    origin: "Japanese",
    religion: "Shinto / Spiritual",
    language: "Japanese",
    gender: "Girl",
    popularityScore: 94,
    pronunciation: "Sah-koo-rah",
    similarNames: ["Aoi", "Hana", "Yuki"],
    zodiac: "Taurus, Cancer",
    numerology: "3 - The Artistic Soul",
    historicalFact: "Deeply entwined with Japanese culture, arts, and the annual Hanami festival celebrations."
  }
];

export const FEATURE_CARDS = [
  {
    title: "AI Recommendations",
    description: "Generate highly contextual, meaningful recommendations backed by real-time Google search grounding.",
    icon: "Sparkles"
  },
  {
    title: "Meaning Explorer",
    description: "Uncover deep etymological roots, historical royal usages, and linguistic evolutions for any name.",
    icon: "Compass"
  },
  {
    title: "Twin Names",
    description: "Discover phonetically balanced, conceptually matching, and culturally harmonious name pairs for twins.",
    icon: "Users"
  },
  {
    title: "Sibling Names",
    description: "Find names that blend perfectly in rhythm, family style, and origin with your existing children's names.",
    icon: "GitBranch"
  },
  {
    title: "Nickname Generator",
    description: "Instantly create playful, sweet, modern, or traditional pet names customized to the full name's aura.",
    icon: "Smile"
  },
  {
    title: "Pronunciation Guide",
    description: "Get accurate spelling breakdowns, vocal accents, and phonetic soundboards to speak names correctly.",
    icon: "Volume2"
  },
  {
    title: "Popularity Trends",
    description: "Analyze current momentum, regional rankings, and multi-country chart positions for accurate forecasts.",
    icon: "TrendingUp"
  },
  {
    title: "Lucky Numerology",
    description: "Determine the Pythagorean Destiny Number, lucky days, colors, and personality vibrations of a name.",
    icon: "Hash"
  },
  {
    title: "Country Popularity",
    description: "Track exactly which countries list the name as a favorite, celebrating global and cultural diversity.",
    icon: "Globe"
  }
];

export const TESTIMONIALS = [
  {
    quote: "We were completely stuck choosing a name that honored both my French and my husband's Indian heritage. New Baby Name found 'Siddharth' and 'Amara'—explaining exactly how the names bridge both cultures. The meaning explorer is incredible!",
    author: "Elena & Siddharth Patel",
    location: "London, UK",
    tag: "Multicultural Family"
  },
  {
    quote: "Finding sibling names that sound natural together is surprisingly hard. The sibling match generator gave us three options that perfectly matched our daughter Chloe's name, both in spelling style and tone. Highly recommended!",
    author: "Sarah & David Jenkins",
    location: "San Francisco, USA",
    tag: "Parents of Two"
  },
  {
    quote: "The lucky numerology and zodiac checks added such a special, fun dimension to choosing. We generated a name with the custom nature-inspired royal filter, and fell in love with Kaelen. This is a premium experience.",
    author: "Amina & Tariq Al-Mansoor",
    location: "Dubai, UAE",
    tag: "First-time Parents"
  }
];

export const FAQS = [
  {
    question: "How do I choose the perfect baby name?",
    answer: "A great baby name usually balances personal significance, ease of pronunciation, and cultural heritage. We recommend starting with filters like your preferred country, religion, or language, and specifying attributes such as 'nature-inspired' or 'mythology'. You can then save your favorite names, share them with family, and test how they pair with your last name."
  },
  {
    question: "Can I filter baby names by religion and culture?",
    answer: "Absolutely! New Baby Name lets you select specific religious and cultural alignments—including Christian, Hindu, Muslim, Jewish, Buddhist, Celtic, and Secular options. Our generator uses Google Search grounding to ensure historical and religious connections are highly accurate."
  },
  {
    question: "Can I search for names by country of origin?",
    answer: "Yes, you can filter names by countries like India, France, Germany, Japan, Spain, Ireland, Greece, Nigeria, and more. This is perfect for multicultural families looking to find names that carry meanings across multiple languages and regions."
  },
  {
    question: "How does the AI recommend names?",
    answer: "New Baby Name utilizes Google's advanced Gemini 3.5 Flash model grounded with real-time Google Search results. Rather than just returning from a static database, the AI actively searches the live web to check spelling, popularity charts, meanings, sibling pairings, and local cultural context to provide the most precise recommendations."
  },
  {
    question: "What makes a good baby name?",
    answer: "A good baby name should sound melodious, have a positive and inspiring meaning, and be relatively easy to pronounce. Utilizing features like our Nickname Generator and Sibling Matcher can help you evaluate how the name will fit into daily life and grow with your child over time."
  }
];
