export type Quiz = {
  question: string;
  options: string[];
  answer: number;
};

export type Planet = {
  id: string;
  name: string;
  emoji: string;
  colorA: string;
  colorB: string;
  size: number;
  greeting: string;
  facts: string[];
  quiz: Quiz;
};

export const planets: Planet[] = [
  {
    id: "sun",
    name: "The Sun",
    emoji: "☀️",
    colorA: "oklch(0.95 0.16 95)",
    colorB: "oklch(0.72 0.19 45)",
    size: 132,
    greeting: "Hello little explorer! I am the biggest star in our family.",
    facts: [
      "I am a giant ball of hot, glowing gas.",
      "My light takes 8 minutes to tickle your face on Earth.",
      "A million Earths could fit inside me!",
    ],
    quiz: {
      question: "What is the Sun?",
      options: ["A big rock", "A giant star", "A cold planet"],
      answer: 1,
    },
  },
  {
    id: "mercury",
    name: "Mercury",
    emoji: "🌑",
    colorA: "oklch(0.78 0.03 80)",
    colorB: "oklch(0.5 0.03 70)",
    size: 74,
    greeting: "Zoom! I run around the Sun faster than anyone.",
    facts: [
      "I am the closest planet to the Sun.",
      "I am the smallest planet of all.",
      "My days are super hot and my nights are freezing cold.",
    ],
    quiz: {
      question: "Which planet is closest to the Sun?",
      options: ["Mercury", "Saturn", "Neptune"],
      answer: 0,
    },
  },
  {
    id: "earth",
    name: "Earth",
    emoji: "🌍",
    colorA: "oklch(0.75 0.14 200)",
    colorB: "oklch(0.55 0.16 150)",
    size: 96,
    greeting: "This is your home, and mine too. Welcome back!",
    facts: [
      "I am the only planet with plants, animals and you!",
      "Most of me is covered in blue water.",
      "My friend the Moon spins around me every month.",
    ],
    quiz: {
      question: "What covers most of Earth?",
      options: ["Sand", "Water", "Ice cream"],
      answer: 1,
    },
  },
  {
    id: "mars",
    name: "Mars",
    emoji: "🔴",
    colorA: "oklch(0.72 0.16 40)",
    colorB: "oklch(0.5 0.15 30)",
    size: 84,
    greeting: "I am dusty and red, like a big playground of sand.",
    facts: [
      "People call me the Red Planet because of my rusty dust.",
      "I have the tallest volcano in the whole solar system.",
      "Little robots called rovers drive around on me.",
    ],
    quiz: {
      question: "Why is Mars called the Red Planet?",
      options: ["It is on fire", "It has red dust", "It is a tomato"],
      answer: 1,
    },
  },
  {
    id: "jupiter",
    name: "Jupiter",
    emoji: "🟠",
    colorA: "oklch(0.82 0.1 70)",
    colorB: "oklch(0.6 0.13 45)",
    size: 138,
    greeting: "I am the biggest planet — say hello to my giant storm!",
    facts: [
      "I am a gas giant, so you could not stand on me.",
      "My Great Red Spot is a storm bigger than Earth.",
      "I have more than 90 moons dancing around me.",
    ],
    quiz: {
      question: "Which planet is the biggest?",
      options: ["Mercury", "Jupiter", "Earth"],
      answer: 1,
    },
  },
  {
    id: "saturn",
    name: "Saturn",
    emoji: "🪐",
    colorA: "oklch(0.88 0.09 90)",
    colorB: "oklch(0.68 0.11 65)",
    size: 118,
    greeting: "Do you like my sparkly rings? I wear them all the time!",
    facts: [
      "My rings are made of ice and rock, not candy.",
      "I am so light that I would float in a giant bathtub.",
      "My moon Titan has rivers made of gooey liquid.",
    ],
    quiz: {
      question: "What are Saturn's rings made of?",
      options: ["Ice and rock", "Sugar", "Clouds"],
      answer: 0,
    },
  },
  {
    id: "neptune",
    name: "Neptune",
    emoji: "🔵",
    colorA: "oklch(0.7 0.15 250)",
    colorB: "oklch(0.42 0.15 265)",
    size: 92,
    greeting: "Brrr! I am the windiest, farthest planet of all.",
    facts: [
      "I am the farthest planet from the Sun.",
      "My winds blow faster than a jet plane.",
      "I look deep blue because of the gas in my air.",
    ],
    quiz: {
      question: "What is Neptune famous for?",
      options: ["Super fast winds", "Being hottest", "Having no color"],
      answer: 0,
    },
  },
];
