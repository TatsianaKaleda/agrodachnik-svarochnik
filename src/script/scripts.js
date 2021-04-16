$(document).ready(function () {

    $('.catalog-slider-container-cards').slick({
        dots: true,
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 631,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 430,
                settings: {
                    slidesToShow: 1
                }
            },
        ],

        prevArrow: '<div class="catalog-slider-control-prev"><svg class="bi bi-chevron-left" width="50" height="50" viewBox="0 0 20 20" fill="#000" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"/></svg></div>',
        nextArrow: '<div class="catalog-slider-control-next"><svg class="bi bi-chevron-right" width="50" height="50" viewBox="0 0 20 20" fill="#000" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"/></svg></div>',
    })

    // Form submit
    $("form").submit(function (event) {
        event.preventDefault();

        if (typeof sessionStorage !== 'undefined') {
            if (sessionStorage.getItem('formSubmitted')) {
                if (!confirm('Вы уже отправили заявку, повторить?')) { return false }
            } else {
                sessionStorage.setItem('formSubmitted', 'true')
            }
        }
        let data = $(this).serializeArray();
        data.push({
            name: "source",
            value: "Test"
        });
        data.push({
            name: "title",
            value: "Test message"
        });
        data.push({
            name: "link",
            value: location.href
        });

        console.log(JSON.stringify(data));
        return false; // Testing

        $.ajax({
            type: "POST",
            url: "https://skidka-tut.by/action/index.php",
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            dataType: "json",
            data: data,
        }).done(function (response) {
            alert(response.text);
        }).fail(function (error, textStatus) {
            console.log(error, textStatus);
            alert('Извините, произошла ошибка запроса. Свяжитесь с менеджером по телефону!');
        });

        // Event dispatcher for IE9+ included
        if (typeof (Event) === 'function') {
            document.dispatchEvent(new Event('app.form.send'));
        } else {
            var ev = document.createEvent('Event');
            ev.initEvent('app.form.send', false, false);
            document.dispatchEvent(ev);
        }

        console.log(JSON.stringify(data));
        return false
    });
});


document.addEventListener("DOMContentLoaded", () => {
    let btn = document.querySelector(".gift");
    let form = document.querySelector(".gift-form");
    btn.addEventListener("click", function () {
        form.classList.add('show');
    })

    let timer = setTimeout(function () {
        form.classList.add('show')
    }, 8000);

    let btnClose = document.querySelector(".close-btn");
    btnClose.addEventListener("click", function () {
        form.classList.remove('show');
        clearTimeout(timer);
        timer = setTimeout( function () {
            form.classList.add('show');
        }, 40000);
    });

    try {
        // countdown
        let dateEnd = new Date();
        dateEnd.setDate(dateEnd.getDay() ? dateEnd.getDate() - dateEnd.getDay() + 8 : dateEnd.getDate() + 1);
        dateEnd.setHours(0, 0, 0);
        let countdown = new LightCountdown(".countdown-week", dateEnd, {
            animation: "animated flipInX",
            animationDuration: "600ms"
        });
    } catch (e) {
        console.error(e);
    }
});
