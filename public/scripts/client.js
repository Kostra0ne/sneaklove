const tagButton = document.querySelector("#btn_new_tag");
const tagInput = document.querySelector("#new_tag_name");
const tagList = document.querySelectorAll(".tag-list-item");
const productInfo = document.querySelector("#products_grid");

function sendTag() {
  tagButton.addEventListener("click", async () => {
    const formTag = formatData();
    tagInput.value = "";
    console.log(formTag);
    try {
      await axios.post("http://localhost:8866/api/tags", {
        label: `${formTag}`,
      });
    } catch (err) {
      console.error(err);
    }
  });
}

function formatData() {
  const label = tagInput.value;
  return label;
}

//collection selectors

function emptyProduct() {
  productInfo.innerHTML = "";
}

tagList.forEach((element) => {
  element.addEventListener("input", () => emptyProduct());
});

// function test(id) {
//   axios
//     .get("http://localhost:8866/api/tags" + id)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

sendTag();
