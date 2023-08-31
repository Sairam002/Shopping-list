const formInput = document.getElementById("item-input");
const addItem = document.getElementsByClassName("btn")[0];
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filterItems = document.getElementById("filter");


function addNewItem(e) {
    e.preventDefault();

    if (formInput.value === "" || formInput.value.trim() === "") {
        alert("Please add some item!!!");
    }
    else {
        addItemTODOM(formInput.value);
        addItemToStorage(formInput.value);
    }
    formInput.value = "";
    displayOrHideItems("initial");
}

function addItemTODOM(Item) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    let value = [];
    let array = Array.from(itemList.children);
    array.forEach(item => {
        value.push(item.innerText.toLowerCase());
    })

    if (!(value).includes(Item.toLowerCase())) {
        li.innerHTML = `${Item}<button class="remove-item btn-link text-red"><i class="fa-solid fa-xmark"></i></button>`

        ul.appendChild(li);
    }
}

function addItemToStorage(item) {

    let itemsFromStorage;

    if (localStorage.getItem("items") === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }

    itemsFromStorage.push(item);
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function onItemListClick(e) {
    if (e.target.tagName === "I") {
        e.target.parentElement.parentElement.remove();
    }

    displayOrHideItems();
}


function clearAll() {
    let array = Array.from(itemList.children);
    let userInput = prompt("Are you sure you want to delete all items? Please enter yes or no");

    if (userInput.toLowerCase() === "yes") {
        array.forEach(item => {
            item.remove();
        })
    }

    displayOrHideItems("none");
}


function displayOrHideItems() {
    if (itemList.children.length === 0) {
        filterItems.style.display = `none`;
        clearBtn.style.display = `none`;
    } else {
        filterItems.style.display = `block`;
        clearBtn.style.display = `block`;
    }
}

function onFilter(e) {
    let items = Array.from(itemList.children);
    items.forEach(item => {
        if (!(item.innerText.toLowerCase()).includes(e.target.value.toLowerCase())) {
            item.style.display = 'none'
        } else {
            item.style.display = "flex"
        }
    })
}


displayOrHideItems();


addItem.addEventListener("click", addNewItem);
itemList.addEventListener("click", onItemListClick);
clearBtn.addEventListener("click", clearAll);
filterItems.addEventListener("input", onFilter);