// window.addEventListener('DOMContentLoaded', (event) => {
//   showStartUp}
// )

// const showStartUp = function(){
//   const startUp = document.querySelector('start-up-page')
//   const body = document.querySelector('.body')
//   body.style.display ="none"
// }






//////////////////////////API\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const URL = "http://localhost:3000/users"

const leaderBoard = document.querySelector('#leaderBoard')

const get = function(){
   return fetch(URL).then(resp => resp.json()) 
    }
    
const postScore = function(newUser) { 
  return fetch("http://localhost:3000/scores",{
  method:"POST", 
  headers: { "Content-Type" : "application/json",
  Accept: "application/json"
  }, 
     
  body: JSON.stringify({score_num: `${score}`, user_id: `${newUser.id}`})
    
  })}

const patchScore = function(newUser){
  return fetch("http://localhost:3000/scores",{
    method:"PATCH", 
    headers: { "Content-Type" : "application/json",
    Accept: "application/json"
   }, 
   
   body: JSON.stringify({score_num: `${score}`, user_id: `${newUser.id}`})
  
  })}

 
const patch = function(newUser){
  return fetch("http://localhost:3000/users",{
    method:"PATCH", 
    headers: { "Content-Type" : "application/json",
    Accept: "application/json"
   },
   body: JSON.stringify(newUser) 
}).then(resp=>resp.json()).then(resp=>patchScore(resp))}

    
        
    
    const post = function(newUser){
        // debugger;
       return fetch("http://localhost:3000/users",{
             method:"POST", 
             headers: { "Content-Type" : "application/json",
             Accept: "application/json"
            },
            body: JSON.stringify(newUser) 
}).then(resp=>resp.json()).then(resp=>postScore(resp))}

   const API = {
       get,
       post, postScore, patch
   }

////////////////////////////LOG IN PAGE\\\\\\\\\\\\\\\\\\\\\\\\\\

const addUser = function(event){
    event.preventDefault()

    const newUser = {
        name: event.target.elements.name.value,
        username: event.target.elements.username.value,
        email: event.target.elements.email.value,
        scores: [{score_num: score}]
    }
   

    API.post(newUser, score)

    renderUser(newUser)


    event.target.reset()
}

const patchUser = function(event){
  event.preventDefault()

  const newUser = {
      name: event.target.elements.name.value,
      username: event.target.elements.username.value,
      email: event.target.elements.email.value,
      scores: [{score_num: score}]
  }
 

  API.patch(newUser, score)



  event.target.reset()
}





form = document.querySelector('.log-in-form')
form.addEventListener('submit',addUser)


//////////////////////////// LEADERBOARD \\\\\\\\\\\\\\\\\\\\\\\\\\
    const getUsers = function(){
     return  API.get().then(users => renderUsers(users))
    }

    const renderUsers = function(users){
      users.forEach(user => renderUser(user))
    }
    
    
   

    const renderUser = function(user){
      
      const h3 = document.createElement('h3')
      const p = document.createElement('p')
      const allScores = user.scores
      const tableBody = document.querySelector('tbody')
      const tr = document.createElement('tr')
      const td = document.createElement('td')
      const td2= document.createElement('td')
       
      const highestScores = allScores.reduce(
      (max, scores) =>scores.score_num> max? scores.score_num: max, 0);
        
        td.innerText = user.name 
        td2.innerText= highestScores
      
    
       tr.append(td, td2)
       tableBody.append(tr)
       
        // leaderBoard.append(h3, p
        
    }

getUsers()

//////////////////////PATCH USER\\\\\\\\\\\\\\\\\\\\\

// patchForm =document.querySelector('.update-form')
// patchForm.addEventListener('submit',patchUser)



    // GAMESPEED DECLARATIONS //
    let turbo = 1
    let game_speed = 75;
    let lvl2speed = 65;
    let lvl3speed = 55;
    let lvl4speed = 45;

    const CANVAS_BORDER_COLOUR = 'orange';
        const TURBO_CANVAS_BACKGROUND_COLOUR = 'darkred'
    const CANVAS_BACKGROUND_COLOUR = 'lightblue';
    const SNAKE_COLOUR = 'darkgreen';
    const SNAKE_BORDER_COLOUR = '';
    const FOOD_COLOUR = 'orange';
        const TURBO_FOOD_COLOUR = 'white'
    const FOOD_BORDER_COLOUR = 'darkred';
    const TURBO_BACKGROUND_COLOUR = 'red'
    
    let snake = [
      {x: 150, y: 150},
      {x: 140, y: 150},
      {x: 130, y: 150},
      {x: 120, y: 150},
      {x: 110, y: 150}
    ]
    
    let startScore = 0;
    let score = 0;
    
    let changingDirection = false;
   
    let foodX;
    let foodY;
    let dx = 10;
    let dy = 0;

    const gameCanvas = document.getElementById("gameCanvas");

    const ctx = gameCanvas.getContext("2d");
    
    document.addEventListener("DOMContentLoaded", function(){
        main();
        createFood();
    })

    document.addEventListener("keydown", changeDirection);
    document.addEventListener("keydown", restartGame);
    document.addEventListener("keydown", toggleTurbo);
    document.addEventListener("keydown", pauseGame);
    
    function main() {
     
      if (didGameEnd()) return;
      setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas(); 
        drawFood();
        advanceSnake();
        drawSnake();
        hasPlayerLevelledUp();
       
        main();
      }, game_speed / turbo)
    }
