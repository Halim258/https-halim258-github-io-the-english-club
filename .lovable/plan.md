## Arabic Speech Therapy Course (منهج التخاطب)

Full Arabic-language Speech & Language Therapy course, structured across 8 progressive levels — for both parents of children and therapists/clinic staff. Uses the same lesson schema as English/Spanish so it plugs into all existing UI (slides, exercises, exams, worksheets, XP, certificates).

### Structure — 8 levels × 5 lessons = 40 lessons

| Level | ID | Title (AR) | Focus |
| --- | --- | --- | --- |
| 1 | `ar-th-1` | الانتباه والتواصل | Eye contact, joint attention, imitation, simple commands |
| 2 | `ar-th-2` | اللغة الاستقبالية | Object/family/animals/colors/body-parts recognition, WH-questions |
| 3 | `ar-th-3` | اللغة التعبيرية | First words, requesting, naming, 2-word phrases, pronouns |
| 4 | `ar-th-4` | المفاهيم الأساسية | Big/small, over/under, in/out, more/less, before/after |
| 5 | `ar-th-5` | النطق (Articulation) | Phoneme drills, auditory discrimination, sound in word positions |
| 6 | `ar-th-6` | القواعد اللغوية | Singular/plural, gender, tenses, questions, negation, prepositions |
| 7 | `ar-th-7` | المهارات الاجتماعية | Turn-taking, greetings, emotions, help-seeking, problem solving |
| 8 | `ar-th-8` | الاستعداد الأكاديمي | Phonological awareness, letter-sound match, sequencing, memory |

Each lesson: 15 Arabic vocab items, therapist/parent dialogue, grammar/technique note, 5-question vocab practice, 5-question exam.

### Placement
- New category card on the Courses page: **"التخاطب — Speech & Language Therapy"** (Arabic-first title, English subtitle).
- Single course inside: "منهج التخاطب الشامل (8 مستويات)" mapped to level `ar-th-1` … `ar-th-8`.
- Uses the existing Lesson/Level/Category routing — no new routes needed.

### Dual-audience content
Each lesson body includes:
- **للأهل (For Parents):** simple at-home activities (flashcards, imitation games, storytime prompts).
- **للأخصائي (For Therapist):** structured session goal, materials, target criteria, data-collection tip.

### Rollout — multi-turn
- **Turn 1 (this turn):** Scaffolding + Level 1 (5 lessons).
  - `src/data/ar-therapy-lessons-l1.ts`
  - Register `ar-th-1 … ar-th-8` labels in `src/pages/Courses.tsx`
  - Add category card + course mapping in `src/data/course-categories.ts` and `src/pages/CategoryDetail.tsx`
  - Wire into `src/data/lessons.ts`
  - Generate 1 Arabic cover image for the category card
- **Turns 2–8:** One level per turn (`ar-therapy-lessons-l2.ts` … `l8.ts`), 5 lessons each. Levels not yet shipped show "قريبًا / Coming soon".

### Technical details
- Lesson schema: `LessonData` from `src/data/lessons.ts` — Arabic strings for `title`, `description`, `vocabulary[].word/meaning/example`, `dialogue[].text`, `grammar.explanation`, exercise questions/options. The `arabic` field on vocab used for L1 translation stays empty (content already in Arabic).
- RTL: Arabic content will render naturally; the existing lesson layout uses `dir="auto"` for text so no layout changes needed. If any hard-coded `dir="ltr"` blocks Arabic text, I'll add `dir="rtl"` on the affected wrapper only for these lessons — verified during Turn 1 with a Playwright screenshot.
- Category card image: generated via imagegen to `src/assets/courses/speech-therapy.jpg` and imported like the other category images.
- No DB changes, no new dependencies.

Reply **"go"** to ship Turn 1 (scaffolding + Level 1: الانتباه والتواصل).