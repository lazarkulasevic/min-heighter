const select = document.getElementById('select')
select.value = localStorage.getItem('select-elements-in-row') || 3

document.querySelectorAll('.person').forEach(div => {
    div.style.width = 92 / select.value + '%'
})

select.addEventListener('change', event => {
    localStorage.setItem('select-elements-in-row', event.target.value)
    location.reload()
})

function adjustElementHeight(elemOrder, elemsInRow, styleClass) {
    const listEl = document.querySelectorAll(styleClass)
    listEl.forEach(team => {
        const listLength = team.children.length
        const divider = Math.trunc(listLength / elemsInRow)
        const remainder = listLength % elemsInRow

        let starter = 0
        let cycles = 1
        while (starter !== listLength - remainder) {
            if (starter % elemsInRow == 0) {
                teamChunk(starter, divider / cycles, remainder)
                cycles++
            }
            starter++
        }
        if (remainder !== 0) {
            teamChunk(starter, 1, 0)
        }

        function teamChunk(start, divider, remainder) {
            let maxLines = 0
            let lineHeight = 1
            for (let i = start; i < (listLength - remainder) / divider; i++) {
                let elem = team.children[i].children[elemOrder]
                lineHeight = parseInt(getComputedStyle(elem).getPropertyValue('line-height'))
                let lines = elem.offsetHeight / lineHeight
                if (lines > maxLines) {
                    maxLines = lines
                }
            }
            if (maxLines > 1) {
                for (let i = start; i < (listLength - remainder) / divider; i++) {
                    let elem = team.children[i].children[elemOrder]
                    elem.style.minHeight = lineHeight * maxLines + 'px'
                }
                maxLines = 0
                lineHeight = 1
            }
        }
        // EXAMPLE for 8 elements in teamList
        //      starter, divider, remainder           listLength    elements
        //           |      |       |                     |             |
        // teamChunk(0,     2,      2) // first chunk     3        0, 1 and 2
        // teamChunk(3,     1,      2) // second chunk    6        3, 4 and 5
        // teamChunk(6,     1,      0) // third chunk     8        6 and 7
    })
}
adjustElementHeight(0, select.value, '.list') // adjusts h4 in .person
adjustElementHeight(1, select.value, '.list') // adjusts p in .person

// EXAMPLE for adjusting whatever element in teamlist
//
//      order of child node    how many elements are in a row
//                     |         |
// adjustElementHeight(0,        4, '.list') - adjusts first child (0) in a row of 4 elements (width: 25%)
// adjustElementHeight(1,        4, '.list') - adjusts second child (0) in a row of 4 elements (width: 25%)
