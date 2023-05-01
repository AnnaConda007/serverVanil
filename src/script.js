const users = async () => {
    const response = await fetch("http://localhost:3002/users");
    const data = await response.json();
    return data;
};


const createList = async () => {
    const data = await users();
    for (let i = 0; i < data.length; i++) {
        const ul = document.createElement("ul");
        document.querySelector(".list-wrap").appendChild(ul);
        for (let prop in data[i]) {
            const li = document.createElement("li");
            if (typeof data[i][prop] === 'object' && data[i][prop] !== null) {
                li.textContent = `${prop}:`;
                const innerUl = document.createElement("ul");
                li.appendChild(innerUl);
                for (let innerProp in data[i][prop]) {
                    const nestedLi = document.createElement("li");
                    nestedLi.textContent = `${innerProp}: ${data[i][prop][innerProp]}`;
                    innerUl.appendChild(nestedLi);
                }
            } else {
                li.textContent = `${prop}: ${data[i][prop]}`;
            }
            ul.appendChild(li);
        }
    }
};

document.querySelector("button").addEventListener("click", () => { createList() })




