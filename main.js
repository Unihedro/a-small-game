(()=>{
var game = {size:4,queue:[]};
window.onclick=ev=>{console.log(ev)
if (ev.target.tagName === 'A')
  return;
if (!game.playing) {
  document.getElementsByTagName('h1')[0].classList.add('fade');
  var grid = 0;
  document.body.insertAdjacentHTML('beforeend',   ['<span id="board">'].concat('.,:;#'.split('').map((v,i)=>{
    var res = '',
      j = 0;
    while(j++<game.size) res +=`<span class="u l${5-i}">${v}</span>`;
    return res;
  }), // top
  Array.apply(null, Array(game.size)).map((_,i)=>{
var res = '.,:;#'.split('').map((v,n)=>`<span class="l l${5-n}">${v}</span>`).join(''),
    j = 0;
while(j++<game.size) res +=`<span class="p" id="g${grid++}">0</span>`;
return res + '.,:;#'.split('').reverse().map((v,n)=>`<span class="r l${n+1}">${v}</span>`).join('');
}), // center,
  '.,:;#'.split('').reverse().map((v,i)=>{
    var res = '',
      j = 0;
    while(j++<game.size) res +=`<span class="d l${i+1}">${v}</span>`;
    return res;
  }), '<span id="bump"></span>').join('<br>'));
  var $board = document.getElementById('board');
  game.life = 5;
  game.score = 0;
  game.next = 1;
  game.queue = [];
  game.playing = setInterval(()=>{
    if (game.life <= 0) { // game over!
      document.getElementsByTagName('h1')[0].classList.remove('fade');
      document.getElementById('score').innerHTML = ' by unihedron; your score was ' + game.score;
      document.body.removeChild($board);
      clearInterval(game.playing);
      setTimeout(()=>game.playing=false,1000);
    } else {
      if (game.queue.length <= game.size + 1) {
        var n;
        do {
          n = Math.floor(16 * Math.random());
        } while (game.queue.indexOf('g' + n) !== -1);
        game.queue.push('g' + n);
        document.getElementById('g' + n).innerHTML = game.next;
        if (++game.next == 10) game.next = 1; // 8 -> 9 -> 2 -> 3
      } else {
        game.life--;
        $board.className = 'l' + game.life;
      }
    }
  }, 400);
} else if (ev.target.classList.contains('p')) {
  var $g = ev.target;
  var g = $g.id;
  if (g === game.queue[0]) {
    (game.score += Number(game.queue.shift().substr(1))) > 32 &&
    (document.getElementById('bump').innerHTML = game.score);
    $g.innerHTML = '0';
    if ((game.life += 2) > 5)
      game.life = 5;
  } else {
    game.life--;
  }
  document.getElementById('board').className = 'l' + game.life;
}
}
})();
