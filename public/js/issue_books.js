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

    $.ajax({
        url: "../controller/books/IssueBooks.php",
        type: "get",
        success: function (data) {
            const response = JSON.parse(data);
            for (let row in response) {
                $("tbody").append(`<tr>
                <td>${response[row]["reader_username"]}</td>
                <td>${response[row]["book_id"]}</td>
                <td>${response[row]["issue_date"]}</td>
                <td>${response[row]["expired_date"]}</td>
                <td>${response[row]["amount"]}</td>
                <td>${response[row]["issue_status"]}</td>
                <td class="noExl">
                    <a class="edit-btn" href="#">Edit</a>
                    <a class="delete-btn" href="#">Delete</a>
                </td>
            </tr>`);
            }
        },
    });

    issueDateSearch.datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });

    expiredDateSearch.datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });

    issueDateAdd.datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });

    expiredDateAdd.datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });

    issueDateEdit.datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });

    expiredDateEdit.datepicker({
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });

    var table2excel = new Table2Excel({
        exclude: ".noExl",
        name: "Worksheet name",
        filename: "tableissue.xls",
    });

    document
        .getElementById("export-btn")
        .addEventListener("click", function (e) {
            // e.preventDefault();
            table2excel.export(document.querySelector("#table-issue-book"));
        });

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
            success: function (response) {
                location.reload();
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
            success: function (response) {
                location.reload();
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
                    console.log(response);
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
                    location.reload(true);
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
        const search_username = $('.search-box input[name="reader-username"]').val().trim();
        const search_id = $('.search-box input[name="book-id"]')
            .val()
            .trim();
        const search_issueDate = $('.search-box input[name="issue-date"]')
            .val()
            .trim();
        const search_expiredDate = $('.search-box input[name="expired-date"]')
            .val()
            .trim();
        const search_amount = $('.search-box input[name="amount"]')
            .val()
            .trim();
        const search_status = $(
            '.search-box select[name="search_status"]'
        )
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
});