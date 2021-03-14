const select = document.getElementById('select')
const demo = document.getElementById('demo')
const toggle = document.getElementById('toggle')
const style = document.querySelector('link[href="styles/style.css"]')

demo.addEventListener('click', () => {
    demo.classList.remove('demo')
})

select.value = localStorage.getItem('select-elements-in-row') || 3
style.sheet.insertRule(`.list .person { width: calc(100% / ${select.value} - ${select.value * 5}px);}`)

// I care about UX
window.onload = () => {
    style.sheet.insertRule(`
        .switch .slider::before,
        .switch .slider::after {
            -webkit-transition: -webkit-transform .4s;
            transition: -webkit-transform .4s;
            transition: transform .4s;
            transition: transform .4s, -webkit-transform .4s;
        }`
    )
}

select.addEventListener('change', event => {
    localStorage.setItem('select-elements-in-row', event.target.value)
    location.reload()
})

const minHeighter = localStorage.getItem('minHeighter-enabled') ?? 'enabled'

if (minHeighter == 'enabled') {
    toggle.checked = true
    adjustElementHeight(0, select.value, '.list') // adjusts h4 in .person
    adjustElementHeight(1, select.value, '.list') // adjusts p in .person
}

toggle.addEventListener('click', event => {
    if (event.target.checked) {
        localStorage.setItem('minHeighter-enabled', 'enabled')
    } else {
        localStorage.setItem('minHeighter-enabled', 'disabled')
    }
    setTimeout(() => {
        location.reload()
    }, 800)
})
