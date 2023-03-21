import {toast} from './general-function.js'

$("document").ready(function () {
    const addBtn = $(".add-btn");
    const container = $(".container");
    const closeBtn = $(".close-btn");
    const boxAdd = $(".box-add");
    const addSubmit = $('input[name="add_issue_submit"]');
    const editSubmit = $('input[name="edit_issue_submit"]');
    const applyBtn = $(".apply-btn");
    const issueDateSearch = $("input[name='issue-date']");
    const expiredDateSearch = $("input[name='expired-date']");
    const issueDateAdd = $("input[name='add_issue_date']");
    const expiredDateAdd = $("input[name='add_issue_expired']");
    const issueDateEdit = $("input[name='edit_issue_date']");
    const expiredDateEdit = $("input[name='edit_issue_expired']");
    const showAllBtn = $("#show-all");
    var data = {};

    $.ajax({
        url: "../controller/books/IssueBooks.php",
        type: "get",
        success: function (response) {
            data = JSON.parse(response);
        },
    });

    function loadDataToTable(data, rowStart, rowEnd) {
        if (rowEnd > data.length) {
            rowEnd = data.length;
        }
        for (let row = rowStart - 1; row < rowEnd; row++) {
            $("tbody").append(`<tr>
                <td>${data[row]["reader_username"]}</td>
                <td>${data[row]["book_id"]}</td>
                <td>${data[row]["issue_date"]}</td>
                <td>${data[row]["expired_date"]}</td>
                <td>${data[row]["amount"]}</td>
                <td>${data[row]["issue_status"]}</td>
                <td class="noExl">
                    <a class="edit-btn" href="#">Edit</a>
                    <a class="delete-btn" href="#">Delete</a>
                </td>
            </tr>`);
        }
    }

    var table, exportData;
    setTimeout(function () {
        loadDataToTable(data, 1, 5);

        table = $("#table-issue-book").tableExport({
            formats: ["xlsx"],
            exportButtons: false,
            ignoreCols: [6],
        });

        exportData = table.getExportData()["table-issue-book"]["xlsx"];
    }, 100);

    $("#export-btn").click(function (e) {
        e.preventDefault();
        console.log(exportData);
        table.export2file(
            exportData.data,
            exportData.mimeType,
            exportData.filename,
            exportData.fileExtension
        );
        toast({
            title: 'Success',
            message: 'Export successfully.',
            type: 'success'
        })
    });

    showAllBtn.click(function (e) {
        e.preventDefault();
        var rowNumberCurrent = $("tbody tr").length;
        if (rowNumberCurrent < data.length) {
            loadDataToTable(data, rowNumberCurrent + 1, data.length);
        }
    });

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
        issueDateSearch,
        expiredDateSearch,
        issueDateAdd,
        expiredDateAdd,
        issueDateEdit,
        expiredDateEdit,
    ];
    for (let datepickerInput of datepickerInputs) {
        createDatePicker(datepickerInput);
    }

    function showModal() {
        container.addClass("open");
    }

    // function to hide modal
    function hideModal() {
        container.removeClass("open");
    }

    addBtn.click(function (e) {
        e.preventDefault();
        container.addClass("open");
        $(".box-add.edit").hide();
        $(".box-add.add").show();
    });

    addSubmit.click(function (e) {
        e.preventDefault();
        const username = $(
            '.box-add.add input[name="add_issue_username"]'
        ).val();
        const id = $('.box-add.add input[name="add_issue_id"]').val();
        const issueDate = $('.box-add.add input[name="add_issue_date"]').val();
        const expiredDate = $(
            '.box-add.add input[name="add_issue_expired"]'
        ).val();
        const amount = $('.box-add.add input[name="add_issue_amount"]').val();
        $.ajax({
            url: "../controller/books/IssueBooks.php",
            type: "post",
            data: {
                add_issue_username: username,
                add_issue_id: id,
                add_issue_date: issueDate,
                add_issue_expired: expiredDate,
                add_issue_amount: amount,
            },
            success: function (data) {
                console.log(data);
                if (data === "success") {
                    toast({
                        title: "Success",
                        message: "Add issue book successfully, please reload to see new information",
                        type: "success",
                    });
                } else {
                    toast({
                        title: "Error",
                        message: "Add issue book failed",
                        type: "error",
                    });
                }
            },
        });
    });

    editSubmit.click(function (e) {
        e.preventDefault();
        const username = $(
            '.box-add.edit input[name="edit_issue_username"]'
        ).val();
        const id = $('.box-add.edit input[name="edit_issue_id"]').val();
        const issueDate = $(
            '.box-add.edit input[name="edit_issue_date"]'
        ).val();
        const expiredDate = $(
            '.box-add.edit input[name="edit_issue_expired"]'
        ).val();
        const amount = $('.box-add.edit input[name="edit_issue_amount"]').val();
        const status = $(
            '.box-add.edit select[name="edit_issue_status"]'
        ).val();
        $.ajax({
            url: "../controller/books/IssueBooks.php",
            type: "post",
            data: {
                edit_issue_username: username,
                edit_issue_id: id,
                edit_issue_date: issueDate,
                edit_issue_expired: expiredDate,
                edit_issue_amount: amount,
                edit_issue_status: status,
            },
            success: function (data) {
                if (data === "success") {
                    location.reload();
                } else {
                    toast({
                        title: "Error",
                        message: "Edit reader failed",
                        type: "error",
                    });
                }
            },
        });
    });

    //Because .add-btn and .delete-btn doesn't working after adding by ajax, we use 'click' method with this solution
    $("tbody").on("click", ".edit-btn", function (e) {
        const tds = $(this).parent().siblings();
        if (confirm("Are you sure you want to edit?")) {
            e.preventDefault();
            showModal();
            $(".box-add.add").hide();
            $(".box-add.edit").show();
            $.ajax({
                url: "../controller/books/IssueBooks.php",
                type: "post",
                data: {
                    readerUsernameIssue: $(tds[0]).text(),
                    bookIdIssue: $(tds[1]).text(),
                },
                success: function (data) {
                    const response = JSON.parse(data);
                    $('.box-add.edit input[name="edit_issue_username"]').val(
                        response[0]
                    );
                    $('.box-add.edit input[name="edit_issue_id"]').val(
                        response[1]
                    );
                    $('.box-add.edit input[name="edit_issue_date"]').val(
                        response[2]
                    );
                    $('.box-add.edit input[name="edit_issue_expired"]').val(
                        response[3]
                    );
                    $('.box-add.edit input[name="edit_issue_amount"]').val(
                        response[4]
                    );
                    $('.box-add.edit select[name="edit_issue_status"]').val(
                        response[5]
                    );
                },
            });
        }
    });

    $("tbody").on("click", ".delete-btn", function (e) {
        const tds = $(this).parent().siblings();
        if (confirm("Are you sure you want to delete?")) {
            e.preventDefault();
            $.ajax({
                url: "../controller/books/IssueBooks.php",
                type: "post",
                data: {
                    readerUsernameDelete: $(tds[0]).text(),
                    bookIdDelete: $(tds[1]).text(),
                },
                success: function (data) {
                    console.log(data);
                    if (data === "success") {
                        location.reload();
                    } else {
                        toast({
                            title: "Error",
                            message: "Delete reader failed",
                            type: "error",
                        });
                    }
                },
            });
        }
    });

    // hide Modal when clicking close button
    closeBtn.click(hideModal);

    // hide Modal when clicking outside of modal container
    container.click(hideModal);

    //Don't hide modal when clicking inside modal container
    boxAdd.click(function (e) {
        e.stopPropagation();
    });

    applyBtn.click(function (e) {
        e.preventDefault();
        const search_username = $('.search-box input[name="reader-username"]')
            .val()
            .trim();
        const search_id = $('.search-box input[name="book-id"]').val().trim();
        const search_issueDate = $('.search-box input[name="issue-date"]')
            .val()
            .trim();
        const search_expiredDate = $('.search-box input[name="expired-date"]')
            .val()
            .trim();
        const search_amount = $('.search-box input[name="amount"]')
            .val()
            .trim();
        const search_status = $('.search-box select[name="search_status"]')
            .val()
            .trim();

        var values = [
            search_username,
            search_id,
            search_issueDate,
            search_expiredDate,
            search_amount,
            search_status,
        ];

        $("tbody").each(function () {
            $(this)
                .find("tr")
                .each(function () {
                    var result = true;
                    var td = $(this).find("td");
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
        table = $("#table-issue-book");
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

    $("#sort-value").change(function () {
        sortTable($(this).val(), $("#sort-order").val());
    });

    $("#sort-order").change(function () {
        sortTable($("#sort-value").val(), $(this).val());
    });

    $('input[name="add_issue_username"]').keyup(function () {
        $.ajax({
            url: "../controller/books/IssueBooks.php",
            type: "post",
            data: { show_add_username: $(this).val() },
            success: function (data) {
                if (data == "0") {
                    $(".show.add.reader").empty();
                    $(".show.add.reader").append(`<p>Data doesn't exist</p>`);
                } else {
                    console.log(typeof data);
                    const response = JSON.parse(data);
                    $(".show.add.reader").empty();
                    $(".show.add.reader").append(
                        `<p>Username: ${response[0]}</p>
                        <p>Full Name: ${response[1]}</p>
                        <p>Gender: ${response[2]}</p>
                        <p>Email: ${response[3]}</p>
                        <p>Address: ${response[4]}</p>
                        <p>Phone Number; ${response[5]}</p>`
                    );
                }
            },
        });
    });

    $('input[name="add_issue_id"]').keyup(function () {
        $.ajax({
            url: "../controller/books/IssueBooks.php",
            type: "post",
            data: { show_add_id: $(this).val() },
            success: function (data) {
                if (data == "0") {
                    $(".show.add.book").empty();
                    $(".show.add.book").append(`<p>Data doesn't exist</p>`);
                } else {
                    console.log(typeof data);
                    const response = JSON.parse(data);
                    $(".show.add.book").empty();
                    $(".show.add.book").append(
                        `<p>ID: ${response[0]}</p>
                        <p>Name: ${response[1]}</p>
                        <p>Author: ${response[2]}</p>
                        <p>Publisher: ${response[3]}</p>
                        <p>Category; ${response[4]}</p>
                        <p>Amount: ${response[6]}/${response[5]}</p>`
                    );
                }
            },
        });
    });
});
