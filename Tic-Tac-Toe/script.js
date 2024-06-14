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

check(move){

};






cells.forEach((cell) => {
    cell.addEventListener("click",()=>{
        if(cell.innerHTML!==""){
            return;
        }
        cell.innerHTML=`${currentPlayer.icon}`;
        cell.dataset.move=currentPlayer.move;
        check(currentPlayer.move);
        currentPlayer=currentPlayer===player1?player2:player1; 
    });
});
