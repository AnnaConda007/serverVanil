const users = async () => {
    const response = await fetch("http://localhost:3002/users");
    const data = await response.json();
    return data;
};


const createList = async () => {
    const data = await users();
    for (let i = 0; i < data.length; i++) {
        const ul = document.createElement("ul");
        document.querySelector(".list-wrap").appendChild(ul)
        ul.innerHTML += `<li>${data[i].name}</li>
        <li>${data[i].username}</li>
        <li>${data[i].email}</li>
        <li>${data[i].phone}</li>
`

    }



}


document.querySelector("button").addEventListener("click", () => { createList() })




