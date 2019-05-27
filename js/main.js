!function () {

    var codeContent = `
        .pikachu-body{
            background: #fee433;
        }
        .wrapper{
            width: 100%;
            height: 300px;
            position: relative;
        
        }
        .wrapper>:not(:last-child){
            z-index: 1;
        }
        .nose{
            position: absolute;
            width: 0px;
            height: 0px;
            top: 28px;
            left: 50%;
            margin-left: -12px;
            border-radius: 50%;
            border-top: 11px solid #2e2e2e;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-bottom: 11px solid transparent;
        }
        .eye{
            position: absolute;
            width: 49px;
            height: 49px;
            background: #2e2e2e;
            border-radius: 50%;
            border: 2px solid #000000;
        }
        .eye.right{
            left: 50%;
            margin-left: 80px;
        }
        .eye.left{
            right: 50%;
            margin-right: 80px;
        }
        /*黑色眼球里面的眼白*/
        .eye::before{
            content: '';
            display: block;
            width: 24px;
            height: 24px;
            background: #FFFFFF;
            border-radius: 50%;
            position: absolute;
            left: 6px;
            top: 1px;
            border: 2px solid #000000;
        }
        .face{
            width: 68px;
            height: 68px;
            background: #fc0d1c;
            border: 2px solid #000000;
            border-radius: 50%;
            position: absolute;
        }
        .face.left{
            right: 50%;
            top: 85px;
            margin-right: 106px;
        }
        .face.right{
            left: 50%;
            top: 85px;
            margin-left: 106px;
        }
        .upperLip{
            height: 24px;
            width: 72px;
            border: 3px solid black;
            position: absolute;
            top: 52px;
        }
        .upperLip.left{
            right: 50%;
            border-bottom-left-radius: 40px 25px;
            transform: rotate(-20deg);
            border-top: none;
            border-right: none;
            background: #fee433;
        }
        .upperLip.right{
            left: 50%;
            border-bottom-right-radius: 40px 25px;
            transform: rotate(20deg);
            border-top: none;
            border-left: none;
            background: #fee433;
        }
        .lowerLip-wrapper{
            position: absolute;
            width: 300px;
            height: 140px;
            right: 50%;
            margin-right: -150px;
            top: 60px;
            overflow: hidden;
        }
        .lowerLip{
            position: absolute;
            width: 280px;
            height: 3500px;
            background: #990513;
            border-radius: 200px/2000px;
            border: 2px solid #000000;
            left: 50%;
            bottom: 0px;
            margin-left: -140px;
            /*z-index: -1;*/
            overflow: hidden;
        }
        .lowerLip::after{
            content: '';
            position: absolute;
            bottom: 0;
            width: 120px;
            height: 120px;
            background: #fc4a62;
            right: 50%;
            margin-right: -60px;
            border-radius: 50%;
        }
    `;
    var duration = 50;
    var timeoutId;
    writeInPre('',codeContent);
    function writeInPre(prefix,code,fn) {
        var pre = document.querySelector('#code');
        var styleTag = document.querySelector('#styleTag');
        var n = 0;

        timeoutId = setTimeout(function run(){
            n += 1;
            pre.innerHTML = Prism.highlight(prefix+code.substr(0,n), Prism.languages.css, 'css');
            styleTag.innerHTML = prefix+code.substr(0,n);
            pre.scrollTop = pre.scrollHeight;
            if(n<code.length){
                timeoutId = setTimeout(run,duration)
            }else{
                fn && fn.call();
            }
        },duration)
    }
    var code = document.querySelector('#code');
    code.addEventListener('mouseenter',()=>{
        code.classList.add('active')
    })
    code.addEventListener('mouseleave',()=>{
        code.classList.remove('active');
    })
    // 点击按钮事件
    $('.actions').on('click','button',function (e) {
        let $button = $(e.currentTarget);
        let speed = $button.attr('data-speed');
        console.log(speed)
        $button.addClass('active')
            .siblings('.active').removeClass('active');

        if(speed === 'slow'){
            duration = 100;
        }else if(speed === 'normal'){
            duration = 50;
        }else if(speed === 'fast'){
            duration = 10;
        }
    })

    // 点击结束按钮
    $('#end').on('click',function () {
        window.clearTimeout(timeoutId);
        var pre = document.querySelector('#code');
        var styleTag = document.querySelector('#styleTag');
        pre.innerHTML = Prism.highlight(codeContent, Prism.languages.css, 'css');
        pre.scrollTop = pre.scrollHeight;
        styleTag.innerHTML = codeContent;
    })

    // 点击重新开始按钮
    $('#replay').on('click',function () {
        window.location.reload();
    })
}.call()
