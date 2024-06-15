let gameEnded=false;


const table=document.querySelector(".main-table");

const player1={
    name:"Player 1",
    icon:"<img src='imgs/cross.png' alt='' class='cell-icon'>",
    move:"cross",
    score:0,
}

const player2={
    name:"Player 2",
    icon:"<img src='imgs/circle.png' alt='' class='cell-icon'>",
    move:"circle",
    score:0,
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

    if(move==="cross")player1.score++;
    else player2.score++;

    console.log(player1.score,player2.score);
    gameEnded=true;
    setTimeout(()=>{
        reset();
    },2000);
    render();
}

const draw=()=>{
    gameEnded=true;
    setTimeout(()=>{
        reset();
    },2000);
    render();
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
        draw();
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
    check(currentPlayer.move);
    currentPlayer=currentPlayer===player1?player2:player1; 
    render();
}

cells.forEach((cell) => {
    cell.addEventListener("click",play.bind(null,cell));
});

const reset=()=>{
        jsCell.forEach(cell=>{
            cell.innerHTML="";
            cell.dataset.move="";
        });
        gameEnded=false;
        currentPlayer=player1;
        render();
    }

document.querySelector(".reset-grid-button").addEventListener("click",reset);

document.querySelector(".reset-score-button").addEventListener("click",()=>{
    player1.score=0;
    player2.score=0;
    console.log(player1.score,player2.score);
    render();
});

const playerArea=[];

for(let i=1;i<=2;i++){
    playerArea.push(document.querySelector(`.js-player-area-${i}`));
}

console.log(playerArea[0],playerArea[1]);

const yourturn=`<h2 class="your-turn">Your Turn</h2>`;

const playerAreaRender=(area,player,otherPlayer)=>{
    area.innerHTML=`
    <h2 class="player-name">${player.name}</h2>
    <div class="player-icon">${player.icon}</div>
    <h2 class="player-score ">Wins:${player.score}</h2>
    `;  
    // console.log(currentPlayer);
    if(player.score>otherPlayer.score){
        area.querySelector(".player-score").classList.add("winning-player");
    }
    else{
        area.querySelector(".player-score").classList.remove("winning-player");
    }
    if(currentPlayer===player){
        area.innerHTML+=yourturn;
    }

};

const render =()=>{
    playerAreaRender(playerArea[0],player1,player2);
    playerAreaRender(playerArea[1],player2,player1);
};

render();