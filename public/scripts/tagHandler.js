const btnAddTag = document.querySelector("#btn_new_tag");
const newTagName = document.querySelector("#new_tag_name");
const tagsList = document.querySelector("#tags");

function addTag() {
   console.log("INPUT VALUE = NEW TAG ======>", newTagName.value);
   axios
      .post("/dashboard/api/tags", { label: newTagName.value })
      .then((dbRes) => {
         const newTag = dbRes.data;
         displayNewTag(newTag);
      })
      .catch((err) => console.log(err));
}

function displayNewTag(tag) {
   tagsList.innerHTML += `<option value="${tag._id}">${tag.label}</option>`;
}

btnAddTag.onclick = addTag;
