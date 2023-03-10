$(document).ready(function() {
    $('#menu-btn').click( function() {
        $('.sidebar').addClass('open');
    })

    $('.close-btn').click( function() {
        $('.sidebar').removeClass('open')
    })

    $('.content-sidebar a').click( function() {
        $('.content-sidebar a.active').removeClass("active");
        this.classList.add("active");
    })

    $('.theme-toggler').click(() => {
        document.body.classList.toggle('dark-theme-variables');
        this.querySelector('ion-icon[name="sunny-sharp"]').classList.toggle('active');
        this.querySelector('ion-icon[name="moon-sharp"]').classList.toggle('active')
        if ($('body').hasClass('dark-theme-variables')) {
            $('body.dark-theme-variables .top-sidebar .logo img').attr('src', '../../public/assets/img/library-white-text.png');
        } else {
            $('body .top-sidebar .logo img').attr('src', '../../public/assets/img/library-black-text.png')
        }
    })
})

