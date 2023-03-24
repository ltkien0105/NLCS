import { toast } from "./general-function.js";

$("document").ready(function () {
    const addBtn = $(".add-btn");
    const container = $(".container");
    const closeBtn = $(".close-btn");
    const boxAdd = $(".box-add");
    const addSubmit = $('input[name="add_book_submit"]');
    const editSubmit = $('input[name="edit_book_submit"]');
    const applyBtn = $(".apply-btn");
    const showAllBtn = $("#show-all");
    var data = {};

    $.ajax({
        url: "../controller/books/Books.php",
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
                <td>${data[row]["book_id"]}</td>
                <td>${data[row]["book_name"]}</td>
                <td>${data[row]["book_author"]}</td>
                <td>${data[row]["book_publisher"]}</td>
                <td>${data[row]["book_category"]}</td>
                <td>${data[row]["book_remaining_amount"]}/${data[row]["book_total_amount"]}</td>
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

        table = $("#table-book").tableExport({
            formats: ["xlsx"],
            exportButtons: false,
            ignoreCols: [6],
        });

        exportData = table.getExportData()["table-book"]["xlsx"];
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
        const name = $('.box-add.add input[name="add_book_name"]').val();
        const author = $('.box-add.add input[name="add_book_author"]').val();
        const publisher = $(
            '.box-add.add input[name="add_book_publisher"]'
        ).val();
        const category = $(
            '.box-add.add input[name="add_book_category"]'
        ).val();
        const totalAmount = $(
            '.box-add.add input[name="add_book_total_amount"]'
        ).val();
        $.ajax({
            url: "../controller/books/Books.php",
            type: "post",
            data: {
                add_book_name: name,
                add_book_author: author,
                add_book_publisher: publisher,
                add_book_category: category,
                add_book_total_amount: totalAmount,
            },
            success: function (data) {
                console.log(data);
                if (data === "success") {
                    toast({
                        title: "Success",
                        message: "Add book successfully, please reload to see new information",
                        type: "success",
                    });
                } else {
                    toast({
                        title: "Error",
                        message: "Add reader failed",
                        type: "error",
                    });
                }},
        });
    });

    editSubmit.click(function (e) {
        e.preventDefault();
        const id = $('.box-add.edit input[name="edit_book_id"]').val();
        const name = $('.box-add.edit input[name="edit_book_name"]').val();
        const author = $('.box-add.edit input[name="edit_book_author"]').val();
        const publisher = $(
            '.box-add.edit input[name="edit_book_publisher"]'
        ).val();
        const category = $(
            '.box-add.edit input[name="edit_book_category"]'
        ).val();
        const amountAdded = $(
            '.box-add.edit input[name="edit_amount_added"]'
        ).val();
        $.ajax({
            url: "../controller/books/Books.php",
            type: "post",
            data: {
                edit_book_id: id,
                edit_book_name: name,
                edit_book_author: author,
                edit_book_publisher: publisher,
                edit_book_category: category,
                edit_book_amount_added: amountAdded,
            },
            success: function (data) {
                if (data === "success") {
                    location.reload();
                } else {
                    toast({
                        title: "Error",
                        message: "Add reader failed",
                        type: "error",
                    });
                }},
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
                url: "../controller/books/Books.php",
                type: "post",
                data: { bookIdEdit: $(tds[0]).text() },
                success: function (data) {
                    const response = JSON.parse(data);
                    $('.box-add.edit input[name="edit_book_id"]').val(
                        response[0]
                    );
                    $('.box-add.edit input[name="edit_book_name"]').val(
                        response[1]
                    );
                    $('.box-add.edit input[name="edit_book_author"]').val(
                        response[2]
                    );
                    $('.box-add.edit input[name="edit_book_publisher"]').val(
                        response[3]
                    );
                    $('.box-add.edit input[name="edit_book_category"]').val(
                        response[4]
                    );
                    $('.box-add.edit input[name="edit_amount_added"]').val(0);
                },
            });
        }
    });

    $("tbody").on("click", ".delete-btn", function (e) {
        const tds = $(this).parent().siblings();
        if (confirm("Are you sure you want to delete?")) {
            e.preventDefault();
            $.ajax({
                url: "../controller/books/Books.php",
                type: "post",
                data: { bookIdDelete: $(tds[0]).text() },
                success: function (data) {
                    if (data === "success") {
                        location.reload();
                    } else if(data === "isIssue") {
                        toast({
                            title: "Info",
                            message: "This book is being borrowed, so you can't delete",
                            type: "info",
                        });
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
        const search_id = $('.search-box input[name="book_id"]').val().trim();
        const search_name = $('.search-box input[name="book_name"]')
            .val()
            .trim();
        const search_author = $('.search-box input[name="book_author"]')
            .val()
            .trim();
        const search_publisher = $('.search-box input[name="book_publisher"]')
            .val()
            .trim();
        const search_category = $('.search-box input[name="book_category"]')
            .val()
            .trim();
        const search_totalAmount = $(
            '.search-box input[name="book_total_amount"]'
        )
            .val()
            .trim();

        var values = [
            search_id,
            search_name,
            search_author,
            search_publisher,
            search_category,
            search_totalAmount,
        ];

        $("tbody").each(function () {
            $(this)
                .find("tr")
                .each(function () {
                    var result = true;
                    var td = $(this).find("td");
                    const splashPos = $(td[5]).text().indexOf("/");
                    const totalAmount = $(td[5])
                        .text()
                        .slice(splashPos + 1);
                    for (let i = 0; i < values.length; i++) {
                        if (i == 5) {
                            if (!totalAmount.includes(values[i])) {
                                result = false;
                            }
                        } else {
                            if (
                                !$(td[i])
                                    .text()
                                    .toLowerCase()
                                    .includes(values[i].toLowerCase())
                            ) {
                                result = false;
                            }
                        }
                    }
                    $(this).toggle(result);
                });
        });
    });

    //Sort
    function sortTable(columnIndex, order) {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = $("#table-book");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.find("tbody tr");
            for (i = 0; i < rows.length; i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("td")[columnIndex];
                y = rows[i + 1].getElementsByTagName("td")[columnIndex];
                if (columnIndex == 5) {
                    const splashPosX = x.innerHTML.indexOf("/");
                    const totalAmountX = x.innerHTML.slice(splashPosX + 1);
                    const splashPosY = y.innerHTML.indexOf("/");
                    const totalAmountY = y.innerHTML.slice(splashPosY + 1);
                    if (order == "asc") {
                        if (totalAmountX > totalAmountY) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (order == "des") {
                        if (totalAmountX < totalAmountY) {
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
});
