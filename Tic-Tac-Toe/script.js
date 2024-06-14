let gameEnded=false;

const score={
    player1:0,
    player2:0,
}

const table=document.querySelector(".main-table");

const player1={
    name:"Player 1",
    icon:"<img src='imgs/cross.png' alt='' class='cell-icon'>",
    move:"cross",
}

const player2={
    name:"Player 2",
    icon:"<img src='imgs/circle.png' alt='' class='cell-icon'>",
    move:"circle",
}

let currentPlayer=player1;

table.innerHTML=`
              
    <tr>
        <td class="cell js-cell-1" data-move=""></td>
        <td class="cell js-cell-2" data-move=""></td>
        <td class="cell js-cell-3" data-move=""></td>
    </tr>
    <tr>
        <td class="cell js-cell-4" data-move=""></td>
        <td class="cell js-cell-5" data-move=""></td>
        <td class="cell js-cell-6" data-move=""></td>
    </tr>
    <tr>
        <td class="cell js-cell-7" data-move=""></td>
        <td class="cell js-cell-8" data-move=""></td>
        <td class="cell js-cell-9" data-move=""></td>
    </tr>
    `;

const cells=document.querySelectorAll(".cell");

const jsCell=[];

for(let i=0;i<9;i++){
    jsCell.push(document.querySelector(`.js-cell-${i+1}`));
}

const win =(move)=>{
    console.log(`${move} wins`);
    gameEnded=true;
    score[move==="cross"?"player1":"player2"]++;
    console.log(score);
}

function check(move){
    for(let i=0;i<3;i++){
        if(jsCell[i].dataset.move===move && jsCell[i+3].dataset.move===move && jsCell[i+6].dataset.move===move){
            win(move);
            return "stop";
        }
    }
    for(let i=0;i<jsCell.length;i+=3){
        if(jsCell[i].dataset.move===move && jsCell[i+1].dataset.move===move && jsCell[i+2].dataset.move===move){
            win(move);
            return "stop";
        }
    }
    if(jsCell[0].dataset.move===move && jsCell[4].dataset.move===move && jsCell[8].dataset.move===move){
        win(move);
        return "stop";
    }
    if(jsCell[2].dataset.move===move && jsCell[4].dataset.move===move && jsCell[6].dataset.move===move){
        console.log(`${move} wins`);
        win(move);
        return "stop";
    }
    if(jsCell.every(cell=>cell.dataset.move!=="")){
        console.log("Draw");
        return "stop";
    }
    else{
        return "continue";
    }
}

const play= (cell)=>{
    if(gameEnded){
        return;
    }

    if(cell.innerHTML!==""){
        return;
    }
    cell.innerHTML=`${currentPlayer.icon}`;
    cell.dataset.move=currentPlayer.move;
    const result = check(currentPlayer.move);
    currentPlayer=currentPlayer===player1?player2:player1; 
}

cells.forEach((cell) => {
    cell.addEventListener("click",play.bind(null,cell));
});

document.querySelector(".reset-grid-button").addEventListener("click",()=>{
    jsCell.forEach(cell=>{
        cell.innerHTML="";
        cell.dataset.move="";
    });
    gameEnded=false;
    currentPlayer=player1;
});