import { endOfMonth, endOfWeek, format, startOfWeek } from "date-fns";
import { startOfMonth } from "date-fns/esm";
import { ptBR } from "date-fns/locale";

document.querySelectorAll(".calendar").forEach((calendar) => {
  
  const today = new Date();
  const startMonth = startOfMonth(today);
  const startAt = startOfWeek(startMonth);
  const endAt = endOfWeek(endOfMonth(today));

  const title = calendar.querySelector("h2");
  const days = calendar.querySelector(".days");
  const btnToday = calendar.querySelector(".btn-today");
  const btnPrev = calendar.querySelector(".btn-prev");
  const btnNext = calendar.querySelector(".btn-next");

  btnToday.addEventListener("click", (e) => {});
  btnPrev.addEventListener("click", (e) => {});
  btnNext.addEventListener("click", (e) => {});

  const render = () => {
    title.innerHTML = format(startMonth, "MMM yyyy", {
      locale: ptBR,
    });
  };

  render();
});