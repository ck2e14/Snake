/////////////////////////API\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const URL = "http://localhost:3000/users"



    const get = function(){
    return fetch(URL).then(resp => resp.json())
    
    }
    
    const post = function(newUser){
        // debugger
       return fetch("http://localhost:3000/users",{
             method:"POST", 
             headers: { "Content-Type" : "application/json",
             Accept: "application/json"
            },
            body: JSON.stringify(newUser) 
})
        
    }

    
    // debugger
   const API = {
       get,
       post
   }

////////////////////////////LOG IN PAGE\\\\\\\\\\\\\\\\\\\\\\\\\\

const addUser = function(event){
    event.preventDefault()

    const newUser = {
        name: event.target.elements.name.value,
        username: event.target.elements.username.value,
        email: event.target.elements.email.value
    }

    API.post(newUser).then(user=> renderUser(user))

    event.target.reset()
}




form = document.querySelector('form')
form.addEventListener('submit',addUser)


//////////////////////////// LEADERBOARD \\\\\\\\\\\\\\\\\\\\\\\\\\
    const getUsers = function(){
     return  API.get().then(users => renderUsers(users))
    }

    const renderUsers = function(users){
      users.forEach(user => renderUser(user))
    }

    const renderUser = function(user ){
        p = document.createElement('p')
        p.innerText = user.name

        leaderBoard = document.querySelector('#leaderBoard')
        leaderBoard.append(p)
 
    }
    
getUsers()



    // GAMESPEED DECLARATIONS //
    let turbo = 1
    let game_speed = 75;
    let lvl2speed = 65;
    let lvl3speed = 55;
    let lvl4speed = 45;

    const CANVAS_BORDER_COLOUR = 'black';
        const TURBO_CANVAS_BACKGROUND_COLOUR = 'darkred'
    const CANVAS_BACKGROUND_COLOUR = "grey";
    const SNAKE_COLOUR = 'lightgreen';
    const SNAKE_BORDER_COLOUR = 'darkgreen';
    const FOOD_COLOUR = 'black';
        const TURBO_FOOD_COLOUR = 'white'
    const FOOD_BORDER_COLOUR = 'darkred';
    
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
        const restartKey = 82
        if (key === restartKey) {
            location.reload();
        }
    }
    // build function that toggles on/off the turbo variable. Amend the relevant code elsewhere that says something like 'if turbo = true then x3 gamespeed'
    function toggleTurbo(event){
        const key = event.keyCode;
        const turboKey = 32
        if (key === turboKey){
            if (turbo === 1){
                turbo =  3
            } else {
                turbo = 1
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
    /**
     * Creates random set of coordinates for the snake food.
     */
    function createFood() {
      // Generate a random number the food x-coordinate
      foodX = randomTen(0, gameCanvas.width - 10);
      // Generate a random number for the food y-coordinate
      foodY = randomTen(0, gameCanvas.height - 10);
      // if the new food location is where the snake currently is, generate a new food location
      snake.forEach(function isFoodOnSnake(part) {
        const foodIsoNsnake = part.x == foodX && part.y == foodY;
        if (foodIsoNsnake) createFood();
      });
    }
    /**
     * Draws the snake on the canvas
     */
    function drawSnake() {
      // loop through the snake parts drawing each part on the canvas
      snake.forEach(drawSnakePart)
    }
    /**
     * Draws a part of the snake on the canvas
     * @param { object } snakePart - The coordinates where the part should be drawn
     */
    function drawSnakePart(snakePart) {
      // Set the colour of the snake part
      ctx.fillStyle = SNAKE_COLOUR;
      // Set the border colour of the snake part
      ctx.strokestyle = SNAKE_BORDER_COLOUR;
      // Draw a "filled" rectangle to represent the snake part at the coordinates
      // the part is located
      ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      // Draw a border around the snake part
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
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
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

    