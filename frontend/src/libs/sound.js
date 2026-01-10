const SOUND_FILES = {
  correct: "/sounds/correct.mp3",
  incorrect: "/sounds/incorrect.mp3",
};

const audioCache = new Map();

function getAudio(key) {
  if (!audioCache.has(key)) {
    const audio = new Audio(SOUND_FILES[key]);
    audio.preload = "auto";
    audioCache.set(key, audio);
  }
  return audioCache.get(key);
}

export function playResultTone(isCorrect) {
  const key = isCorrect ? "correct" : "incorrect";
  const audio = getAudio(key);
  if (!audio) return;

  audio.currentTime = 0;
  audio.play().catch(() => {});
}
