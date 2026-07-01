{
  document
    .querySelectorAll<HTMLTimeElement>("time[data-years]")
    .forEach((el) => {
      const year = Number(el.dateTime);

      if (!Number.isNaN(year)) {
        el.textContent = `${new Date().getFullYear() - year}`;
      }
    });
}
