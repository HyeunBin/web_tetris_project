var map = new Array(20);
var piece = new Array(7);
var block;
/*
각종 블럭들
shpae[i] = [y, x]
now[i] = [y, x]
*/
class _I{
  constructor(){
    this.name = "I";
    this.shape = [[0, 0], [0, 1], [0, 2], [0, 3]];
    this.now = [[0, 4 + 0], [0, 4 + 1], [0, 4 + 2], [0, 4 + 3]];
    this.check_down = [[0, 4 + 0], [0, 4 + 1], [0, 4 + 2], [0, 4 + 3]];
    this.check_left = [[0, 4]];
    this.check_right = [[0, 7]];
  }
};
class _L{
  constructor(){
    this.name = "L";
    this.shape = [[0, 0], [0, 1], [0, 2], [1, 0]];
    this.now = [[0, 4 + 0], [0, 4 + 1], [0, 4 + 2], [1, 4 + 0]];
    this.check_down = [[0, 4 + 1], [0, 4 + 2], [1, 4 + 0]];
    this.check_left = [[0, 4], [1, 4]];
    this.check_right = [[0, 7], [1, 4]];
  }
};
class _J{
  constructor(){
    this.name = "J";
    this.shape = [[0, 0], [0, 1], [0, 2], [1, 2]];
    this.now = [[0, 4 + 0], [0, 4 + 1], [0, 4 + 2], [1, 4 + 2]];
    this.check_down = [[0, 4 + 0], [0, 4 + 1], [1, 4 + 2]];
    this.check_left = [[0, 4], [1, 6]];
    this.check_right = [[0, 6], [1, 6]];
  }
};
class _O{
  constructor(){
    this.name = "O";
    this.shape = [[0, 0], [0, 1], [1, 0], [1, 1]];
    this.now = [[0, 4 + 0], [0, 4 + 1], [1, 4 + 0], [1, 4 + 1]];
    this.check_down = [[1, 4 + 0], [1, 4 + 1]];
    this.check_left = [[0, 4], [1, 4]];
    this.check_right = [[0, 5], [1, 5]];
  }
};
class _S{
  constructor(){
    this.name = "S";
    this.shape = [[0, 1], [0, 2], [1, 0], [1, 1]];
    this.now = [[0, 4 + 1], [0, 4 + 2], [1, 4 + 0], [1, 4 + 1]];
    this.check_down = [[0, 4 + 2], [1, 4 + 0], [1, 4 + 1]];
    this.check_left = [[0, 5], [1, 4]];
    this.check_right = [[0, 6], [1, 5]];
  }
};
class _T{
  constructor(){
    this.name = "T";
    this.shape = [[0, 0], [0, 1], [0, 2], [1, 1]];
    this.now = [[0, 4 + 0], [0, 4 + 1], [0, 4 + 2], [1, 4 + 1]];
    this.check_down = [[0, 4 + 0], [0, 4 + 2], [1, 4 + 1]];
    this.check_left = [[0, 4], [1, 5]];
    this.check_right = [[0, 6], [1, 5]];
  }
};
class _Z{
  constructor(){
    this.name = "Z";
    this.shape = [[0, 0], [0, 1], [1, 1], [1, 2]];
    this.now = [[0, 4 + 0], [0, 4 + 1], [1, 4 + 1], [1, 4 + 2]];
    this.check_down = [[0, 4 + 0], [1, 4 + 1], [1, 4 + 2]];
    this.check_left = [[0, 4], [1, 5]];
    this.check_right = [[0, 5], [1, 6]];
  }
};

function board(canvas){
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 200, 400);
    ctx.fillStyle = "white";
    for(var i = 0; i <= 400; i+=20){
      for(var j = 0; j <= 200; j+=20){
        ctx.fillRect(j, i + 1, 19, 19);
      }
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 200, 1);
    ctx.fillRect(0, 0, 1, 400);
    ctx.fillRect(0, 400, 200, 1);
  }
  for(var i = 0; i < 20; i++) map[i] = new Array(10);
  piece = [_I, _L, _J, _O, _S, _T, _Z];
}

function fall(canvas){
  for(var i = 0; i < block.now.length; i++) if(block.now[i][0] + 1 == 20) return first_block_fall(canvas);
  for(var i = 0; i < block.check_down.length; i++){
    if(map[block.check_down[i][0] + 1][block.check_down[i][1]] == 1) return first_block_fall(canvas);
    else block.check_down[i][0] += 1;
  }

  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "white";
  for(var i = 0; i < block.now.length; i++){
    map[block.now[i][0]][block.now[i][1]] = 0;
    ctx.fillRect(block.now[i][1] * 20, block.now[i][0] * 20 + 1, 19, 19);
  }
  ctx.fillStyle = "green";
  for(var i = 0; i < block.now.length; i++){
    map[block.now[i][0] + 1][block.now[i][1]] = 1;
    block.now[i][0] += 1;
    ctx.fillRect(block.now[i][1] * 20, block.now[i][0] * 20 + 1, 19, 19);
  }
  //console.log(map[0]);
  //console.log(block.now)
  setTimeout(fall, 100, canvas);
}

function first_block_fall(canvas){
  block = new piece[Math.floor(Math.random() * 7)]();
  console.log(block.name)
  for(var i = 0; i < block.now.length; i++){
    if(map[block.now[i][0]][block.now[i][1]] == 1){
      console.log("end!");
      return;
    }
  }
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "green";
  for(var i = 0; i < block.now.length; i++){
    map[block.now[i][0]][block.now[i][1]] = 1;
    ctx.fillRect(block.now[i][1] * 20, block.now[i][0] * 20 + 1, 19, 19);
  }
  setTimeout(fall, 100, canvas);
}

function key_down(e){
  switch(e.keyCode) {
    case 37: //left
      for(var i = 0; i < block.check_left.length; i++) if(map[block.check_left[i][0][block.check_left[i][1]] - 1] == 1 || block.check_left[i][1] - 1 < 0) return;
      var ctx = document.getElementById('canvas').getContext('2d');
      ctx.fillStyle = "white";
      for(var i = 0; i < block.now.length; i++){
        map[block.now[i][0]][block.now[i][1]] = 0;
        ctx.fillRect(block.now[i][1] * 20, block.now[i][0] * 20 + 1, 19, 19);
      }
      ctx.fillStyle = "green";
      for(var i = 0; i < block.now.length; i++){
        map[block.now[i][0]][block.now[i][1] - 1] = 1;
        block.now[i][1] -= 1;
        ctx.fillRect(block.now[i][1] * 20, block.now[i][0] * 20 + 1, 19, 19);
      }
      break;
    case 38: //up

      break;
    case 39: //right

      break;
    case 40: //down

      break;
  }
}
