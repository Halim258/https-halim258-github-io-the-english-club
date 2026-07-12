import type { LessonData, MCQItem } from "./lessons";

/**
 * Programmatically enriches Spanish lessons with:
 *  - hero image (Unsplash source, keyword derived from title)
 *  - reading passage in Spanish (built from vocab example sentences)
 *  - reading comprehension MCQs
 *  - picture-point activity (image + MCQs referencing vocab)
 *  - listening exercise (TTS-friendly transcript from dialogue)
 *  - writing + speaking prompts
 *
 * We build these from data already present in each lesson so all 120
 * Spanish sub-level lessons get consistent, on-topic enrichment.
 */

const stripDiacritics = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/* ─────────────────────────────────────────────
 * Topic detection — maps each Spanish lesson to a specific
 * theme so we can pick a real, on-topic image and build a
 * lesson-specific picture activity (with themed MCQs).
 * ───────────────────────────────────────────── */

type Topic =
  | "greetings" | "introductions" | "countries" | "family" | "numbers"
  | "colors" | "food" | "clothes" | "weather" | "time" | "house"
  | "city" | "transport" | "travel" | "work" | "school" | "health"
  | "shopping" | "hobbies" | "sports" | "music" | "nature" | "animals"
  | "technology" | "media" | "politics" | "business" | "art" | "literature"
  | "environment" | "science" | "generic";

const TOPIC_RULES: { topic: Topic; keys: string[]; imgKeywords: string; label: string }[] = [
  { topic: "greetings",     keys: ["saludo", "despedida", "presentaci", "hola"], imgKeywords: "people,greeting,hello", label: "Saludos" },
  { topic: "introductions", keys: ["personales", "alfabeto", "pronuncia"], imgKeywords: "conversation,spain,people", label: "Presentación" },
  { topic: "countries",     keys: ["país", "pais", "nacionalidad", "idioma"], imgKeywords: "world,map,flags", label: "Países" },
  { topic: "family",        keys: ["familia", "apariencia", "personalidad"], imgKeywords: "family,people,together", label: "Familia" },
  { topic: "numbers",       keys: ["número", "numero", "cantidad", "hora"], imgKeywords: "numbers,market,fruits", label: "Números" },
  { topic: "colors",        keys: ["color", "ropa"], imgKeywords: "clothes,colors,fashion", label: "Colores y ropa" },
  { topic: "food",          keys: ["comida", "restaurant", "cocina", "bebida", "gastronom"], imgKeywords: "spanish,food,tapas", label: "Comida" },
  { topic: "weather",       keys: ["tiempo", "clima", "estacion", "estación"], imgKeywords: "weather,sky,seasons", label: "El tiempo" },
  { topic: "time",          keys: ["fecha", "día", "dia", "mes", "semana", "rutina"], imgKeywords: "clock,calendar,routine", label: "Tiempo y rutina" },
  { topic: "house",         keys: ["casa", "hogar", "vivienda", "mueble", "habitación"], imgKeywords: "house,home,livingroom", label: "La casa" },
  { topic: "city",          keys: ["ciudad", "barrio", "calle", "lugar"], imgKeywords: "spain,city,street", label: "La ciudad" },
  { topic: "transport",     keys: ["transport", "coche", "tren", "avión", "avion"], imgKeywords: "transport,train,car", label: "Transporte" },
  { topic: "travel",        keys: ["viaj", "turismo", "vacaciones", "aeropuerto"], imgKeywords: "travel,spain,tourism", label: "Viajes" },
  { topic: "work",          keys: ["trabaj", "profesión", "profesion", "oficio", "empresa", "negocio"], imgKeywords: "office,work,business", label: "Trabajo" },
  { topic: "school",        keys: ["escuela", "estudio", "universidad", "clase", "aula", "educación", "educacion"], imgKeywords: "school,students,classroom", label: "Escuela" },
  { topic: "health",        keys: ["salud", "cuerpo", "médico", "medico", "hospital", "enfermedad"], imgKeywords: "doctor,hospital,health", label: "Salud" },
  { topic: "shopping",      keys: ["compra", "tienda", "mercado", "supermercado"], imgKeywords: "market,shopping,store", label: "Compras" },
  { topic: "hobbies",       keys: ["hobby", "hobbies", "pasatiempo", "ocio", "tiempo libre"], imgKeywords: "hobby,leisure,park", label: "Hobbies" },
  { topic: "sports",        keys: ["deporte", "fútbol", "futbol"], imgKeywords: "sports,football,stadium", label: "Deportes" },
  { topic: "music",         keys: ["música", "musica", "canción", "cancion"], imgKeywords: "music,concert,guitar", label: "Música" },
  { topic: "nature",        keys: ["naturaleza", "paisaj", "montaña", "playa", "mar", "río", "rio"], imgKeywords: "spain,landscape,nature", label: "Naturaleza" },
  { topic: "animals",       keys: ["animal", "mascota"], imgKeywords: "animals,pets,dog", label: "Animales" },
  { topic: "technology",    keys: ["tecnolog", "digital", "internet", "redes", "informát", "informat"], imgKeywords: "technology,computer,laptop", label: "Tecnología" },
  { topic: "media",         keys: ["medios", "prensa", "periódico", "periodico", "televisión", "television", "noticia"], imgKeywords: "newspaper,media,news", label: "Medios" },
  { topic: "politics",      keys: ["polít", "polit", "gobierno", "sociedad", "derechos", "migración", "migracion"], imgKeywords: "government,parliament,people", label: "Sociedad" },
  { topic: "business",      keys: ["econom", "finanz", "empresa", "banco", "dinero", "lideraz"], imgKeywords: "business,meeting,finance", label: "Negocios" },
  { topic: "art",           keys: ["arte", "pintura", "museo", "cine"], imgKeywords: "art,museum,painting", label: "Arte" },
  { topic: "literature",    keys: ["literatura", "libro", "novela", "poesía", "poesia"], imgKeywords: "books,library,reading", label: "Literatura" },
  { topic: "environment",   keys: ["medio ambiente", "sostenib", "ecolog", "cambio climát"], imgKeywords: "environment,nature,earth", label: "Medio ambiente" },
  { topic: "science",       keys: ["ciencia", "científ", "cientif", "investig"], imgKeywords: "science,lab,research", label: "Ciencia" },
];

