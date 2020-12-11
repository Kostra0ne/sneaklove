// alert("hello");

//ADD TAGS => without refreshing the page
const btnTag = document.getElementById("btn_new_tag");
const inputTag = document.getElementById("new_tag_name");
const tagList = document.querySelectorAll(".tag-list-item input");


const service = axios.create({
        baseURL: `http://localhost:5000` //it cant access the .env, somehow
});


async function getTags() {
        try {
                const getData = await axios.get(`/tag/tag-add`);
                return getData.data;

        } catch (err) {
                console.error(err);
        }
}

async function handleTag() {

        if (inputTag.value === "") return;

        try {

                await axios.post(`/tag/tag-add`, { label: inputTag.value });

        } catch (err) {
                console.error(err);
        }
}

async function updateTags() {
        const selection = document.querySelector(".form-item-wrapper #tags");
        selection.innerHTML = '';
        const newTag = await getTags();

        selection.innerHTML = `<option value="-1" disabled selected>Choose a category</option>`
        for (let i = 0; i < newTag.length; i++) {
                console.log(i, newTag[i]);
                selection.innerHTML += `<option value=${newTag[i].id}>${newTag[i].label}</option>`
        }

};


function displayProdGrid(sneakers) {
        const productsGrid = document.getElementById("products_grid");
        productsGrid.innerHTML = '';
        for (let i = 0; i < sneakers.length; i++) {
                productsGrid.innerHTML += `
                <a href="/one-product/${sneakers[i]._id}" class="product-item-wrapper">
                <div class="product-img">
                        <img src="${sneakers[i].image}" alt="${sneakers[i].name} : what a nice pair of kicks">
                </div>
                <p class="product-name">${sneakers[i].name}</p>
                <p class="product-cat">${sneakers[i].category}</p>
                <p class="product-price">${sneakers[i].price}</p>
                </a>
                  `
        }
}


tagList.forEach(tag => {
        tag.addEventListener('click', async () => {
                console.log("1")
                let getSneakers;

                const currentURL = window.location.href;
                const category = currentURL.replace("http://localhost:3000/sneakers/", '');
                // console.log({category})

                const idTag = tag.getAttribute("data-tag-id");
                // console.log({idTag});

                if (category == "collection") {
                        getSneakers = await axios.get(`/tag/${idTag}`);
                } else {
                        getSneakers = await axios.get(`/tag/${idTag}/${category}`);
                }

                const sneakers = getSneakers.data;

                console.log(sneakers)

                displayProdGrid(sneakers)
        })
})





btnTag.addEventListener('click', async () => {
        await handleTag();
        updateTags();
});