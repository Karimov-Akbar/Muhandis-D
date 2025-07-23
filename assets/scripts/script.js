document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('currentLang');
    const langDropdown = document.getElementById('langDropdown');
    const langArrow = document.querySelector('.lang-switcher__arrow');
    const langSwitcherItem = document.querySelector('.lang-switcher__item');
    
    let isDropdownOpen = false;
    
    langDropdown.style.display = 'none';
    
    langToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        isDropdownOpen = !isDropdownOpen;
        
        if (isDropdownOpen) {
            langDropdown.style.display = 'block';
            setTimeout(() => {
                langDropdown.style.opacity = '1';
                langDropdown.style.transform = 'scaleY(1)';
            }, 10);
            langArrow.style.transform = 'rotate(180deg)';
        } else {
            langDropdown.style.opacity = '0';
            langDropdown.style.transform = 'scaleY(0)';
            setTimeout(() => {
                langDropdown.style.display = 'none';
            }, 300);
            langArrow.style.transform = 'rotate(0deg)';
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!langSwitcherItem.contains(e.target) && isDropdownOpen) {
            isDropdownOpen = false;
            langDropdown.style.opacity = '0';
            langDropdown.style.transform = 'scaleY(0)';
            setTimeout(() => {
                langDropdown.style.display = 'none';
            }, 300);
            langArrow.style.transform = 'rotate(0deg)';
        }
    });
    
    const langOptions = document.querySelectorAll('.lang-switcher__option');
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const selectedLang = this.getAttribute('data-lang').toUpperCase();
            
            const currentText = langToggle.firstChild;
            if (currentText && currentText.nodeType === 3) {
                currentText.textContent = selectedLang;
            }
            
            isDropdownOpen = false;
            langDropdown.style.opacity = '0';
            langDropdown.style.transform = 'scaleY(0)';
            setTimeout(() => {
                langDropdown.style.display = 'none';
            }, 300);
            langArrow.style.transform = 'rotate(0deg)';
        });
    });
});