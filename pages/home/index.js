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

    selected.forEach(vaga => {
        if (vaga.id === arr.id) {
            button.innerText = "Remover candidatura"
        }
    })

    info.append(enterprise, location)
    func.append(modalities, button)
    container.append(title, info, descrition, func)

    return container
}

const renderSelectedVacancies = arr => {
    const selectedList = document.querySelector(".selected__list")

    // const jsonList = JSON.parse(localStorage.getItem("data-jobs"))

    // if (jsonList.length > 0) {
    //     arr = [...jsonList]
    // }

    selectedList.innerHTML = ""

    if (arr.length <= 0) {
        const emptySelected = createEmptySelected()

        selectedList.append(emptySelected)
    } else {
        arr.forEach(element => {
            const vacancies = createSelectedVacancies(element)

            selectedList.appendChild(vacancies)
        })
        removeSelected(selected)
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
    button.dataset.selectedId = arr.id

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

            if (selected.includes(vacancieFound) || element.innerText === "Remover candidatura") {
                const filteredVacancies = selected.findIndex(element => element.id === Number(event.target.dataset.id))
                selected.splice(filteredVacancies, 1)
                element.innerText = "Candidatar"
            } else {
                element.innerText = "Remover candidatura"
                selected.push(vacancieFound)
            }
            localStorage.setItem("data-jobs", JSON.stringify(selected))
            renderSelectedVacancies(selected)
        })
    })
}

const removeSelected = selected => {
    const removeButtons = document.querySelectorAll(".selected__button--remove")
    removeButtons.forEach(element => {
        element.addEventListener("click", (event) => {
            const vacancieInSelected = selected.findIndex(element => element.id === Number(event.target.dataset.selectedId))
            localStorage.removeItem("data-jobs")

            const vacanciesIndex = selected.indexOf(vacancieInSelected)

            selected.splice(vacanciesIndex, 1)

            localStorage.setItem("data-jobs", JSON.stringify(selected))

            renderSelectedVacancies(selected)
        })
    })
}

renderVacancies(jobsData)
renderSelectedVacancies(selected)
addToSelected()
