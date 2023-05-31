const winningCombos: (number[])[] = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
]


let board: number[], turn: number, winner: boolean, tie: boolean


const squareEls = document.querySelectorAll<HTMLDivElement>(".sqr")

const messageEl = document.querySelector<HTMLHeadingElement>("#message")

const resetBtnEl = document.querySelector<HTMLButtonElement>("#btn")


squareEls.forEach(function (square:HTMLDivElement) :void {
  square?.addEventListener("click", handleClick)
})

resetBtnEl?.addEventListener("click", init)


init()


function handleClick(event: MouseEvent) :void {
  if(!(event.target instanceof HTMLDivElement)) return
  const sqIdx = parseInt(((event.target.id).charAt(2)))
  // const sqIdx = evt.target.id.replace("sq", "")
  if (board[sqIdx] !== 0 || winner === true) return
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
  
}

function init(){
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  turn = 1
  winner = false 
  tie = false
  render() 
}

function render(){
  updateBoard()
  updateMesage()
}


function updateBoard(){
  board.forEach(function(sqr, index){
    if(sqr === 0){
      squareEls[index].textContent = ""
    }else if(sqr === 1){
      squareEls[index].textContent = "🪨"
    }else if(sqr === -1){
      squareEls[index].textContent = "🐴" // andrea and hunter prompted me to use textcontent here
    }
  })  
} 


function updateMesage() {
  if(!messageEl) return
  if (winner === false && tie === false && turn === 1){
    messageEl.textContent = `It's Shrek's turn.`
  }else if(winner === false && tie === false && turn === -1){
    messageEl.textContent = `It's Donkey's turn.`
  }else if (winner === false && tie === true){
    messageEl.textContent = `Puss in Boots got this one.`
  }else if (turn === 1){
    messageEl.textContent = `Congratulations Shrek. You kicked "ass".`
  }else{
    messageEl.textContent = `Congratulations Donkey. You deserve some waffles.`
  }
}

function placePiece(idx: number){
  board[idx] = turn
}

function checkForTie(){
  if(board.includes(0)){
    tie = false
  }else{
    tie = true
  }
}

function checkForWinner(){
  winningCombos.forEach((combo) => {
    const a = combo[0]
    const b = combo[1]
    const c = combo[2]
    if(board[a] + board[b] + board[c] === 3){
      winner = true
    }else if (board[a] + board[b] + board[c] === -3) {
      winner = true
    } else return
  }) 
} 

function switchPlayerTurn(){
  if(winner === true){
    return
  }else if(winner === false){
    turn = turn * (-1)
  }
}
