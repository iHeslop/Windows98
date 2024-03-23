export const playSound = (e) => {
  const drumKit = document.getElementById("drumkit");
  if (!drumKit.classList.contains("active")) return;
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
  setTimeout(() => {
    key.classList.remove("playing");
  }, "100");
};
