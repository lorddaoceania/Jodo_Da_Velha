const celulas = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const Message = document.querySelector('[data-Message]');
const winningMessage = document.querySelector('[data-winning-Message]');
const restart = document.querySelector('[data-Botao');
let isCircleTurn;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

]
const startGame = () => {
    isCircleTurn = false;
  
    for (const cell of celulas) {
      cell.classList.remove("o");
      cell.classList.remove("x");
      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
    }
  
    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
  };

const endGame = (isdraw) => {
    if(isdraw){
        Message.innerText = 'Empate';
    }else{
        Message.innerText = isCircleTurn ? 'Circulo Venceu!!' : 'X Venceu!!'
    }

    winningMessage.classList.add('show-winning-message');
}
const checkForWin = (currentPlayer) =>{
    return winningCombination.some(combination =>{
        return combination.every((index) =>{
            return celulas[index].classList.contains(currentPlayer);
        });
    });
};
const checkForDraw = () => {
    return [...celulas].every((cell) => {
      return cell.classList.contains('x') || cell.classList.contains('o');
    });
  };
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};
const setBoardHoverClass = () => {
    board.classList.remove('o');
    board.classList.remove('x');
  
    if (isCircleTurn) {
      board.classList.add('o');
    } else {
      board.classList.add('x');
    }
  };
const swapTurn = () =>{
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
}
const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'o' : 'x';

    placeMark(cell, classToAdd);

    const isdraw = checkForDraw();
    const isWin = checkForWin(classToAdd);

    if(isWin){
        endGame(false);
    }else if(isdraw){
        endGame(true);
    }else{
        swapTurn();
    }
};

startGame();

restart.addEventListener('click', startGame);
