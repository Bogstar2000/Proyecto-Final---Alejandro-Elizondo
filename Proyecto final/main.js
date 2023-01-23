let resultElement = document.querySelector('.result')
let mainContainer = document.querySelector('.main-cont')
let rowId = 1;

let word = 'texto';
let wordArray = word.toUpperCase().split('')
console.log(wordArray)

let actualRow = document.querySelector('.row')

drawSquares(actualRow);
listenInput(actualRow)

addfocus(actualRow)


function listenInput(actuaLRow){
    let squares = actuaLRow.querySelectorAll('.square')
    squares = [...squares]

    let userInput = []

    squares.forEach(element => {
        element.addEventListener('input', event=>{
            //Recoger el ingreso del usuario
            userInput.push(event.target.value.toUpperCase())
            console.log(userInput)
            if(event.target.nextElementSibling){
                event.target.nextElementSibling.focus();
            }else{
                //cambiar estilos si existe la letra pero no esta en la posicion correcta
                let existIndexArray = existLetter(wordArray, userInput)
                console.log(existIndexArray)
                existIndexArray.forEach(eLement =>{

                    squares[eLement].classList.add('gold');
                })
                //comparar arreglos para cambiar estilos
                let rightIndex = compareArrays(wordArray, userInput)
                console.log(rightIndex)
                rightIndex.forEach(eLement => {
                    squares[eLement].classList.add('green')
                })
                //Si los arreglos son iguales
                if(rightIndex.length == wordArray.length){
                    showResult('Ganaste!')
                    return;
                }
                //crear una nueva fila
                let actualRow = createRow() 

                if(!actualRow){
                    return;
                }
                drawSquares(actualRow)
                listenInput(actualRow)
                addfocus(actualRow)
            }
        })
    })
}





//Funciones

function compareArrays (array1, array2){
    let iqualsIndex = []
    array1.forEach((element, index) =>{
        if(element == array2[index]){
            console.log(`en la posicion ${index} si son iguales`)
            iqualsIndex.push(index);
        }else{
            console.log(`en la posicion ${index} no son iguales`)
        }
    })
    return iqualsIndex;
}

function existLetter(array1, array2){
    let existIndexArray = [];
    array2.forEach((eLement, index)=>{
        if(array1.includes(eLement)){
            existIndexArray.push(index)
        }
    });
    return existIndexArray;
}

function createRow(){
    rowId++
    if (rowId <= 5){
        let newRow = document.createElement('div');
        newRow.classList.add('row');
        newRow.setAttribute('id', rowId)
        mainContainer.appendChild(newRow)
        return newRow;
    }else{
        showResult(`la respuesta correcta era "${word.toLocaleUpperCase()}"`)
    }
}

function drawSquares(actuaLRow){
    wordArray.forEach((item, index) => {
        if (index === 0){
            actuaLRow.innerHTML += `<input type="text" maxlength="1" class="square focus"> ` 
        }else{
            actuaLRow.innerHTML += `<input type="text" maxlength="1" class="square"> `
        }
    });
}

function addfocus(actuaLRow){
    let focusElement = actuaLRow.querySelector('.focus')
    console.log(focusElement)
    focusElement.focus();
}

function showResult(textMsg){
    resultElement.innerHTML = `
    <p>${textMsg}</p>
    <button class="button">Reiniciar</button>`

    let resetBtn = document.querySelector('.button')
    resetBtn.addEventListener('click', ()=>{
        location.reload();
    });
}