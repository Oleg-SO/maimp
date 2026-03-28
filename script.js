// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal Logic
const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modalCloses = document.querySelectorAll('.modal__close');

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        if (modal.classList.contains('video-modal')) {
            const videoContainer = modal.querySelector('.video-container');
            if (videoContainer) videoContainer.innerHTML = '';
        }
    }
}

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const modalId = trigger.getAttribute('data-modal');
        openModal(modalId);
    });
});

modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        closeModal(modal);
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Video Gallery Logic
const videoCards = document.querySelectorAll('.video-card');
const videoModal = document.getElementById('videoModal');
const videoContainer = videoModal?.querySelector('.video-container');

if (videoCards.length && videoModal && videoContainer) {
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const vkId = card.getAttribute('data-vk-id');
            if (vkId) {
                const [ownerId, videoId] = vkId.split('_');
                const embedUrl = `https://vk.com/video_ext.php?oid=${ownerId}&id=${videoId}&autoplay=1`;
                videoContainer.innerHTML = `<iframe src="${embedUrl}" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
                openModal('videoModal');
            }
        });
    });
}

// ==================== ОТПРАВКА ФОРМ НА PHP ====================

// Универсальная функция отправки форм
async function sendForm(form) {
    const formData = new FormData(form);
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправляем...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('send-mail.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            submitBtn.textContent = '✓ Отправлено!';
            form.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                const modal = form.closest('.modal');
                if (modal) {
                    closeModal(modal);
                }
                
                alert(result.message);
            }, 1500);
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        submitBtn.textContent = '❌ Ошибка';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
        alert('Ошибка отправки. Пожалуйста, позвоните нам по телефону.');
    }
}

// Подключаем форму с главной секции (автоэлектрик)
const mainForm = document.getElementById('mainForm');
if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendForm(mainForm);
    });
}

// Подключаем форму в модальном окне (автоэлектрик)
const modalForm = document.getElementById('modalForm');
if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendForm(modalForm);
    });
}

// Подключаем форму для автомеханика
const mechanicForm = document.getElementById('mechanicForm');
if (mechanicForm) {
    mechanicForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendForm(mechanicForm);
    });
}

// Mechanic trigger (дополнительно на случай, если data-modal не сработал)
const mechanicTrigger = document.querySelector('.mechanic-trigger');
if (mechanicTrigger) {
    mechanicTrigger.addEventListener('click', () => {
        openModal('mechanicModal');
    });
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

// Simple gallery lightbox effect (опционально, если будет галерея)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img')?.src;
        if (imgSrc) {
            const lightboxModal = document.createElement('div');
            lightboxModal.classList.add('modal');
            lightboxModal.style.display = 'flex';
            lightboxModal.innerHTML = `
                <div class="modal__content" style="max-width: 90%; background: transparent; padding:0;">
                    <span class="modal__close" style="color:white; right: -30px;">&times;</span>
                    <img src="${imgSrc}" style="width:100%; height:auto; border-radius:8px;">
                </div>
            `;
            document.body.appendChild(lightboxModal);
            document.body.style.overflow = 'hidden';
            
            const closeLightbox = () => {
                lightboxModal.remove();
                document.body.style.overflow = '';
            };
            
            lightboxModal.querySelector('.modal__close').addEventListener('click', closeLightbox);
            lightboxModal.addEventListener('click', (e) => {
                if (e.target === lightboxModal) closeLightbox();
            });
        }
    });
});

// Policy Links
const policyLink = document.getElementById('policyLink');
if (policyLink) {
    policyLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Политика конфиденциальности: Мы собираем только ваше имя и телефон для связи. Данные не передаются третьим лицам.');
    });
}

const policyLink2 = document.getElementById('policyLink2');
if (policyLink2) {
    policyLink2.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Политика конфиденциальности: Мы собираем только ваше имя и телефон для связи. Данные не передаются третьим лицам.');
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    } else {
        header.style.padding = '15px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    }
});