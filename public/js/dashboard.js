$(document).ready(function () {
    const lastDayBtn = $("#last-day");
    const lastWeekBtn = $("#last-week");
    const lastMonthBtn = $("#last-month");
    const totalBooks = $("#analyze-total-book");
    const totalReaders = $("#analyze-total-reader");
    const totalIssueBooks = $("#analyze-total-issue");
    const newReadersToday = $("#analyze-new-reader");
    const tableReaders = $(".new.reader table tbody");
    const tableBooks = $(".new.book table tbody")
    var data = {};
    function showDataDashboard() {
        $.ajax({
            url: "../controller/Dashboard.php",
            type: "get",
            success: function (response) {
                data = JSON.parse(response);
                console.log(data);
                totalBooks.text(data["count_book"]);
                totalReaders.text(data["count_reader"]);
                totalIssueBooks.text(data["count_issue_book"]);
                newReadersToday.text(data["count_reader_create_today"]);
                for (let i = 0; i < data["new_reader"].length; i++) {
                    tableReaders.append(
                        `<tr>
                            <td>${data["new_reader"][i]["reader_username"]}</td>
                            <td>${data["new_reader"][i]["reader_fullname"]}</td></td>
                            <td>${data["new_reader"][i]["reader_phonenumber"]}</td>
                        </tr>`
                    );
                }
                for (let i = 0; i < data["new_book"].length; i++) {
                    tableBooks.append(
                        `<tr>
                            <td>${data["new_book"][i]["book_id"]}</td>
                            <td>${data["new_book"][i]["book_name"]}</td></td>
                            <td>${data["new_book"][i]["book_author"]}</td>
                            </tr>`
                    );
                };
            },
        });
    }
    showDataDashboard();
            
    setTimeout(function() {
        var chartConfig = new Chart(document.getElementById("myChart"), {
            type: "bar",
            data: {
                labels: ["New Book", "Book Issue", "New Reader", "Expired"],
                datasets: [
                    {
                        label: "Amount",
                        data: [
                            data["new_book_date_chart"], 
                            data["new_book_issue_date_chart"], 
                            data["new_reader_date_chart"], 
                            data["expired_date_chart"]
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                responsive: true,
            },
        });
        lastDayBtn.click(function() {
            lastWeekBtn.removeClass('selected');
            lastMonthBtn.removeClass('selected');
            $(this).addClass('selected');
    
            chartConfig.data.datasets[0].data = [
                data["new_book_date_chart"], 
                data["new_book_issue_date_chart"], 
                data["new_reader_date_chart"], 
                data["expired_date_chart"]
            ]
    
            chartConfig.update();
        })
    
    
        lastWeekBtn.click(function() {
            lastDayBtn.removeClass('selected');
            lastMonthBtn.removeClass('selected');
            $(this).addClass('selected');
    
            chartConfig.data.datasets[0].data = [
                data["new_book_week_chart"], 
                data["new_book_issue_week_chart"], 
                data["new_reader_week_chart"], 
                data["expired_week_chart"]
            ]
    
            chartConfig.update();
        })
    
        lastMonthBtn.click(function() {
            lastDayBtn.removeClass('selected');
            lastWeekBtn.removeClass('selected');
            $(this).addClass('selected');
    
            chartConfig.data.datasets[0].data = [
                data["new_book_month_chart"], 
                data["new_book_issue_month_chart"], 
                data["new_reader_month_chart"], 
                data["expired_month_chart"]
            ]
    
            chartConfig.update();
        })
    }, 1000);

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
