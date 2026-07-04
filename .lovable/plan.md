
# Spanish A1–C2 Course — Cervantes-style, mirrors English A1–C2

## Goal
Ship a complete Spanish course with the same shape as the English course: 6 CEFR levels × 20 lessons = 120 lessons, each with vocabulary, dialogue, grammar, four exercise sets, exam questions, and homework. Content follows the Instituto Cervantes Plan Curricular / DELE curriculum sequencing (saludos → presente → pretéritos → subjuntivo → registros formales → discurso académico).

## Structure (mirrors existing English course)

Files under `src/data/`:
- `es-a1-lessons.ts` (lessons 1–5), `es-a1-lessons-6-10.ts`, `es-a1-lessons-11-15.ts`, `es-a1-lessons-16-20.ts`
- Same 4-file split for A2, B1, B2, C1, C2 → **24 lesson files total**
- `spanish-course-index.ts` — aggregates all Spanish lessons into a single record

Wire-up:
- `src/data/lessons.ts` — spread the Spanish record into the master `lessons` map with level IDs `es-a1`, `es-a2`, `es-b1`, `es-b2`, `es-c1`, `es-c2`
- `src/data/course-categories.ts` — replace the current "Spanish Language" curriculum card with a real course category "Español A1–C2 (Estilo Cervantes)" listing the 6 levels as courses
- `src/pages/CategoryDetail.tsx` — add the 6 Spanish course names to `courseLevelMap`
- Slug pattern: `/courses/es-a1`, `/courses/es-a2`, … reusing the existing `LessonPage` viewer

## Lesson data shape (identical to English `LessonData`)

Each lesson:
- `levelId` (`es-a1`…`es-c2`), `levelLabel`, `lessonNumber`, `title`, `description`
- `vocabulary[15]`: `{ word (Spanish), meaning (English), example (Spanish sentence), emoji }`
- `dialogue[10]`: Spanish lines with speakers
- `grammar`: `{ title, explanation (English + Spanish examples), examples[5–6] }`
- `vocabExercises`, `conversationExercises`, `grammarExercises`, `examQuestions`, `homeworkQuestions` — MCQs following existing English shape

Note: skipping the Arabic gloss per your choice; keeping English meanings/notes.

## Cervantes-aligned curriculum (20 lessons per level)

**A1 — Acceso** (greetings → self, family, routines)
1 Saludos y presentaciones · 2 Los números y la edad · 3 El alfabeto y deletrear · 4 Nacionalidades y países · 5 La familia · 6 Profesiones · 7 Colores y descripción física · 8 La ropa · 9 La casa y los muebles · 10 Comidas y bebidas básicas · 11 En el restaurante (pedir) · 12 La hora y los días · 13 Rutinas diarias (verbos regulares -ar/-er/-ir) · 14 El tiempo libre y hobbies · 15 En la ciudad (direcciones) · 16 Transporte · 17 De compras (números y precios) · 18 El cuerpo y la salud básica · 19 El clima y las estaciones · 20 Repaso A1 + mini DELE A1

**A2 — Plataforma** (past narration, future plans)
Pretérito perfecto y indefinido, futuro con "ir a", comparativos, imperativo básico, viajes, servicios (correos, banco), biografías, experiencias, planes.

**B1 — Umbral** (opinion, hypothesis, connectors)
Imperfecto vs. indefinido, condicional simple, subjuntivo presente (deseos/consejos), estilo indirecto, marcadores del discurso, trabajo, medio ambiente, salud, medios de comunicación.

**B2 — Avanzado** (argumentation, register)
Subjuntivo imperfecto, todas las condicionales, voz pasiva, perífrasis verbales, léxico académico, debates, cultura hispana (Cervantes, Lorca, Borges), noticias, economía, tecnología.

**C1 — Dominio operativo** (nuance, idioms, discourse)
Subjuntivo pluscuamperfecto, matices modales, conectores complejos, expresiones idiomáticas, español coloquial vs. formal, ensayo argumentativo, literatura, arte, filosofía.

**C2 — Maestría** (native-like precision, DELE C2)
Registros especializados (jurídico, científico, periodístico), pragmática, variedades del español (peninsular, mexicano, rioplatense, andaluz), traducción, tarea integrada estilo DELE C2, oratoria.

Every 20th lesson is a level review + mock mini-DELE.

## Rollout plan (multi-turn, since 120 rich lessons don't fit in one turn)

1. **Turn 1 (this one)**: scaffolding — create the aggregator file, wire routing, update category card, plus **A1 lessons 1–5** fully written.
2. **Turn 2**: A1 lessons 6–20.
3. **Turn 3**: A2 (all 20).
4. **Turn 4**: B1 (all 20).
5. **Turn 5**: B2 (all 20).
6. **Turn 6**: C1 (all 20).
7. **Turn 7**: C2 (all 20) + final polish + placement-test hooks.

After each turn the whole course is functional up to the levels shipped — no broken routes. Later levels show a friendly "próximamente" placeholder until their turn.

## What I need from you
Just say **"go"** and I'll ship turn 1 now. After each turn I'll pause so you can preview before I continue with the next level.

## Technical notes
- No new dependencies; reuses the existing `LessonPage`, exercise components, TTS, and progress tracking.
- Level IDs prefixed with `es-` so English/Spanish progress don't collide.
- Course-category iconography uses the existing `Languages` icon plus the Spanish flag emoji.
- Data-only additions; existing English course, admin, and RBAC surfaces are untouched.
