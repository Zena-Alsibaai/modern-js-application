// import {
//   resetForm,
//   affichageWindow,
//   hiddenWindow,
// } from "./modules/functions.js";

(() => {
  // ==============================La déclaration des variables=====================
  const createWindow = document.getElementById("id01"); // on passe le modal en variable
  const heroInfo = document.getElementById("info-hero");
  const template = document.querySelector("#template");
  const target = document.querySelector("#target");
  const url = "https://character-database.becode.xyz/characters";

  // ========================Button foctions=================================

  // button envoyer le new super hero à l'API
  // form vide
  function resetForm() {
    document.getElementById("newName").value = "";
    document.getElementById("shortDescription").value = "";
    document.getElementById("newDescription").value = "";
    // document.getElementById("imgPreview").src = "";
    document.getElementById("newImg").value = "";
  }
  //modal s affiche
  function affichageWindow(window) {
    window.style.display = "block";
  }
  //modal s enleve
  function hiddenWindow(window) {
    window.style.display = "none";
  }

  function getValue() {
    const name = document.querySelector("#newName").value;
    const shortDescription = document.querySelector("#shortDescription").value;
    const description = document.querySelector("#newDescription").value;
    const image = document.querySelector("#imgPreview").src;
    // console.log(image);

    let entrees = [];
    let cles = ["name", "shortDescription", "description", "image"];
    let values = [];

    values.push(name, shortDescription, description, image);

    for (let i = 0; i < cles.length; i++) {
      entrees.push([cles[i], values[i]]);
    }

    const newCard = Object.fromEntries(entrees);

    return newCard;
  }
  document
    .getElementById("createSubmit")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      getValue();
      console.log(getValue());

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getValue()),
        });
        //const freshHero = await response.json();
      } catch (error) {
        console.log(error);
      }
    });
  // button créer super hero
  document
    .getElementById("createNewPerso")
    .addEventListener("click", function () {
      resetForm(); //affiche un formulaire vide
      affichageWindow(createWindow); //ouvre le modal sur la page
    });
  // button fermer le modal
  document.getElementById("close-btn").addEventListener("click", () => {
    hiddenWindow(createWindow);
    document.location.reload();
  });
  // button annuler
  document.getElementById("cancel").addEventListener("click", function () {
    hiddenWindow(createWindow);
  });
  // ========================La fonction principale=================================

  //aller recuperer la liste de heros dans l api et l afficher, la supprimer ou la modifier
  async function getData() {
    const response = await fetch(url);
    const heroes = await response.json(); //transforme le format de l'url en format json pour pouvoir le lire

    console.log(heroes);

    heroes.forEach(({ name, shortDescription, image, id, description }) => {
      const clone = template.cloneNode(true).content;
      const img = "data:image/jpeg;base64," + image;

      clone.querySelector(".card-img-top").src = img;
      clone.querySelector(".card-title").textContent = name;
      clone.querySelector(".card-text").textContent =
        shortDescription + description;

      clone.querySelector("#delete").addEventListener("click", async () => {
        console.log(id);
        const response = await fetch(`${url}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        document.location.reload();
      });

      clone.querySelector("#edit").addEventListener("click", async () => {
        //console.log(id)
        affichageWindow(createWindow); //ouvre le modal sur la page

        let response = await fetch(`${url}/${id}`);
        const hero = await response.json();

        //affichage
        document.getElementById("newName").value = name;
        document.getElementById("shortDescription").value = shortDescription;
        document.getElementById("newDescription").value = description;
        response = fetch(`${url}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
      });

      clone.querySelector("#info-btn").addEventListener("click", async () => {
        affichageWindow(heroInfo); //ouvre le modal sur la page
        console.log(name);
        let response = await fetch(`${url}/${id}`);
        const hero = await response.json();

        //affichage
        document.getElementById("name-hero").value = name;
        document.getElementById(
          "shortDescription-hero"
        ).value = shortDescription;

        document.getElementById("description-hero").value = description;

        response = fetch(`${url}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
      target.appendChild(clone);
    });
  }
  getData();
})();
