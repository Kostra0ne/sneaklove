//ADD TAGS => without refreshing the page
const btnTag = document.getElementById("btn_new_tag");
const inputTag = document.getElementById("new_tag_name");
const service = axios.create({
        baseURL: `http://localhost:5000` //it cant access the .env, somehow
});

btnTag.onclick = handleTag;
async function getTags() {
        try {
                const res = await service.get("/prod-add");
                console.log(res.data);
        } catch (err) {
                console.error(err);
        }
}
async function handleTag() {
        console.log("here", inputTag.value);
        if (inputTag.value === "") return;
        try {
                // await service.post("/tag-add", { label: inputTag.value });
                await service.post("/prod-add", { label: inputTag.value })
                // getTags();
        } catch (err) {
                console.error(err);
        }
}