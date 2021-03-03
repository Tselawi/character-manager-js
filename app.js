


async function myData(){ // to let the photos work proprely

    const tpl = document.querySelector("#template-card");
    const target = document.querySelector("#target");
    const response = await fetch(`https://character-database.becode.xyz/characters`);
    const chara = await response.json();
    // console.log(chara);

    chara.forEach(({ name, image, shortDescription, id }) => {
        // console.log(name)
        // console.log(shortDescription)
        // console.log(image)
        const elt = tpl.cloneNode(true).content;
        //console.log(elt)
        elt.querySelector(".name-character").innerText = name;
        elt.querySelector(".name-character").innerText = id;
        elt.querySelector(".shortdisc-character").innerText = shortDescription;
        elt.querySelector(".charImg")
        .setAttribute('src', 'data:image/png;base64,' + image);
        //elt.querySelector(".shortdisc-character").innerText = shortDescription.join(", ");
        

        target.appendChild(elt);
        

    });
}
myData();


    // document.querySelector("#detail").addEventListener('click', ()=>{
    //     function openwindow () {
    //          let win=window.open("","","width=600,height=400");
    //         win.style.opacity=0.5;
    //         //setTimeout(function () { win.close();}, 5000);
    //      }
    //      openwindow();
    // });
  
    document.addEventListener('click', ()=>{
        document.querySelector("#new-window").style.display="block";
        // document.querySelector('#new-window').style.display='none';
        let closeWin= document.querySelector('.close');
        closeWin.addEventListener("click", ()=>{
            //    console.log(closeWin)
             document.querySelector("#new-window").style.opacity="0";
            });
        });

        // to open load the image

        const fileSelector = document.getElementById('file-selector');
        fileSelector.addEventListener('change', (event) => {
          const fileList = event.target.files;
          console.log(fileList);
        });

      // submit the data to JSON
        const inputs = Array.from(document.querySelectorAll("input"));
        document.querySelector("#run").addEventListener("click", async () => {
            const values = inputs.map(({value}) => value.trim());
            // console.log(values)
            if (values.some((value) => value === "")) {
                console.error("There's an empty input!");
                return;
            }
            
            //const [ description, shortDescription, name, image ] = values;
            const [ name, shortDescription, image, description  ] = values;
            console.log(values)
            const response = await fetch(`https://character-database.becode.xyz/characters`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    shortDescription,
                    //  image,
                    description

                }),
                
            });
            // console.log(values)
            const freshHero = await response.json();
             console.log(freshHero);
        
        });
   