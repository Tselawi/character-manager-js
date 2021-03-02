


document.addEventListener('DOMContentLoaded', async () => { // to let the photos work proprely

    const tpl = document.querySelector("#template-card");
    const target = document.querySelector("#target");
    const response = await fetch(`https://character-database.becode.xyz/characters`);
    const chara = await response.json();
    console.log(chara);

    chara.forEach(({ name, image, shortDescription }) => {
        console.log(name)
        console.log(shortDescription)
        console.log(image)
        const elt = tpl.cloneNode(true).content;
        //console.log(elt)
        elt.querySelector(".name-character").innerText = name;
        elt.querySelector(".image-character").innerText = image;
        // elt.querySelector(".shortdisc-character").innerText = shortDescription.join(", ");
        elt.querySelector(".shortdisc-character").innerText = shortDescription;

        target.appendChild(elt);

    });

    document.querySelectorAll('#detail').addEventListener('click', ()=>{
        function openwindow () {
             let win=window.open("","","width=600,height=400");
            win.style.opacity=0.5;
            //setTimeout(function () { win.close();}, 5000);
         }
         openwindow();
    });

});