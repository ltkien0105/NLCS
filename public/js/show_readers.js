import { toast } from "./general-function.js";
import { validate } from "./general-function.js";

$("document").ready(function () {
    const addBtn = $(".add-btn");
    const container = $(".container");
    const closeBtn = $(".close-btn");
    const boxAdd = $(".box-add");
    const addSubmitBtn = $('input[name="add_reader_submit"]');
    const editSubmitBtn = $('input[name="edit_reader_submit"]');
    const applyBtn = $(".apply-btn");
    const showAllBtn = $("#show-all");
    var data = {};
    var table, exportData;


    $.ajax({
        url: "../controller/readers/Readers.php",
        type: "get",
        success: function (response) {
            data = JSON.parse(response);
            loadDataToTable(data, 1, 5);
            table = $("#table-reader").tableExport({
                formats: ["xlsx"],
                exportButtons: false,
                ignoreCols: [6],
            });
    
            exportData = table.getExportData()["table-reader"]["xlsx"];
        },
    });

    function loadDataToTable(data, rowStart, rowEnd) {
        if (rowEnd > data.length) {
            rowEnd = data.length;
        }
        for (let row = rowStart - 1; row < rowEnd; row++) {
            $("tbody").append(`<tr>
                <td>${data[row]["reader_username"]}</td>
                <td>${data[row]["reader_fullname"]}</td>
                <td>${data[row]["reader_gender"]}</td>
                <td>${data[row]["reader_email"]}</td>
                <td>${data[row]["reader_address"]}</td>
                <td>${data[row]["reader_phonenumber"]}</td>
                <td class="noExl">
                    <a class="edit-btn" href="#">Edit</a>
                    <a class="delete-btn" href="#">Delete</a>
                </td>
            </tr>`);
        }
    }

    $("#export-btn").click(function (e) {
        e.preventDefault();
        table.export2file(
            exportData.data,
            exportData.mimeType,
            exportData.filename,
            exportData.fileExtension
        );
        toast({
            title: "Success",
            message: "Export successfully",
            type: "success",
        });
    });

    showAllBtn.click(function (e) {
        e.preventDefault();
        var rowNumberCurrent = $("tbody tr").length;
        if (rowNumberCurrent < data.length) {
            loadDataToTable(data, rowNumberCurrent + 1, data.length);
        }
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

    const inputAddReader = $(".box-add.add input");
    inputAddReader.each(function(index) {
        $(this).focus(function() {
            $(this).parent().find("p").text("");
        })
        $(this).blur(function() {
            if($(this).val() == '') {
                $(this).parent().find("p").append("<ion-icon name='alert-circle-sharp'></ion-icon>This field is required!");
            } else { 
                if(validate($(this).attr("validate"), $(this).val())) {
                    $(this).parent().find("p").append(validate($(this).attr("validate"), $(this).val()));
                }
            }
        })
    })

    addSubmitBtn.click(function (e) {
        e.preventDefault();
        const username = $('.box-add.add input[name="username"]').val().trim();
        const password = $('.box-add.add input[name="password"]').val().trim();
        const fullname = $('.box-add.add input[name="fullname"]').val().trim();
        const gender = $('.box-add.add select[name="gender"]').val().trim();
        const email = $('.box-add.add input[name="email"]').val().trim();
        const address = $('.box-add.add input[name="address"]').val().trim();
        const phoneNumber = $('.box-add.add input[name="phonenumber"]')
            .val()
            .trim();
        
        var isValid = true;
        $('.box-add.add p').each(function() {
            if($(this).text() != '') {
                isValid = false;
            }
        })
        console.log(isValid);
        if(isValid) {
            $.ajax({
                url: "../controller/readers/Readers.php",
                type: "post",
                data: {
                    add_username: username,
                    add_password: password,
                    add_fullname: fullname,
                    add_gender: gender,
                    add_email: email,
                    add_address: address,
                    add_phoneNumber: phoneNumber,
                },
                success: function (data) {
                    if (data === "success") {
                        toast({
                            title: "Success",
                            message: `Add reader ${fullname}(${username}) successfully, please reload to see new information`,
                            type: "success",
                        });
                    } else {
                        toast({
                            title: "Error",
                            message: "Add reader failed",
                            type: "error",
                        });
                    }
                },
            });
        }
    });

    const inputEditReader = $(".box-add.edit input");
    inputEditReader.each(function(index) {
        $(this).focus(function() {
            $(this).parent().find("p").text("");
        })
        $(this).blur(function() {
            if($(this).val() == '') {
                $(this).parent().find("p").append("<ion-icon name='alert-circle-sharp'></ion-icon>This field is required!");
            } else { 
                if(validate($(this).attr("validate"), $(this).val())) {
                    $(this).parent().find("p").append(validate($(this).attr("validate"), $(this).val()));
                }
            }
        })
    })

    editSubmitBtn.click(function (e) {
        e.preventDefault();
        const username = $('.box-add.edit input[name="username"]').val().trim();
        const fullname = $('.box-add.edit input[name="fullname"]').val().trim();
        const gender = $('.box-add.edit select[name="gender"]').val().trim();
        const email = $('.box-add.edit input[name="email"]').val().trim();
        const address = $('.box-add.edit input[name="address"]').val().trim();
        const phoneNumber = $('.box-add.edit input[name="phonenumber"]')
            .val()
            .trim();

        var isValid = true;
        $('.box-add.edit p').each(function() {
            if($(this).text() != '') {
                isValid = false;
            }
        })

        if(isValid) {
            $.ajax({
                url: "../controller/readers/Readers.php",
                type: "post",
                data: {
                    edit_username: username,
                    edit_fullname: fullname,
                    edit_gender: gender,
                    edit_email: email,
                    edit_address: address,
                    edit_phoneNumber: phoneNumber,
                },
                success: function (data) {
                    if (data === "success") {
                        toast({
                            title: "Success",
                            message:
                                `Edit reader ${fullname}(${username}) successfully, please reload to see new information`,
                            type: "success",
                        });
                    } else {
                        toast({
                            title: "Error",
                            message: `Edit reader ${fullname}(${username}) failed`,
                            type: "error",
                        });
                    }
                },
            });
        }
    });

    //Because .add-btn and .delete-btn doesn't working after adding by ajax, we use 'click' method with this solution
    $("tbody").on("click", ".edit-btn", function (e) {
        const tds = $(this).parent().siblings();
        const username = $(tds[0]).text();
        if (confirm("Are you sure you want to edit?")) {
            e.preventDefault();
            showModal();
            $(".box-add.add").hide();
            $(".box-add.edit").show();
            $.ajax({
                url: "../controller/readers/Readers.php",
                type: "post",
                data: { usernameEdit: username },
                success: function (data) {
                    const response = JSON.parse(data);
                    $('.box-add.edit input[name="username"]').val(response[0]);
                    $('.box-add.edit input[name="fullname"]').val(response[1]);
                    $('.box-add.edit select[name="gender"]').val(response[2]);
                    $('.box-add.edit input[name="email"]').val(response[3]);
                    $('.box-add.edit input[name="address"]').val(response[4]);
                    $('.box-add.edit input[name="phonenumber"]').val(
                        response[5]
                    );
                },
            });
        }
    });

    $("tbody").on("click", ".delete-btn", function (e) {
        const tds = $(this).parent().siblings();
        const tr = $(this).parent().parent();
        const username = $(tds[0]).text();
        const fullname = $(tds[1]).text();
        if (confirm("Are you sure you want to delete?")) {
            e.preventDefault();
            $.ajax({
                url: "../controller/readers/Readers.php",
                type: "post",
                data: { usernameDelete: username },
                success: function (data) {
                    if (data === "success") {
                        tr.remove();
                        toast({
                            title: "Success",
                            message: `Reader ${fullname}(${username}) has been deleted`,
                            type: "success",
                        });
                    } else if(data === "isIssue") {
                        toast({
                            title: "Info",
                            message: `Reader ${fullname}(${username}) is borrowing book, so you can't delete`,
                            type: "info",
                        });
                    } else {
                        toast({
                            title: "Error",
                            message: `Delete reader ${fullname}(${username}) failed`,
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
        const search_username = $('.search-box input[name="search_username"]')
            .val()
            .trim();
        const search_fullname = $('.search-box input[name="search_fullname"]')
            .val()
            .trim();
        const search_gender = $(
            '.search-box select[name="search_gender"]'
        ).val();
        const search_address = $('.search-box input[name="search_address"]')
            .val()
            .trim();
        const search_email = $('.search-box input[name="search_email"]')
            .val()
            .trim();
        const search_phonenumber = $(
            '.search-box input[name="search_phonenumber"]'
        )
            .val()
            .trim();

        var values = [
            search_username,
            search_fullname,
            search_gender,
            search_address,
            search_email,
            search_phonenumber,
        ];

        $("tbody").each(function () {
            $(this)
                .find("tr")
                .each(function () {
                    var result = true;
                    var td = $(this).find("td");
                    for (let i = 0; i < values.length; i++) {
                        if (values[i] == null || values[i] == "") {
                            continue;
                        }
                        if (i == 2) {
                            if (!($(td[i]).text() === values[i])) {
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
        table = $("#table-reader");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.find("tbody tr");
            for (i = 0; i < rows.length; i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("td")[columnIndex];
                y = rows[i + 1].getElementsByTagName("td")[columnIndex];
                if (order == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (order == "des") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
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

    $("#test").click(function () {
        toast({
            title: "Success",
            message: "Add reader successfully",
            type: "success",
        });
    });
});
