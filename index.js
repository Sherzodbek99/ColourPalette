let hex, mode, colorHtml = ``, codeHtml = ``, isClicked = 0, isModeClicked = 0


///////////// Taking value from Input \\\\\\\\\\\\

document.getElementById('getColorBtn').addEventListener('click', function(){
    hex = document.getElementById("color").value.replace("#", "")
    mode = document.getElementById("colors").value
    isClicked ++
    
})

document.getElementById('getColorBtn').addEventListener('click', getColorScheme)
 
////////////// Taking related colors from API \\\\\\\\\\\
async function getColorScheme() {
    if(isClicked > 1){
        codeHtml = ``
        colorHtml = ``
    }

    const res = await fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&format=jsonb&mode=${mode}&count=5`)
    const data = await res.json()

    data.colors.forEach(element => {
        colorHtml += `<div id="btnCopy" data-hex="${element.hex.value}" class="colorDiv" style="background-color:${element.hex.value}"></div>`
        codeHtml += ` <div id="btnCopy" data-hex="${element.hex.value}" class="codeDiv">${element.hex.value}</div>`
        
    })

    document.getElementById('main').innerHTML = colorHtml
    document.getElementById('footer').innerHTML = codeHtml
}

////////////// Copying color values to Clipboard \\\\\\\\\\\\\
document.addEventListener('click', function(e){
        if(e.target.dataset.hex){
            let color = e.target.dataset.hex
            copyColor(color)
            document.getElementById('copied').classList.remove("hidden")
            setTimeout(() => {
            document.getElementById('copied').classList.add("hidden")
            }, 3000);
        }
})

function copyColor(color) {
    navigator.clipboard.writeText(color);
}

////////////// Toggle Button Event listener \\\\\\\\\\\
document.getElementById('modeBtn').addEventListener('click', function(){
    if(isModeClicked>0){
        document.body.classList.remove("toggle")
        document.getElementById('getColorBtn').classList.remove("toggleBtn")
        document.getElementById('modeBtn').classList.remove("toggleBtn")
        document.getElementById('colors').classList.remove("toggleBtn")
        document.getElementById('copied').classList.remove("toggleBtn")
        isModeClicked = 0
    } else {
        document.body.classList.add("toggle")
        document.getElementById('getColorBtn').classList.add("toggleBtn")
        document.getElementById('modeBtn').classList.add("toggleBtn")
        document.getElementById('colors').classList.add("toggleBtn")
        document.getElementById('copied').classList.add("toggleBtn")
        isModeClicked++
    }
    
})




