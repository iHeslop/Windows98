//Time Setting
function updateDateTime() {
  const now = new Date();
  let hours = now.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const currentDateTime = `${hours}:${minutes} ${ampm}`;
  document.querySelector("#clock").textContent = currentDateTime;
}
setInterval(updateDateTime, 1000);

//Start Menu Functionality
const startBtn = document.getElementById("startBtn");
const menu = document.getElementById("menu");

startBtn.addEventListener("click", () => {
  if (!startBtn.classList.contains("start-menu__border")) {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
  startBtn.classList.toggle("start-menu__border");
});