// this doesnt work right now 
    function pauseGame(event){
        let key = event.keyCode;
        let pauseKey = 'p'
        if (key === pauseKey) {
            clearInterval(onTick)
        }
    }
    function hasPlayerLevelledUp(){
        if (score === 10) { game_speed = lvl2speed }
        if (score === 20) { game_speed = lvl3speed }
        if (score === 50) { game_speed = lvl4speed }
    }

    function restartGame(event){
        const key = event.keyCode;
        const restartKey = 191
        if (key === restartKey) {
            location.reload();
        }
    }
    // build function that toggles on/off the turbo variable. Amend the relevant code elsewhere that says something like 'if turbo = true then x3 gamespeed'
    function toggleTurbo(event){
      console.log('turbo')
        const key = event.keyCode;
        const turboKey = 32;
        if (key === turboKey){
            if (turbo === 1){
                turbo =  3
                document.body.style.background = 'red' 
            } else {
                turbo = 1
                document.body.style.background = 'lilac'
            } 
        }
    }

    function clearCanvas() {

      if (closeToEdge) {
          ctx.fillStyle = TURBO_CANVAS_BACKGROUND_COLOUR
      }
      if (turbo === 1){
        ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;

        ctx.strokestyle = CANVAS_BORDER_COLOUR;
       
        ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
       
        ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
        }
        else {
        ctx.fillStyle = TURBO_CANVAS_BACKGROUND_COLOUR;
        
        ctx.strokestyle = CANVAS_BORDER_COLOUR;
       
        ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
       
        ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
        
        
        }
    }
    
    
    function drawFood() {
      ctx.fillStyle = FOOD_COLOUR;
      ctx.strokestyle = FOOD_BORDER_COLOUR;
      ctx.fillRect(foodX, foodY, 10, 10);
      ctx.strokeRect(foodX, foodY, 10, 10);
    }

    function closeToEdge(){
        for (let i = 4; i < snake.length; i++) {
            
        }

    }
   
    function advanceSnake() {
      
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      
      snake.unshift(head);
      const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
      if (didEatFood) {
        if (turbo === 3) {;
            score += 30
        } else { 
        score += 10;
        }
        
        document.getElementById('score').innerHTML = `Your score: ${score}`;
   
        createFood();
      } else {
       
        snake.pop();
        console.log(score)
      }
    }
    
    function didGameEnd() {

      
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
      } 
    
      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > gameCanvas.width - 10;
      const hitToptWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > gameCanvas.height - 10;
      
      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    
    }
    /**
     * Generates a random number that is a multiple of 10 given a minumum
     * and a maximum number
     * @param { number } min - The minimum number the random number can be
     * @param { number } max - The maximum number the random number can be
     */
    function randomTen(min, max) {
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }
    function createFood() {
      foodX = randomTen(0, gameCanvas.width - 10);
      foodY = randomTen(0, gameCanvas.height - 10);
      snake.forEach(function isFoodOnSnake(part) {
        const foodIsoNsnake = part.x == foodX && part.y == foodY;
        if (foodIsoNsnake) createFood();
      });
    }
    function drawSnake() {
      snake.forEach(drawSnakePart)
    }
    /**
     * Draws a part of the snake on the canvas
     * @param { object } snakePart - The coordinates where the part should be drawn
     */
    function drawSnakePart(snakePart) {
      ctx.fillStyle = SNAKE_COLOUR;
      ctx.strokestyle = SNAKE_BORDER_COLOUR;
      ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
    /**
     * Changes the vertical and horizontal velocity of the snake according to the
     * key that was pressed.
     * The direction cannot be switched to the opposite direction, to prevent the snake
     * from reversing
     * For example if the the direction is 'right' it cannot become 'left'
     * @param { object } event - The keydown event
     */
    function changeDirection(event) {
      const LEFT_KEY = 65;
      const RIGHT_KEY = 68;
      const UP_KEY = 87;
      const DOWN_KEY = 83 ;
      /**
       * Prevent the snake from reversing
       * Example scenario:
       * Snake is moving to the right. User presses down and immediately left
       * and the snake immediately changes direction without taking a step down first
       */
      if (changingDirection) return;
      changingDirection = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    } 

    
