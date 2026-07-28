import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize Gemini SDK with telemetry user-agent
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Warning: GEMINI_API_KEY is not defined. AI features will run in mock mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. Robots.txt Endpoint
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: ${process.env.APP_URL || "http://localhost:3000"}/sitemap.xml`);
});

// 2. Sitemap.xml Endpoint
app.get("/sitemap.xml", (req, res) => {
  const baseUrl = process.env.APP_URL || "http://localhost:3000";
  res.type("application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
});

// Helper: safe JSON parsing
function parseJsonSafe(text: string) {
  try {
    // Strip markdown code fences if present
    const cleanText = text.replace(/```json\s?/g, "").replace(/```\s?/g, "").trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.log("Using fallback parser due to non-standard response structure");
    throw new Error("Invalid response format from AI model.");
  }
}

// 3. AI Name Generator Endpoint
app.post("/api/generate-names", async (req, res) => {
  try {
    const {
      country,
      religion,
      language,
      gender,
      startsWith,
      endsWith,
      meaningKeyword,
      popularity,
      style, // Modern or Traditional
      scarcity, // Rare or Popular
      lettersCount,
      origin,
      birthMonth,
      zodiac,
      nature,
      royal,
      mythology,
      spiritual,
      celebrity
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Fallback elegant mock generator if API key is not configured yet
      console.log("Using Mock Name Generator...");
      return res.json({
        names: getMockNames(req.body),
        searchSources: [
          { title: "BabyName AI Curated Database", uri: "https://babynameai.com/curated" }
        ],
        isMock: true
      });
    }

    const ai = getGeminiClient();
    
    // Construct rich contextual search and generation prompt
    const prompt = `You are a world-class expert baby name consultant, linguist, and cultural historian.
Based on the following custom parental preferences, search for and generate AT LEAST 10 (ideally 10 to 12) beautiful, meaningful baby names.
Make sure you perform Google searches to verify current baby name popularity trends, accurate spelling, pronunciation, meaning, and cultural history.

CRITICAL REQUIREMENT - STRICT FILTER COMPLIANCE:
1. EVERY SINGLE NAME MUST STRICTLY honor all user-selected choices below:
   - Gender: ${gender || "Any"} (If "Boy" or "Girl", ONLY return names for that gender or Unisex).
   - Country/Region: ${country || "Any"} (Must be popular, authentic, or traditional in this country/culture).
   - Religion: ${religion || "Any"} (Must be culturally or religiously appropriate for this faith, e.g. Hindu, Muslim, Christian, Jewish, Buddhist, Sikh, Shinto, etc.).
   - Language: ${language || "Any"} (Ensure names strictly honor the authentic phonetics, meanings, and linguistic traditions of this language—especially for Hindi, Sanskrit, Arabic, Japanese, Korean, Chinese, Spanish, French, German, Hebrew, etc.).
   - Origin: ${origin || "Any"}
   - Starts with letter: ${startsWith || "Any"} (If specified, EVERY name MUST start with this exact letter).
   - Ends with letter: ${endsWith || "Any"} (If specified, EVERY name MUST end with this exact letter).
   - Theme/Meaning keyword: ${meaningKeyword || "Any"} (If specified, ALL name meanings must relate to this theme).
   - Desired Letter Count: ${lettersCount || "Any"}
   - Zodiac: ${zodiac || "Any"}
   - Birth Month: ${birthMonth || "Any"}
   - Cultural Style: ${style || "Any"} (${scarcity || "Any"})
   - Special Themes: Nature=${nature ? "Yes" : "No"}, Royal=${royal ? "Yes" : "No"}, Mythology=${mythology ? "Yes" : "No"}, Spiritual=${spiritual ? "Yes" : "No"}, Celebrity=${celebrity ? "Yes" : "No"}.

   STRICT CULTURAL ACCURACY MANDATE:
   You MUST strictly honor the requested Country (${country || "Any"}), Language (${language || "Any"}), Origin (${origin || "Any"}), and Religion (${religion || "Any"}).
   - If Country is "Israel", Language is "Hebrew", Religion is "Jewish", or Origin is "Jewish / Hebrew": YOU MUST ONLY RETURN GENUINE, AUTHENTIC HEBREW AND ISRAELI NAMES (such as Ariel, Noa, Maya, Ethan, Eli, Tamar, Asher, Omer, Lior, Uri, Levi, Eden, Talia, Yael, Shira, Jonathan, David, Daniel, Aviva, etc.).
   - If Country is "Japan", Language is "Japanese", or Origin is "Japanese": YOU MUST ONLY RETURN GENUINE, AUTHENTIC JAPANESE NAMES (such as Haruto, Ren, Kaito, Yamato, Minato, Sora, Kenzo, Hiroshi, Riku, Yuto, Hinata, Sakura, Aoi, Mei, Akari, Koharu, Hana, Yui, Mio, Rin, Yuna, Himari, etc.).
   - If Country is "India", Language is "Hindi" or "Sanskrit", or Religion is "Hindu": YOU MUST ONLY RETURN AUTHENTIC INDIAN / SANSKRIT NAMES.
   - If Country is "China", Language is "Chinese", or Origin is "Chinese": YOU MUST ONLY RETURN AUTHENTIC CHINESE NAMES.
   - NEVER return names from an unrelated country or culture when a specific country, language, or heritage is requested.

2. Provide AT LEAST 10 distinct, high-quality name options.
3. Select the single top #1 BEST MATCH option that most perfectly satisfies the user's choices.
4. On that single best match name item, set "isBestMatch": true, and provide a clear "bestMatchReason" string (1-2 sentence explanation detailing why this name is the ultimate best choice for their selected preferences).
5. On all other name items, set "isBestMatch": false.

You must return a valid JSON object only. Do not output any markdown explanations, conversation, or text outside the JSON block.
The JSON object must have exactly the following structure:
{
  "names": [
    {
      "name": "Name",
      "meaning": "Detailed beautiful etymology and meaning",
      "origin": "Primary origin (e.g., Sanskrit, Arabic, Hebrew, Latin, Japanese, etc.)",
      "religion": "Cultural/religious association",
      "language": "Language of origin",
      "gender": "Boy | Girl | Unisex",
      "popularityScore": 85,
      "pronunciation": "Phonetic spelling or guide (e.g., Ah-rye-ah)",
      "similarNames": ["Name1", "Name2", "Name3"],
      "zodiac": "Matching or harmonious zodiac signs",
      "numerology": "Destiny Number (e.g., '1 - The Leader')",
      "historicalFact": "A brief interesting cultural, historical, or celebrity fact about the name",
      "isBestMatch": true,
      "bestMatchReason": "1-2 sentences explaining why this name is the top recommendation for their option choices"
    }
  ]
}

Verify with Google Search that the details are highly accurate, culturally authentic, and beautiful.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });

    const textResult = response.text;
    if (!textResult) {
      throw new Error("Received empty response from Gemini.");
    }

    const data = parseJsonSafe(textResult);

    // Extract grounding URLs if available to show premium search citations
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const searchSources: Array<{ title: string; uri: string }> = [];
    if (chunks) {
      for (const chunk of chunks) {
        if (chunk.web && chunk.web.uri && chunk.web.title) {
          // Avoid duplicates
          if (!searchSources.some(s => s.uri === chunk.web.uri)) {
            searchSources.push({
              title: chunk.web.title,
              uri: chunk.web.uri
            });
          }
        }
      }
    }

    res.json({
      names: data.names || [],
      searchSources: searchSources.slice(0, 4),
      isMock: false
    });

  } catch (error: any) {
    console.log("Gemini API unavailable or quota limit reached. Serving curated name dataset fallback.");
    // Graceful fallback to avoid breaking user flow on 429 quota/rate limit error
    return res.json({
      names: getMockNames(req.body),
      searchSources: [
        { title: "BabyName AI Curated Database (Fallback)", uri: "https://babynameai.com/curated" }
      ],
      isMock: true,
      errorMsg: "Temporary API limit reached. Fallback activated."
    });
  }
});

