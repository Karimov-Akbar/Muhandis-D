let translations = {};

let currentLanguage = 'ru';

const availableLanguages = ['ru', 'en', 'uz'];

async function loadTranslation(language) {
    try {
        const response = await fetch(`./assets/translations/${language}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const translation = await response.json();
        translations[language] = translation;
        return translation;
    } catch (error) {
        console.error(`Ошибка загрузки перевода для языка ${language}:`, error);
        return null;
    }
}

async function loadAllTranslations() {
    const loadPromises = availableLanguages.map(lang => loadTranslation(lang));
    await Promise.all(loadPromises);
    console.log('Все переводы загружены:', translations);
}

function getTranslation(key) {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    
    console.warn(`Перевод не найден для ключа: ${key} на языке: ${currentLanguage}`);
    return key;
}

function updateTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        
        if (element.tagName === 'TITLE') {
            element.textContent = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    document.documentElement.lang = currentLanguage;
}

async function changeLanguage(newLanguage) {
    if (!availableLanguages.includes(newLanguage)) {
        console.error(`Язык ${newLanguage} не поддерживается`);
        return;
    }
    
    if (!translations[newLanguage]) {
        console.log(`Загружаем переводы для языка: ${newLanguage}`);
        await loadTranslation(newLanguage);
    }
    
    currentLanguage = newLanguage;
    
    localStorage.setItem('selectedLanguage', newLanguage);
    
    updateTranslations();
    
    updateLanguageDisplay();
    
    updateDropdownOptions();
    
    console.log(`Язык изменен на: ${newLanguage}`);
}

function updateLanguageDisplay() {
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
        const langText = currentLangElement.childNodes[0];
        if (langText) {
            langText.textContent = currentLanguage.toUpperCase();
        }
    }
}

function updateDropdownOptions() {
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) {
        dropdown.innerHTML = '';
        
        availableLanguages.forEach(lang => {
            if (lang !== currentLanguage) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = '#';
                a.className = 'lang-switcher__option';
                a.setAttribute('data-lang', lang);
                a.textContent = lang.toUpperCase();
                
                a.addEventListener('click', function(e) {
                    e.preventDefault();
                    changeLanguage(lang);
                });
                
                li.appendChild(a);
                dropdown.appendChild(li);
            }
        });
    }
}

async function initLanguageSwitcher() {
    try {
        
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && availableLanguages.includes(savedLanguage)) {
            currentLanguage = savedLanguage;
        }
        
        await loadTranslation(currentLanguage);
        
        
        updateTranslations();
        
        updateLanguageDisplay();
        updateDropdownOptions();
        
        const langToggle = document.querySelector('.lang-switcher__toggle');
        const langDropdown = document.querySelector('.lang-switcher__dropdown');
        
        if (langToggle && langDropdown) {
            langToggle.addEventListener('click', function(e) {
                e.preventDefault();
                const isVisible = langDropdown.style.opacity === '1';
                langDropdown.style.opacity = isVisible ? '0' : '1';
                langDropdown.style.transform = isVisible ? 'scaleY(0)' : 'scaleY(1)';
            });
            
            document.addEventListener('click', function(e) {
                if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
                    langDropdown.style.opacity = '0';
                    langDropdown.style.transform = 'scaleY(0)';
                }
            });
        }
        
        setTimeout(() => {
            loadAllTranslations();
        }, 1000);
        
        console.log('Переключатель языков инициализирован успешно');
        
    } catch (error) {
        console.error('Ошибка инициализации переключателя языков:', error);
        
        currentLanguage = 'ru';
        updateLanguageDisplay();
        updateDropdownOptions();
    }
}

function addLanguage(langCode, translationData) {
    if (!availableLanguages.includes(langCode)) {
        availableLanguages.push(langCode);
        translations[langCode] = translationData;
        console.log(`Добавлен новый язык: ${langCode}`);
    }
}

function getCurrentLanguageInfo() {
    return {
        current: currentLanguage,
        available: availableLanguages,
        loaded: Object.keys(translations)
    };
}

window.LanguageSwitcher = {
    changeLanguage,
    getCurrentLanguageInfo,
    addLanguage,
    getTranslation
};

document.addEventListener('DOMContentLoaded', initLanguageSwitcher);