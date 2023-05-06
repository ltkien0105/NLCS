$("document").ready(function() {
    const posUsername = location.href.indexOf('?u=');
    const issue_username = location.href.slice(posUsername + 3);
    const showAllBtn = $("#show-all");
    const applyBtn = $(".apply-btn");
    const myProfileLink = $(".profile-sidebar");
    var data = {};

    myProfileLink.attr("href", `./reader-profile.html?u=${issue_username}`);

    function createDatePicker(element) {
        element.datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            selectOtherMonths: true,
        });
    }

    var datepickerInputs = [
        $('.search-box input[name="search-issue"]'),
        $('.search-box input[name="search-expired"]')
    ];
    for (let datepickerInput of datepickerInputs) {
        createDatePicker(datepickerInput);
    }

    function loadDataToTable(data, rowStart, rowEnd) {
        if (rowEnd > data.length) {
            rowEnd = data.length;
        }
        if (data.length == undefined) {
            rowEnd = 1;
        }
        for (let row = rowStart - 1; row < rowEnd; row++) {
            $("tbody").append(`<tr>
                <td>${data[row]["book_id"]}</td>
                <td>${data[row]["book_name"]}</td>
                <td>${data[row]["issue_date"]}</td>
                <td>${data[row]["expired_date"]}</td>
                <td>${data[row]["amount"]}</td>
                <td>${data[row]["issue_status"]}</td>
            </tr>`);
        }
    }

    $.ajax({
        url: "../controller/Profile.php",
        type: "post",
        data: {issueUsername: issue_username},
        success: function (response) {
            data = JSON.parse(response);
            
            loadDataToTable(data, 1, 5);
        },
    });

    showAllBtn.click(function (e) {
        e.preventDefault();
        var rowNumberCurrent = $("tbody tr").length;
        if (rowNumberCurrent < data.length) {
            loadDataToTable(data, rowNumberCurrent + 1, data.length);
        }
    });

    applyBtn.click(function (e) {
        e.preventDefault();
        const search_id = $('.search-box input[name="search-id"]')
            .val() 
        const search_name = $('.search-box input[name="search-name"]').val();
        const search_issueDate = $('.search-box input[name="search-issue"]')
            .val();
        const search_expiredDate = $('.search-box input[name="search-expired"]')
            .val();
        const search_amount = $('.search-box input[name="search-issue-amount"]')
            .val();
        const search_status = $('.search-box select[name="search-status"]')
            .val();

        var values = [
            search_id,
            search_name,
            search_issueDate,
            search_expiredDate,
            search_amount,
            search_status,
        ];

        console.log(values);

        $("tbody").each(function () {
            $(this)
                .find("tr")
                .each(function () {
                    var result = true;
                    td = $(this).find("td");
                    for (let i = 0; i < values.length; i++) {
                        if (
                            !$(td[i])
                                .text()
                                .toLowerCase()
                                .includes(values[i].toLowerCase())
                        ) {
                            result = false;
                        }
                    }
                    $(this).toggle(result);
                });
        });
    });

    //Sort
    function sortTable(columnIndex, order) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = $("#table-issue");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.find("tbody tr");
            for (i = 0; i < rows.length; i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("td")[columnIndex];
                y = rows[i + 1].getElementsByTagName("td")[columnIndex];
                if (columnIndex == 2 || columnIndex == 3) {
                    const dayX = x.innerHTML.split("/")[0];
                    const monthX = x.innerHTML.split("/")[1];
                    const yearX = x.innerHTML.split("/")[2];

                    const dayY = y.innerHTML.split("/")[0];
                    const monthY = y.innerHTML.split("/")[1];
                    const yearY = y.innerHTML.split("/")[2];

                    const dateX = new Date(yearX, monthX, dayX);
                    const dateY = new Date(yearY, monthY, dayY);
                    if (order == "asc") {
                        if (dateX > dateY) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (order == "des") {
                        if (dateX < dateY) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                } else {
                    if (order == "asc") {
                        if (
                            x.innerHTML.toLowerCase() >
                            y.innerHTML.toLowerCase()
                        ) {
                            shouldSwitch = true;
                            console.log(`${x.innerHTML} -> ${y.innerHTML}`);
                            break;
                        }
                    } else if (order == "des") {
                        if (
                            x.innerHTML.toLowerCase() <
                            y.innerHTML.toLowerCase()
                        ) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }

    $('#sort-value').change(function() {
        sortTable($(this).val(), $('#sort-order').val());
    })
    
    $('#sort-order').change(function() {
        sortTable($('#sort-value').val(), $(this).val());
    })
})