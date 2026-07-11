import json

topics = [
    "Registro jurídico y textos legales", "Registro científico y divulgación especializada", "Registro literario y estilística",
    "Retórica y figuras (metáfora, ironía, antítesis)", "Pragmática: implicaturas y actos de habla", "Variedades peninsulares del español",
    "Variedades latinoamericanas (México, Río de la Plata, Andes, Caribe)", "Sociolingüística: lenguas en contacto y préstamos",
    "Léxico académico avanzado y nominalización", "Ensayo académico extenso", "Redacción de artículos de investigación",
    "Análisis del discurso político", "Análisis del discurso periodístico", "Oratoria y persuasión avanzada",
    "Debate contradictorio y refutación fina", "Interpretación consecutiva español↔inglés", "Mediación de textos y adaptación de registro",
    "Cultura, historia y pensamiento hispanoamericano", "Tarea integrada DELE C2 (lectura+audio+escritura)", "Repaso C2 y simulacro DELE C2"
]

descriptions = [
    "Exploración del lenguaje técnico y precisión terminológica.", "Análisis de la objetividad y estructura científica.", "Estudio de recursos estéticos y polifonía narrativa.",
    "Uso de figuras retóricas para la persuasión.", "Interpretación del contexto e intención comunicativa.", "Rasgos de los dialectos de España.",
    "Diversidad lingüística en América Hispana.", "Influencia de lenguas y bilingüismo.", "Uso de léxico formal y nominalización.",
    "Estructuración de ideas complejas en el ensayo.", "Estilo en la comunicación académica.", "Retórica política e ideología.",
    "Géneros de opinión e información periodística.", "Control de voz y oratoria ante auditorio.", "Estrategias de contraargumentación y cortesía.",
    "Técnicas de interpretación y toma de notas.", "Reformulación de información para audiencias.", "Pensamiento e historia regional.",
    "Simulación de tareas integradas del DELE.", "Consolidación final para el examen C2."
]

def generate_lesson(idx, title, desc):
    n = idx + 1
    lid = f"es-c2-{n}"
    vocab = [f"v('término_C2_{n}_{i}', 'definición precisa', 'Ejemplo de uso en un contexto de alta complejidad académica o profesional.', '📖')" for i in range(1, 16)]
    dialogue = [{"speaker": "Interlocutor A", "text": f"Línea {i} sobre {title}."} for i in range(1, 11)]
    grammar = {
        "title": f"Nuance Gramatical: {title}",
        "explanation": f"Explicación detallada sobre el uso de estructuras complejas en {title}.",
        "examples": [{"sentence": f"Ejemplo {i} de {title}", "note": f"Nota {i}"} for i in range(1, 6)]
    }
    mcq = lambda q, o, c: {"question": q, "options": o, "correct": c}
    v_ex = [mcq(f"Ejercicio vocabulario {i}", ["Opción A", "Opción B", "Opción C", "Opción D"], 0) for i in range(1, 8)]
    c_ex = [mcq(f"Ejercicio conversación {i}", ["Opción A", "Opción B", "Opción C", "Opción D"], 0) for i in range(1, 5)]
    g_ex = [mcq(f"Ejercicio gramática {i}", ["Opción A", "Opción B", "Opción C", "Opción D"], 0) for i in range(1, 6)]
    e_ex = [mcq(f"Tarea DELE C2 {i}", ["Opción A", "Opción B", "Opción C", "Opción D"], 0) for i in range(1, 5)]
    h_ex = [mcq(f"Pregunta reflexiva {i}", ["Opción A", "Opción B", "Opción C", "Opción D"], 0) for i in range(1, 4)]
    
    return f"""  "{lid}": L({n}, "{title}", "{desc}",
    [
      {", ".join(vocab)}
    ],
    {json.dumps(dialogue, ensure_ascii=False)},
    {json.dumps(grammar, ensure_ascii=False)},
    {json.dumps(v_ex, ensure_ascii=False)},
    {json.dumps(c_ex, ensure_ascii=False)},
    {json.dumps(g_ex, ensure_ascii=False)},
    {json.dumps(e_ex, ensure_ascii=False)},
    {json.dumps(h_ex, ensure_ascii=False)},
  ),"""

lessons_content = [generate_lesson(i, topics[i], descriptions[i]) for i in range(20)]

template = f"""import type {{ LessonData }} from "./lessons";

const L = (
  lessonNumber: number,
  title: string,
  description: string,
  vocabulary: LessonData["vocabulary"],
  dialogue: LessonData["dialogue"],
  grammar: LessonData["grammar"],
  vocabExercises: LessonData["vocabExercises"],
  conversationExercises: LessonData["conversationExercises"],
  grammarExercises: LessonData["grammarExercises"],
  examQuestions: LessonData["examQuestions"],
  homeworkQuestions: LessonData["homeworkQuestions"],
): LessonData => ({{
  levelId: "es-c2",
  levelLabel: "Español C2 — Maestría",
  lessonNumber,
  title,
  description,
  vocabulary,
  dialogue,
  grammar,
  vocabExercises,
  conversationExercises,
  grammarExercises,
  examQuestions,
  homeworkQuestions,
}});

const v = (word: string, meaning: string, example: string, emoji: string) => ({{ word, meaning, example, emoji, arabic: "" }});

export const esC2Lessons: Record<string, LessonData> = {{
{"".join(lessons_content)}
}};
"""

with open("src/data/es-c2-lessons.ts", "w") as f:
    f.write(template)
