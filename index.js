let button = document.querySelector('button');
let input = document.querySelector('input');
let container = document.querySelector('.container');
let main = document.querySelector('.main');
let header = document.querySelector('.main-header');
let footer = document.querySelector('.main-footer');

button.addEventListener("click", generateGallery);

function generateGallery() {
    if (input.files.length === 0) {
        return;
    }
    let files = input.files;

    //remove container with generate button
    container.parentNode.removeChild(container);

    //create gallery and add to main
    let gallery = document.createElement('div');
    gallery.className = "gallery";
    main.appendChild(gallery);

    //get name of inputs files and create landing
    for (let file of files) {
        let name = file.name;
        let src = URL.createObjectURL(file);
        let figure = document.createElement('figure');
        gallery.appendChild(figure);
        let figcaption = document.createElement('figcaption');

        //remove img extention
        let removeExtantion = /.+(?=\.)/;
        name = name.match(removeExtantion);

        figcaption.innerText = name;
        figure.appendChild(figcaption);
        let img = document.createElement('img');
        img.src = src;
        figure.appendChild(img);
    } 

    //generate slider
    let figures = document.querySelectorAll('figure');
    figures.forEach(e => e.addEventListener('click', () => generateSlider(e)));

    function generateSlider(figure) {
        darken();
        //add dark background
        function darken() {
            if (document.querySelector('.darken') === null) {
                main.classList.add('darken');
                header.classList.add('hidden');
                footer.classList.add('hidden');

            } else {
                main.classList.remove('darken');
                header.classList.remove('hidden');
                footer.classList.remove('hidden');
            }
        }

        for (let figure of figures) {
            if (figure.hasAttribute("style")) {
                figure.removeAttribute("style");
            } else {
                figure.setAttribute("style", "margin: 0; width: auto; position: absolute; opacity: 0;");
            }
        }
        
        //generate buttons in slider and change opacity
        //to choosen element
        if (figure.hasAttribute("style")) {
            figure.style.opacity = 1;
            generateButtons();
        } else generateButtons();

        function generateButtons() {
            if (document.querySelector(".buttons") === null) {
                let buttons = document.createElement("div");
                buttons.classList.add('buttons');
                gallery.appendChild(buttons);

                let leftButton = document.createElement("button");
                leftButton.classList.add("button", "left-button");
                let leftImg = document.createElement("img");
                leftImg.src = "img/pointing-left.svg";
                leftButton.appendChild(leftImg);
                buttons.appendChild(leftButton);
                leftButton.addEventListener('click', () => slideChanging('-'));

                let rightButton = document.createElement("button");
                rightButton.classList.add("button", "right-button");
                let rightImg = document.createElement("img");
                rightImg.src = "img/pointing-right.svg";
                rightButton.appendChild(rightImg);
                buttons.appendChild(rightButton);
                rightButton.addEventListener('click', () => slideChanging('+'));

                let closeButton = document.createElement("button");
                closeButton.classList.add("button", "close-button");
                let closedImg = document.createElement("img");
                closedImg.src = "img/closed.svg";
                closeButton.appendChild(closedImg);
                buttons.appendChild(closeButton);
                closeButton.addEventListener("click", () => generateSlider(figure));
            } else {
                let buttons = document.querySelector('.buttons');
                gallery.removeChild(buttons);
            }
        }

        function slideChanging(e) {
            figures.forEach(e => e.style.opacity = 0);

            if (e === '-') {
                if (figure === figures[0]) {
                    figure = figures[figures.length - 1];
                } else {
                    figure = figure.previousElementSibling;
                }
            } else if (e === '+') {
                if (figure === figures[figures.length - 1]) {
                    figure = figures[0];
                } else {
                    figure = figure.nextElementSibling;
                }
            }
            figure.style.opacity = 1;
        }

        //changing slides by keyboard
        document.addEventListener("keydown", (e) => {
            if (e.keyCode === 37 || e.keyCode === 189) {
              slideChanging("-");
            } else if (e.keyCode === 39 || e.keyCode === 187) {
              slideChanging("+");
            } else if (e.keyCode === 27) {
              generateSlider(figure);
            }
        });
    }
}