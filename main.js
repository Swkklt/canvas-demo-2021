    //var div = document.getElementById('canvas') //通过ID获得一个元素，getElementById、createElementappendChild、divA.style都是API
    //var usingX = false  //生成一个标记 本质就是一个变量，用不同的值表示不同的状态
  
    var yyy = document.getElementById('xxx');
    var contextX = yyy.getContext('2d')

    autoSetCanvasSize(yyy)

    listenToMouse(yyy)
    
    var eraserEnabledX = false
    eraser.onclick = function(){
      eraserEnabledX = true
      actions.className = 'actions x'  //通过id可以控制类名，进而控制显示的样式
    }
    brush.onclick = function(){
      eraserEnabledX = false
      actions.className = 'actions'  //通过id可以控制类名，进而控制显示的样式
    }

    // -- Swkklt写下五段 ------------------------------------------ 
    // var lineWidthX = 5
    // var eraserWidthXY = 10
  
    // small.onclick = function(){
    //   if(eraserEnabledX){
    //     eraserWidthXY = 10
    //   }else{
    //     lineWidthX = 5
    //   }
    // }
    // middle.onclick = function(){
    //   if(eraserEnabledX){
    //     eraserWidthXY = 15
    //   }else{
    //     lineWidthX = 10
    //   }
    // }
    // large.onclick = function(){
    //   if(eraserEnabledX){
    //     eraserWidthXY = 20
    //   }else{
    //     lineWidthX = 15
    //   }
    // }
    
  

    function listenToMouse(canvasXA){
      var usingX = false  //生成一个标记 本质就是一个变量，用不同的值表示不同的状态
      //var lastPoint = {"x": undefined,"y":undefined}  这里也可以像下边这样写：
      var lastPoint = {
        x: undefined,
        y: undefined
      }
      canvasXA.onmousedown = function(aaa){
        var x = aaa.clientX;
        var y = aaa.clientY;
        usingX = true
        if(eraserEnabledX){
          // <!-- Swkklt写下一行 ------------------------------------------ -->
          // contextX.clearRect(x-(eraserWidthXY/2),y-(eraserWidthXY/2),eraserWidthXY,eraserWidthXY)
          contextX.clearRect(x-5,y-5,10,10)
        }else{
          lastPoint = {"x":x,"y":y}
          //console.log(lastPoint)
          //drawCircleX(x,y,1)
        }
        
      }
      canvasXA.onmousemove = function(aaa){
        var x = aaa.clientX;
        var y = aaa.clientY;

        if(!usingX){ return  }  //usingX不成立直接跳出此函数(function(aaa))
        
        if(eraserEnabledX){
          // <!-- Swkklt写下一行 ------------------------------------------ -->
          // contextX.clearRect(x-(eraserWidthXY/2),y-(eraserWidthXY/2),eraserWidthXY,eraserWidthXY)
          contextX.clearRect(x-5,y-5,10,10)
        }else{
          var newPoint = {"x":x,"y":y}
          //drawCircleX(x,y,1)
          drawLineX(lastPoint["x"],lastPoint["y"],newPoint["x"],newPoint["y"])//  也可以这么调用变量：drawLineX(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
          lastPoint = newPoint
        }
        
        
        
      }
      canvasXA.onmouseup = function(aaa){
        usingX = false
      }
    }  
    function autoSetCanvasSize(canvasXXX){
      setCanvasSize()  // 设置canvas的宽高为窗口大小  
      window.onresize = function(){   // 窗口改变大小后再设置canvas的宽高为窗口大小
        setCanvasSize()
      }
      function setCanvasSize(){  // 设置canvas的宽高为视图窗口宽高
        var pageWidthX = document.documentElement.clientWidth
        var pageHeightX = document.documentElement.clientHeight
        canvasXXX.width = pageWidthX   //设置canvas的宽度
        canvasXXX.height = pageHeightX
      }
    }
    
    function drawCircleX(x,y,radiusX){ //画圆函数
      contextX.beginPath()
      contextX.fillStyle = 'black'
      contextX.arc(x,y,radiusX,0,Math.PI*2);
      //contextX.stroke()
      contextX.fill()
    }
    function drawLineX(x1,y1,x2,y2){   //绘制路径函数
      contextX.beginPath()
      contextX.strokeStyle = 'black'
      contextX.moveTo(x1,y1);  //路径起点
      // <!-- 下一行 ------------------------------------------ -->
      //contextX.lineWidth = lineWidthX  //设置路径宽度
      contextX.lineWidth = 5  //设置路径宽度
      contextX.lineTo(x2,y2)  //终点
      contextX.stroke()
      contextX.closePath()   //也可以不写，会自动结束 
    }

    // document.onmousedown = function(a){
    //   usingX = true  
    //   var x = a.clientX
    //   var y = a.clientY
    //   var divA = document.createElement('div')
    //   divA.style = "width:6px; height:6px;" + "background: white; border-radius: 3px;" + "position:absolute; left:" + (x-3) + "px;" + "top:"+ (y-3) +"px;"
    //   div.appendChild(divA)
    // }

    //动鼠标
    // document.onmousemove = function(a){ //参数改为a,最好和上边的一样，因为监听的对象一样 document.onmousemove浏览器提供给我们监控鼠标移动的API，其它类似
    //   if(usingX){   //只有按下去才会画
    //     var x = a.clientX   //因为作用域的不同，此处的x,y和上边的x,y没有任何关系
    //     var y = a.clientY
    //     var divA = document.createElement('div')
    //     divA.style = "width:6px; height:6px;" + "background: white; border-radius: 3px;" + "position:absolute; left:" + (x-3) + "px;" + "top:"+ (y-3) +"px;"   因为矩形是在左上角，所以需要将点进行三像素的偏移，从而看起来像鼠标在圆心画圆   
    //     div.appendChild(divA)
    //   }else{

    //   }
      
    // }
    // document.onmouseup = function(z){
    //   usingX = false
    //   //console.log(1)
    // }