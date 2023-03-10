const deleteBtn = document.querySelector('.delete-btn');
const addBtn = document.querySelector('.add-btn');
const container = document.querySelector('.container');
const closeBtn = document.querySelector('.close-btn');
const boxAdd = document.querySelector('.box-add');

function showModal() {
    container.classList.add('open')
}

// function to hide modal
function hideModal() {
    container.classList.remove('open')
}

if(location.href.includes("&id=add")) {
    showModal();
}

addBtn.onclick = function(e) {
    e.preventDefault();
    location.href = 'show_customer.php?controller=users&action=list&id=add';
}

deleteBtn.onclick = function() {
    return confirm("Are you sure you want to delete?");
};

// hide Modal when clicking close button
closeBtn.addEventListener('click', hideModal)

// hide Modal when clicking outside of modal container
container.addEventListener('click', hideModal)

//Don't hide modal when clicking inside modal container
boxAdd.addEventListener('click', function (event) {
    event.stopPropagation()
})