import { lessons } from "@/data/lessons";
const keys = Object.keys(lessons).filter(k=>k.startsWith("phonics-"));
console.log(keys.length);
for (const k of keys) {
  const l = lessons[k];
  const banks = {v:l.vocabExercises,g:l.grammarExercises,c:l.conversationExercises,e:l.examQuestions,h:l.homeworkQuestions,r:l.reading?.questions??[]};
  for (const [n,b] of Object.entries(banks)) {
    for (const q of b) {
      if (new Set(q.options).size !== q.options.length) throw new Error(`${k} ${n} dup options: ${q.question}`);
      if (q.options.length < 2 || q.correct < 0) throw new Error(`${k} ${n} bad: ${q.question} ${JSON.stringify(q.options)} ${q.correct}`);
    }
  }
  console.log(k, l.title, "| vocab", l.vocabulary.length, "| ex", Object.values(banks).reduce((a,b)=>a+b.length,0));
}
