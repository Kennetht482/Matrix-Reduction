document.getElementById("resetButton").onclick = function() {
    removePrevMatrix();
    removePrevOutput();
}
document.getElementById("myButton").onclick = function() {

    const row = document.getElementById("row").value;
    const col = document.getElementById("col").value;

    if(row<=0 || col<=0) {
        alert("Please enter numbers greater than 0");
    }
    else{
        removePrevMatrix();
        updateCSS(col);
        addInputs(row, col);
    }
}

function updateCSS(col){
    var windowWidth = window.innerWidth;
    let root = document.querySelector(":root");
    root.style.setProperty("--inputWidth", (windowWidth / col));
}

function createMatrix(row, col) {
    let matrix = [];
    
    for(let i=0; i<row; i++) {
        matrix[i]=[];
        for(let j=0; j<col; j++) {
            matrix[i][j]=0;
        }
    }
    return matrix;
}
function removePrevMatrix() {
    const element = document.getElementById("inp-group");
    if(element==null){
        return;
    }
    while(element.firstChild) {
        element.firstChild.remove();
    }
}

function addInputs(row, col){

    const input = document.querySelector(".inp-group");
    const flex = document.createElement("div");
    for(let i=0; i<row; i++) {
        for(let j=0; j<col; j++) {
            const entry = document.createElement("input");
            entry.type="number";
            entry.value="0";
            entry.id="_"+i+j;

            input.appendChild(flex);
            flex.appendChild(entry);
        }
        // const gap = document.createElement("span");
        // const node = document.createTextNode(" | ");
        // gap.appendChild(node);
        // flex.appendChild(gap);

        // const entry = document.createElement("input");
        // entry.type="number";
        // entry.value="0";
        // entry.id="_"+i+(col-1);

        // input.appendChild(flex);
        // flex.appendChild(entry);

        const br = document.createElement("br");
        flex.appendChild(br);

    }
    const br = document.createElement("br");
    flex.appendChild(br);

    const calcButton = document.createElement("button");
    calcButton.type="button";
    calcButton.id="calcButton";
    calcButton.innerHTML="Calculate";

    flex.appendChild(calcButton);

    document.getElementById("calcButton").onclick = function() {
        removePrevOutput();
        let matrix = fillMatrix(row, col);
        matrix = calcMatrix(matrix, row, col);
        if(matrix) {
            printMatrix(matrix, row, col);
        }
        else {
            console.log("ERROR");
        }
    }
}

function fillMatrix(row, col) {
    let matrix = createMatrix(row, col);
    for(let i=0; i<row; i++) {
        for(let j=0; j<col; j++) {
            matrix[i][j] = document.querySelector("#_" + i + j).value;
        }
    }
    return matrix;
}


function calcMatrix(matrix, row, col) {
    let lead = 0;
    for(let r=0; r<row; r++) {
        if(col <= lead) {
            return;
        }
        var i=r;
        while(matrix[i][lead] == 0) {
            i++;
            if(i == row) {
                i=r;
                lead++;
                if(lead == col) {
                    return;
                }
            }
        }

        let tmp = matrix[i];
        matrix[i] = matrix[r];
        matrix[r]=tmp;

        let val=matrix[r][lead];
        for(let j=0; j<col; j++) {
            matrix[r][j] /= val;
        }

        for(let i= 0; i<row; i++) {
            if(i==r) {
                continue;
            }
            val = matrix[i][lead];
            for(let j=0; j<col; j++) {
                matrix[i][j] -= val*matrix[r][j];
            }
        }

        lead++;
    }

    return  matrix;

}


function printMatrix(matrix, row, col) {
    let output = document.querySelector("#output");
    let outputText = "";

    for(let i=0; i<row; i++) {
        
        for(let j=0; j<col; j++) {
            outputText += matrix[i][j] + "      "; 
        }

        outputText += "<br>";
    }
    output.innerHTML = outputText;
}

function removePrevOutput() {
    const element = document.getElementById("output");
    if(element){
        element.textContent="";
    }
}