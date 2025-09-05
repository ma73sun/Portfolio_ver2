$(function() {
    //PCは左上に時間表示
    $(function(time) {
        var realTime = new Date();
        var hour = realTime.getHours();
        var minutes = realTime.getMinutes().toString().padStart(2, '0'); //0padding
        var text = hour + ":" + minutes;
        document.getElementById('real-time').innerHTML = text;

        setInterval(time, 1000); //1秒ごとに更新
    });

    //スクロールしたら画面上部ぼかす
    $('#main-contents__wrapper').on('scroll', function() {
        if($(this).scrollTop() > 20) {
            $('.top-of-screen').addClass('blur');
        } else {
            $('.top-of-screen').removeClass('blur');
        };
    });

    //クリックしたボタンの色に応じて#main-contentsのborderの色を変更
    $('.select-button').click(function() {
        const $mainContents = $(this).closest('#main-contents');

        const buttonColor = $(this).css('background-color');

        $mainContents.css('border-color', buttonColor);
    })

    //WORKS内のカテゴリボタンを押した際にソート
    $('.category-button button').click(function() {
        const category = $(this).data('category');

        $('.works-list-item').hide();
        if(category === 'all') {
            $('.works-list-item').show();
        } else {
            $(`.works-list-item[data-category="${category}"]`).show();
        }
    })

    //.works-list-itemのクリックでiframeを表示・非表示
    $(document).ready(function() {
        $('.works-iframe').hide();
        $('.works-list-item').click(
            function () {
                const worksId = $(this).data('id');
                $('#main-contents__wrapper').scrollTop(0);//毎回ページトップに移動
                $('#works__wrapper').hide();
                $(`.works-iframe[data-id="${worksId}"]`).show();
                $('#works').css('margin', '60px auto 80px');//margin変更
                //SP
                if (window.matchMedia('(max-width: 767px)').matches) {
                    $('#works').css('margin', '20px auto 40px');
                }
            });

        //iframeが閉じられたことを検知したら#works__wrapperを表示する
        window.addEventListener('message', function (e) {
            if (e.data === 'closeIframe') {
                $('.works-iframe').hide();
                $('#works__wrapper').show();
                $('#works').css('margin', '');//margin元に戻す
            };
        });
    });

    //detailsが1つでも[open]になったら.copyrightにmargin-bottomを追加。
    //detailsが全て[open]でなくなったら.copyrightからmargin-bottomを削除。
    $('details').on('toggle', function () {
        const hasOpenDetails = $('details[open]').length > 0;
        $('.copyright').toggleClass('add_margin-bottom', hasOpenDetails);
    });

    //details開閉時のアニメーション
    let accordionDetails = 'details';
    let accordionSummary = 'summary';
    let accordionContent = '.accordion_content';
    let speed = 300;

    $(accordionSummary).each(function () {
        $(this).on("click", function (event) {
            event.preventDefault();
            if ($(this).parent($(accordionDetails)).attr("open")) {
                $(this).nextAll($(accordionContent)).slideUp(speed, function () {
                    $(this).parent($(accordionDetails)).removeAttr("open");
                    $(this).show();
                });
            } else {
                $(this).parent($(accordionDetails)).attr("open", "true");
                $(this).nextAll($(accordionContent)).hide().slideDown(speed);
            }
        })
    })

    //画面下部固定メニュー
    $('.bottom-of-screen nav li').click(function() {
        var index = $('.bottom-of-screen nav li').index(this);
        $('#main-contents__wrapper').scrollTop(0);//毎回コンテンツのトップへ移動させる

        $('.bottom-of-screen nav li').removeClass('is-selected');
        $(this).addClass('is-selected');

        $('#main-contents__wrapper section').hide();
        $('#main-contents__wrapper section').eq(index).show();

        return false;
    });

    //LP個別ページ。「このページを閉じる」ボタンを押した際に閉じていいか確認
    $('.home button').click(function closeCheck() {
        if(window.confirm('このページを閉じてもよろしいですか？')) {
            window.close();
        }
    })
});