function detectTopic(title: string): { topic: Topic; imgKeywords: string; label: string } {
  const t = stripDiacritics(title).toLowerCase();
  for (const rule of TOPIC_RULES) {
    if (rule.keys.some((k) => t.includes(stripDiacritics(k).toLowerCase()))) {
      return { topic: rule.topic, imgKeywords: rule.imgKeywords, label: rule.label };
    }
  }
  return { topic: "generic", imgKeywords: "spain,spanish,culture", label: "España" };
}

/**
 * Deterministic seed per lesson so images stay stable across renders.
 */
const seedFor = (lesson: LessonData): number => {
  const s = `${lesson.levelId}-${lesson.lessonNumber}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h) || 1;
};

// loremflickr returns a real, topic-matching photo. `lock` keeps it stable.
const heroImageFor = (lesson: LessonData): string => {
  const { imgKeywords } = detectTopic(lesson.title);
  return `https://loremflickr.com/1200/500/${encodeURIComponent(imgKeywords)}?lock=${seedFor(lesson)}`;
};
const pictureImageFor = (lesson: LessonData): string => {
  const { imgKeywords } = detectTopic(lesson.title);
  return `https://loremflickr.com/900/600/${encodeURIComponent(imgKeywords)}?lock=${seedFor(lesson) + 1}`;
};

