//Toast function
export function toast({
    title = "",
    message = "",
    type = "info",
    delay = 3000,
}) {
    const main = $("#toast");
    const icons = {
        success: "checkmark-circle-sharp",
        info: "information-circle-sharp",
        warning: "warning-sharp",
        error: "warning-sharp",
    };

    if (main) {
        main.append(`
                <div class="toast ${type}">
                    <div class="toast-icon">
                    <ion-icon name="${icons[type]}"></ion-icon>
                    </div>
                    <div class="toast-body">
                        <h3 class="toast-title">${title}</h3>
                        <p class="toast-msg">${message}</p>
                    </div>
                    <div class="toast-close">
                        <ion-icon name="close-sharp"></ion-icon>
                    </div>
                </div>`);

        const removeId = setTimeout(function () {
            $(".toast:first-child").remove();
        }, delay + 1000);

        $(".toast .toast-close").click(function () {
            $(this).parent().remove();
            clearTimeout(removeId);
        });
    }
}

export function validate(type, inputValue) {
    var result = true;
    switch(type) {
        case 'email':
            const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!(regexEmail.test(inputValue)))
                result = false;
            break;
        case 'username':
            const regexUsername = /^B\d{7}$/;
            if(!(regexUsername.test(inputValue)))
                result = false;
            break;
        case 'password':
            const regexPassword = /.{8,30}/;
            if(!(regexPassword.test(inputValue)))
                result = false;
            break;
        case 'phonenumber':
            const regexPhone = /^0\d{9}$/;
            if(!(regexPhone.test(inputValue)))
                result = false;
            break;
        case 'amount':
            const regexAmount = /\d/;
            if(!(regexAmount.test(inputValue)))
                result = false;
            break;
        case 'date':
            const regexDate = /(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/
            if(!(regexDate.test(inputValue)))
                result = false;
            break;
    } 
}
