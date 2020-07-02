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
    for (let figure of figures) {
        figure.addEventListener("click", () => {
            generateSlider(figure);
        });
    }

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
            if (document.querySelector('.opacity') === null) {
                figure.classList.add('opacity');
            } else {
                figure.classList.remove('opacity');
            }
        }

    }
    

    //generate buttons in slider and change opacity
    //to choosen element
    if (figures.classList.contains('.opacity') === true) {
        figures.style.opacity = 1;
        generateButtons();
    } else generateButtons();
}