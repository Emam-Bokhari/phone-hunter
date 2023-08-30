const dataLoad = (SearchResults) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${SearchResults}`)
        .then((value1) => {
            return value1.json()
        })
        .then((value2) => {
            data(value2.data)
        })
        .catch((error) => {
            console.log('Error fetching data', error)
        })
}

const data = (phonesData) => {
    const phoneDataStorage = document.querySelector('#phone-data-storage')
    // console.log(phonesData)
    phoneDataStorage.textContent = ''
    phonesData.forEach(item => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card bg-base-100 shadow-md">
        <figure class="px-10 pt-10">
          <img src="${item.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${item.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions">
            <button  onclick="showDetails('${item.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
      </div>
  </div>
        `
        phoneDataStorage.appendChild(div)
    })
}



document.querySelector('#search-btn').addEventListener('click', () => {
    const searchField = document.querySelector('#search-field')
    const searchFieldValue = searchField.value
    const search = dataLoad(searchFieldValue)
    searchFieldValue.innerText = search
})


// Show details


const showDetails = (details) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
        .then((value1) => {
            return value1.json()
        })
        .then((value2) => {
            showPhoneDetails(value2.data)
        })
}



const showPhoneDetails = (phoneDetails) => {
    const phoneName = document.querySelector('#phone-name')
    const modalContainer = document.querySelector('#modal-container')
    modalContainer.textContent = ''
    const modalDetailsContainer = document.querySelector('#modal-details-container')
    modalDetailsContainer.textContent = ''
    phoneName.textContent = ''
    const p = document.createElement('p')
    p.innerText = `${phoneDetails.name}`
    phoneName.appendChild(p)
    const div = document.createElement('div')
    div.innerHTML = `
    <img src="${phoneDetails.image}">
    `
    modalContainer.appendChild(div)


    const modalDetails = document.createElement('div')
    modalDetails.innerHTML = `
<p class='mt-5'>${phoneDetails.mainFeatures.storage} </p>
<p class='mt-5'>${phoneDetails.mainFeatures.displaySize} </p>
<p class='mt-5'>${phoneDetails.mainFeatures.chipSet} </p>
<p class='mt-5'>${phoneDetails.mainFeatures.memory} </p>
<p class='mt-5'>${phoneDetails.mainFeatures.sensors} </p>
`
    modalDetailsContainer.appendChild(modalDetails)

    // Modal
    my_modal.showModal()
}


