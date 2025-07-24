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

  function checkImageExists(imageSrc) {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = imageSrc
    })
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

    if (labData.additionImage && modalAdditionImage && additionImageContainer) {
      const imageExists = await checkImageExists(labData.additionImage)
  
      if (imageExists) {
        modalAdditionImage.src = labData.additionImage
        modalAdditionImage.alt = `${title} - детальный вид`
        additionImageContainer.classList.add("show")
        console.log("Detail image loaded:", labData.additionImage)
      } else {
        additionImageContainer.classList.remove("show")
        console.log("Detail image not found, hiding section:", labData.additionImage)
      }
    } else {
      if (additionImageContainer) {
        additionImageContainer.classList.remove("show")
        console.log("No detail image specified for:", labType)
      }
    }
  
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
  
    console.log("Modal opened successfully")
  }
  
  function closeLabModal() {
    const modal = document.getElementById("labModal")
    if (modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
      console.log("Modal closed")
    }
  }
  
  function updateModalContent() {
    const modal = document.getElementById("labModal")
    if (modal && modal.style.display === "block") {
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
        const modal = document.getElementById("labModal")
        if (modal && modal.style.display === "block") {
          closeLabModal()
        }
      }
    })
  
    console.log("Lab modal functionality initialized")
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, initializing lab modal")
  
    initializeLabModal()
  
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
    updateModalContent,
  }