var mouse = {
        X   : 0,
        Y   : 0,
        CX  : 0,
        CY  : 0
    },
    block = {
        X   : mouse.X,
        Y   : mouse.Y,
        CX  : mouse.CX,
        CY  : mouse.CY
    },
    imags = [
        'https://img0.baidu.com/it/u=13255978,3987556015&fm=26&fmt=auto',
        'https://source.unsplash.com/Qdt0KC3O_V8',
        'https://source.unsplash.com/lT7zmkth3o8',
        'https://source.unsplash.com/cUpp1gAEtiU'
    ];

// 获得鼠标指针在页面中的位置
// eslint-disable-next-line no-undef
$('.block').on('mousemove', function(e) {
    // eslint-disable-next-line no-undef
    mouse.X   = (e.pageX - $(this).offset().left) - $('.block').width() / 2;
    // eslint-disable-next-line no-undef
    mouse.Y   = (e.pageY - $(this).offset().top) - $('.block').height() / 2;
})

// 当鼠标指针离开元素时位置
// eslint-disable-next-line no-undef,no-unused-vars
$('.block').on('mouseleave', function(e) {
    mouse.X   = mouse.CX;
    mouse.Y   = mouse.CY;
})

// setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
setInterval(function(){

    block.CY   += (mouse.Y - block.CY) / 12;
    block.CX   += (mouse.X - block.CX) / 12;

    // eslint-disable-next-line no-undef
    $('.block .circleLight').css('background', 'radial-gradient(circle at ' + mouse.X + 'px ' + mouse.Y + 'px, #fff, transparent)')
    // eslint-disable-next-line no-undef
    $('.block').css({
        transform : 'scale(1.03) translate(' + (block.CX * 0.05) + 'px, ' + (block.CY * 0.05) + 'px) rotateX(' + (block.CY * 0.05) + 'deg) rotateY(' + (block.CX * 0.05) + 'deg)'
    })

}, 20);

// 为匹配的元素执行动作
// eslint-disable-next-line no-undef
$('.slider .item').each(function(i){

    if(i == 0){

        // eslint-disable-next-line no-undef
        $(this).addClass('active');
        // eslint-disable-next-line no-undef
        $(this).next().addClass('next');
        // eslint-disable-next-line no-undef
        $(this).prev().addClass('prev');
    }

// 使用 attr() 方法：--$(this).attr(); 获取节点属性名的值，相当于 getAttribute() 方法
    // eslint-disable-next-line no-undef
    $(this).attr('id', 'slide-'+i);

// prepend() 方法：在被选元素的开头（仍位于内部）插入指定内容。
    // eslint-disable-next-line no-undef
    $(this).prepend(
        // eslint-disable-next-line no-undef
        $('<div>', {class: 'blur', style: 'background-image: url(' + imags[i] + ');'}),
        // eslint-disable-next-line no-undef
        $('<div>', {class: 'bg', style: 'background-image: url(' + imags[i] + ');'})
    )

// 设置背景
    // eslint-disable-next-line no-undef
    $(this).find('.block').css('background-image', 'url(' + imags[i] + ')')

    // eslint-disable-next-line no-undef
    $('.navigations .dots').append(
        // eslint-disable-next-line no-undef
        $('<li>', {class: i == 0 ? 'active' : '', id: i}).on('click', function(){
            // eslint-disable-next-line no-undef
            var cSlide = $('.slider #slide-'+$(this).attr('id'));

            // eslint-disable-next-line no-undef
            $('.navigations .dots li').removeClass('active');
            // eslint-disable-next-line no-undef
            $(this).addClass('active');

            // eslint-disable-next-line no-undef
            $('.slider .item').removeClass('active prev next');
            cSlide.addClass('active');
            cSlide.next().addClass('next');
            cSlide.prev().addClass('prev');
        })
    )
})