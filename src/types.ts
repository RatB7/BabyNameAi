export interface TrendPoint {
  year: number;
  rank: number;
  popularity: number;
}

export interface BabyName {
  name: string;
  meaning: string;
  origin: string;
  religion: string;
  language: string;
  gender: string;
  popularityScore: number;
  pronunciation: string;
  similarNames: string[];
  zodiac?: string;
  numerology?: string;
  historicalFact?: string;
  trendHistory?: TrendPoint[];
  isBestMatch?: boolean;
  bestMatchReason?: string;
}

export interface FilterState {
  country: string;
  religion: string;
  language: string;
  gender: string;
  startsWith: string;
  endsWith: string;
  meaningKeyword: string;
  popularity: string;
  style: string; // Modern / Traditional
  scarcity: string; // Rare / Popular
  lettersCount: string;
  origin: string;
  birthMonth: string;
  zodiac: string;
  nature: boolean;
  royal: boolean;
  mythology: boolean;
  spiritual: boolean;
  celebrity: boolean;
}

export interface TwinSiblingCombination {
  names: string[];
  vibe: string;
  reason: string;
}

export interface Nickname {
  nickname: string;
  vibe: string;
}

export interface MeaningReport {
  name: string;
  meaning: string;
  origin: string;
  history: string;
  variations: string[];
  numerology: string;
  zodiac: string;
  popularityTrend: string;
}

export interface NumerologyReport {
  number: number;
  title: string;
  traits: string[];
  description: string;
  luckyColor: string;
  luckyDay: string;
  luckyStone: string;
}

export interface SearchSource {
  title: string;
  uri: string;
}
