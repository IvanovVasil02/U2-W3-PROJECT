const productId = new URLSearchParams(window.location.search).get("productID");

const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";

const handleSubmit = async (event) => {
  event.preventDefault();

  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };

  console.log(product);

  try {
    const response = await fetch(URL, {
      method: productId ? "PUT" : "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjQwYWMwMzRmZjAwMTQwM2Y1NmYiLCJpYXQiOjE2OTI5NTE1NjIsImV4cCI6MTY5NDE2MTE2Mn0.WzUEH9dUMb6Rhhvrm-VSLjHN5UujsM0u6efWoRms0A4",
      },
    });

    if (response.ok) {
      const sendedProduct = await response.json();
      console.log("inviato con successo ", sendedProduct);

      document.getElementById("name").value = "";
      document.getElementById("description").value = "";
      document.getElementById("brand").value = "";
      document.getElementById("imageUrl").value = "";
      document.getElementById("descImg").value = "";
      document.getElementById("price").value = "";
    }
  } catch (error) {
    console.log(error);
  }
};

const loadData = async () => {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjQwYWMwMzRmZjAwMTQwM2Y1NmYiLCJpYXQiOjE2OTI5NTE1NjIsImV4cCI6MTY5NDE2MTE2Mn0.WzUEH9dUMb6Rhhvrm-VSLjHN5UujsM0u6efWoRms0A4",
      },
    });

    const product = await response.json();
    document.getElementById("name").value = `${product.name}`;
    document.getElementById("description").value = `${product.description}`;
    document.getElementById("brand").value = `${product.brand}`;
    document.getElementById("imageUrl").value = `${product.imageUrl}`;
    document.getElementById("price").value = `${product.price}`;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProduct = () => {
  fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjQwYWMwMzRmZjAwMTQwM2Y1NmYiLCJpYXQiOjE2OTI5NTE1NjIsImV4cCI6MTY5NDE2MTE2Mn0.WzUEH9dUMb6Rhhvrm-VSLjHN5UujsM0u6efWoRms0A4",
    },
  });
};

window.onload = async () => {
  const submitBtn = document.querySelector("button[type='submit']");

  if (productId) {
    loadData();
    submitBtn.innerHTML = "Modifica";
    document.querySelector("form").innerHTML += `<button  class="btn btn-danger" >Elimina</button>`;
    document.querySelector(
      "form"
    ).innerHTML += `<a href="index.html" class="btn btn-secondary ms-1" >Torna indietro</button>`;
    const deleteBtn = document.querySelector(".btn-danger");
    deleteBtn.onclick = () => {
      deleteProduct();
    };
  }
};
