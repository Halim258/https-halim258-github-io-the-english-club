import type { LessonData, MCQItem, VocabWord } from "./lessons";
import recorderImage from "@/assets/courses/recorder.jpg";

const LEVEL_ID = "recorder";
const LEVEL_LABEL = "The Perfect Recorder Method";
const IMAGE = recorderImage;

type RecorderLesson = {
  title: string;
  description: string;
  focus: string;
  note?: string;
  technique: string;
  practice: string[];
  tune: string;
};

const lessonsPlan: RecorderLesson[] = [
  { title: "Meet Your Recorder", description: "Learn what the descant recorder is, how it makes sound, and how to prepare for your first lesson.", focus: "recorder, mouthpiece, window, finger holes", technique: "Hold the recorder gently and keep the mouthpiece clean. Blow softly: the recorder needs air, not force.", practice: ["Name the mouthpiece, window, body, and finger holes.", "Hold the recorder with your left hand at the top and your right hand below.", "Breathe in quietly and make three gentle, steady sounds."], tune: "Sound discovery" },
  { title: "Posture, Hands, and Gentle Air", description: "Set up a relaxed playing position and learn why flat fingers and gentle air create a clear tone.", focus: "posture, left hand, right hand, gentle air", technique: "Sit or stand tall, relax your shoulders, and cover holes completely with the flat pads of your fingers.", practice: ["Check that your shoulders and wrists are relaxed.", "Cover and uncover the holes silently before blowing.", "Play four slow, gentle breaths and listen for a steady tone."], tune: "Four calm breaths" },
  { title: "The Note B", description: "Play your first note by covering the thumb hole and the first hole with your left hand.", focus: "B, thumb hole, first finger, tonguing", note: "B", technique: "For B, cover the back thumb hole and the first front hole. Start each note with a light ‘too’ tongue.", practice: ["Make four short B notes with a gentle ‘too’.", "Play two long B notes, keeping the sound even.", "Read the rhythm first, then play a short B pattern."], tune: "B is our first musical voice" },
  { title: "The Note A", description: "Add the second left-hand finger to move smoothly between B and A.", focus: "A, B, changing fingers, steady pulse", note: "A", technique: "A uses the thumb plus the first two front holes. Move one finger at a time without lifting the others too high.", practice: ["Alternate B–A eight times without rushing.", "Play A for two beats, then B for two beats.", "Clap a four-beat pattern before playing it."], tune: "B–A echo" },
  { title: "The Note G", description: "Complete the first three left-hand fingers and connect B, A, and G.", focus: "G, A, B, fingering sequence", note: "G", technique: "G uses the thumb and the first three front holes. Keep your fingers close to the recorder as you change notes.", practice: ["Play the descending pattern B–A–G slowly.", "Return G–A–B with the same relaxed air.", "Repeat the three-note pattern four times evenly."], tune: "The first three notes" },
  { title: "Reading the Staff", description: "Connect the first three recorder notes to written music and learn to prepare before playing.", focus: "staff, treble clef, note names, reading", technique: "Look at the notes, identify the fingering, and clap the rhythm before you blow.", practice: ["Point to every B, A, and G in a short exercise.", "Say the note names aloud while tapping a steady pulse.", "Play only after you can read the pattern without stopping."], tune: "Read, clap, play" },
  { title: "The Upper Note C'", description: "Learn upper C and make the first leap from the lower three notes.", focus: "upper C, octave, thumb position", note: "C'", technique: "Upper C uses the thumb and the second front hole. Keep the thumb hole covered and use a focused but gentle air stream.", practice: ["Play G–C' and C'–G slowly.", "Hold C' for four steady counts.", "Compare the bright upper sound with low G."], tune: "A bright new sound" },
  { title: "The Upper Note D'", description: "Add upper D and practise small leaps with accurate fingering.", focus: "upper D, fingering changes, leaps", note: "D'", technique: "Upper D uses the thumb hole only. Do not squeeze the thumb; keep the hole covered cleanly.", practice: ["Alternate C' and D' with a quiet tongue.", "Play G–A–B–C'–D' slowly upward.", "Return down the sequence while keeping the pulse steady."], tune: "Climb the five-note path" },
  { title: "Rhythm: Crotchets and Minims", description: "Read two common note values and learn to count while playing.", focus: "crotchet, minim, bar, 4/4", technique: "A crotchet takes one beat; a minim takes two. Count ‘1 2 3 4’ and keep the sound moving through the bar.", practice: ["Clap four crotchets in a bar.", "Clap two minims in a bar.", "Play a mixed rhythm on B, A, and G without changing the pulse."], tune: "Count every beat" },
  { title: "Your First Simple Tunes", description: "Use B, A, G, C', and D' in short melodies and learn to prepare a tune.", focus: "melody, phrase, repeat, accuracy", technique: "Read and clap each phrase, breathe at the end of an idea, and keep your fingers ready for the next note.", practice: ["Mark the breathing places in a short tune.", "Play each phrase twice before joining them.", "Circle the note changes that need extra practice."], tune: "A five-note melody" },
  { title: "The Note F Sharp", description: "Introduce F sharp and use it with G and A in a new melodic shape.", focus: "F sharp, sharp sign, G–F#", note: "F#", technique: "F sharp has a special fingering. Check the chart carefully and listen for a clean change from G.", practice: ["Say ‘F sharp’ whenever you see the sharp sign.", "Practise G–F#–G slowly.", "Play a four-bar exercise, stopping only at the written rests."], tune: "A new colour below G" },
  { title: "The Note E", description: "Extend the lower register with E and practise a smooth descent from G.", focus: "E, lower register, descending scale", note: "E", technique: "Cover the required holes fully and keep the air gentle as the note moves lower.", practice: ["Play G–F#–E slowly.", "Hold E for two beats and release cleanly.", "Play the lower three-note pattern with a metronome."], tune: "Step down carefully" },
  { title: "The Note D", description: "Complete the first lower scale with D and build confidence in the low register.", focus: "low D, scale, covering holes", note: "D", technique: "Low D needs careful covering and calm air. If the sound squeaks, check every hole before blowing harder.", practice: ["Play E–D four times with a gentle tongue.", "Play D–E–F#–G as a slow ascending pattern.", "Record one take and listen for clear starts."], tune: "The lower four notes" },
  { title: "Playing Together: Rounds and Canons", description: "Learn how two groups can play the same melody at different times while keeping their own pulse.", focus: "round, canon, ensemble, listening", technique: "Keep your part steady even when another group begins. Listen without copying their timing.", practice: ["Clap a repeated four-beat pattern with a partner.", "Start a simple melody two bars after your partner.", "Finish together by watching the leader’s final cue."], tune: "A melody shared" },
  { title: "The Upper Note E'", description: "Learn the upper E and refine the thumb movement used for higher notes.", focus: "upper E, pinched thumb, precision", note: "E'", technique: "Upper E asks for a small, precise thumb opening. Keep the thumb relaxed and the rest of the hand stable.", practice: ["Move D'–E'–D' slowly.", "Hold E' softly for two beats.", "Repeat the difficult change five times before playing the whole phrase."], tune: "Reach one step higher" },
  { title: "The Note F", description: "Add F and explore a new fingering shape in the middle register.", focus: "F, fingering pattern, tone", note: "F", technique: "Use the correct F fingering for your recorder and cover the holes evenly. A clear tone matters more than speed.", practice: ["Play E–F–G with separate tonguing.", "Compare F played softly and at a comfortable medium volume.", "Make up two short patterns using E, F, and G."], tune: "Three-note questions" },
  { title: "The Note C", description: "Learn low C and connect the complete beginner range in stepwise exercises.", focus: "low C, range, repeated notes", note: "C", technique: "Low C needs patient, quiet air and complete hole coverage. Repeated Cs should be tongued gently.", practice: ["Play D–C and listen for a clean change.", "Repeat C four times with soft ‘too’ syllables.", "Play upward from low C, one note at a time."], tune: "Open the full range" },
  { title: "The Note B Flat", description: "Introduce B flat, the first accidental that changes a familiar note’s sound.", focus: "B flat, flat sign, accidental", note: "B♭", technique: "B flat uses a different fingering from B. Read the accidental carefully and return to B only when the natural sign appears.", practice: ["Alternate B♭ and A slowly.", "Point to every flat sign in a written exercise.", "Play a phrase twice: once with B flat, once with B natural, and compare."], tune: "A different shade of B" },
  { title: "Performance Workshop", description: "Review the complete beginner range, musical expression, and the repertoire style introduced in the method.", focus: "review, expression, repertoire, performance", technique: "Read, clap, practise slowly, then perform with a confident start, steady pulse, clear tone, and a quiet finish.", practice: ["Choose one melody and mark breathing, repeats, and difficult changes.", "Perform once alone and once with a partner or backing track.", "Write one strength and one next goal after listening to your recording."], tune: "My first recorder recital" },
];

