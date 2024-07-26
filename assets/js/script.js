const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
const modeSwitch = body.querySelector(".toggle-switch");
const modeText = body.querySelector(".mode-text");
const sections = document.querySelectorAll('.content-section');
const links = document.querySelectorAll('nav a');

function showSection(sectionId) {
    sections.forEach(section => {
        if (section.id === sectionId.replace('#', '')) {
            section.classList.add('active');
        } else {
            console.log(section)
            section.classList.remove('active');
        }
    });
}

links.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const page = this.getAttribute('data-page');
        showSection(page);
    });
});

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
})

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if(body.classList.contains("dark")) {
        modeText.innerText = "Light Mode"
    } else {
        modeText.innerText = "Dark Mode"
    }
})

function copyText(cardId) {
    let card = document.getElementById(cardId).querySelector(".card__desc");
    let copyCard = card.innerText.trim().replace(/^["']|["']$/g, '');
    let range = document.createRange();
    range.selectNode(card);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        document.execCommand('copy');
        window.getSelection().removeAllRanges();

        showAlert("Texto copiado: " + copyCard);
    } catch (err) {
        console.log("Erro ao copiar texto: ", err);
    }
}

function showAlert() {
    var alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = 'Copiado';
    document.body.appendChild(alertBox);

    alertBox.classList.add('show');

    setTimeout(function () {
        alertBox.classList.remove('show');
        setTimeout(function () {
            alertBox.remove();
        }, 300);
    }, 1000);
}

function openModal(cardId) {
    let modal = document.getElementById('myModal');
    let textarea = document.getElementById("editQuote");
    let storedText = localStorage.getItem(cardId) || '';

    textarea.value = storedText || document.getElementById(cardId).querySelector('.card__desc').innerText;
    modal.setAttribute('data-editing', cardId);
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function saveChanges() {
    var modal = document.getElementById('myModal');
    var textarea = document.getElementById('editQuote');
    var elementId = modal.getAttribute('data-editing');

    if (elementId) {
        var quoteElement = document.getElementById(elementId).querySelector('.card__desc');
        quoteElement.innerText = textarea.value;

        // Salva os dados no localStorage
        localStorage.setItem(elementId, textarea.value);

        closeModal();
        // Carrega novamente os dados salvos
        loadSavedData();
    }
}

// Adicione a função loadSavedData() ao final do script.js
function loadSavedData() {
    // Itera sobre os elementos com a classe 'card' e carrega os dados salvos
    document.querySelectorAll('.card').forEach(function (card) {
        var cardId = card.id;
        var savedData = localStorage.getItem(cardId);

        if (savedData !== null) {
            card.querySelector('.card__desc').innerText = savedData;
        }
    });
}

// Chama a função loadSavedData() quando a página é carregada
document.addEventListener('DOMContentLoaded', function () {
    loadSavedData();
});

// Rolamento suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

showSection('fraseologia');
