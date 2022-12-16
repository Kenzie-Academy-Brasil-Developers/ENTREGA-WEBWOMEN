const renderVacancies = arr => {
    const vacancies = document.querySelector(".list__container")

    arr.forEach(element => {
        const card = createCard(element)

        vacancies.appendChild(card)
    });
}

const createCard = arr => {
    const container = document.createElement("li")
    const title = document.createElement("h2")
    const info = document.createElement("div")
    const enterprise = document.createElement("span")
    const location = document.createElement("span")
    const descrition = document.createElement("p")
    const func = document.createElement("div")
    const modalities = document.createElement("span")
    const button = document.createElement("button")

    container.className = "list__vacancies"

    title.className = "list__vacancies--tittle"
    title.innerText = arr.title

    info.className = "info__div"

    enterprise.className = "list__vacancies--enterprise"
    enterprise.innerText = arr.enterprise

    location.className = "list__vacancies--location"
    location.innerText = arr.location

    descrition.className = "list__vacancies--description"
    descrition.innerText = arr.descrition

    func.className = "func__div"

    modalities.className = "list__vacancies--modalities"
    modalities.innerText = arr.modalities[0]

    button.className = "list__vacancies--button"
    button.innerText = "Candidatar"
    button.dataset.id = arr.id


    info.append(enterprise, location)
    func.append(modalities, button)
    container.append(title, info, descrition, func)

    return container
}

const renderSelectedVacancies = arr => {
    const selectedList = document.querySelector(".selected__list")

    selectedList.innerHTML = ""

    if (selected.length <= 0) {
        const emptySelected = createEmptySelected()

        selectedList.append(emptySelected)
    } else {
        arr.forEach(element => {
            const vacancies = createSelectedVacancies(element)

            selectedList.appendChild(vacancies)
        })
        removeSelected(arr)
    }
}

const createEmptySelected = () => {
    const message = document.createElement("span")

    message.className = "selected__message--empty"
    message.innerText = "Você ainda não aplicou para nenhuma vaga"

    return message
}

const createSelectedVacancies = arr => {
    const container = document.createElement("li")
    const close = document.createElement("div")
    const title = document.createElement("h3")
    const button = document.createElement("button")
    const img = document.createElement("img")
    const info = document.createElement("div")
    const enterprise = document.createElement("span")
    const location = document.createElement("span")

    container.className = "selected__vacancie"

    close.className = "close__div"

    title.className = "selected__title"
    title.innerText = arr.title

    button.className = "selected__button--remove"
    button.dataset.selectedId = arr.selectedId

    img.className = "selected__button--img"
    img.src = "/assets/img/trash.png"
    img.alt = "Exlcuir vaga"

    info.className = "info__div"

    enterprise.className = "list__vacancies--enterprise"
    enterprise.innerText = arr.enterprise

    location.className = "list__vacancies--location"
    location.innerText = arr.location

    button.appendChild(img)
    close.append(title, button)
    info.append(enterprise, location)
    container.append(close, info)

    return container
}

const addToSelected = () => {
    const buttons = document.querySelectorAll(".list__vacancies--button")

    buttons.forEach(element => {
        element.addEventListener("click", event => {
            const vacancieFound = jobsData.find(element => element.id === Number(event.target.dataset.id))

            if (selected.includes(vacancieFound)) {

            } else {
                element.innerText = "Remover candidatura"
                selected.push(vacancieFound)
            }
            localStorage.setItem("data-jobs", JSON.stringify(selected))
            console.log(selected)
            renderSelectedVacancies(selected)
        })
    })
}

const removeSelected = arr => {
    const removeButtons = document.querySelectorAll(".selected__button--remove")

    removeButtons.forEach(element => {
        element.addEventListener("click", (event) => {
            const vacancieInSelected = arr.find(element => element.selectedId === Number(event.target.dataset.selectedId))

            localStorage.removeItem("data-jobs")

            const vacanciesIndex = arr.indexOf(vacancieInSelected)

            arr.splice(vacanciesIndex, 1)

            localStorage.setItem("data-jobs", JSON.stringify(arr))

            renderSelectedVacancies(arr)
        })
    })
}

renderVacancies(jobsData)
renderSelectedVacancies(selected)
addToSelected()