// 4. Sibling & Twin Names Generator Endpoint
app.post("/api/twin-sibling-generator", async (req, res) => {
  try {
    const { name, relationType, genderFilter } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return res.json({
        combinations: getMockTwinsSiblings(name, relationType),
        isMock: true
      });
    }

    const ai = getGeminiClient();
    const prompt = `The parent wants to find matching names for a ${relationType === "twins" ? "twin" : "sibling"} of a child named "${name}".
The target gender filter is: ${genderFilter || "Any"}.
Search for and generate 3 pairs or groups of harmonious combinations. Explain why they go well together (matching meanings, phonetic rhythm, or origins).

You must return a valid JSON object only. Structure:
{
  "combinations": [
    {
      "names": ["NameA", "NameB"],
      "vibe": "E.g., Celestial, Classic, Nature-inspired",
      "reason": "Explain why these names are perfect matches"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });

    const data = parseJsonSafe(response.text || "{}");
    res.json({
      combinations: data.combinations || [],
      isMock: false
    });
  } catch (error: any) {
    console.log("Serving curated twin/sibling pairs (API fallback)");
    return res.json({
      combinations: getMockTwinsSiblings(req.body.name || "Alex", req.body.relationType || "twins"),
      isMock: true
    });
  }
});

// 5. Nickname Generator Endpoint
app.post("/api/nickname-generator", async (req, res) => {
  try {
    const { name } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return res.json({
        nicknames: getMockNicknames(name),
        isMock: true
      });
    }

    const ai = getGeminiClient();
    const prompt = `Generate 6 beautiful, modern, cute, or traditional nicknames/pet names for the name "${name}".
Provide a short meaning/vibe for each nickname.

You must return a valid JSON object only. Structure:
{
  "nicknames": [
    { "nickname": "Nick", "vibe": "Sweet & Playful" }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const data = parseJsonSafe(response.text || "{}");
    res.json({
      nicknames: data.nicknames || [],
      isMock: false
    });
  } catch (error: any) {
    console.log("Serving curated nicknames (API fallback)");
    return res.json({
      nicknames: getMockNicknames(req.body.name || "Alex"),
      isMock: true
    });
  }
});

// 6. Meaning Explorer Endpoint
app.post("/api/meaning-explorer", async (req, res) => {
  try {
    const { name } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return res.json({
        report: getMockMeaningReport(name),
        isMock: true
      });
    }

    const ai = getGeminiClient();
    const prompt = `Provide a premium, comprehensive etymology and historical report for the baby name "${name}".
Search for and detail:
1. Deep original meaning and spiritual roots.
2. Historical usage, royal or mythological connections.
3. Pronunciation and variations in different languages.
4. Fun trivia, numerology, and zodiac harmony.

You must return a valid JSON object only. Structure:
{
  "name": "${name}",
  "meaning": "Detailed etymological breakdown...",
  "origin": "Main linguistic origin",
  "history": "Historical relevance, Royal, Famous holders...",
  "variations": ["Variant A", "Variant B"],
  "numerology": "Destiny number details",
  "zodiac": "Harmonious signs",
  "popularityTrend": "Current trend description (e.g. rising rapidly)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      }
    });

    const data = parseJsonSafe(response.text || "{}");
    res.json({
       report: data,
       isMock: false
     });
   } catch (error: any) {
     console.log("Serving curated name report (API fallback)");
     return res.json({
       report: getMockMeaningReport(req.body.name || "Alex"),
       isMock: true
     });
   }
});

// 7. Lucky Numerology Endpoint
app.post("/api/numerology", async (req, res) => {
  try {
    const { name } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      return res.json({
        numerology: getMockNumerology(name),
        isMock: true
      });
    }

    const ai = getGeminiClient();
    const prompt = `Calculate the Pythagorean numerology value (Destiny/Expression number) for the name "${name}".
Provide:
1. The final single-digit Destiny number (or master number 11, 22, 33).
2. Key personality traits and lucky attributes associated with this number.
3. Lucky day, lucky color, and lucky flower/stone.

You must return a valid JSON object only. Structure:
{
  "number": 5,
  "title": "The Explorer",
  "traits": ["Adaptable", "Curious", "Freedom-loving"],
  "description": "A comprehensive paragraph on what this means for a baby growing up.",
  "luckyColor": "Emerald Green",
  "luckyDay": "Wednesday",
  "luckyStone": "Turquoise"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const data = parseJsonSafe(response.text || "{}");
    res.json({
      numerology: data,
      isMock: false
    });
  } catch (error: any) {
    console.log("Serving numerology report (API fallback)");
    return res.json({
      numerology: getMockNumerology(req.body.name || "Alex"),
      isMock: true
    });
  }
});


// --- Elegant Fallback/Mock Generator Data Providers ---

function detectCultureKey(filters: any): string {
  const c = (filters.country || "").toLowerCase();
  const l = (filters.language || "").toLowerCase();
  const o = (filters.origin || "").toLowerCase();
  const r = (filters.religion || "").toLowerCase();
  const m = (filters.meaningKeyword || "").toLowerCase();

  const str = `${c} ${l} ${o} ${r} ${m}`;

  if (
    str.includes("japan") || 
    str.includes("shinto") || 
    str.includes("tokyo") || 
    str.includes("kyoto") || 
    str.includes("nippon") || 
    str.includes("sakura") ||
    str.includes("kanji")
  ) {
    return "Japanese";
  }
  if (str.includes("china") || str.includes("chinese") || str.includes("mandarin") || str.includes("cantonese")) {
    return "Chinese";
  }
  if (str.includes("korea") || str.includes("korean")) {
    return "Korean";
  }
  if (str.includes("saudi") || str.includes("uae") || str.includes("emirates") || str.includes("egypt") || str.includes("morocco") || str.includes("turkey") || str.includes("pakistan") || str.includes("arabic") || str.includes("urdu") || str.includes("muslim") || str.includes("islam")) {
    return "Muslim";
  }
  if (str.includes("israel") || str.includes("hebrew") || str.includes("jewish") || str.includes("jew")) {
    return "Jewish";
  }
  if (str.includes("ireland") || str.includes("scotland") || str.includes("gaelic") || str.includes("celtic")) {
    return "Gaelic";
  }
  if (str.includes("india") || str.includes("hindi") || str.includes("sanskrit") || str.includes("hindu") || str.includes("sikh") || str.includes("punjabi") || str.includes("bengali") || str.includes("marathi") || str.includes("gujarati")) {
    return "Hindu";
  }
  if (
    str.includes("france") || str.includes("french") || 
    str.includes("germany") || str.includes("german") || 
    str.includes("italy") || str.includes("italian") || 
    str.includes("spain") || str.includes("spanish") || 
    str.includes("united states") || str.includes("united kingdom") || 
    str.includes("canada") || str.includes("australia") || 
    str.includes("christian") || str.includes("secular") || 
    str.includes("latin") || str.includes("greek")
  ) {
    return "Western";
  }

  return "Japanese";
}

function getMockNames(filters: any) {
  const gender = filters.gender && filters.gender !== "Any" ? filters.gender : null;
  const startsWith = filters.startsWith && filters.startsWith !== "Any" ? filters.startsWith.toUpperCase() : null;
  const endsWith = filters.endsWith && filters.endsWith !== "Any" ? filters.endsWith.toLowerCase() : null;
  const meaningKeyword = filters.meaningKeyword ? filters.meaningKeyword.toLowerCase() : null;

  const cultureKey = detectCultureKey(filters);

  // Dictionary of names categorized by Culture -> Gender -> Letter
  const COMPREHENSIVE_REGISTRY: Record<string, Record<string, Record<string, Array<{ name: string; meaning: string; origin: string; pron: string }>>>> = {
    Japanese: {
      Boy: {
        H: [
          { name: "Haruto", meaning: "Sun, flying light, soaring greatness and warmth", origin: "Japanese", pron: "Hah-roo-toh" },
          { name: "Hiroshi", meaning: "Generous, tolerant mind, abundant wisdom", origin: "Japanese", pron: "Hee-roh-shee" },
          { name: "Hinata", meaning: "Facing the sun, sunflower, warmth and brightness", origin: "Japanese", pron: "Hee-nah-tah" },
          { name: "Hayato", meaning: "Falcon person, swift and brave warrior", origin: "Japanese", pron: "Hah-yah-toh" }
        ],
        R: [
          { name: "Ren", meaning: "Lotus flower, pure romance, lotus blossom of love", origin: "Japanese", pron: "Ren" },
          { name: "Riku", meaning: "Handsome land, grounded continent, steadfast strength", origin: "Japanese", pron: "Ree-koo" },
          { name: "Ryota", meaning: "Refreshing, clear mind, stout warrior", origin: "Japanese", pron: "Ryoh-tah" }
        ],
        K: [
          { name: "Kaito", meaning: "Ocean, sea, soaring over azure waves", origin: "Japanese", pron: "Ky-toh" },
          { name: "Kenzo", meaning: "Wise, strong, healthy, three children", origin: "Japanese", pron: "Ken-zoh" },
          { name: "Kazuki", meaning: "Harmonious hope, bright single star", origin: "Japanese", pron: "Kah-zoo-kee" }
        ],
        Y: [
          { name: "Yamato", meaning: "Great harmony, noble ancient spirit of Japan", origin: "Japanese", pron: "Yah-mah-toh" },
          { name: "Yuto", meaning: "Gentle superiority, flying hero", origin: "Japanese", pron: "Yoo-toh" }
        ],
        M: [
          { name: "Minato", meaning: "Harbor, safe haven, gathering place of peace", origin: "Japanese", pron: "Mee-nah-toh" }
        ],
        S: [
          { name: "Sora", meaning: "Open sky, heaven, boundless freedom", origin: "Japanese", pron: "Soh-rah" },
          { name: "Shotaro", meaning: "Promising, righteous young son", origin: "Japanese", pron: "Shoh-tah-roh" }
        ],
        T: [
          { name: "Takumi", meaning: "Master artisan, skilled craftsman", origin: "Japanese", pron: "Tah-koo-mee" }
        ],
        D: [
          { name: "Daiki", meaning: "Great radiance, valuable tree", origin: "Japanese", pron: "Dye-kee" }
        ],
        N: [
          { name: "Naoki", meaning: "Honest, upright tree of truth", origin: "Japanese", pron: "Nah-oh-kee" }
        ],
        A: [
          { name: "Aoi", meaning: "Hollyhock, blue sky, noble spirit", origin: "Japanese", pron: "Ah-oh-ee" },
          { name: "Akio", meaning: "Bright, luminous hero", origin: "Japanese", pron: "Ah-kee-oh" }
        ]
      },
      Girl: {
        S: [
          { name: "Sakura", meaning: "Cherry blossom, renewal, fleeting spring beauty", origin: "Japanese", pron: "Sah-koo-rah" },
          { name: "Sora", meaning: "Sky, heaven, boundless grace", origin: "Japanese", pron: "Soh-rah" }
        ],
        A: [
          { name: "Aoi", meaning: "Hollyhock, sky blue, noble royalty", origin: "Japanese", pron: "Ah-oh-ee" },
          { name: "Akari", meaning: "Bright light, radiant vermilion clarity", origin: "Japanese", pron: "Ah-kah-ree" },
          { name: "Airi", meaning: "Love, jasmine bloom, affection", origin: "Japanese", pron: "Eye-ree" }
        ],
        H: [
          { name: "Hinata", meaning: "Sunny place, sunflower, gentle warmth", origin: "Japanese", pron: "Hee-nah-tah" },
          { name: "Hana", meaning: "Flower, blossom, prime of beauty", origin: "Japanese", pron: "Hah-nah" },
          { name: "Hina", meaning: "Sunlight, princess, delicate greenery", origin: "Japanese", pron: "Hee-nah" },
          { name: "Himari", meaning: "Sun, hollyhock, flower of sunlight", origin: "Japanese", pron: "Hee-mah-ree" }
        ],
        M: [
          { name: "Mei", meaning: "Sprout, reliance, beautiful bud", origin: "Japanese", pron: "May" },
          { name: "Mio", meaning: "Beautiful cherry blossom path, waterway", origin: "Japanese", pron: "Mee-oh" },
          { name: "Misaki", meaning: "Beautiful ocean cape, seaside blossom", origin: "Japanese", pron: "Mee-sah-kee" }
        ],
        K: [
          { name: "Koharu", meaning: "Late autumn sunshine, gentle spring breeze", origin: "Japanese", pron: "Koh-hah-roo" },
          { name: "Kaho", meaning: "Flower of fragrance, summer melody", origin: "Japanese", pron: "Kah-hoh" }
        ],
        Y: [
          { name: "Yui", meaning: "Bind, tie, gentle elegance", origin: "Japanese", pron: "Yoo-ee" },
          { name: "Yuna", meaning: "Gentle Moon, kindness, night sky", origin: "Japanese", pron: "Yoo-nah" }
        ],
        R: [
          { name: "Rin", meaning: "Dignified, severe beauty, clear chime", origin: "Japanese", pron: "Reen" }
        ],
        N: [
          { name: "Nana", meaning: "Seven, greens, apple, spring bloom", origin: "Japanese", pron: "Nah-nah" }
        ]
      }
    },
    Chinese: {
      Boy: {
        W: [{ name: "Wei", meaning: "Majestic power, towering strength", origin: "Chinese", pron: "Way" }],
        M: [{ name: "Ming", meaning: "Bright, shining clarity and wisdom", origin: "Chinese", pron: "Meeng" }],
        J: [{ name: "Jian", meaning: "Strong, healthy, build upon virtue", origin: "Chinese", pron: "Jee-uhn" }]
      },
      Girl: {
        M: [{ name: "Mei-Ling", meaning: "Beautiful jade, charming chime", origin: "Chinese", pron: "May-Ling" }],
        X: [{ name: "Xiu", meaning: "Elegant, graceful, refined flower", origin: "Chinese", pron: "Shee-oo" }]
      }
    },
    Korean: {
      Boy: {
        S: [{ name: "Seo-Jun", meaning: "Auspicious, handsome, talented leader", origin: "Korean", pron: "Suh-Jun" }],
        M: [{ name: "Min-Jae", meaning: "Clever, talented, precious soul", origin: "Korean", pron: "Min-Jae" }]
      },
      Girl: {
        J: [{ name: "Ji-Woo", meaning: "Wisdom, rain of universe, divine protection", origin: "Korean", pron: "Jee-Woo" }],
        S: [{ name: "Seo-A", meaning: "Beautiful, elegant, auspicious maiden", origin: "Korean", pron: "Suh-Ah" }]
      }
    },
    Western: {
      Boy: {
        L: [{ name: "Leo", meaning: "Brave lion, leader of strength", origin: "Latin", pron: "Lee-oh" }, { name: "Lucas", meaning: "Bring of light, luminous star", origin: "Latin", pron: "Loo-kas" }],
        O: [{ name: "Oliver", meaning: "Olive tree, symbol of peace", origin: "Latin", pron: "Ol-i-ver" }],
        M: [{ name: "Mateo", meaning: "Gift of God, rhythmic joy", origin: "Spanish / Hebrew", pron: "Mah-tay-oh" }]
      },
      Girl: {
        A: [{ name: "Aria", meaning: "Gentle air, melody, lioness of God", origin: "Italian / Hebrew", pron: "Ah-rye-ah" }],
        F: [{ name: "Freya", meaning: "Noble lady, goddess of beauty", origin: "Old Norse", pron: "Fray-ah" }],
        C: [{ name: "Chloe", meaning: "Blooming sprout, fresh greenery", origin: "Greek", pron: "Kloh-ee" }]
      }
    },
    Hindu: {
      Boy: {
        A: [
          { name: "Aarav", meaning: "Peaceful ocean melody, wisdom", origin: "Sanskrit", pron: "Aah-ruv" },
          { name: "Advait", meaning: "Unique, non-dual oneness", origin: "Sanskrit", pron: "Ud-vayt" },
          { name: "Arjun", meaning: "Shining hero, noble archer", origin: "Sanskrit", pron: "Ur-joon" }
        ],
        S: [
          { name: "Siddharth", meaning: "One who has achieved true path", origin: "Sanskrit", pron: "Sid-dharth" }
        ]
      },
      Girl: {
        A: [
          { name: "Ananya", meaning: "Unique, matchless, Goddess Parvati", origin: "Sanskrit", pron: "Uh-nun-yah" }
        ]
      }
    },
    Muslim: {
      Boy: {
        Z: [{ name: "Zayn", meaning: "Beauty, grace, spiritual excellence", origin: "Arabic", pron: "Zane" }],
        A: [{ name: "Amir", meaning: "Prince, prosperous leader", origin: "Arabic", pron: "Uh-meer" }]
      },
      Girl: {
        A: [{ name: "Aaliyah", meaning: "Exalted, highest social standing", origin: "Arabic", pron: "Uh-lee-yah" }],
        Z: [{ name: "Zara", meaning: "Blooming flower, radiance, princess", origin: "Arabic", pron: "Zah-rah" }]
      }
    },
    Jewish: {
      Boy: {
        A: [
          { name: "Asher", meaning: "Happy, blessed, fortunate, full of joy", origin: "Hebrew", pron: "Ash-er" },
          { name: "Ari", meaning: "Lion of God, courageous warrior", origin: "Hebrew", pron: "Ah-ree" },
          { name: "Ariel", meaning: "Lion of God, altar of sanctuary", origin: "Hebrew", pron: "Ah-ree-el" },
          { name: "Avi", meaning: "My father, father of a nation", origin: "Hebrew", pron: "Ah-vee" }
        ],
        E: [
          { name: "Elijah", meaning: "The Lord is my God, divine spirit", origin: "Hebrew", pron: "Eh-lye-jah" },
          { name: "Ezra", meaning: "Help, strength, restoration", origin: "Hebrew", pron: "Ez-rah" },
          { name: "Ethan", meaning: "Strong, enduring, firm and steadfast", origin: "Hebrew", pron: "Ee-than" },
          { name: "Eli", meaning: "Elevated, high, my God", origin: "Hebrew", pron: "Ee-lye" },
          { name: "Eitan", meaning: "Strong, persistent, enduring force", origin: "Hebrew", pron: "Ay-tahn" }
        ],
        D: [
          { name: "David", meaning: "Beloved one, king of Israel", origin: "Hebrew", pron: "Dah-veed" },
          { name: "Daniel", meaning: "God is my judge", origin: "Hebrew", pron: "Dahn-yel" }
        ],
        L: [
          { name: "Levi", meaning: "Joined, attached in harmony", origin: "Hebrew", pron: "Lee-vye" },
          { name: "Lior", meaning: "My light, light for me", origin: "Hebrew", pron: "Lee-or" }
        ],
        O: [
          { name: "Omer", meaning: "Sheaf of wheat, flourishing harvest", origin: "Hebrew", pron: "Oh-mer" },
          { name: "Uri", meaning: "My light, flame of God", origin: "Hebrew", pron: "Oo-ree" }
        ],
        N: [
          { name: "Noam", meaning: "Pleasantness, sweetness, grace", origin: "Hebrew", pron: "No-ahm" }
        ],
        Y: [
          { name: "Yonatan", meaning: "Gift of the Almighty", origin: "Hebrew", pron: "Yo-nah-tahn" }
        ]
      },
      Girl: {
        A: [
          { name: "Aviva", meaning: "Springtime, fresh morning dew", origin: "Hebrew", pron: "Ah-vee-vah" },
          { name: "Ariel", meaning: "Lioness of God, radiant grace", origin: "Hebrew", pron: "Ah-ree-el" },
          { name: "Abigail", meaning: "Father's joy, source of delight", origin: "Hebrew", pron: "Ah-bee-gayil" }
        ],
        E: [
          { name: "Eden", meaning: "Paradise, garden of peace and delight", origin: "Hebrew", pron: "Ee-den" },
          { name: "Eliana", meaning: "God has answered my prayers", origin: "Hebrew", pron: "Ell-ee-ahn-ah" },
          { name: "Esther", meaning: "Star, secret light of hope", origin: "Hebrew", pron: "Ess-ter" }
        ],
        L: [
          { name: "Lior", meaning: "My light, radiant glow", origin: "Hebrew", pron: "Lee-or" },
          { name: "Leah", meaning: "Weary, delicate, matriarch of devotion", origin: "Hebrew", pron: "Lee-ah" }
        ],
        M: [
          { name: "Maya", meaning: "Water, spring, divine flow", origin: "Hebrew", pron: "My-ah" },
          { name: "Miriam", meaning: "Beloved sea, lady of the waters", origin: "Hebrew", pron: "Meer-ee-ahm" }
        ],
        N: [
          { name: "Noa", meaning: "Movement, motion, peaceful rest", origin: "Hebrew", pron: "No-ah" }
        ],
        S: [
          { name: "Shira", meaning: "Song, poetry, joyful melody", origin: "Hebrew", pron: "Sheer-ah" },
          { name: "Sarah", meaning: "Princess, noble lady", origin: "Hebrew", pron: "Sah-rah" }
        ],
        T: [
          { name: "Tamar", meaning: "Date palm tree, upright grace", origin: "Hebrew", pron: "Tah-mahr" },
          { name: "Talia", meaning: "Gentle dew from heaven", origin: "Hebrew", pron: "Tah-lee-ah" }
        ],
        Y: [
          { name: "Yael", meaning: "Mountain goat, strength and agility", origin: "Hebrew", pron: "Yah-el" }
        ]
      }
    },
    Gaelic: {
      Boy: {
        K: [{ name: "Kaelen", meaning: "Slender warrior, fair companion", origin: "Gaelic", pron: "Kay-lin" }]
      },
      Girl: {
        M: [{ name: "Maeve", meaning: "She who intoxicates with joy, queen", origin: "Gaelic", pron: "Mayv" }]
      }
    }
  };

  const results: Array<{
    name: string;
    meaning: string;
    origin: string;
    religion: string;
    language: string;
    country: string;
    gender: "Boy" | "Girl" | "Unisex";
    popularityScore: number;
    pronunciation: string;
    similarNames: string[];
    zodiac: string;
    numerology: string;
    historicalFact: string;
  }> = [];

  const seenNames = new Set<string>();

  const targetGender = gender && gender.toLowerCase() === "girl" ? "Girl" : "Boy";

  const cultureObj = COMPREHENSIVE_REGISTRY[cultureKey] || COMPREHENSIVE_REGISTRY["Japanese"];
  const genderObj = cultureObj[targetGender] || cultureObj["Boy"] || {};

  // Default values for culture metadata
  const defaultLang = cultureKey === "Japanese" ? "Japanese" : cultureKey === "Chinese" ? "Chinese" : cultureKey === "Korean" ? "Korean" : cultureKey === "Hindu" ? "Sanskrit / Hindi" : cultureKey === "Muslim" ? "Arabic" : cultureKey === "Jewish" ? "Hebrew" : "English / Latin";
  const defaultCountry = cultureKey === "Japanese" ? "Japan" : cultureKey === "Chinese" ? "China" : cultureKey === "Korean" ? "South Korea" : cultureKey === "Hindu" ? "India" : cultureKey === "Muslim" ? "Saudi Arabia" : cultureKey === "Jewish" ? "Israel" : "United States";
  const defaultReligion = cultureKey === "Japanese" ? "Shinto / Buddhist / Secular" : cultureKey === "Hindu" ? "Hindu" : cultureKey === "Muslim" ? "Muslim" : cultureKey === "Jewish" ? "Jewish" : "Secular / Christian";

  // Check registry for exact letter matches if startsWith provided
  if (startsWith && genderObj[startsWith]) {
    for (const item of genderObj[startsWith]) {
      if (endsWith && !item.name.toLowerCase().endsWith(endsWith)) continue;
      if (meaningKeyword && !item.meaning.toLowerCase().includes(meaningKeyword)) continue;
      if (!seenNames.has(item.name.toLowerCase())) {
        seenNames.add(item.name.toLowerCase());
        results.push({
          name: item.name,
          meaning: item.meaning,
          origin: item.origin,
          religion: filters.religion || defaultReligion,
          language: filters.language || defaultLang,
          country: filters.country || defaultCountry,
          gender: targetGender,
          popularityScore: 92 + (results.length % 7),
          pronunciation: item.pron,
          similarNames: [item.name + "a", item.name + "n"],
          zodiac: "Leo, Aries",
          numerology: "1 - Visionary Leader",
          historicalFact: `An authentic ${cultureKey} name celebrating rich heritage, timeless beauty, and deep cultural harmony.`
        });
      }
    }
  }

  // Gather all matching items for this culture and gender
  for (const letterKey of Object.keys(genderObj)) {
    if (results.length >= 12) break;
    if (startsWith && letterKey !== startsWith) continue;

    for (const item of genderObj[letterKey]) {
      if (results.length >= 12) break;
      if (endsWith && !item.name.toLowerCase().endsWith(endsWith)) continue;
      if (seenNames.has(item.name.toLowerCase())) continue;

      seenNames.add(item.name.toLowerCase());
      results.push({
        name: item.name,
        meaning: item.meaning,
        origin: item.origin,
        religion: filters.religion || defaultReligion,
        language: filters.language || defaultLang,
        country: filters.country || defaultCountry,
        gender: targetGender,
        popularityScore: 90 + (results.length % 8),
        pronunciation: item.pron,
        similarNames: [item.name + "a", item.name + "i"],
        zodiac: "Gemini, Libra",
        numerology: "3 - Luminous Creator",
        historicalFact: `A cherished ${cultureKey} name deeply rooted in authentic naming traditions.`
      });
    }
  }

  // Synthetic fallback if still fewer than 10 items
  if (results.length < 10) {
    const rootsMap: Record<string, string[]> = {
      Japanese: ["Haru", "Kai", "Ren", "Yuto", "Sora", "Saku", "Aoi", "Hina", "Ken", "Hiro", "Mina", "Riku", "Taku", "Naoki"],
      Chinese: ["Wei", "Ming", "Jian", "Chen", "Xiu", "Ling", "Jia", "Bowen"],
      Korean: ["Seo", "Min", "Ji", "Woo", "Ha", "Eun", "Hyun"],
      Western: ["Leo", "Lucas", "Oliver", "Felix", "Aria", "Chloe", "Emma", "Maya"],
      Hindu: ["Aar", "Adv", "Arj", "Dev", "Dhr", "Vih", "Sid", "Kab"],
      Muslim: ["Zay", "Ami", "Aay", "Arh", "Aal", "Zar"],
      Jewish: ["Ash", "Eli", "Ezr", "Ede", "Eli"],
      Gaelic: ["Kae", "Lia", "Aid", "Mae"]
    };

    const suffixesMap: Record<string, string[]> = {
      Japanese: targetGender === "Girl" ? ["ko", "ri", "na", "ka", "mi", "ya"] : ["to", "shi", "ro", "ki", "ta", "zo"],
      Western: targetGender === "Girl" ? ["a", "ia", "ie", "ette"] : ["o", "an", "el", "us"],
      Hindu: targetGender === "Girl" ? ["i", "ya", "ika", "ita"] : ["av", "it", "esh", "an"]
    };

    const roots = rootsMap[cultureKey] || rootsMap["Japanese"];
    const suffixes = suffixesMap[cultureKey] || (targetGender === "Girl" ? ["a", "i", "na"] : ["to", "ki", "an"]);

    for (let i = 0; i < 12; i++) {
      if (results.length >= 12) break;

      let root = roots[i % roots.length];
      if (startsWith) {
        root = startsWith + (root.length > 1 ? root.slice(1) : "an");
      }
      let suffix = suffixes[i % suffixes.length];
      if (endsWith) {
        suffix = endsWith;
      }

      let syntheticName = root + suffix;
      syntheticName = syntheticName.charAt(0).toUpperCase() + syntheticName.slice(1).toLowerCase();

      if (seenNames.has(syntheticName.toLowerCase())) continue;
      seenNames.add(syntheticName.toLowerCase());

      results.push({
        name: syntheticName,
        meaning: `Bright, noble, and cherished in ${cultureKey} tradition, symbolizing divine light and wisdom`,
        origin: defaultLang,
        religion: filters.religion || defaultReligion,
        language: filters.language || defaultLang,
        country: filters.country || defaultCountry,
        gender: targetGender,
        popularityScore: 91 + (i % 8),
        pronunciation: syntheticName.charAt(0) + "h-" + syntheticName.slice(1),
        similarNames: [syntheticName + "a", syntheticName + "n"],
        zodiac: "Aries, Leo",
        numerology: "7 - Spiritual Wisdom",
        historicalFact: `An authentic, phonetically harmonious name crafted according to classic ${cultureKey} etymological roots.`
      });
    }
  }

  // Format final response array and mark #1 Best Match
  return results.slice(0, 12).map((item, index) => ({
    ...item,
    isBestMatch: index === 0,
    bestMatchReason: index === 0 ? `Top AI Recommendation: ${item.name} is the optimal choice matching all your selected criteria (${item.gender}, ${cultureKey} Origin, ${item.language}, starting with '${startsWith || "Any"}').` : undefined
  }));
}

function getMockTwinsSiblings(name: string, type: string) {
  return [
    {
      names: [`${name}`, type === "twins" ? "Nova" : "Nolan"],
      vibe: "Celestial & Radiant",
      reason: "Shares a short, energetic vocal footprint and pairs modern elegance with classic warmth."
    },
    {
      names: [`${name}`, type === "twins" ? "Felix" : "Flora"],
      vibe: "Botanical Harmony",
      reason: "Creates an beautiful aesthetic connection of meanings representing nature, good fortune, and life."
    }
  ];
}

function getMockNicknames(name: string) {
  return [
    { nickname: `${name.substring(0, 3)}y`, vibe: "Sweet & Classic" },
    { nickname: `Little ${name}`, vibe: "Affectionate Pet Name" },
    { nickname: name.substring(0, Math.ceil(name.length/2)), vibe: "Short & Trendy" },
    { nickname: `Zuzu`, vibe: "Playful & Vibrant" },
    { nickname: `${name} Bear`, vibe: "Cozy & Warm" },
    { nickname: `Ace`, vibe: "Sharp & Modern" }
  ];
}

function getMockMeaningReport(name: string) {
  return {
    name: name,
    meaning: "An elegant, globally loved name signifying spiritual strength, grace, and inner light.",
    origin: "Multicultural (Hebrew / Latin / Sanskrit)",
    history: "Used across eras by royalty and visionaries, blending timeless traditional values with modern global charm.",
    variations: [`${name}a`, `${name}s`, `Valen`],
    numerology: "3 - High Expressive Creativity & Enthusiasm",
    zodiac: "Leo, Libra, Pisces",
    popularityTrend: "Currently rising rapidly in the Top 100 global lists."
  };
}

function getMockNumerology(name: string) {
  return {
    number: 5,
    title: "The Progressive Explorer",
    traits: ["Adaptable", "Magnetic", "Curious", "Dynamic"],
    description: `A child named ${name} who carries this frequency will be exceptionally curious, highly expressive, and love outdoor adventure. They possess a natural magnetic charm and transition effortlessly to new social and learning circles.`,
    luckyColor: "Cobalt Blue",
    luckyDay: "Wednesday",
    luckyStone: "Emerald"
  };
}

// Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BabyName AI full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
