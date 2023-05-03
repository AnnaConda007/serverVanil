const authorization = async () => {
    const request = await fetch("http://localhost:3002/users")
    const res = await request.json()
    const btn = document.querySelector(".btn-authorization")

    btn.addEventListener("click", () => {
        const login = document.getElementById("login").value
        const password = document.getElementById("password").value
        const error = document.querySelector(".alert-danger")
        for (let i = 0; i < res.length; i++) {
            if (login !== res[i].name || password !== res[i].password) {
                console.log("ppp")
                error.style.display = "block"
            } else { window.location.href = "success.html" }

        }
    })



}
export default authorization