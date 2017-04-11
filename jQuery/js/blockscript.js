;
(function($, window, document, undefaultsined){

  //获取用户提交信息
  var defaults = {    
      moveTime: 'slow',
      waitTime: 'slow',
      direction: 'left',
      autoplay: true,
      prevNav: true,
      nextNav: true,

    }

  function Carousel(options) {
    this.settings = $.extend({}, defaults, options)
    /*this.element = element*/
    this.init()
  }

  Carousel.prototyle = {

    //初始化
    init: function() {

      var selv = this
          Timer     //获取定时器id
          img_id    //用于获取当前图片id
          ulObj = selv.children('ul')   //ul标签对象
          imageHeight = selv.find('img').height()    //获取图片大小
          imageWidth = selv.find('img').width()
          imageNumber = selv.find('img').size()   //获取图片数量
          imageTotalWidth = imageWidth * imageNumber   //获取ul宽度
          imageTotalHeight = imageHeight * imageNumber   //获取ul高度

      //根据图片大小定义ul,div大小
      selv.css({'width': imageWidth, 'height': imageHeight})

      //创建遮罩，遮罩大小初始化
      $('<div>',{
        class: 'block'
      }).appendTo(selv)
      var blockObj = selv.children('.block')   
      blockObj.css('height', imageHeight)
      blockObj.css('width', imageWidth)

      //创建数字标签对象
      $('<div>',{
        class: 'num'
      }).prependTo(selv)
      var numObj = selv.children('.num')

      //根据图片数量定义a标签数字的数量，并插入
      for (var i = 1; i <= imageNumber; i++) {
        $('<a>', {
          num_id: i,
          text: i + ' ',
          href: 'javascript:void(0)'
        }).appendTo(numObj)
      }

      //插入向前向后箭头
      $('<a>',{
        class: 'prev',
        text: '<< ',
        href: 'javascript:void(0)'
      }).after(numObj)
      $('<a>',{
        class: 'next',
        text: ' >>',
        href: 'javascript:void(0)'
      }).after(numObj)

      //图片初始位置修改
      if (defaults.direction == 'up' || defaults.direction == 'down') {
        ulObj.css('height', imageTotalHeight)
        ulObj.css('margin-top', '-' + imageHeight + 'px')
      }else if (defaults.direction == 'left' || defaults.direction == 'right') {
        ulObj.css('width', imageTotalWidth)
        ulObj.css('margin-left', '-' + imageWidth + 'px')
      }else {
        alert('请输入方向！') 
      }
      ulObj.children().last().prependTo(ulObj)

      //获取当前显示图片id，并加上class
      img_id = ulObj.children().eq(1).attr('img_id')
      $('a[num_id=' + img_id + ']').addClass('onNum')

      mouseEvent(selv)
    }

    mouseEvent: function(selv) {

      $('.prev').click( function () {
        img_id = ulObj.children().eq(0).attr('img_id')   //在eq(1)基础上-1
        numOn(img_id)
        if (defaults.direction == 'left' || defaults.direction == 'right') {
          moveLeft()
        }else if (defaults.direction == 'up' || defaults.direction == 'down') {
          moveUp()
        }
      
      }) 
      $('.next').click( function () {
        img_id = ulObj.children().eq(2).attr('img_id')   //在eq(1)基础上+1
        numOn(img_id)
        if (defaults.direction == 'left' || defaults.direction == 'right') {
          moveRight()
        }else if (defaults.direction == 'up' || defaults.direction == 'down') {
          moveDown()
        }

      })
      
      //数字
      numObj.children().click(
        function() {
          numObj.children().removeClass()
          $(this).addClass('onNum')
          img_id = ulObj.children().eq(1).attr('img_id')
          var move_num = $(this).attr('num_id') - img_id
          if (move_num > 0) {           
              if (defaults.direction == 'left' || defaults.direction == 'right') {
                for (var i = 1; i <= move_num; i++) { 
                  ExmoveRight(i, move_num)
                }
              }else if (defaults.direction == 'up' || defaults.direction == 'down') {
                for (var i = 1; i <= move_num; i++) { 
                  ExmoveDown(i, move_num)
                }
              } 
            
          }else if (move_num < 0) {
              if (defaults.direction == 'left' || defaults.direction == 'right') {
                for (var i = -1; i >= move_num; i--) { 
                  ExmoveLeft(i, move_num)
                }
              }else if (defaults.direction == 'up' || defaults.direction == 'down') {
                for (var i = -1; i >= move_num; i--) { 
                  ExmoveUp(i, move_num)
                }
              } 
          }
        }) 
             
      //鼠标悬停停止计时器
      selv.bind({
        mouseover: function () { clearInterval(Timer) },
        mouseout: function () { 
          if (defaults.direction == 'left') { loopLeft() }
          else if (defaults.direction == 'right') { loopRight() }
          else if (defaults.direction == 'up') { loopUp() }
          else if (defaults.direction == 'down') { loopDown() }
        }
      })
    }
  }



  $.fn.carousel = function(options){
    //匹配多个对象
    if (this.length == 0) {return this};
    if (this.length > 1) {
      this.each(function(){$(this).carousel(options)})
    }

   
    


    init()
    mouseEvent()

    if (defaults.direction == 'left') {
      ulObj.children().css('display', 'inline-block')  
      loopLeft()
    }else if (defaults.direction == 'right'){
      ulObj.children().css('display', 'inline-block') 
      loopRight()
    }else if (defaults.direction == 'up'){
      loopUp()
    }else if (defaults.direction == 'down'){
      loopDown()
    }else{
      alert('请输入方向！') 
    }

    /*初始化*/
    var init = function () {

      
    }

    //记录鼠标事件
    function mouseEvent() {
      //按键效果
        
    }

    //用于点击数字时点亮数字
    function numOn(img_id) {
      numObj.children().removeClass()
      numObj.children('[num_id=' + img_id + ']').addClass('onNum')
    }


    //右移
    function moveRight() {
      blockObj.css('display', 'inline')
      ulObj.animate({
        marginLeft: '-=' + imageWidth + 'px'
      }, defaults.moveTime, function() {
        ulObj.css('margin-left', '-' + imageWidth + 'px')
        ulObj.children().first().appendTo(ulObj)
        blockObj.css('display', 'none')
      })
    }
    function ExmoveRight(i, move_num) {
      blockObj.css('display', 'inline')
      ulObj.animate({
        marginLeft: '-=' + imageWidth + 'px'
      }, defaults.moveTime, function() {
        ulObj.css('margin-left', '-' + imageWidth + 'px')
        ulObj.children().first().appendTo(ulObj)
        if (i == move_num) {
          blockObj.css('display', 'none')
        }
      })
    }
    //左移
    function moveLeft(width) {
      blockObj.css('display', 'inline')
      ulObj.animate({
        marginLeft: '+=' + width + 'px'
      }, defaults.moveTime, function() {
        ulObj.css('margin-left', '-' + width + 'px')
        ulObj.children().last().prependTo(ulObj)
        blockObj.css('display', 'none')
      })
    }
    function ExmoveLeft(i, move_num) {
      blockObj.css('display', 'inline')
      ulObj.animate({
        marginLeft: '+=' + imageWidth + 'px'
      }, defaults.moveTime, function() {
        ulObj.css('margin-left', '-' + imageWidth + 'px')
        ulObj.children().last().prependTo(ulObj)
        if (i == move_num) {
          blockObj.css('display', 'none')
        }
      })
    }
    //上移
    function moveUp() {
      blockObj.css('display', 'inline')
      ulObj.animate({
        marginTop: '+=' + imageHeight + 'px'
      }, defaults.moveTime, function() {
        ulObj.css('margin-top', '-' + imageHeight + 'px')
        ulObj.children().last().prependTo(ulObj)
        blockObj.css('display', 'none')
      })
    }
    function ExmoveUp(i, move_num) {
      blockObj.css('display', 'inline')
      ulObj.animate({
        marginTop: '+=' + imageHeight + 'px'
      }, defaults.moveTime, function() {
        ulObj.css('margin-top', '-' + imageHeight + 'px')
        ulObj.children().last().prependTo(ulObj)
        if (i == move_num) {
          blockObj.css('display', 'none')
        }
      })
    }
    //下移
    function moveDown() {
      blockObj.css('display', 'inline')
      ulObj.animate({
        marginTop: '-=' + imageHeight + 'px'
      }, defaults.moveTime, function() {
        ulObj.css('margin-top', '-' + imageHeight + 'px')
        ulObj.children().first().appendTo(ulObj)
        blockObj.css('display', 'none')
      })
    }
    function ExmoveDown(i, move_num) {
      blockObj.css('display', 'inline')
      ulObj.animate({
        marginTop: '-=' + imageHeight + 'px'
      }, defaults.moveTime, function() {
        ulObj.css('margin-top', '-' + imageHeight + 'px')
        ulObj.children().first().appendTo(ulObj)
        if (i == move_num) {
          blockObj.css('display', 'none')
        }
      })
    }

    //循环效果
    function loopRight() {
      Timer = setInterval(function() { 
        img_id = ulObj.children().eq(2).attr('img_id')
        numOn(img_id) 
        moveRight() 
      }, defaults.waitTime)
    }
    function loopLeft() {
      Timer = setInterval(function() { 
        img_id = ulObj.children().eq(0).attr('img_id')
        numOn(img_id) 
        moveLeft() 
      }, defaults.waitTime)
    }
    function loopUp() {
      Timer = setInterval(function() { 
        img_id = ulObj.children().eq(0).attr('img_id')
        numOn(img_id) 
        moveUp() 
      }, defaults.waitTime)
    }
    function loopDown() {
      Timer = setInterval(function() { 
        img_id = ulObj.children().eq(2).attr('img_id')
        numOn(img_id)
        moveDown() 
      }, defaults.waitTime)
    }

  }
})(jQuery, window, document)
