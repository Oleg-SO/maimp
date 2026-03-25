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
            // Clear video if it's the video modal
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

    // Video Gallery Logic (поддержка YouTube и VK)
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const videoContainer = videoModal?.querySelector('.video-container');

    if (videoCards.length && videoModal && videoContainer) {
        videoCards.forEach(card => {
            card.addEventListener('click', () => {
                const vkId = card.getAttribute('data-vk-id');
                const youtubeId = card.getAttribute('data-video-id');
                let embedUrl = '';

                if (vkId) {
                    // Разбираем ID: "352604861_456239186" -> owner_id=352604861, video_id=456239186
                    const [ownerId, videoId] = vkId.split('_');
                    // Формируем правильный URL для встраивания VK видео
                    embedUrl = `https://vk.com/video_ext.php?oid=${ownerId}&id=${videoId}&hash=&autoplay=1`;
                    videoContainer.innerHTML = `<iframe src="${embedUrl}" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
                    openModal('videoModal');
                } else if (youtubeId) {
                    embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
                    videoContainer.innerHTML = `<iframe src="${embedUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
                    openModal('videoModal');
                }
            });
        });
    }

    // Form Submissions (simulated)
    const forms = document.querySelectorAll('form[id="mainForm"], form[id="modalForm"]');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', data);
            
            // Show success message (you can replace with actual API call)
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправлено!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
                
                // Close modal if it's inside a modal
                const modal = form.closest('.modal');
                if (modal) {
                    closeModal(modal);
                } else {
                    alert('Заявка успешно отправлена! Наш менеджер свяжется с вами.');
                }
            }, 1500);
            
            // Here you would normally send data to your server
            // Example:
            // const response = await fetch('/api/send-request', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
        });
    });

    // Simple gallery lightbox effect (optional)
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

    // Policy Link
    const policyLink = document.getElementById('policyLink');
    if (policyLink) {
        policyLink.addEventListener('click', (e) => {
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

    // Mechanic Form Submission
    const mechanicForm = document.getElementById('mechanicForm');
    const mechanicTrigger = document.querySelector('.mechanic-trigger');

    if (mechanicForm) {
        mechanicForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(mechanicForm);
            const data = Object.fromEntries(formData.entries());
            
            // Добавляем тип заявки
            data.serviceType = 'Автомеханик на выезд';
            
            console.log('Заявка на механика:', data);
            
            const submitBtn = mechanicForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправляем...';
            submitBtn.disabled = true;
            
            // Здесь будет реальная отправка на email
            // Сейчас имитация отправки
            setTimeout(() => {
                submitBtn.textContent = '✓ Отправлено!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    mechanicForm.reset();
                    
                    const modal = mechanicForm.closest('.modal');
                    if (modal) {
                        closeModal(modal);
                    }
                    alert('Заявка на вызов автомеханика отправлена! Наш специалист свяжется с вами.');
                }, 2000);
            }, 1500);
            
            // Реальная отправка (раскомментировать когда будет готов бэкенд)
            /*
            try {
                const response = await fetch('/api/send-mechanic', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    // успех
                }
            } catch (error) {
                console.error('Ошибка отправки:', error);
            }
            */
        });
    }

    // Добавляем триггер для открытия модального окна механика
    if (mechanicTrigger) {
        mechanicTrigger.addEventListener('click', () => {
            const modal = document.getElementById('mechanicModal');
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }