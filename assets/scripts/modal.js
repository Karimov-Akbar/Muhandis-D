const labDataMapping = {
  electronics: {
    titleKey: "electronicsLab",
    descriptionKey: "electronicsLabDescription",
    image: "./assets/images/Elektronika lab 2.jpg",
    additionImage: "./assets/images/Elektronika lab 1.jpg",
  },
  mechatronics: {
    titleKey: "mechatronicsLab",
    descriptionKey: "mechatronicsLabDescription",
    image: "./assets/images/Mexatronika lab 1.JPG",
    additionImage: "./assets/images/Mexatronika lab 2.JPG",
  },
  renewable: {
    titleKey: "renewableEnergyLab",
    descriptionKey: "renewableEnergyLabDescription",
    image: "./assets/images/Muqobil energiya lab 1.jpg",
  },
  construction: {
    titleKey: "constructionLab",
    descriptionKey: "constructionLabDescription",
    image: "./assets/images/Qurulish lab 1.JPG",
    additionImage: "./assets/images/Qurulish lab 3.JPG",
  },
  robotics: {
    titleKey: "roboticsLab",
    descriptionKey: "roboticsLabDescription",
    image: "./assets/images/Robototexnika lab 1.jpg",
  },
}

const eventsDataMapping = {
  event1: {
    titleKey: "event1Title",
    descriptionKey: "event1Description",
    image: "./assets/images/events/photo_2022-04-15_16-56-58.jpg",
    additionalImages: [
      "./assets/images/events/photo_2025-07-25_10-26-30.jpg",
      "./assets/images/photo_2025-07-24_11-10-41.jpg",
    ],
  },
  event2: {
    titleKey: "event2Title",
    descriptionKey: "event2Description",
    image: "./assets/images/events/photo_2024-05-20_21-41-33.jpg",
    additionalImages: [
      "./assets/images/events/photo_2025-07-25_10-27-28.jpg",
      "./assets/images/events/photo_2025-07-25_11-14-09.jpg",
    ],
  },
  event3: {
    titleKey: "event3Title",
    descriptionKey: "event3Description",
    image: "./assets/images/events/photo_2025-07-25_10-27-07.jpg",
    additionalImages: ["./assets/images/events/photo_2025-07-25_11-14-21.jpg"],
  },
}

function checkImageExists(imageSrc) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = imageSrc
  })
}

async function createAdditionalImagesHTML(additionalImages, title) {
  if (!additionalImages || additionalImages.length === 0) {
    return ""
  }

  let imagesHTML = ""

  for (let i = 0; i < additionalImages.length; i++) {
    const imageSrc = additionalImages[i]
    const imageExists = await checkImageExists(imageSrc)

    if (imageExists) {
      imagesHTML += `
        <div class="additional-image-item">
          <img src="${imageSrc}" alt="${title} - дополнительное изображение ${i + 1}" />
        </div>
      `
    }
  }

  return imagesHTML ? `<div class="additional-images-container">${imagesHTML}</div>` : ""
}

async function openLabModal(labType) {
  console.log("Opening modal for:", labType)

  const labData = labDataMapping[labType]
  if (!labData) {
    console.log("Lab data not found for:", labType)
    return
  }

  const modal = document.getElementById("labModal")
  const modalImage = document.getElementById("labModalImage")
  const modalTitle = document.getElementById("labModalTitle")
  const modalDescription = document.getElementById("labModalDescription")
  const modalAdditionImage = document.getElementById("labModalAdditonImage")
  const additionImageContainer = document.querySelector(".lab-modal-additon-image")

  if (!modal) {
    console.log("Modal element not found")
    return
  }

  const title = window.LanguageSwitcher ? window.LanguageSwitcher.getTranslation(labData.titleKey) : labData.titleKey
  const description = window.LanguageSwitcher
    ? window.LanguageSwitcher.getTranslation(labData.descriptionKey)
    : labData.descriptionKey

  modalImage.src = labData.image
  modalImage.alt = title
  modalTitle.textContent = title
  modalDescription.textContent = description

  if (additionImageContainer) {
    let additionalImagesHTML = ""

    if (labData.additionImage) {
      const imageExists = await checkImageExists(labData.additionImage)
      if (imageExists) {
        additionalImagesHTML = `
          <div class="additional-images-container">
            <div class="additional-image-item">
              <img src="${labData.additionImage}" alt="${title} - дополнительное изображение" />
            </div>
          </div>
        `
      }
    }
    else if (labData.additionalImages && labData.additionalImages.length > 0) {
      additionalImagesHTML = await createAdditionalImagesHTML(labData.additionalImages, title)
    }

    if (additionalImagesHTML) {
      additionImageContainer.innerHTML = additionalImagesHTML
      additionImageContainer.classList.add("show")
      console.log("Additional images loaded for:", labType)
    } else {
      additionImageContainer.classList.remove("show")
      console.log("No additional images for:", labType)
    }
  }

  modal.style.display = "block"
  document.body.style.overflow = "hidden"

  console.log("Modal opened successfully")
}

async function openEventsModal(eventType) {
  console.log("Opening events modal for:", eventType)

  const eventData = eventsDataMapping[eventType]
  if (!eventData) {
    console.log("Event data not found for:", eventType)
    return
  }

  const modal = document.getElementById("eventsModal")
  const modalImage = document.getElementById("eventsModalImage")
  const modalTitle = document.getElementById("eventsModalTitle")
  const modalDescription = document.getElementById("eventsModalDescription")

  if (!modal) {
    console.log("Events modal element not found")
    return
  }

  const title = window.LanguageSwitcher
    ? window.LanguageSwitcher.getTranslation(eventData.titleKey)
    : eventData.titleKey
  const description = window.LanguageSwitcher
    ? window.LanguageSwitcher.getTranslation(eventData.descriptionKey)
    : eventData.descriptionKey

  modalImage.src = eventData.image
  modalImage.alt = title
  modalTitle.textContent = title
  modalDescription.textContent = description

  const existingAdditionalContainer = modal.querySelector(".additional-images-container")
  if (existingAdditionalContainer) {
    existingAdditionalContainer.remove()
  }

  if (eventData.additionalImages && eventData.additionalImages.length > 0) {
    const additionalImagesHTML = await createAdditionalImagesHTML(eventData.additionalImages, title)

    if (additionalImagesHTML) {
      const modalBody = modal.querySelector(".events-modal-body")
      modalBody.insertAdjacentHTML("beforeend", additionalImagesHTML)
      console.log("Additional event images loaded:", eventData.additionalImages.length)
    }
  }

  modal.style.display = "block"
  document.body.style.overflow = "hidden"

  console.log("Events modal opened successfully")
}

function closeLabModal() {
  const modal = document.getElementById("labModal")
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
    console.log("Modal closed")
  }
}

function closeEventsModal() {
  const modal = document.getElementById("eventsModal")
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
    console.log("Events modal closed")
  }
}

function updateModalContent() {
  const labModal = document.getElementById("labModal")
  const eventsModal = document.getElementById("eventsModal")

  if (labModal && labModal.style.display === "block") {
    const modalImage = document.getElementById("labModalImage")
    if (modalImage && modalImage.src) {
      for (const [labType, labData] of Object.entries(labDataMapping)) {
        if (modalImage.src.includes(labData.image.replace("./", ""))) {
          openLabModal(labType)
          break
        }
      }
    }
  }

  if (eventsModal && eventsModal.style.display === "block") {
    const modalImage = document.getElementById("eventsModalImage")
    if (modalImage && modalImage.src) {
      for (const [eventType, eventData] of Object.entries(eventsDataMapping)) {
        if (modalImage.src.includes(eventData.image.replace("./", ""))) {
          openEventsModal(eventType)
          break
        }
      }
    }
  }
}

function initializeLabModal() {
  console.log("Initializing lab modal functionality")

  const labCards = document.querySelectorAll(".labs__gallery-content-card")
  console.log("Found lab cards:", labCards.length)

  labCards.forEach((card, index) => {
    const labType = card.getAttribute("data-lab")
    console.log(`Card ${index}: data-lab="${labType}"`)

    card.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("Card clicked:", labType)
      openLabModal(labType)
    })

    const img = card.querySelector("img")
    if (img) {
      img.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Image clicked:", labType)
        openLabModal(labType)
      })
    }
  })

  const closeBtn = document.querySelector(".lab-modal-close")
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault()
      closeLabModal()
    })
  }

  const modal = document.getElementById("labModal")
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeLabModal()
      }
    })
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const labModal = document.getElementById("labModal")
      const eventsModal = document.getElementById("eventsModal")

      if (labModal && labModal.style.display === "block") {
        closeLabModal()
      }
      if (eventsModal && eventsModal.style.display === "block") {
        closeEventsModal()
      }
    }
  })

  console.log("Lab modal functionality initialized")
}

function initializeEventsModal() {
  console.log("Initializing events modal functionality")

  setTimeout(() => {
    const eventImages = document.querySelectorAll(".muhandis__events .swiper-slide img")
    console.log("Found event images:", eventImages.length)

    eventImages.forEach((img, index) => {
      const eventType = `event${index + 1}`
      console.log(`Event image ${index}: eventType="${eventType}"`)

      img.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Event image clicked:", eventType)
        openEventsModal(eventType)
      })

      img.style.cursor = "pointer"
    })
  }, 1000)

  const closeBtn = document.querySelector(".events-modal-close")
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault()
      closeEventsModal()
    })
  }

  const modal = document.getElementById("eventsModal")
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeEventsModal()
      }
    })
  }

  console.log("Events modal functionality initialized")
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing modals")

  initializeLabModal()
  initializeEventsModal()

  document.addEventListener("languageChanged", () => {
    console.log("Language changed, updating modal content")
    updateModalContent()
  })
})

if (window.LanguageSwitcher) {
  const originalChangeLanguage = window.LanguageSwitcher.changeLanguage
  window.LanguageSwitcher.changeLanguage = async function (newLanguage) {
    await originalChangeLanguage.call(this, newLanguage)
    updateModalContent()
  }
}

window.labModal = {
  openLabModal,
  closeLabModal,
  openEventsModal,
  closeEventsModal,
  updateModalContent,
}
