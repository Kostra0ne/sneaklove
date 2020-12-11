const tagButton = document.querySelector("#btn_new_tag");
const tagInput = document.querySelector("#new_tag_name");

async function sendTag() {
  tagButton.addEventListener("click", async () => {
    const formTag = formatData();
    try {
      await axios.post("/api/sneakers", formTag);
      emptyInput();
    } catch (err) {
      console.error(err);
    }
  });
}

function emptyInput() {
  tagInput.value = "";
}

function formatData() {
  const label = tagInput.value;
  return label;
}

// const tagList = document.querySelectorAll(".tag-list-item");
// const productInfo = document.querySelector("#products_grid");

// function emptyProduct() {
//   productInfo.innerHTML = "";
// }

// tagList.forEach((element) => {
//   element.addEventListener("input", () => emptyProduct());
// });

// function test(id) {
//   axios
//     .get("http://localhost:8866/tags" + id)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
