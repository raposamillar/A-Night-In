var testEl = document.querySelector(".dropdown")
var test2El = document.querySelector(".test")

// JS to toggle the dropdown menu based on click
testEl.addEventListener("click", function(e) {
    e.stopPropagation()
    testEl.classList.toggle('is-active')
})

test2El.addEventListener("click", function(e) {
    e.stopPropagation()
    test2El.classList.toggle('is-active')
})

