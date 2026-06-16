// ============================================================
// EDUROUTE — Mock Curriculum Data
// ============================================================

export const subjects = {
  science: {
    id: 'science',
    name: 'Science',
    icon: 'biotech',
    color: '#00C853',
    chapters: [
      {
        id: 'ch1',
        title: 'Cell Structure & Functions',
        unit: 'Unit 1',
        topics: 8,
        quizzes: 3,
        duration: '4h 20m',
        progress: 65,
        mastery: 72,
        videoId: 'WdKVTrFzYg4',
        subtopics: [
          { id: 't1', title: 'Introduction to Cells', num: '1.0', done: true },
          { id: 't2', title: 'Cellular Organelles', num: '1.1', done: true },
          { id: 't3', title: 'Mitosis & Meiosis', num: '1.2', active: true },
          { id: 't4', title: 'Cellular Respiration', num: '1.3', done: false },
          { id: 't5', title: 'Photosynthesis', num: '1.4', done: false },
        ],
        notes: `
## The Cell Cycle Overview

The cell cycle is an ordered series of events involving cell growth and cell division that produces two new daughter cells. Cells on the path to cell division proceed through a series of precisely timed and carefully regulated stages.

**Key Concept: Interphase**
The cell spends most of its life in interphase, growing and preparing for division. It is divided into three subphases: **G1**, **S** (synthesis of DNA), and **G2**.

## Phases of Mitosis

Mitosis is divided into four main phases. The acronym \`PMAT\` is often used to remember the order.

- **Prophase:** Chromatin condenses into visible chromosomes. The nuclear envelope breaks down.
- **Metaphase:** Chromosomes align at the cell equator.
- **Anaphase:** Sister chromatids are pulled apart to opposite poles.
- **Telophase:** Chromosomes arrive at poles, nuclear envelopes reform.

## Meiosis vs Mitosis

| Feature | Mitosis | Meiosis |
|---|---|---|
| Purpose | Growth, repair | Sexual reproduction |
| Divisions | 1 | 2 |
| Daughter cells | 2 identical | 4 unique |
| Chromosome # | Same (diploid) | Halved (haploid) |
        `
      },
      {
        id: 'ch2',
        title: 'Tissues & Organization',
        unit: 'Unit 2',
        topics: 6,
        quizzes: 2,
        duration: '3h 10m',
        progress: 30,
        mastery: 45,
        videoId: 'Qqe4thU-os8',
        subtopics: [
          { id: 't1', title: 'Animal Tissues', num: '2.0', done: true },
          { id: 't2', title: 'Plant Tissues', num: '2.1', done: false },
          { id: 't3', title: 'Organ Systems', num: '2.2', done: false },
        ],
        notes: '## Tissues\n\nTissues are groups of similar cells that work together to perform a specific function...'
      },
    ]
  },
  physics: {
    id: 'physics',
    name: 'Physics',
    icon: 'electric_bolt',
    color: '#FF8A00',
    chapters: [
      {
        id: 'ph1',
        title: 'Laws of Motion',
        unit: 'Unit 1',
        topics: 10,
        quizzes: 4,
        duration: '5h 30m',
        progress: 84,
        mastery: 84,
        videoId: '5RJDfoNJ8AE',
        subtopics: [
          { id: 't1', title: "Newton's First Law", num: '1.0', done: true },
          { id: 't2', title: "Newton's Second Law", num: '1.1', done: true },
          { id: 't3', title: "Newton's Third Law", num: '1.2', active: true },
          { id: 't4', title: 'Friction', num: '1.3', done: false },
        ],
        notes: '## Laws of Motion\n\nNewton\'s laws of motion are three fundamental laws...'
      },
      {
        id: 'ph2',
        title: 'Work, Energy & Power',
        unit: 'Unit 2',
        topics: 7,
        quizzes: 3,
        duration: '4h 00m',
        progress: 50,
        mastery: 60,
        videoId: 'w4QFJb9a8vo',
        subtopics: [],
        notes: '## Work & Energy\n\nWork is done when a force moves an object in the direction of the force...'
      },
    ]
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    icon: 'science',
    color: '#88ceff',
    chapters: [
      {
        id: 'chem1',
        title: 'Organic Chemistry',
        unit: 'Unit 1',
        topics: 9,
        quizzes: 4,
        duration: '6h 00m',
        progress: 72,
        mastery: 72,
        videoId: 'Rd4a1X3B61w',
        subtopics: [
          { id: 't1', title: 'Hydrocarbons', num: '1.0', done: true },
          { id: 't2', title: 'Functional Groups', num: '1.1', active: true },
          { id: 't3', title: 'Reactions', num: '1.2', done: false },
        ],
        notes: '## Organic Chemistry\n\nOrganic chemistry is the study of carbon-containing compounds...'
      },
    ]
  },
  mathematics: {
    id: 'mathematics',
    name: 'Mathematics',
    icon: 'functions',
    color: '#AA77FF',
    chapters: [
      {
        id: 'math1',
        title: 'Differential Calculus',
        unit: 'Unit 1',
        topics: 12,
        quizzes: 5,
        duration: '7h 00m',
        progress: 91,
        mastery: 91,
        videoId: 'WUvTyaaNkzM',
        subtopics: [
          { id: 't1', title: 'Limits', num: '1.0', done: true },
          { id: 't2', title: 'Derivatives', num: '1.1', done: true },
          { id: 't3', title: 'Chain Rule', num: '1.2', done: true },
          { id: 't4', title: 'Applications', num: '1.3', active: true },
        ],
        notes: '## Differential Calculus\n\nCalculus is the mathematical study of continuous change...'
      },
    ]
  }
}

