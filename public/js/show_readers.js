$('document').ready(function() {
    const deleteBtn = $('.delete-btn');
    const addBtn = $('.add-btn');
    const container = $('.container');
    const closeBtn = $('.close-btn');
    const boxAdd = $('.box-add');
    const editBtn = $('.edit-btn');
    const addSubmit = $('input[name="add_reader_submit"]');
    const editSubmit = $('input[name="edit_reader_submit"]');

    $.ajax({
        url: '../controller/readers/Readers.php',
        type: 'get',
        success: function(data) {
            const response = JSON.parse(data);
            for(let row in response) {
                $('tbody').append(`<tr>
                <td>${response[row]['reader_username']}</td>
                <td>${response[row]['reader_fullname']}</td>
                <td>${response[row]['reader_gender']}</td>
                <td>${response[row]['reader_email']}</td>
                <td>${response[row]['reader_address']}</td>
                <td>${response[row]['reader_phonenumber']}</td>
                <td>
                    <a class="edit-btn" href="#">Edit</a>
                    <a class="delete-btn" href="#">Delete</a>
                </td>
            </tr>`);
            }
        }
    })

    function showModal() {
        container.addClass('open');
    }

    // function to hide modal
    function hideModal() {
        container.removeClass('open');
    }

    addBtn.click(function(e) {
        e.preventDefault();
        container.addClass('open');
        $('.box-add.edit').hide();
        $('.box-add.add').show();
    })

    addSubmit.click(function(e) {
        e.preventDefault();
        const username = $('.box-add.add input[name="username"]').val();
        const password = $('.box-add.add input[name="password"]').val();
        const fullname = $('.box-add.add input[name="fullname"]').val();
        const gender = $('.box-add.add select[name="gender"]').val();
        const email = $('.box-add.add input[name="email"]').val();
        const address = $('.box-add.add input[name="address"]').val();
        const phoneNumber = $('.box-add.add input[name="phonenumber"]').val();
        $.ajax({
            url: '../controller/readers/Readers.php',
            type: 'post',
            data: {
                add_username: username,
                add_password: password,
                add_fullname: fullname,
                add_gender: gender,
                add_email: email,
                add_address: address,
                add_phoneNumber: phoneNumber
            },
            success: function(response) {
                location.reload()
            }
        })
    })

    editSubmit.click(function(e) {
        e.preventDefault();
        const username = $('.box-add.edit input[name="username"]').val();
        const fullname = $('.box-add.edit input[name="fullname"]').val();
        const gender = $('.box-add.edit select[name="gender"]').val();
        const email = $('.box-add.edit input[name="email"]').val();
        const address = $('.box-add.edit input[name="address"]').val();
        const phoneNumber = $('.box-add.edit input[name="phonenumber"]').val();
        $.ajax({
            url: '../controller/readers/Readers.php',
            type: 'post',
            data: {
                edit_username: username,
                edit_fullname: fullname,
                edit_gender: gender,
                edit_email: email,
                edit_address: address,
                edit_phoneNumber: phoneNumber
            },
            success: function() {
                location.reload(true);
            }
        })
    })

    //Because .add-btn and .delete-btn doesn't working after adding by ajax, we use 'click' method with this solution
    $('tbody').on('click', '.edit-btn', function(e) {
        const tds = $(this).parent().siblings();
        if(confirm("Are you sure you want to edit?")) {
            e.preventDefault();
            showModal();
            $('.box-add.add').hide();
            $('.box-add.edit').show();
            $.ajax({
                url: '../controller/readers/Readers.php',
                type: 'post',
                data: {usernameEdit: $(tds[0]).text()},
                success: function(data) {
                    const response = JSON.parse(data);
                    $('.box-add.edit input[name="username"]').val(response[0]);
                    $('.box-add.edit input[name="fullname"]').val(response[1]);
                    $('.box-add.edit select[name="gender"]').val(response[2]);
                    $('.box-add.edit input[name="email"]').val(response[3]);
                    $('.box-add.edit input[name="address"]').val(response[4]);
                    $('.box-add.edit input[name="phonenumber"]').val(response[5]);
                }
            })
        }
    })

    
    
    $('tbody').on('click', '.delete-btn', function(e) {
        const tds = $(this).parent().siblings();
        if(confirm("Are you sure you want to delete?")) {
            e.preventDefault();
            $.ajax({
                url: '../controller/readers/Readers.php',
                type: 'post',
                data: {usernameDelete: $(tds[0]).text()},
                success: function(data) {
                    location.reload(true);
                }
            })
        }
    })

    // hide Modal when clicking close button
    closeBtn.click(hideModal)

    // hide Modal when clicking outside of modal container
    container.click(hideModal)

    //Don't hide modal when clicking inside modal container
    boxAdd.click(function(e) {
        e.stopPropagation();
    })
})