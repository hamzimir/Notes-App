const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function shownotes() {
    if (localStorage.getItem("notes")) {
        notesContainer.innerHTML = localStorage.getItem("notes");
        // Re-attach delete functionality to images
        attachDeleteListeners();
    }
}

function updatestorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    
    img.src = "delete.png";
    img.alt = "Delete Note";
    
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    
    // Update localStorage after creating a new note
    updatestorage();

    // Re-attach delete listeners to newly added notes
    attachDeleteListeners();
});

function attachDeleteListeners() {
    notesContainer.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") {
            e.target.parentElement.remove();
            updatestorage();
        } else if (e.target.tagName === "P") {
            notes = document.querySelectorAll(".input-box");
            notes.forEach(nt => {
                nt.onkeyup = function () {
                    updatestorage();
                };
            });
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        document.execCommand("insertLineBreak");
        e.preventDefault();
    }
});

// Initialize the notes from localStorage
shownotes();
