const productId = new URLSearchParams(window.location.search).get("productID");
const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";
const myKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjQwYWMwMzRmZjAwMTQwM2Y1NmYiLCJpYXQiOjE2OTI5NTE1NjIsImV4cCI6MTY5NDE2MTE2Mn0.WzUEH9dUMb6Rhhvrm-VSLjHN5UujsM0u6efWoRms0A4";

const container = document.querySelector(".container .row");

const redirectMe = () => {
  const timer = setTimeout(function () {
    window.location.href = "index.html";
    window.clearTimeout(timer);
  }, 1000);
};

const clearInput = () => {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("imageUrl").value = "";
  document.getElementById("price").value = "";
};

const successAdded = () => {
  document.querySelector("form .alert-success").classList.remove("d-none");

  const remove = setTimeout(function () {
    document.querySelector("form .alert-success").classList.add("d-none");
    window.clearTimeout(remove);
  }, 2000);
};

const getResponse = () => {
  const response = fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: myKey,
    },
  });

  return response;
};

const formResponse = async (product) => {
  response = fetch(URL, {
    method: productId ? "PUT" : "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
      Authorization: myKey,
    },
  });

  return response;
};

const deleteProduct = async () => {
  await fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: myKey,
    },
  });

  clearInput();
  document.querySelector(".modal-body").style.color = "#008000";
  document.querySelector(".modal-body").innerHTML = "Prodotto eliminato con successo!";
  redirectMe();
  document.querySelector(".modal-footer").innerHTML = "";
};

const checkStatus = (status) => {
  if (status === 401) {
    throw new Error(status + "- C'è stato un problema nell'autenticazione...");
  } else if (status === 405) {
    throw new Error(status + "- Ci dispiace, non riusciamo a trovare la pagina richiesta...");
  } else if (status > 500) {
    throw new Error("Ci dispiace, al momento abbiamo alcuni problemi interni col server...");
  }
};
