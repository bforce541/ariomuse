export enum Instrument {
  Piano = 'Piano',
  Violin = 'Violin',
  Guitar = 'Guitar',
  Cello = 'Cello',
  Flute = 'Flute',
  Clarinet = 'Clarinet',
  Trumpet = 'Trumpet',
  Saxophone = 'Saxophone',
  Drums = 'Drums',
  Harp = 'Harp',
  Synthesizer = 'Synthesizer'
}

export enum Complexity {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Virtuoso = 'Virtuoso',
}

export enum Mood {
  Happy = 'Happy',
  Sad = 'Sad',
  Epic = 'Epic',
  Relaxing = 'Relaxing',
  Dark = 'Dark',
  Romantic = 'Romantic',
  Tense = 'Tense',
  Ethereal = 'Ethereal',
  Jazz = 'Jazz',
}

export enum KeySignature {
  C_Major = 'C Major',
  G_Major = 'G Major',
  D_Major = 'D Major',
  A_Major = 'A Major',
  F_Major = 'F Major',
  Bb_Major = 'Bb Major',
  Eb_Major = 'Eb Major',
  A_Minor = 'A Minor',
  E_Minor = 'E Minor',
  D_Minor = 'D Minor',
  C_Minor = 'C Minor',
  Chromatic = 'Chromatic',
}

export enum TimeSignature {
  FourFour = '4/4',
  ThreeFour = '3/4',
  SixEight = '6/8',
  FiveFour = '5/4',
  TwoFour = '2/4',
  TwelveEight = '12/8',
}

// --- Auth & User Types ---

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  primaryInstrument?: Instrument;
  experienceLevel?: Complexity;
  goals?: string[];
  onboardingCompleted: boolean;
  subscriptionTier: 'free' | 'pro';
  createdAt: number;
}

// --- Composition Types ---

export interface CompositionSettings {
  prompt: string;
  instrument: Instrument;
  complexity: Complexity;
  key: KeySignature;
  timeSignature: TimeSignature;
  tempo: number;
  mood: Mood;
}

export interface CompositionVersion {
  id: string;
  createdAt: number;
  abcNotation: string;
  commentary?: string;
}

export interface Composition {
  id: string;
  userId: string;
  title: string;
  settings: CompositionSettings;
  currentVersionId: string;
  versions: CompositionVersion[]; // History
  createdAt: number;
  updatedAt: number;
  isFavorite: boolean;
  tags: string[];
}

export interface GenerateMusicResponse {
  abc: string;
  commentary: string;
  title: string;
}

// Declaration for the external library loaded via CDN
declare global {
  interface Window {
    ABCJS: any;
  }
}