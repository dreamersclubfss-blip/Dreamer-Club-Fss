// Initialisation AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Gestion du préloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.remove('no-scroll');
    }, 1500);
});

// Gestion du menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
        
        // Animation du lien cliqué
        const ripple = this.querySelector('.nav-ripple');
        if (ripple) {
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            ripple.classList.remove('animating');
            void ripple.offsetWidth;
            ripple.classList.add('animating');
        }
    });
});

// Navigation active au scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function highlightNavItem() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 200;
        const sectionId = section.getAttribute('id');
        const navItem = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => item.classList.remove('active'));
            if (navItem) navItem.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavItem);

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Animations des statistiques
function animateStats() {
    const stats = document.querySelectorAll('[data-count]');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Observer pour les statistiques
const statsSection = document.querySelector('.home-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    observer.observe(statsSection);
}

// ===== Gallery System =====
class EventGallery {
    constructor() {
        this.currentEvent = null;
        this.currentMediaIndex = 0;
        this.mediaItems = [];
        this.isZoomed = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Open gallery buttons
        document.querySelectorAll('.open-gallery-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const eventName = btn.getAttribute('data-event');
                const eventTitle = btn.getAttribute('data-event-title');
                console.log(`Opening gallery for: ${eventName} - ${eventTitle}`);
                this.openGallery(eventName, eventTitle);
            });
        });

        // Close gallery
        document.querySelector('.close-gallery').addEventListener('click', () => {
            this.closeGallery();
        });

        // Close on overlay click
        document.querySelector('.modal-overlay').addEventListener('click', () => {
            this.closeGallery();
        });

        // Navigation buttons
        document.querySelector('.gallery-nav.prev').addEventListener('click', () => {
            this.prevMedia();
        });

        document.querySelector('.gallery-nav.next').addEventListener('click', () => {
            this.nextMedia();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('galleryModal').classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeGallery();
                        break;
                    case 'ArrowLeft':
                        this.prevMedia();
                        break;
                    case 'ArrowRight':
                        this.nextMedia();
                        break;
                    case ' ':
                        e.preventDefault();
                        const currentMedia = this.mediaItems[this.currentMediaIndex];
                        if (currentMedia && currentMedia.type === 'video') {
                            this.toggleVideoPlayback();
                        }
                        break;
                }
            }
        });
        
        // Zoom button
        document.querySelector('.zoom-btn').addEventListener('click', () => {
            this.toggleZoom();
        });

        // Fullscreen button
        document.querySelector('.fullscreen-btn').addEventListener('click', () => {
            this.toggleFullscreen();
        });
    }

    // Définition de tous les événements avec leurs médias Imgur
    getEventMedia(eventName) {
        console.log(`Getting media for event: ${eventName}`);
        
        // Liens Imgur organisés par événement
        const events = {
            // Journée d'intégration 2024
            'integration-2024': {
                photos: [
                    'https://imgur.com/NOWjihA.jpg',
                    'https://imgur.com/tYXJllH.jpg',
                    'https://imgur.com/MZ20SA9.jpg',
                    'https://imgur.com/BRnWSvU.jpg',
                    'https://imgur.com/xA4ss3f.jpg',
                    'https://imgur.com/f1zxZaU.jpg',
                    'https://imgur.com/4HTPu2S.jpg',
                    'https://imgur.com/kihvBFy.jpg',
                    'https://imgur.com/Nybmrr2.jpg',
                    'https://imgur.com/7cVXFL8.jpg',
                    'https://imgur.com/8E7Leym.jpg',
                    'https://imgur.com/bfbCvcl.jpg',
                    'https://imgur.com/6kbWr92.jpg',
                    'https://imgur.com/nM3lRMA.jpg',
                    'https://imgur.com/YjeN0x5.jpg',
                    'https://imgur.com/cNmusxZ.jpg'
                ]
            },
            
            // Journée d'intégration 2025
            'integration-2025': {
                photos: [
                    'https://imgur.com/RO2r8JQ.jpg',
                    'https://imgur.com/ZmFT0wP.jpg',
                    'https://imgur.com/Atr2XpR.jpg',
                    'https://imgur.com/5XlBKuZ.jpg',
                    'https://imgur.com/gQ8ltvQ.jpg'
                ],
                videos: [
                    'https://imgur.com/pTvsh28.mp4',
                    'https://imgur.com/WcIdPnE.mp4'
                ]
            },
            
            // Chaleur
            'chaleur': {
                photos: [
                    'https://imgur.com/0wgtVoP.jpg',
                    'https://imgur.com/fZpUO2P.jpg',
                    'https://imgur.com/duhdjg5.jpg',
                    'https://imgur.com/7uRhr9P.jpg',
                    'https://imgur.com/Ls8khpy.jpg',
                    'https://imgur.com/HNb1MJN.jpg'
                ]
            },
            
            // Harmony 1
            'harmony-1': {
                photos: [
                    'https://imgur.com/0XXzWkk.jpg',
                    'https://imgur.com/Amgq3SX.jpg',
                    'https://imgur.com/SPk0spj.jpg',
                    'https://imgur.com/toYfvfd.jpg',
                    'https://imgur.com/DTd48oA.jpg',
                    'https://imgur.com/gMFMnck.jpg',
                    'https://imgur.com/9LXZvPB.jpg'
                ],
                videos: [
                    'https://imgur.com/RxDqpNR.mp4',
                    'https://imgur.com/K9yQgkC.mp4',
                    'https://imgur.com/2xYgKcz.mp4',
                    'https://imgur.com/9Sfxp2l.mp4',
                    'https://imgur.com/MCNLfgo.mp4',
                    'https://imgur.com/NHAExi7.mp4'
                ]
            },
            
            // Personal Branding
            'personal-branding': {
                photos: [
                    'https://imgur.com/EZVoyGV.jpg',
                    'https://imgur.com/n557Rq5.jpg',
                    'https://imgur.com/XL44iOm.jpg',
                    'https://imgur.com/YszAWpw.jpg',
                    'https://imgur.com/14bA0el.jpg'
                ]
            },
            
            // Transport
            'transport': {
                photos: [
                    'https://imgur.com/sbWBNnp.jpg',
                    'https://imgur.com/zkTSh4x.jpg',
                    'https://imgur.com/mYWGZfY.jpg',
                    'https://imgur.com/Zv9BikN.jpg',
                    'https://imgur.com/P8tV16O.jpg',
                    'https://imgur.com/DbgnnEv.jpg'
                ]
            },
            
            // Zaretna Barka
            'zaretna-barka': {
                videos: [
                    'https://imgur.com/bvoFvC6.mp4',
                    'https://imgur.com/VFGuxrE.mp4',
                    'https://imgur.com/Kcjsg52.mp4',
                    'https://imgur.com/9lmKVdx.mp4',
                    'https://imgur.com/X9eurEZ.mp4',
                    'https://imgur.com/LBKH77o.mp4'
                ]
            },
            
            // Game Day
            'game-day': {
                photos: [
                    'https://imgur.com/BtcGc7w.jpg',
                    'https://imgur.com/JioEFEN.jpg',
                    'https://imgur.com/O0hiB4z.jpg',
                    'https://imgur.com/qTnvv58.jpg',
                    'https://imgur.com/XjGa0bB.jpg',
                    'https://imgur.com/UMEBpFs.jpg',
                    'https://imgur.com/junDQML.jpg',
                    'https://imgur.com/qTbGuZj.jpg',
                    'https://imgur.com/xzflDMp.jpg',
                    'https://imgur.com/mubCZD4.jpg',
                    'https://imgur.com/wOxUWm1.jpg',
                    'https://imgur.com/ZHaX9ad.jpg',
                    'https://imgur.com/HEQu5tK.jpg',
                    'https://imgur.com/bxE3qHT.jpg',
                    'https://imgur.com/SsNilpC.jpg'
                ]
            },
            
            // Harmony 2
            'harmony-2': {
                photos: [
                    'https://imgur.com/xeEs7wD.jpg',
                    'https://imgur.com/E6SSqox.jpg',
                    'https://imgur.com/AeTtOwt.jpg',
                    'https://imgur.com/18fSti6.jpg',
                    'https://imgur.com/Ia4uIRd.jpg',
                    'https://imgur.com/VlBFnQa.jpg',
                    'https://imgur.com/4Iw5RhP.jpg'
                ],
                videos: [
                    'https://imgur.com/Ov2ykFa.mp4',
                    'https://imgur.com/mf9Qngx.mp4',
                    'https://imgur.com/CVHtG2D.mp4'
                ]
            },
            
            // Football
            'football': {
                photos: [
                    'https://imgur.com/pQfLbzC.jpg',
                    'https://imgur.com/2qZKyAr.jpg',
                    'https://imgur.com/ggeamjX.jpg',
                    'https://imgur.com/JEFJqA9.jpg'
                ],
                videos: [
                    'https://imgur.com/2FTi0ct.mp4'
                ]
            }
        };

        return events[eventName] || { photos: [], videos: [] };
    }

    openGallery(eventName, eventTitle) {
        console.log(`Opening gallery: ${eventName}`);
        
        this.currentEvent = eventName;
        this.currentMediaIndex = 0;
        this.isZoomed = false;
        
        // Update title
        document.getElementById('galleryTitle').textContent = eventTitle;
        
        // Get media for this event
        const eventMedia = this.getEventMedia(eventName);
        console.log(`Found media:`, eventMedia);
        
        this.mediaItems = [];
        
        // Add photos
        if (eventMedia.photos && eventMedia.photos.length > 0) {
            eventMedia.photos.forEach((url, index) => {
                this.mediaItems.push({
                    type: 'photo',
                    url: url,
                    number: index + 1
                });
            });
        }
        
        // Add videos
        if (eventMedia.videos && eventMedia.videos.length > 0) {
            eventMedia.videos.forEach((url, index) => {
                this.mediaItems.push({
                    type: 'video',
                    url: url,
                    number: index + 1 + (eventMedia.photos ? eventMedia.photos.length : 0)
                });
            });
        }
        
        console.log(`Total media items: ${this.mediaItems.length}`);
        
        // Show gallery
        const galleryModal = document.getElementById('galleryModal');
        if (galleryModal) {
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.classList.add('no-scroll');
            
            // Load media
            this.loadMedia();
            this.updateThumbnails();
            this.updateControls();
        }
    }

    closeGallery() {
        // Stop any playing videos
        const currentMedia = this.mediaItems[this.currentMediaIndex];
        if (currentMedia && currentMedia.type === 'video') {
            const videoElement = document.querySelector('.media-item.active video');
            if (videoElement) {
                videoElement.pause();
            }
        }
        
        // Close gallery
        const galleryModal = document.getElementById('galleryModal');
        if (galleryModal) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('no-scroll');
            
            // Reset zoom
            this.isZoomed = false;
            const imgElement = document.querySelector('.media-item.active img');
            if (imgElement) {
                imgElement.classList.remove('zoomed');
            }
        }
    }

    loadMedia() {
        const viewer = document.querySelector('.gallery-viewer');
        if (!viewer || this.mediaItems.length === 0) {
            console.log('No media items to load');
            viewer.innerHTML = '<div class="media-error"><i class="fas fa-exclamation-triangle"></i><p>Aucun média disponible pour cet événement</p></div>';
            return;
        }
        
        const mediaItem = this.mediaItems[this.currentMediaIndex];
        console.log(`Loading media: ${mediaItem.url}`);
        
        // Clear viewer
        viewer.innerHTML = '';
        
        // Create media element
        let mediaElement;
        if (mediaItem.type === 'photo') {
            mediaElement = document.createElement('img');
            mediaElement.src = mediaItem.url;
            mediaElement.alt = `Photo ${mediaItem.number}`;
            mediaElement.loading = 'lazy';
            mediaElement.addEventListener('click', () => this.toggleZoom());
            mediaElement.addEventListener('error', () => {
                console.error(`Failed to load image: ${mediaItem.url}`);
                this.showMediaError(mediaElement, mediaItem);
            });
            mediaElement.addEventListener('load', () => {
                console.log(`Image loaded successfully: ${mediaItem.url}`);
            });
        } else {
            mediaElement = document.createElement('video');
            mediaElement.src = mediaItem.url;
            mediaElement.controls = true;
            mediaElement.preload = 'metadata';
            mediaElement.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleVideoPlayback();
            });
            mediaElement.addEventListener('error', () => {
                console.error(`Failed to load video: ${mediaItem.url}`);
                this.showMediaError(mediaElement, mediaItem);
            });
            mediaElement.addEventListener('loadeddata', () => {
                console.log(`Video loaded successfully: ${mediaItem.url}`);
            });
        }
        
        // Create container
        const container = document.createElement('div');
        container.className = 'media-item active';
        container.appendChild(mediaElement);
        viewer.appendChild(container);
        
        // Update info
        this.updateInfo();
    }

    showMediaError(element, mediaItem) {
        console.error(`Failed to load media: ${mediaItem.url}`);
        element.style.display = 'none';
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'media-error';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>Impossible de charger le média</p>
            <p class="media-path">${mediaItem.url}</p>
        `;
        element.parentNode.appendChild(errorDiv);
    }

    updateInfo() {
        if (this.mediaItems.length === 0) return;
        
        const mediaItem = this.mediaItems[this.currentMediaIndex];
        
        const currentIndex = document.querySelector('.current-index');
        const totalCount = document.querySelector('.total-count');
        const typeBadge = document.querySelector('.media-type-badge');
        
        if (currentIndex) currentIndex.textContent = this.currentMediaIndex + 1;
        if (totalCount) totalCount.textContent = this.mediaItems.length;
        if (typeBadge && mediaItem) {
            typeBadge.textContent = mediaItem.type === 'photo' ? 'Photo' : 'Vidéo';
            typeBadge.className = 'media-type-badge ' + mediaItem.type;
        }
        
        // Update navigation buttons
        const prevBtn = document.querySelector('.gallery-nav.prev');
        const nextBtn = document.querySelector('.gallery-nav.next');
        
        if (prevBtn) prevBtn.disabled = this.currentMediaIndex === 0;
        if (nextBtn) nextBtn.disabled = this.currentMediaIndex === this.mediaItems.length - 1;
    }

    updateThumbnails() {
        const container = document.querySelector('.gallery-thumbnails');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.mediaItems.length === 0) {
            container.innerHTML = '<p class="no-thumbnails">Aucun média disponible</p>';
            return;
        }
        
        this.mediaItems.forEach((item, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${item.type} ${index === this.currentMediaIndex ? 'active' : ''}`;
            thumbnail.setAttribute('data-index', index);
            thumbnail.addEventListener('click', () => {
                this.currentMediaIndex = index;
                this.loadMedia();
                this.updateThumbnails();
                this.updateControls();
            });
            
            if (item.type === 'photo') {
                const img = document.createElement('img');
                img.src = item.url;
                img.alt = `Thumbnail ${item.number}`;
                img.loading = 'lazy';
                thumbnail.appendChild(img);
            } else {
                const videoThumb = document.createElement('div');
                videoThumb.className = 'video-thumbnail';
                videoThumb.innerHTML = '<i class="fas fa-play"></i>';
                thumbnail.appendChild(videoThumb);
            }
            
            container.appendChild(thumbnail);
        });
    }

    updateControls() {
        if (this.mediaItems.length === 0) return;
        
        const mediaItem = this.mediaItems[this.currentMediaIndex];
        const zoomBtn = document.querySelector('.zoom-btn');
        
        if (zoomBtn) {
            if (mediaItem && mediaItem.type === 'photo') {
                zoomBtn.style.display = 'flex';
            } else {
                zoomBtn.style.display = 'none';
            }
        }
    }

    prevMedia() {
        if (this.currentMediaIndex > 0) {
            this.currentMediaIndex--;
            this.loadMedia();
            this.updateThumbnails();
            this.updateControls();
        }
    }

    nextMedia() {
        if (this.currentMediaIndex < this.mediaItems.length - 1) {
            this.currentMediaIndex++;
            this.loadMedia();
            this.updateThumbnails();
            this.updateControls();
        }
    }

    toggleZoom() {
        const imgElement = document.querySelector('.media-item.active img');
        if (imgElement) {
            this.isZoomed = !this.isZoomed;
            imgElement.classList.toggle('zoomed', this.isZoomed);
            
            const zoomBtn = document.querySelector('.zoom-btn');
            if (zoomBtn) {
                zoomBtn.innerHTML = this.isZoomed ? 
                    '<i class="fas fa-search-minus"></i>' : 
                    '<i class="fas fa-search-plus"></i>';
            }
        }
    }

    toggleVideoPlayback() {
        const videoElement = document.querySelector('.media-item.active video');
        if (videoElement) {
            if (videoElement.paused) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        }
    }

    toggleFullscreen() {
        const viewer = document.querySelector('.gallery-viewer');
        if (!viewer) return;
        
        if (!document.fullscreenElement) {
            viewer.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// Retour en haut
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Afficher/masquer le bouton
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
}

// Traductions
const translations = {
    fr: {
        // Navigation
        "home": "Accueil",
        "information": "Notre Histoire",
        "events": "Événements",
        "chapters": "Chapitres",
        "join": "Rejoindre",
        "contact": "Contact",
        "joinButton": "Rejoindre le Club",
        
        // Home Section
        "homeSubtitle": "Rêver. Créer. Inspirer.",
        "homeDescription": "Un club dynamique et polyvalent au sein de la Faculté des Sciences de Sfax, dédié à la formation, au développement personnel et à l'épanouissement de ses membres.",
        "chaptersCount": "Chapitres",
        "membersCount": "Membres actifs",
        "eventsCount": "Événements/an",
        
        // Information Section
        "infoTitle": "Notre Histoire",
        "infoSubtitle": "Une vision d'inspiration et d'engagement",
        "founderTitle": "Fondateur du Dreamers Club FSS",
        "founderQuote": "\"Le Dreamers Club FSS n'est pas seulement un club – c'est une famille, un espace de créativité, de développement personnel et d'engagement. On rêve, on agit, on inspire, Ensemble...\"",
        
        // Events Section
        "eventsTitle": "Nos Événements 2024/2025",
        "eventsSubtitle": "Des moments inoubliables, des expériences enrichissantes",
        
        // Chapters Section
        "chaptersTitle": "Nos Chapitres",
        "chaptersSubtitle": "Cinq domaines d'activité, une seule passion",
        
        // Join Section
        "joinTitle": "Rejoignez les Dreamers",
        "joinSubtitle": "Faites partie de notre famille créative",
        
        // Contact Section
        "contactTitle": "Contact",
        "contactSubtitle": "Restons connectés",
        "officeTitle": "Notre Local",
        
        // Footer
        "quickLinks": "Liens Rapides",
        "ourChapters": "Nos Chapitres",
        "contactInfo": "Contact",
        "backToTop": "Retour en haut"
    },
    
    en: {
        // Navigation
        "home": "Home",
        "information": "Our Story",
        "events": "Events",
        "chapters": "Chapters",
        "join": "Join",
        "contact": "Contact",
        "joinButton": "Join the Club",
        
        // Home Section
        "homeSubtitle": "Dream. Create. Inspire.",
        "homeDescription": "A dynamic and versatile club within the Faculty of Sciences of Sfax, dedicated to training, personal development and fulfillment of its members.",
        "chaptersCount": "Chapters",
        "membersCount": "Active members",
        "eventsCount": "Events/year",
        
        // Information Section
        "infoTitle": "Our Story",
        "infoSubtitle": "A vision of inspiration and commitment",
        "founderTitle": "Founder of Dreamers Club FSS",
        "founderQuote": "\"Dreamers Club FSS is not just a club – it's a family, a space for creativity, personal development and commitment. We dream, we act, we inspire, Together...\"",
        
        // Events Section
        "eventsTitle": "Our Events 2024/2025",
        "eventsSubtitle": "Unforgettable moments, enriching experiences",
        
        // Chapters Section
        "chaptersTitle": "Our Chapters",
        "chaptersSubtitle": "Five areas of activity, one passion",
        
        // Join Section
        "joinTitle": "Join the Dreamers",
        "joinSubtitle": "Be part of our creative family",
        
        // Contact Section
        "contactTitle": "Contact",
        "contactSubtitle": "Let's stay connected",
        "officeTitle": "Our Office",
        
        // Footer
        "quickLinks": "Quick Links",
        "ourChapters": "Our Chapters",
        "contactInfo": "Contact Info",
        "backToTop": "Back to top"
    }
};

// Changement de langue
const langButtons = document.querySelectorAll('.lang-btn');
langButtons.forEach(button => {
    button.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        
        // Mettre à jour les boutons actifs
        langButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Changer le contenu selon la langue
        translatePage(lang);
    });
});

