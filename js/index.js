$(function(){
    var sence=$('.sence')
    var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
    var shebiao={};
  function render(){
      for(var i=0;i<30;i++){
          for(var j=0;j<30;j++){
              var r=Math.floor(Math.random()*155);
              var g=Math.floor(Math.random()*255);
              var b=Math.floor(Math.random()*155);
              var color='rgba('+r+','+g+','+b+',1)';
              $('<div>').addClass('she').attr('id',i+'_'+j).appendTo('.sence')
          }
      }
  }
  render();


        function  findDiv(x,y){
            return $('#'+x+'_'+y)
        }
        $.each(she,function(i,v){
            findDiv(v.x,v.y).addClass('shet')
        })


        function fangshiwu(){
            do{
                x=Math.floor(Math.random()*20);
                y=Math.floor(Math.random()*20);
                findDiv(x,y).addClass('shiwu')
                return {x:x,y:y}
            }while(shebiao[x+'_'+y])
        }

        var shiwu=fangshiwu();
        var flag=true;
    $('.start').on('click',function(){
        if(flag){
            flag=false;
            timeId=setInterval(move,300);
            $(this).text('游戏暂停');
        }else{
            flag=true;
            clearInterval(timeId);
            $(this).text('开始游戏');
        }
    })
        direction='you';
        $(document).on('keyup',function(e){
            var biao={37:'zuo',38:'shang',39:'you',40:'xia'};
            var fanbiao={'zuo':37,'shang':38,'you':39,'xia':40};
            if(Math.abs(e.keyCode-fanbiao[direction])===2){
                return;
            }
            if(biao[e.keyCode]){
                direction=biao[e.keyCode]
                // console.log(direction)
            }
        })


        function move(){
            var jiutou=she[she.length-1];
            if (direction==='you') {
                var xintou={x:jiutou.x,y:jiutou.y+1};
            };
            if (direction==='zuo') {
                var xintou={x:jiutou.x,y:jiutou.y-1};
            };
            if (direction==='shang') {
                var xintou={x:jiutou.x-1,y:jiutou.y};
            };
            if (direction==='xia') {
                var xintou={x:jiutou.x+1,y:jiutou.y};
            };
            if (shebiao[xintou.x+'_'+xintou.y]) {
                clearInterval(timeId);
                alert('撞到自己了');
                return
            };
            if(xintou.x<0||xintou.x>29||xintou.y<0||xintou.y>29){
                clearInterval(timeId);
                alert('撞死了')
                return;
            }
            she.push(xintou);
            shebiao[xintou.x+'_'+xintou.y]=true;
            findDiv(xintou.x,xintou.y).addClass('shet')
            if (xintou.x===shiwu.x&&xintou.y===shiwu.y) {
                findDiv(shiwu.x,shiwu.y).removeClass('shiwu')
                shiwu=fangshiwu()
            }else{
                var weibu=she.shift();
                delete shebiao[weibu.x+'_'+weibu.y]
                findDiv(weibu.x,weibu.y).removeClass("shet")
            }
        }

    var replay=$('.replay').get(0);
    $('.replay').on('click',function () {
        sence.empty();
        she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
        render()
        shiwu=fangshiwu();
        flag=true;
        shebiao={};
        clearInterval(timeId);
        $('.start').text('开始游戏')
    })
})