// form vide
export function resetForm() {
  document.getElementById("newName").value = "";
  document.getElementById("shortDescription").value = "";
  document.getElementById("newDescription").value = "";
  // document.getElementById("imgPreview").src = "";
  document.getElementById("newImg").value = "";
}

export function affichageWindow(window) {
  window.style.display = "block"; //modal s affiche
}

export function hiddenWindow(window) {
  window.style.display = "none"; //modal s enleve
}
export function getValue() {
  const name = document.querySelector("#newName").value;
  const shortDescription = document.querySelector("#shortDescription").value;
  const description = document.querySelector("#newDescription").value;

  let entrees = [];
  let cles = ["name", "shortDescription", "description"];
  let values = [];

  values.push(name, shortDescription, description);

  for (let i = 0; i < cles.length; i++) {
    entrees.push([cles[i], values[i]]);
  }

  const newCard = Object.fromEntries(entrees);

  return newCard;
}
