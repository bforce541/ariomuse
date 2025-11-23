import { Instrument, Complexity, KeySignature, TimeSignature, Mood } from './types';

export const APP_NAME = 'ArioMuse';

export const DEFAULT_ABC = `
X:1
T:Waiting for Inspiration
C:ArioMuse AI
M:4/4
L:1/4
Q:1/4=100
K:C
z4 | z4 | z4 | z4 |]
`;

export const INSTRUMENT_OPTIONS = Object.values(Instrument);
export const COMPLEXITY_OPTIONS = Object.values(Complexity);
export const KEY_OPTIONS = Object.values(KeySignature);
export const TIME_OPTIONS = Object.values(TimeSignature);
export const MOOD_OPTIONS = Object.values(Mood);

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Film Composer",
    text: "ArioMuse helps me break through writer's block instantly. The sheet music generation is surprisingly accurate to music theory rules."
  },
  {
    name: "Marcus Aurelius",
    role: "Piano Teacher",
    text: "I use this to generate sight-reading exercises for my students. It's basically an infinite library of practice material."
  },
  {
    name: "Elena Fisher",
    role: "Indie Developer",
    text: "Needed original chiptune-style tracks for my game. ArioMuse gave me the MIDI base I needed to start production."
  }
];

export const PRICING_TIERS = [
  {
    name: "Muse Free",
    price: "$0",
    period: "forever",
    features: [
      "10 Compositions / month",
      "Standard Instruments",
      "Export to PDF",
      "Basic Support"
    ],
    cta: "Start Creating",
    highlight: false
  },
  {
    name: "Maestro Pro",
    price: "$19",
    period: "per month",
    features: [
      "Unlimited Compositions",
      "All Instruments + Ensembles",
      "Export MusicXML & MIDI",
      "Version History",
      "Commercial License"
    ],
    cta: "Upgrade to Pro",
    highlight: true
  }
];

export const PRESETS = [
  {
    name: "Cinematic Strings",
    settings: {
      instrument: Instrument.Violin,
      key: KeySignature.D_Minor,
      timeSignature: TimeSignature.SixEight,
      tempo: 140,
      complexity: Complexity.Advanced,
      mood: Mood.Epic,
      prompt: "A hans zimmer style building tension with rapid arpeggios."
    }
  },
  {
    name: "Sunday Morning Jazz",
    settings: {
      instrument: Instrument.Piano,
      key: KeySignature.Eb_Major,
      timeSignature: TimeSignature.FourFour,
      tempo: 90,
      complexity: Complexity.Intermediate,
      mood: Mood.Jazz,
      prompt: "Smooth jazz chords with a walking bassline feel."
    }
  },
  {
    name: "Ethereal Harp",
    settings: {
      instrument: Instrument.Harp,
      key: KeySignature.F_Major,
      timeSignature: TimeSignature.ThreeFour,
      tempo: 70,
      complexity: Complexity.Intermediate,
      mood: Mood.Ethereal,
      prompt: "Dreamy glissandos and gentle melody for meditation."
    }
  }
];