export const flashcards = [
  {
    id: 1,
    subject: 'Biology',
    chapter: 'Cell Structure',
    question: 'What is the primary function of the Mitochondria in a eukaryotic cell?',
    answer: 'The mitochondria are the "powerhouses" of the cell, responsible for generating most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.'
  },
  {
    id: 2,
    subject: 'Biology',
    chapter: 'Cell Structure',
    question: 'What is the function of the Golgi apparatus?',
    answer: 'The Golgi apparatus is responsible for processing, packaging, and shipping proteins and lipids received from the endoplasmic reticulum to their final destinations inside or outside the cell.'
  },
  {
    id: 3,
    subject: 'Biology',
    chapter: 'Cell Structure',
    question: 'Describe the difference between prokaryotic and eukaryotic cells.',
    answer: 'Prokaryotic cells lack a membrane-bound nucleus and organelles (e.g., bacteria). Eukaryotic cells have a defined nucleus and membrane-bound organelles (e.g., plant, animal cells).'
  },
  {
    id: 4,
    subject: 'Physics',
    chapter: 'Laws of Motion',
    question: "State Newton's Second Law of Motion.",
    answer: 'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma.'
  },
  {
    id: 5,
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    question: 'What is a functional group?',
    answer: 'A functional group is a specific group of atoms within a molecule that is responsible for the characteristic chemical reactions of that molecule.'
  },
  {
    id: 6,
    subject: 'Mathematics',
    chapter: 'Calculus',
    question: 'What is the derivative of sin(x)?',
    answer: 'The derivative of sin(x) is cos(x). This is one of the fundamental trigonometric derivatives.'
  },
]

export const pyqs = [
  { year: 2023, subject: 'Physics', question: 'Derive the expression for kinetic energy of a body using work-energy theorem.', marks: 5, frequency: 'High' },
  { year: 2022, subject: 'Chemistry', question: 'Explain the mechanism of SN1 and SN2 reactions with examples.', marks: 5, frequency: 'High' },
  { year: 2023, subject: 'Biology', question: 'Draw a well-labelled diagram of mitosis and describe each phase.', marks: 5, frequency: 'Very High' },
  { year: 2021, subject: 'Mathematics', question: 'Evaluate the definite integral of x²+3x from 0 to 2.', marks: 4, frequency: 'Medium' },
  { year: 2023, subject: 'Physics', question: 'State and prove the law of conservation of energy.', marks: 5, frequency: 'Very High' },
]

export const weeklyActivity = [
  { day: 'Mon', minutes: 120, chapters: 2 },
  { day: 'Tue', minutes: 45, chapters: 1 },
  { day: 'Wed', minutes: 180, chapters: 3 },
  { day: 'Thu', minutes: 90, chapters: 1 },
  { day: 'Fri', minutes: 60, chapters: 1 },
  { day: 'Sat', minutes: 200, chapters: 4 },
  { day: 'Sun', minutes: 30, chapters: 0 },
]

export const heatmapData = Array.from({ length: 84 }, (_, i) => ({
  date: i,
  intensity: Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0
}))