const shuffleDeterministic = <T>(arr: T[], seed: number): T[] => {
  // Simple LCG-based deterministic shuffle so options are stable across renders.
  const copy = [...arr];
  let s = seed || 1;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildReading = (lesson: LessonData) => {
  const examples = lesson.vocabulary
    .map((v) => v.example)
    .filter(Boolean)
    .slice(0, 6);
  const intro = `En esta lección practicamos "${lesson.title}". Lee el texto y responde las preguntas.`;
  const body = examples.join(" ");
  const text = `${intro}\n\n${body}`;

  // 4 comprehension questions from vocab meanings.
  const pool = lesson.vocabulary.slice(0, Math.min(8, lesson.vocabulary.length));
  const questions: MCQItem[] = pool.slice(0, 4).map((v, idx) => {
    const distractors = shuffleDeterministic(
      pool.filter((x) => x.word !== v.word).map((x) => x.meaning),
      idx + 7
    ).slice(0, 3);
    const options = shuffleDeterministic([v.meaning, ...distractors], idx + 3);
    return {
      question: `¿Qué significa "${v.word}" en inglés?`,
      options,
      correct: options.indexOf(v.meaning),
    };
  });

  return {
    title: `Lectura: ${lesson.title}`,
    text,
    questions,
  };
};

const buildPictureActivity = (lesson: LessonData) => {
  const { topic, label } = detectTopic(lesson.title);
  const themed = buildThemedActivity(lesson, topic);
  if (themed) {
    return {
      imageUrl: pictureImageFor(lesson),
      caption: `${label} — ${lesson.title}`,
      prompt: themed.prompt,
      questions: themed.questions,
    };
  }
  // Fallback: vocab-based
  const pool = lesson.vocabulary.slice(0, Math.min(8, lesson.vocabulary.length));
  if (pool.length < 4) return undefined;
  const questions: MCQItem[] = pool.slice(0, 4).map((v, idx) => {
    const others = shuffleDeterministic(
      pool.filter((x) => x.word !== v.word).map((x) => x.word),
      idx + 11
    ).slice(0, 3);
    const options = shuffleDeterministic([v.word, ...others], idx + 5);
    return {
      question: `Mira la imagen: ¿cuál palabra en español significa "${v.meaning}"?`,
      options,
      correct: options.indexOf(v.word),
    };
  });
  return {
    imageUrl: pictureImageFor(lesson),
    caption: `${label} — ${lesson.title}`,
    prompt: "Observa la imagen y elige la palabra correcta en español.",
    questions,
  };
};

/**
 * Topic-specific picture activities. Each returns 3–4 themed MCQs that
 * ask the learner to interpret what they see in the photo using this
 * lesson's own vocabulary/dialogue where possible.
 */
function buildThemedActivity(
  lesson: LessonData,
  topic: Topic
): { prompt: string; questions: MCQItem[] } | undefined {
  const vocabWords = lesson.vocabulary.map((v) => v.word);
  const has = (w: string) => vocabWords.some((v) => stripDiacritics(v).toLowerCase().includes(stripDiacritics(w).toLowerCase()));

  switch (topic) {
    case "countries": {
      // Extract countries and cities present in vocab / dialogue.
      const COUNTRIES = ["España", "México", "Argentina", "Egipto", "Estados Unidos", "Francia", "Italia", "Alemania", "Brasil", "Colombia", "Chile", "Perú", "Marruecos", "Portugal"];
      const CITIES = ["Madrid", "Barcelona", "Sevilla", "Valencia", "Ciudad de México", "Buenos Aires", "El Cairo", "Alejandría", "Nueva York", "París", "Roma", "Lisboa"];
      const inVocab = COUNTRIES.filter((c) => vocabWords.some((v) => stripDiacritics(v).toLowerCase().includes(stripDiacritics(c).toLowerCase())));
      const country = inVocab[0] || "España";
      const countryOpts = shuffleDeterministic([country, ...COUNTRIES.filter((c) => c !== country)].slice(0, 4), 3);
      const cityText = lesson.dialogue?.map((d) => d.text).join(" ") ?? "";
      const city = CITIES.find((c) => cityText.includes(c)) || "Madrid";
      const cityOpts = shuffleDeterministic([city, ...CITIES.filter((c) => c !== city)].slice(0, 4), 5);
      return {
        prompt: "Observa la imagen (mapa/bandera) y responde: ¿qué país y ciudad ves?, ¿cuántas banderas y cuántos idiomas puedes identificar?",
        questions: [
          {
            question: "¿Qué país aparece principalmente en la imagen?",
            options: countryOpts,
            correct: countryOpts.indexOf(country),
          },
          {
            question: "¿Qué ciudad se menciona en el diálogo de esta lección?",
            options: cityOpts,
            correct: cityOpts.indexOf(city),
          },
          {
            question: "¿Cuántas banderas puedes ver en la imagen?",
            options: ["1", "2", "3", "4 o más"],
            correct: 3,
          },
          {
            question: "Una persona de este país es de nacionalidad…",
            options: has("Español") ? ["española", "italiana", "francesa", "alemana"]
                    : has("Mexican") ? ["mexicana", "peruana", "chilena", "argentina"]
                    : ["española", "mexicana", "argentina", "egipcia"],
            correct: 0,
          },
        ],
      };
    }
    case "numbers": {
      return {
        prompt: "Mira la imagen y cuenta lo que ves. Responde en español.",
        questions: [
          { question: "¿Cuántos objetos principales ves en la imagen?", options: ["Uno", "Dos", "Tres", "Cuatro o más"], correct: 3 },
          { question: "¿Cuántas personas aparecen?", options: ["Ninguna", "Una", "Dos", "Tres o más"], correct: 2 },
          { question: "¿Qué número es 15 en español?", options: ["catorce", "quince", "dieciséis", "cincuenta"], correct: 1 },
          { question: "¿Cuál es un número redondo?", options: ["treinta", "trece", "tres", "trescientos y uno"], correct: 0 },
        ],
      };
    }
    case "family": {
      return {
        prompt: "Observa la foto de la familia y responde.",
        questions: [
          { question: "¿Cuántas personas hay en la imagen?", options: ["1", "2", "3", "4 o más"], correct: 3 },
          { question: "¿Quién suele ser mayor en una familia?", options: ["el bebé", "los abuelos", "el hermano", "el primo"], correct: 1 },
          { question: "La hermana de mi madre es mi…", options: ["prima", "tía", "abuela", "sobrina"], correct: 1 },
          { question: "¿Qué palabra describe la imagen?", options: ["familia", "escuela", "oficina", "hospital"], correct: 0 },
        ],
      };
    }
    case "colors": {
      return {
        prompt: "Mira los colores y la ropa en la imagen.",
        questions: [
          { question: "¿Qué color predomina más en la imagen?", options: ["rojo", "azul", "verde", "amarillo"], correct: 1 },
          { question: "¿Cuántas prendas de ropa puedes contar?", options: ["1", "2", "3", "4 o más"], correct: 3 },
          { question: "Un color oscuro típico es:", options: ["blanco", "negro", "amarillo", "rosa"], correct: 1 },
          { question: "¿Qué prenda cubre las piernas?", options: ["camisa", "pantalón", "sombrero", "zapato"], correct: 1 },
        ],
      };
    }
    case "food": {
      return {
        prompt: "Observa la comida en la imagen y responde.",
        questions: [
          { question: "¿Cuántos platos ves aproximadamente?", options: ["1", "2", "3", "4 o más"], correct: 3 },
          { question: "Un plato típico español es:", options: ["paella", "sushi", "pizza", "hamburguesa"], correct: 0 },
          { question: "Para beber suele pedirse:", options: ["agua", "arena", "sal", "papel"], correct: 0 },
          { question: "En un restaurante, la persona que sirve es el/la:", options: ["camarero/a", "cocinero/a", "cliente", "chef"], correct: 0 },
        ],
      };
    }
    case "weather": {
      return {
        prompt: "Mira el cielo y el paisaje.",
        questions: [
          { question: "¿Qué tiempo hace en la imagen?", options: ["Hace sol", "Está lloviendo", "Está nevando", "Hay niebla"], correct: 0 },
          { question: "¿En qué estación puede estar?", options: ["primavera", "verano", "otoño", "invierno"], correct: 1 },
          { question: "Ropa adecuada para este tiempo:", options: ["abrigo", "camiseta", "botas de nieve", "bufanda"], correct: 1 },
          { question: "'Hace calor' significa:", options: ["It's cold", "It's hot", "It's raining", "It's cloudy"], correct: 1 },
        ],
      };
    }
    case "city": {
      return {
        prompt: "Observa la ciudad en la imagen.",
        questions: [
          { question: "¿Qué edificio destaca más?", options: ["una iglesia/catedral", "una casa pequeña", "una granja", "un barco"], correct: 0 },
          { question: "¿Cuántos coches puedes ver?", options: ["Ninguno", "1–2", "3–5", "Muchos"], correct: 2 },
          { question: "El lugar para tomar café en la calle es:", options: ["la cafetería", "el hospital", "la escuela", "la playa"], correct: 0 },
          { question: "La calle principal se llama en español:", options: ["avenida", "montaña", "río", "bosque"], correct: 0 },
        ],
      };
    }
    case "travel": {
      return {
        prompt: "Mira la escena de viaje.",
        questions: [
          { question: "¿Qué medio de transporte ves?", options: ["avión", "bicicleta", "barco", "caballo"], correct: 0 },
          { question: "En el aeropuerto muestras…", options: ["el pasaporte", "el diccionario", "la comida", "las llaves"], correct: 0 },
          { question: "¿Cuántas maletas suele llevar un viajero?", options: ["0", "1", "2", "5 o más"], correct: 2 },
          { question: "'Vacaciones' significa:", options: ["Work", "Holidays", "School", "Meeting"], correct: 1 },
        ],
      };
    }
    case "work": {
      return {
        prompt: "Observa la oficina en la imagen.",
        questions: [
          { question: "¿Cuántas personas trabajan en la imagen?", options: ["0", "1", "2", "3 o más"], correct: 3 },
          { question: "Un objeto típico en la oficina es:", options: ["el ordenador", "la sartén", "la almohada", "el balón"], correct: 0 },
          { question: "'Reunión' significa:", options: ["Break", "Meeting", "Salary", "Holiday"], correct: 1 },
          { question: "El jefe de la empresa es el/la:", options: ["director/a", "estudiante", "paciente", "camarero/a"], correct: 0 },
        ],
      };
    }
    case "house": {
      return {
        prompt: "Observa la casa y sus habitaciones.",
        questions: [
          { question: "¿Qué habitación se muestra?", options: ["salón", "baño", "dormitorio", "cocina"], correct: 0 },
          { question: "¿Cuántas ventanas puedes contar?", options: ["0", "1", "2", "3 o más"], correct: 2 },
          { question: "Se duerme en el/la:", options: ["cama", "sofá", "mesa", "silla"], correct: 0 },
          { question: "'Cocina' significa:", options: ["Living room", "Kitchen", "Garage", "Garden"], correct: 1 },
        ],
      };
    }
    case "school": {
      return {
        prompt: "Observa el aula.",
        questions: [
          { question: "¿Cuántos estudiantes hay aproximadamente?", options: ["1–5", "6–10", "11–20", "Más de 20"], correct: 2 },
          { question: "El profesor escribe en la…", options: ["pizarra", "puerta", "ventana", "silla"], correct: 0 },
          { question: "'Examen' significa:", options: ["Break", "Test", "Homework", "Book"], correct: 1 },
          { question: "La materia de números es:", options: ["matemáticas", "historia", "arte", "música"], correct: 0 },
        ],
      };
    }
    case "health": {
      return {
        prompt: "Escena de salud/hospital.",
        questions: [
          { question: "¿Quién ayuda al paciente?", options: ["médico/a", "profesor/a", "cocinero/a", "conductor/a"], correct: 0 },
          { question: "¿Cuántas personas ves con bata blanca?", options: ["0", "1", "2", "3 o más"], correct: 2 },
          { question: "'Me duele la cabeza' significa:", options: ["My head hurts", "I'm hungry", "I'm tired", "I'm cold"], correct: 0 },
          { question: "Vamos al hospital cuando estamos…", options: ["contentos", "enfermos", "cansados de fiesta", "de vacaciones"], correct: 1 },
        ],
      };
    }
    case "shopping": {
      return {
        prompt: "Escena de compras.",
        questions: [
          { question: "¿Dónde ocurre la escena?", options: ["mercado/tienda", "hospital", "parque", "playa"], correct: 0 },
          { question: "¿Cuántos productos ves en primer plano?", options: ["1", "2", "3", "4 o más"], correct: 3 },
          { question: "'¿Cuánto cuesta?' significa:", options: ["Where is it?", "How much is it?", "What is it?", "Who is it?"], correct: 1 },
          { question: "Pagamos con:", options: ["dinero o tarjeta", "sombrero", "llaves", "flores"], correct: 0 },
        ],
      };
    }
    case "greetings":
    case "introductions": {
      return {
        prompt: "Observa a las personas saludándose.",
        questions: [
          { question: "¿Cuántas personas se saludan?", options: ["1", "2", "3", "4 o más"], correct: 1 },
          { question: "Un saludo formal es:", options: ["¡Hola!", "Buenos días", "¿Qué tal?", "¡Chao!"], correct: 1 },
          { question: "Para despedirse decimos:", options: ["Adiós", "Hola", "Gracias", "Perdón"], correct: 0 },
          { question: "'¿Cómo te llamas?' pregunta por…", options: ["la edad", "el nombre", "la ciudad", "el trabajo"], correct: 1 },
        ],
      };
    }
    default:
      return undefined;
  }
};

const buildListening = (lesson: LessonData) => {
  if (!lesson.dialogue || lesson.dialogue.length === 0) return undefined;
  const lines = lesson.dialogue.slice(0, 6);
  const transcript = lines.map((l) => `${l.speaker}: ${l.text}`).join("\n");

  const questions: MCQItem[] = [];
  // Q1: who speaks first?
  const speakers = Array.from(new Set(lesson.dialogue.map((l) => l.speaker)));
  if (speakers.length >= 2) {
    const others = speakers.slice(1, 4);
    const options = shuffleDeterministic([speakers[0], ...others], 1).slice(0, 4);
    if (!options.includes(speakers[0])) options[0] = speakers[0];
    questions.push({
      question: "¿Quién habla primero en el diálogo?",
      options,
      correct: options.indexOf(speakers[0]),
    });
  }
  // Q2: pick a keyword from a line
  const line = lines[Math.min(1, lines.length - 1)];
  const words = line.text.split(/\s+/).filter((w) => w.length > 3);
  if (words.length > 0) {
    const target = stripDiacritics(words[0]).replace(/[.,¿?¡!:;"']/g, "");
    const decoys = ["hola", "gracias", "adiós", "familia", "trabajo", "casa"]
      .filter((d) => stripDiacritics(d) !== target.toLowerCase())
      .slice(0, 3);
    const options = shuffleDeterministic([words[0], ...decoys], 2);
    questions.push({
      question: `Escucha otra vez. ¿Cuál palabra dice ${line.speaker}?`,
      options,
      correct: options.indexOf(words[0]),
    });
  }
  // Q3: total speakers count
  questions.push({
    question: "¿Cuántas personas participan en el diálogo?",
    options: ["1", "2", "3", "4"],
    correct: Math.min(Math.max(speakers.length - 1, 0), 3),
  });

  return { transcript, questions };
};

const buildWritingPrompt = (lesson: LessonData): string =>
  `Escribe un párrafo corto (50–80 palabras) sobre "${lesson.title}". Usa al menos 4 palabras del vocabulario de esta lección.`;

const buildSpeakingPrompt = (lesson: LessonData): string =>
  `Habla 1 minuto sobre "${lesson.title}". Preséntate, describe una situación real y usa nuevas palabras del vocabulario.`;

export function enrichSpanishLesson(lesson: LessonData): LessonData {
  // Do not overwrite manually-authored fields.
  return {
    ...lesson,
    heroImage: lesson.heroImage ?? heroImageFor(lesson),
    reading: lesson.reading ?? buildReading(lesson),
    pictureActivity: lesson.pictureActivity ?? buildPictureActivity(lesson),
    listening: lesson.listening ?? buildListening(lesson),
    writingPrompt: lesson.writingPrompt ?? buildWritingPrompt(lesson),
    speakingPrompt: lesson.speakingPrompt ?? buildSpeakingPrompt(lesson),
  };
}

export function enrichSpanishLessons(
  map: Record<string, LessonData>
): Record<string, LessonData> {
  const out: Record<string, LessonData> = {};
  for (const [k, v] of Object.entries(map)) {
    out[k] = enrichSpanishLesson(v);
  }
  return out;
}