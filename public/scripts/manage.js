var btnAddTag = document.getElementById("btn_new_tag");

btnAddTag.addEventListener("click", async function (event) {
  var label = document.getElementById("new_tag_name").value;
  //console.log(label);
  try {
    var newTag = await axios.post(
      `http://localhost:3050/dashboard_sneaker/tag-add`,   // how to change dynamically the process.env.PORT ?
      { label: label }
    );
    var tagList = document.getElementById("tags");
    tagList.innerHTML += `<option value="${newTag.data._id}">${newTag.data.label}</option>`;
    document.getElementById("new_tag_name").value = "";
  } catch (err) {
    console.error(err);
  }
});
