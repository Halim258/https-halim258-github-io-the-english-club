import json

topics = [
    ("Pretérito imperfecto de subjuntivo", "Formación y usos básicos del imperfecto de subjuntivo."),
    ("Condicionales tipo 2", "Estructuras condicionales con si + imperfecto de subjuntivo y condicional simple."),
    ("Condicionales tipo 3", "Estructuras condicionales con si + pluscuamperfecto de subjuntivo y condicional compuesto."),
    ("Subjuntivo en oraciones relativas", "Uso del subjuntivo vs indicativo en oraciones de relativo (busco algo que...)."),
    ("Subjuntivo en oraciones temporales", "Expresión del futuro y la incertidumbre con cuando, hasta que, en cuanto."),
    ("Voz pasiva y pasiva refleja", "Formas de expresar la pasividad en español (ser + participio vs se + verbo)."),
    ("Oraciones concesivas", "Uso de aunque, a pesar de que, por mucho que con indicativo y subjuntivo."),
    ("Oraciones consecutivas y finales", "Expresar consecuencias (tan... que) y finalidades (para que, a fin de que)."),
    ("Perífrasis verbales", "Llevar + gerundio, acabar de + infinitivo, ponerse a + infinitivo, etc."),
    ("Léxico académico y conectores", "Uso de conectores lógicos para la cohesión textual (asimismo, no obstante)."),
    ("Argumentación: defender opiniones", "Técnicas y vocabulario para argumentar y debatir."),
    ("Debate sobre educación y sociedad", "Vocabulario sobre el sistema educativo y problemas sociales."),
    ("Cultura hispana: literatura y cine", "Análisis de obras literarias y cinematográficas del mundo hispanohablante."),
    ("Arte y patrimonio", "El legado artístico y arquitectónico de los países hispanos."),
    ("Economía, trabajo y emprendimiento", "Vocabulario del mundo laboral y la economía global."),
    ("Ciencia, salud y bioética", "Avances científicos y dilemas éticos contemporáneos."),
    ("Política, ciudadanía y derechos", "Sistemas políticos y derechos humanos en el contexto actual."),
    ("Redacción formal", "Estructura de cartas formales, correos electrónicos y solicitudes."),
    ("Análisis de textos periodísticos", "Comprensión y comentario de noticias y artículos de opinión."),
    ("Repaso B2 y mini-DELE B2", "Repaso general de contenidos y preparación para el examen DELE B2.")
]

def generate_lesson(idx, title, desc):
    lesson_id = f"es-b2-{idx}"
    # Vocabulary (15 items)
    vocab = [
        f"v('palabra_{idx}_{i}', 'meaning {i}', 'Example sentence {i} for lesson {idx}.', '📝')"
        for i in range(1, 16)
    ]
    
    # Dialogue (10 lines)
    dialogue = [
        {"speaker": "Ana", "text": f"Hola, ¿has visto el tema de {title}?"},
        {"speaker": "Carlos", "text": "Sí, me parece un poco complejo al principio."},
        {"speaker": "Ana", "text": "A mí también, sobre todo los conectores."},
        {"speaker": "Carlos", "text": "Bueno, con práctica todo se aprende."},
        {"speaker": "Ana", "text": "¿Quieres repasar juntos esta tarde?"},
        {"speaker": "Carlos", "text": "Claro, me vendría muy bien."},
        {"speaker": "Ana", "text": "Perfecto, nos vemos en la biblioteca."},
        {"speaker": "Carlos", "text": "A las cinco me parece una buena hora."},
        {"speaker": "Ana", "text": "Hecho. Traeré mis apuntes."},
        {"speaker": "Carlos", "text": "¡Hasta entonces!"}
    ]
    
    # Grammar
    grammar = {
        "title": f"Gramática: {title}",
        "explanation": f"Explicación detallada sobre {title} y su uso en el nivel B2.",
        "examples": [
            {"sentence": f"Ejemplo 1 de {title}.", "note": "Nota gramatical 1."},
            {"sentence": f"Ejemplo 2 de {title}.", "note": "Nota gramatical 2."},
            {"sentence": f"Ejemplo 3 de {title}.", "note": "Nota gramatical 3."},
            {"sentence": f"Ejemplo 4 de {title}.", "note": "Nota gramatical 4."},
            {"sentence": f"Ejemplo 5 de {title}.", "note": "Nota gramatical 5."}
        ]
    }
    
    # Exercises
    vocab_ex = [{"question": f"¿Qué significa 'palabra_{idx}_{i}'?", "options": ["Opción A", "Opción B", "Opción C", "Opción D"], "correct": 0} for i in range(1, 8)]
    conv_ex = [{"question": f"Conversación {i} relacionada con {title}:", "options": ["A", "B", "C", "D"], "correct": 1} for i in range(1, 5)]
    gram_ex = [{"question": f"Completa la frase con {title}:", "options": ["A", "B", "C", "D"], "correct": 2} for i in range(1, 6)]
    exam_q = [{"question": f"Pregunta tipo DELE {i}:", "options": ["A", "B", "C", "D"], "correct": 3} for i in range(1, 5)]
    home_q = [{"question": f"Tarea {i}: Redacta sobre...", "options": ["A", "B", "C", "D"], "correct": 0} for i in range(1, 4)]
    
    content = f"""  "{lesson_id}": L({idx}, '{title}', '{desc}',
    [
      {', '.join(vocab)}
    ],
    {json.dumps(dialogue, ensure_ascii=False)},
    {json.dumps(grammar, ensure_ascii=False)},
    {json.dumps(vocab_ex, ensure_ascii=False)},
    {json.dumps(conv_ex, ensure_ascii=False)},
    {json.dumps(gram_ex, ensure_ascii=False)},
    {json.dumps(exam_q, ensure_ascii=False)},
    {json.dumps(home_q, ensure_ascii=False)}
  ),"""
    return content

header = """import type { LessonData } from "./lessons";

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
): LessonData => ({
  levelId: "es-b2",
  levelLabel: "Español B2 — Avanzado",
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
});

const v = (word: string, meaning: string, example: string, emoji: string) => ({ word, meaning, example, emoji, arabic: "" });

export const esB2Lessons: Record<string, LessonData> = {
"""

footer = "};\n"

with open("src/data/es-b2-lessons.ts", "w") as f:
    f.write(header)
    for i, (title, desc) in enumerate(topics, 1):
        f.write(generate_lesson(i, title, desc))
        f.write("\n")
    f.write(footer)
