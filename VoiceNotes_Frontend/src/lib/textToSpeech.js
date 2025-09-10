export function speakText(text) {
  if (!text) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
//   const voices = window.speechSynthesis.getVoices();

  // Try to find a female English voice
//   const femaleVoice = voices.find(v =>
//     v.name.toLowerCase().includes("female") ||
//     (v.lang.startsWith("en") && v.name.toLowerCase().includes("google"))
//   );

//   if (femaleVoice) {
//     utterance.voice = femaleVoice;
//   }

  utterance.lang = "en-US";
  utterance.rate = 1; // customize between 0.5-2
  utterance.pitch = 1.5;  // customize between 0.5-2

  window.speechSynthesis.speak(utterance);
}
