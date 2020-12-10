const btnNewTag = document.getElementById("btn_new_tag");
const tagName = document.getElementById("new_tag_name");
const tagsList = document.getElementById("tags");

async function updateTagList(tag) {
    console.log("foo");
    tagsList.innerHTML += `<option value="${tag._id}">${tag.label}</option>`;
}

function addTag() {
  if (tagName.value !== "") {
    axios
      .post("/tags/create", { label: tagName.value })
      .then((dbRes) => updateTagList(dbRes.data))
      .catch((dbErr) => console.log(dbErr));
  }
}

btnNewTag.onclick = addTag;
