function createSlideComponent(imgSrc) {
    const slide = document.createElement("img");
    slide.src = imgSrc;
    slide.classList.add("absolute", "w-full", "h-full", "object-contain", "opacity-0");
    slide.active = () => {
        slide.classList.remove("opacity-0");
    };
    slide.inActive = () => {
        slide.classList.add("opacity-0");
    };
    return slide;
}
function createThumbComponent(imgSrc) {
    const thumb = document.createElement("div");
    thumb.style.backgroundImage = `url("${imgSrc}")`;
    thumb.classList.add("inline-block", "h-12.5", "w-12.5", "border", "shrink-0", "cursor-pointer", "bg-no-repeat", "bg-cover", "bg-center", "opacity-40");
    thumb.active = () => {
        thumb.classList.add("border-[#c9a96e4d]");
        thumb.classList.remove("opacity-40");
        thumb.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    };
    thumb.inActive = () => {
        thumb.classList.remove("border-[#c9a96e4d]");
        thumb.classList.add("opacity-40");
    };
    return thumb;
}
function swiper({ title, showFraction = true, images, startIndex = 0 }) {
    const swpr = document.querySelector("#swpr");
    const slidesWrapper = swpr?.querySelector("#slides-wrapper");
    const thumbsWrapper = swpr?.querySelector("#thumbs-wrapper");
    const nextBtn = swpr?.querySelector("#next-btn");
    const prevBtn = swpr?.querySelector("#prev-btn");
    const closeBtn = swpr?.querySelector("#close-btn");
    const fractionEl = swpr?.querySelector("#fraction");
    const titleEl = swpr?.querySelector("#title");
    const slides = [];
    const thumbs = [];
    let currentIndex = startIndex;
    const goToSlide = (idx) => {
        if (!slidesWrapper)
            return;
        if (!thumbsWrapper)
            return;
        if (!swpr)
            return;
        images.forEach((_, index) => {
            index === idx ? slides[index].active() : slides[index].inActive();
            index === idx ? thumbs[index].active() : thumbs[index].inActive();
        });
        if (idx == 0) {
            prevBtn?.classList.add("opacity-40");
        }
        else {
            prevBtn?.classList.remove("opacity-40");
        }
        if (idx == slides.length - 1) {
            nextBtn?.classList.add("opacity-40");
        }
        else {
            nextBtn?.classList.remove("opacity-40");
        }
        if (fractionEl) {
            fractionEl.innerHTML = `${currentIndex + 1} / ${slides.length}`;
        }
        if (titleEl && title) {
            titleEl.innerHTML = title;
        }
    };
    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            goToSlide(++currentIndex);
        }
    };
    const handlePrev = () => {
        if (currentIndex > 0) {
            goToSlide(--currentIndex);
        }
    };
    const handleClose = () => {
        swpr?.classList.add("hidden");
        swpr?.classList.remove("flex");
        slides.splice(0);
        thumbs.splice(0);
    };
    const render = () => {
        if (!slidesWrapper)
            return;
        if (!thumbsWrapper)
            return;
        slidesWrapper.innerHTML = "";
        thumbsWrapper.innerHTML = "";
        swpr?.classList.add("flex");
        swpr?.classList.remove("hidden");
        slides.splice(0);
        thumbs.splice(0);
        if (!showFraction) {
            fractionEl?.classList.add("hidden");
        }
        if (!title) {
            titleEl?.classList.add("hidden");
        }
        images.forEach((imgUrl, idx) => {
            const slide = createSlideComponent(imgUrl);
            const thumb = createThumbComponent(imgUrl);
            slides.push(slide);
            thumbs.push(thumb);
            slidesWrapper?.append(slide);
            thumbsWrapper?.append(thumb);
            thumb.addEventListener("click", () => {
                goToSlide(idx);
            });
        });
    };
    nextBtn?.addEventListener("click", handleNext);
    prevBtn?.addEventListener("click", handlePrev);
    closeBtn?.addEventListener("click", handleClose);
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            handlePrev();
        }
        if (event.key === "ArrowRight") {
            handleNext();
        }
        if (event.key === "Escape") {
            handleClose();
        }
    });
    render();
    goToSlide(currentIndex);
}
window.swiper = swiper;
export {};
