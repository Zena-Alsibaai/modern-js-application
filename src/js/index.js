import {
  resetForm,
  affichageWindow,
  hiddenWindow,
  getValue,
} from "./module/functions.js";
import {
  createWindow,
  heroInfo,
  template,
  target,
  url,
} from "./module/variables.js";

document
  .getElementById("createSubmit")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    getValue();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getValue()),
      });
    } catch (error) {
      console.log(error);
    }
  });

document
  .getElementById("createNewPerso")
  .addEventListener("click", function () {
    resetForm(); //affiche un formulaire vide
    affichageWindow(createWindow); //ouvre le modal sur la page
  });

document.getElementById("close-btn").addEventListener("click", () => {
  hiddenWindow(createWindow);
  document.location.reload();
});

document.getElementById("cancel").addEventListener("click", function () {
  hiddenWindow(createWindow);
});

//aller recuperer la liste de heros dans l api et l afficher, la supprimer ou la modifier
async function getData() {
  const response = await fetch(url);
  const heroes = await response.json(); //transforme le format de l'url en format json pour pouvoir le lire

  heroes.forEach(({ name, shortDescription, image, id, description }) => {
    const clone = template.cloneNode(true).content;
    const img = "data:image/jpeg;base64," + image;

    clone.querySelector(".card-img-top").src = img;
    clone.querySelector(".card-title").textContent = name;
    clone.querySelector(".card-text").textContent = shortDescription;

    clone.querySelector("#delete").addEventListener("click", async () => {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      document.location.reload();
    });

    clone.querySelector("#edit").addEventListener("click", async () => {
      affichageWindow(createWindow); //ouvre le modal sur la page

      let response = await fetch(`${url}/${id}`);
      const hero = await response.json();

      //affichage
      document.getElementById("newName").value = name;
      document.getElementById("shortDescription").value = shortDescription;
      document.getElementById("newDescription").value = description;
      console.log(hero);

      response = fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    clone.querySelector("#info-btn").addEventListener("click", async () => {
      affichageWindow(heroInfo); //ouvre le modal sur la page

      let response = await fetch(`${url}/${id}`);
      const hero = await response.json();

      //affichage

      document.getElementById("name-hero").innerHTML = hero.name;
      document.getElementById("shortDescription-hero").innerHTML =
        hero.shortDescription;
      document.getElementById("description-hero").innerHTML = hero.description;

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
