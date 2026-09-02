/**
 * Reliable, curated lesson photography.
 *
 * The previous remote search endpoint could return server errors, leaving
 * lessons with an emoji fallback. These stable Unsplash CDN images keep a
 * relevant photo visible for every lesson while still allowing each lesson
 * to receive a deterministic variation within its topic.
 */
const PHOTO_IDS: Record<string, string[]> = {
  greeting: ["photo-1529156069898-49953e39b3ac", "photo-1511632765486-a01980e01a18"],
  conversation: ["photo-1516321318423-f06f85e504b3", "photo-1521737711867-e3b97375f902"],
  family: ["photo-1511632765486-a01980e01a18", "photo-1490750967868-88aa4486c946"],
  numbers: ["photo-1509228468518-180dd4864904", "photo-1453738773917-9c3eff1db985"],
  clothes: ["photo-1445205170230-053b83016050", "photo-1525507119028-ed4c629a60a3"],
  food: ["photo-1495474472287-4d71bcdd2085", "photo-1504674900247-0877df9cc836"],
  tapas: ["photo-1504674900247-0877df9cc836", "photo-1515003197210-e0cd71810b5f"],
  weather: ["photo-1534088568595-a066f410bcda", "photo-1499346030926-9a72daac6c63"],
  calendar: ["photo-1506784983877-45594efa4cbe", "photo-1501339847302-ac426a4a7cbb"],
  house: ["photo-1513694203232-719a280e022f", "photo-1600607687939-ce8a6c25118c"],
  city: ["photo-1449824913935-59a10b8d2000", "photo-1477959858617-67f85cf4f1df"],
  madrid: ["photo-1539037116277-4db20889f2d4", "photo-1509356843151-3e7d96241e11"],
  travel: ["photo-1436491865332-7a61a109cc05", "photo-1488646953014-85cb44e25828"],
  train: ["photo-1474487548417-781cb71495f3", "photo-1514565131-fce0801e5785"],
  office: ["photo-1497366754035-f200968a6e72", "photo-1497366811353-6870744d04b2"],
  business: ["photo-1556761175-b413da4baf72", "photo-1521737711867-e3b97375f902"],
  classroom: ["photo-1503676260728-1c00da094a0b", "photo-1523240795612-9a054b0db644"],
  hospital: ["photo-1576091160399-112ba8d25d1d", "photo-1584515933487-779824d29309"],
  market: ["photo-1488459716781-31db52582fe9", "photo-1542838132-92c53300491e"],
  park: ["photo-1441974231531-c6227db76b6e", "photo-1500534623283-312aade485b7"],
  football: ["photo-1579952363873-27f3bade9f55", "photo-1517466787929-bc90951d0974"],
  concert: ["photo-1501386761578-eac5c94b800a", "photo-1492684223066-81342ee5ff30"],
  landscape: ["photo-1500534623283-312aade485b7", "photo-1469474968028-56623f02e42e"],
  animals: ["photo-1450778869180-41d0601e046e", "photo-1546182990-dffeafbe841d"],
  laptop: ["photo-1516321318423-f06f85e504b3", "photo-1498050108023-c5249f4df085"],
  newspaper: ["photo-1504711434969-e33886168f5c", "photo-1495020689067-958852a7765e"],
  parliament: ["photo-1529107386315-e1a2ed48a620", "photo-1521295121783-8a321d551ad2"],
  finance: ["photo-1559526324-593bc073d938", "photo-1554224155-6726b3ff858f"],
  museum: ["photo-1564399579883-451a5d44ec08", "photo-1561214115-f2f134cc4912"],
  library: ["photo-1507842217343-583bb7270b66", "photo-1521587760476-6c12a4b040da"],
  environment: ["photo-1497435334941-8c899ee9e8e9", "photo-1473448912268-2022ce9509d8"],
  laboratory: ["photo-1532094349884-543bc11b234d", "photo-1582719478250-c89cae4dc85b"],
  airplane: ["photo-1436491865332-7a61a109cc05", "photo-1529070538774-1843cb3265df"],
  hotel: ["photo-1566073771259-6a8506099945", "photo-1551882547-ff40c63fe5fa"],
  children: ["photo-1503454537195-1dcabb73ffb9", "photo-1472162072942-cd5147eb3902"],
  learning: ["photo-1503676260728-1c00da094a0b", "photo-1522202176988-66273c2fd55f"],
  spain: ["photo-1539037116277-4db20889f2d4", "photo-1509356843151-3e7d96241e11"],
};

export function lessonPhotoUrl(topic: string, seed: number, width: number, height: number): string {
  const photos = PHOTO_IDS[topic] ?? PHOTO_IDS.learning;
  const photoId = photos[Math.abs(seed) % photos.length];
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=82`;
}
