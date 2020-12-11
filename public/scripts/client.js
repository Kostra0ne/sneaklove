const btnSelector = document.getElementById("btn_new_tag");

const tagListSelector = document.getElementById("tag_list");

function test(e) {
  console.log(e.target.dataset.tagId);
}

tagListSelector.addEventListener("click", test);
