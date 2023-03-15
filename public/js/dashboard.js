$(document).ready(function () {
    $.ajax({
        url: "../controller/Dashboard.php",
        type: "get",
        success: function (response) {
            const data = JSON.parse(response);
            console.log(data);

            $("#analyze-total-book").text(data["count_book"]);
            $("#analyze-total-reader").text(data["count_reader"]);
            $("#analyze-total-issue").text(data["count_issue_book"]);
            $("#analyze-new-reader").text(data["count_reader_create_today"]);

            for (let i = 0; i < data["new_reader"].length; i++) {
                $(".new.reader table tbody").append(
                    `<tr>
                        <td>${data["new_reader"][i]["reader_username"]}</td>
                        <td>${data["new_reader"][i]["reader_fullname"]}</td></td>
                        <td>${data["new_reader"][i]["reader_phonenumber"]}</td>
                    </tr>`
                );
            }
            for (let i = 0; i < data["new_book"].length; i++) {
                $(".new.book table tbody").append(
                    `<tr>
                        <td>${data["new_book"][i]["book_id"]}</td>
                        <td>${data["new_book"][i]["book_name"]}</td></td>
                        <td>${data["new_book"][i]["book_author"]}</td>
                    </tr>`
                );
            }
        },
    });

    $("#menu-btn").click(function () {
        $(".sidebar").addClass("open");
    });

    $(".close-btn").click(function () {
        $(".sidebar").removeClass("open");
    });

    $(".content-sidebar a").click(function () {
        $(".content-sidebar a.active").removeClass("active");
        this.classList.add("active");
    });

    $(".theme-toggler").click(() => {
        document.body.classList.toggle("dark-theme-variables");
        this.querySelector('ion-icon[name="sunny-sharp"]').classList.toggle(
            "active"
        );
        this.querySelector('ion-icon[name="moon-sharp"]').classList.toggle(
            "active"
        );
        if ($("body").hasClass("dark-theme-variables")) {
            $("body.dark-theme-variables .top-sidebar .logo img").attr(
                "src",
                "../../public/assets/img/library-white-text.png"
            );
        } else {
            $("body .top-sidebar .logo img").attr(
                "src",
                "../../public/assets/img/library-black-text.png"
            );
        }
    });
});
