var buttons = document.querySelector("[data-carousel-button]")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        var offset = button.dataset.carouselButton === "next" ? 1 : -1
        var slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]")

        var activeSlide = slides.querySelector("[data-active]") 
        let newIndex = [...slides.children].indexOf(activeSlide) + offset  
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
});