const noteMeanings: Record<string, string> = {
  B: "thumb hole and first front hole",
  A: "thumb hole and first two front holes",
  G: "thumb hole and first three front holes",
  "C'": "a higher note with a focused air stream",
  "D'": "the high note using the thumb hole",
  "F#": "F sharp, a note raised by a semitone",
  E: "a lower note in the beginner register",
  D: "the low note below E",
  "E'": "the upper E with a precise thumb movement",
  F: "a middle-register note with its own fingering",
  C: "the low C requiring calm air",
  "B♭": "B flat, using a different fingering from B",
};

function makeVocab(lesson: RecorderLesson): VocabWord[] {
  const words = [
    ["recorder", "a small woodwind instrument", "Recorder", "The recorder has a clear, gentle sound.", "🎵"],
    ["finger hole", "an opening covered by a finger", "Finger hole", "Cover each finger hole carefully.", "◌"],
    ["tongue", "the light movement that starts a note", "Tonguing", "Use a gentle tongue for every note.", "👅"],
    [lesson.note ?? lesson.focus.split(",")[0], lesson.note ? (noteMeanings[lesson.note] ?? "a recorder note") : lesson.focus, lesson.note ?? "Technique", `${lesson.note ?? "This technique"} needs relaxed hands and gentle air.`, "🎼"],
    ["pulse", "the steady beat underneath music", "Pulse", "Keep a steady pulse while you play.", "🫀"],
    ["phrase", "a short musical idea", "Phrase", "Breathe at the end of a phrase.", "〰️"],
  ];
  return words.map(([word, meaning, arabic, example, emoji]) => ({ word, meaning, arabic, example, emoji }));
}