export const conceptMastery = [
  { concept: 'Cell Division', mastery: 92, subject: 'Biology' },
  { concept: "Newton's Laws", mastery: 84, subject: 'Physics' },
  { concept: 'Organic Reactions', mastery: 72, subject: 'Chemistry' },
  { concept: 'Derivatives', mastery: 91, subject: 'Mathematics' },
  { concept: 'Genetics', mastery: 55, subject: 'Biology' },
  { concept: 'Thermodynamics', mastery: 48, subject: 'Physics' },
  { concept: 'Electrochemistry', mastery: 38, subject: 'Chemistry' },
]

// Explorer Mode Data
export const explorerUnits = [
  { id: 1, title: 'Introduction to Systems', icon: 'hub', status: 'completed', mastery: 100, xp: 450, position: { x: 10, offsetY: 0 } },
  { id: 2, title: 'Oceanic Ecosystems', icon: 'water', status: 'active', mastery: 66, xp: 300, position: { x: 30, offsetY: -40 } },
  { id: 3, title: 'Neural Connectivity', icon: 'psychology', status: 'locked', mastery: 0, xp: 500, position: { x: 55, offsetY: 0 } },
  { id: 4, title: 'Atmospheric Physics', icon: 'cloud', status: 'locked', mastery: 0, xp: 600, position: { x: 75, offsetY: -30 } },
  { id: 5, title: 'Quantum Fundamentals', icon: 'atom', status: 'locked', mastery: 0, xp: 800, position: { x: 90, offsetY: 10 } },
]

export const achievements = [
  { id: 1, title: 'First Steps', desc: 'Complete your first lesson', icon: 'star', earned: true, xp: 50, color: '#FF8A00' },
  { id: 2, title: 'Week Warrior', desc: '7-day learning streak', icon: 'local_fire_department', earned: true, xp: 200, color: '#FF3B30' },
  { id: 3, title: 'Quiz Master', desc: 'Score 100% on 5 quizzes', icon: 'military_tech', earned: true, xp: 300, color: '#00C853' },
  { id: 4, title: 'Deep Diver', desc: 'Study 3+ hours in one session', icon: 'water', earned: true, xp: 150, color: '#88ceff' },
  { id: 5, title: 'Speed Scholar', desc: 'Complete a sprint in record time', icon: 'bolt', earned: false, xp: 250, color: '#ffb77f' },
  { id: 6, title: 'Concept Mapper', desc: 'Create your first knowledge map', icon: 'account_tree', earned: false, xp: 200, color: '#AA77FF' },
  { id: 7, title: 'Perfect Week', desc: 'Study every day for 7 days', icon: 'emoji_events', earned: false, xp: 500, color: '#FF8A00' },
  { id: 8, title: 'Master Explorer', desc: 'Complete all units in a subject', icon: 'explore', earned: false, xp: 1000, color: '#00C853' },
]

export const weeklyMissions = [
  { id: 1, title: 'Complete 3 Quiz Sessions', progress: 2, total: 3, xp: 150, done: false },
  { id: 2, title: 'Watch 5 Video Lessons', progress: 5, total: 5, xp: 100, done: true },
  { id: 3, title: 'Review Flashcards (30 cards)', progress: 18, total: 30, xp: 200, done: false },
  { id: 4, title: 'Study for 2 hours total', progress: 2, total: 2, xp: 120, done: true },
]

export const formulas = [
  { id: 1, subject: 'Physics', title: "Newton's 2nd Law", formula: 'F = ma', desc: 'Force equals mass times acceleration', tags: ['mechanics', 'force'] },
  { id: 2, subject: 'Physics', title: 'Kinetic Energy', formula: 'KE = ½mv²', desc: 'Energy of a moving object', tags: ['energy', 'mechanics'] },
  { id: 3, subject: 'Physics', title: 'Ohm\'s Law', formula: 'V = IR', desc: 'Voltage equals current times resistance', tags: ['electricity', 'circuits'] },
  { id: 4, subject: 'Chemistry', title: 'Ideal Gas Law', formula: 'PV = nRT', desc: 'Pressure-Volume-Temperature relationship', tags: ['gases', 'thermodynamics'] },
  { id: 5, subject: 'Mathematics', title: 'Quadratic Formula', formula: 'x = (-b ± √(b²-4ac)) / 2a', desc: 'Solutions to ax²+bx+c=0', tags: ['algebra', 'roots'] },
  { id: 6, subject: 'Mathematics', title: 'Chain Rule', formula: 'dy/dx = (dy/du)(du/dx)', desc: 'Derivative of composite functions', tags: ['calculus', 'derivatives'] },
]