// Fonction de traduction
function translatePage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// ===== Form Iframe Management =====
function initializeFormIframe() {
    const iframe = document.getElementById('recruitmentForm');
    const formWrapper = document.querySelector('.form-wrapper');
    
    if (!iframe) return;
    
    // Montrer un loader pendant le chargement
    formWrapper.classList.add('loading');
    
    // Gérer le chargement de l'iframe
    iframe.addEventListener('load', function() {
        formWrapper.classList.remove('loading');
    });
    
    // Gérer les erreurs de chargement
    iframe.addEventListener('error', function() {
        formWrapper.classList.remove('loading');
        showIframeError();
    });
}

function showIframeError() {
    const formWrapper = document.querySelector('.form-wrapper');
    const errorHTML = `
        <div class="iframe-error">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h4>Formulaire temporairement indisponible</h4>
            <p>Le formulaire de recrutement n'est pas accessible pour le moment.</p>
            <div class="error-actions">
                <a href="mailto:dreamersclubfss@gmail.com" class="btn btn-gold btn-small">
                    <i class="fas fa-envelope"></i>
                    Postuler par email
                </a>
                <button onclick="location.reload()" class="btn btn-outline btn-small">
                    <i class="fas fa-redo"></i>
                    Réessayer
                </button>
            </div>
        </div>
    `;
    
    formWrapper.innerHTML = errorHTML;
}

// Initialiser le formulaire iframe
initializeFormIframe();

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    highlightNavItem();
    
    // Initialiser le système de galerie
    const eventGallery = new EventGallery();
    window.eventGallery = eventGallery;
    
    // Initialiser les particules
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#D4AF37" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#D4AF37",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            },
            retina_detect: true
        });
    }
    
    // Vérifier l'URL hash pour activer la bonne section
    const hash = window.location.hash;
    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
    
    console.log('Dreamers Club FSS website loaded successfully!');
});