function mcq(question: string, correct: string, wrong: string[]): MCQItem {
  const options = [correct, ...wrong].slice(0, 4);
  return { question, options, correct: 0 };
}

function buildLesson(plan: RecorderLesson, lessonNumber: number): LessonData {
  const vocabulary = makeVocab(plan);
  const note = plan.note ?? plan.focus.split(",")[0];
  return {
    levelId: LEVEL_ID,
    levelLabel: LEVEL_LABEL,
    lessonNumber,
    title: plan.title,
    description: plan.description,
    heroImage: IMAGE,
    vocabulary,
    dialogue: [
      { speaker: "Teacher", text: `Today we will work on ${plan.focus}.` },
      { speaker: "Student", text: "What should I do first?" },
      { speaker: "Teacher", text: plan.technique },
      { speaker: "Student", text: "I will read, clap, and then play slowly." },
    ],
    grammar: {
      title: `Recorder skill: ${plan.focus}`,
      explanation: `${plan.technique}\n\nPractise each step slowly. Clear notes, relaxed fingers, and a steady pulse are more important than playing quickly.`,
      examples: [
        { sentence: `I play ${note} with gentle air.`, note: `Example: focus on ${note} and keep the sound steady.` },
        { sentence: "I read and clap before I play.", note: "Example: prepare the rhythm before picking up the recorder." },
      ],
    },
    vocabExercises: vocabulary.slice(0, 4).map((item) => mcq(`What does “${item.word}” mean?`, item.meaning, ["a type of rest", "a loud mistake", "a piano key"])),
    conversationExercises: [
      mcq("What should the student do before playing?", "Read and clap the exercise.", ["Play as fast as possible.", "Skip the rhythm.", "Blow hard."]),
      mcq("What kind of air does the recorder need?", "Gentle, steady air.", ["A strong blast.", "No air.", "Uncontrolled air."]),
      mcq("What should the hands do?", "Stay relaxed with fingers close to the holes.", ["Grip tightly.", "Lift every finger high.", "Cover random holes."]),
    ],
    grammarExercises: [
      mcq(`What is the main focus of this lesson?`, plan.focus, ["Piano chords", "Drum notation", "Singing lyrics"]),
      mcq("Which sentence is a good practice habit?", "I practise slowly and listen to my tone.", ["I rush every exercise.", "I ignore the pulse.", "I blow harder when a note squeaks."]),
    ],
    examQuestions: [
      mcq(`Which idea is central to “${plan.title}”?`, plan.focus, ["Stage lighting", "Dance steps", "Concert tickets"]),
      mcq("What is the safest way to improve?", "Repeat a difficult change slowly and accurately.", ["Skip it forever.", "Only play fast.", "Change the fingering each time."]),
      mcq("What makes a musical phrase easier to perform?", "Preparing the rhythm and breathing places.", ["Ignoring the score.", "Stopping after every note.", "Playing without listening."]),
    ],
    homeworkQuestions: [
      mcq("What should you practise today?", plan.practice[0], ["Only watch a performance.", "Put the recorder away.", "Play without checking your fingers."]),
      mcq("What should you listen for?", "A clear tone and a steady pulse.", ["The loudest possible sound.", "Random changes.", "Only the final note."]),
      mcq("How should you finish the practice?", "Write or say one strength and one next goal.", ["Forget what happened.", "Avoid listening.", "Never repeat the exercise."]),
    ],
    speakingPrompt: `Explain and demonstrate ${plan.focus}. Say what you are practising, then play or finger the pattern for 60 seconds.`,
    writingPrompt: `Write three short sentences about your practice: what you played, what sounded clear, and what you will improve next.`,
    reading: {
      title: "Today’s practice plan",
      text: `In this lesson, the player works on ${plan.focus}. The teacher reminds the player to ${plan.technique.toLowerCase()} First, the player ${plan.practice[0].toLowerCase()} Next, the player ${plan.practice[1].toLowerCase()} Finally, the player ${plan.practice[2].toLowerCase()} The goal is ${plan.tune.toLowerCase()} with a steady pulse and a clear, relaxed tone.`,
      questions: [
        mcq("What is the lesson mainly about?", plan.focus, ["A different instrument", "A dance routine", "A history date"]),
        mcq("What is the recommended order?", "Read, clap, practise, and listen.", ["Rush, guess, and stop.", "Blow hard and skip reading.", "Memorise without playing."]),
      ],
    },
  };
}

export const recorderLessons: Record<string, LessonData> = Object.fromEntries(
  lessonsPlan.map((lesson, index) => [`${LEVEL_ID}-${index + 1}`, buildLesson(lesson, index + 1)]),
);
