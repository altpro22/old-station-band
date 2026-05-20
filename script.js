const CONFIG = {
    whatsapp: "3522431415",
    facebook: "https://www.facebook.com/oldstationband",
    instagram: "https://www.instagram.com/oldstationband/",
    maps: "https://maps.app.goo.gl/gM3RDe5xeSCH1jqw6", 
    youtubeUrl: "https://www.youtube.com/shorts/D6MdXW2gSXw",
    textos: {
        cat1: { 
            t: "NUESTRA HISTORIA", 
            c: "Old Station Band es una reconocida agrupación mexicana originaria de La Piedad, Michoacán, fundada en 2004 por el músico y productor José Luis Barba (primera voz y tecladista). Destacan por su fiel ejecución de clásicos del rock de los años 60, 70 y 80" 
        },
        cat2: { 
            t: "VIDEOS MUSICALES", 
            c: "Reconocimiento Nacional: En 2022, la banda fue galardonada con el premio \"Sol de Oro\" otorgado por el Círculo Nacional de Periodistas (CINPE) en la Ciudad de México, en las categorías de Mejor Banda Revelación y Mejor Banda Tributo Rock de México." 
        },
        cat3: { 
            t: "CLUB DE EXCLUSIVIDAD", 
            c: "Nuestro repertorio abarca tributos a las grandes leyendas del rock en inglés y español, abarcando íconos como The Beatles, Queen y Bon Jovi:" 
        }
    },
    videosPlaylist: [
        { title: "Long Cool Woman In a Black Dress", url: "https://www.youtube.com/watch?v=ZS8MfMiXIIY" },
        { title: "Talking In Your Sleep", url: "https://www.youtube.com/watch?v=ufkj80qcJ58" },
        { title: "La Grange (ZZ Top)", url: "https://www.youtube.com/watch?v=uQTgulMwCC4" },
        { title: "Ghostbusters", url: "https://www.youtube.com/watch?v=qw0SyiahAL8" }
    ]
};

let currentGallery = [];
let currentIndex = 0;
let isMuted = false;

function openYouTubeVideo() { playClick(); window.open(CONFIG.youtubeUrl, '_blank'); }

function openProfileZoom() {
    playClick();
    const imgElement = document.getElementById('profile-pic-img');
    if(imgElement) {
        const src = imgElement.src;
        openLightbox(src, [src], true);
    }
}

function showAppContent(cat) {
    playClick();
    document.getElementById('dynamic-content-layer').style.display = 'flex';
    document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    const pane = document.getElementById(`${cat}-pane`);
    if(pane) pane.style.display = 'flex';
    if(cat !== 'cat4') renderGallery(cat);
}

function renderGallery(cat) {
    const grid = document.getElementById(`grid-${cat}`);
    if(!grid) return; 
    grid.innerHTML = '';
    
    const titleHeader = document.createElement('h2');
    titleHeader.className = 'gallery-title-white';
    titleHeader.innerText = CONFIG.textos[cat].t;
    grid.appendChild(titleHeader);

    if (cat === 'cat2') {
        // En lugar de imágenes, renderizamos la botonera de 4 canciones
        CONFIG.videosPlaylist.forEach(video => {
            const vBtn = document.createElement('a');
            vBtn.className = 'btn-video-rock';
            vBtn.href = video.url;
            vBtn.target = '_blank';
            vBtn.onclick = () => { playClick(); };
            vBtn.innerHTML = `<span>${video.title}</span> <i class="fab fa-youtube"></i>`;
            grid.appendChild(vBtn);
        });
    } else {
        // Mantiene la rejilla original intacta para las otras secciones
        const imgCount = (cat === 'cat1' || cat === 'cat3') ? 6 : 4;
        const imgs = [];
        for(let i = 1; i <= imgCount; i++) {
            imgs.push(`assets/gallery/${cat}/${i}.jpg`);
        }
        
        const rowGrid = document.createElement('div');
        rowGrid.className = 'quad-row-grid';
        
        imgs.forEach((src, index) => {
            const posClass = (index % 2 === 0) ? 'pos-left' : 'pos-right';
            rowGrid.appendChild(createPol(src, posClass, imgs));
        });
        
        grid.appendChild(rowGrid);
    }

    const btn = document.createElement('button');
    btn.className = 'btn-details-gold'; 
    btn.innerHTML = `<i class="fas fa-plus-circle"></i> VER DETALLES`;
    btn.onclick = (e) => { e.stopPropagation(); openTextZoom(cat); };
    grid.appendChild(btn);
}

function createPol(src, pos, arr) {
    const div = document.createElement('div');
    div.className = `polaroid-item ${pos}`;
    div.innerHTML = `<img src="${src}">`;
    div.onclick = (e) => { e.stopPropagation(); openLightbox(src, arr, false); };
    return div;
}

function openLightbox(src, arr, hideControls) {
    playClick();
    currentGallery = arr;
    currentIndex = arr.indexOf(src);
    
    const lightboxEl = document.getElementById('lightbox');
    const imgEl = document.getElementById('lightbox-image');
    
    if(hideControls) {
        lightboxEl.classList.add('hide-nav-arrows');
    } else {
        lightboxEl.classList.remove('hide-nav-arrows');
    }
    
    imgEl.src = src;
    lightboxEl.style.display = 'flex';
}

function changeLightboxImage(dir) {
    if(currentGallery.length <= 1) return;
    playClick();
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    document.getElementById('lightbox-image').src = currentGallery[currentIndex];
}

function openTextZoom(cat) {
    playClick();
    document.getElementById('text-zoom-title').innerText = CONFIG.textos[cat].t;
    document.getElementById('text-zoom-content').innerText = CONFIG.textos[cat].c;
    document.getElementById('text-zoom-modal').style.display = 'flex';
}

function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }
function closeAppContent() { document.getElementById('dynamic-content-layer').style.display = 'none'; }
function closeTextZoom() { document.getElementById('text-zoom-modal').style.display = 'none'; }

function openBrandModal(modalId) {
    playClick();
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeBrandModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function playClickSound() {
    playClick();
}

function openWAChat() {
    playClick();
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=Hola, deseo agendar una cita.`, '_blank');
}

function toggleAudioGlobal() {
    isMuted = !isMuted;
    const spot = document.getElementById('spot-intro');
    const icon = document.getElementById('audio-icon');
    spot.muted = isMuted;
    icon.className = isMuted ? "fas fa-volume-mute" : "fas fa-volume-up";
}

function playClick() {
    const snd = document.getElementById('sndFxClick');
    if(snd && !isMuted) { snd.currentTime = 0; snd.play().catch(()=>{}); }
}

document.addEventListener('DOMContentLoaded', () => {
    const fbLink = document.getElementById('link-fb-direct');
    const mapsLink = document.getElementById('link-maps-direct');
    const igLink = document.getElementById('link-ig-direct');
    
    if(fbLink) fbLink.href = CONFIG.facebook;
    if(mapsLink) mapsLink.href = CONFIG.maps;
    if(igLink) igLink.href = CONFIG.instagram;

    window.addEventListener('click', () => {
        const spot = document.getElementById('spot-intro');
        if(spot && !isMuted) spot.play().catch(()=>{});
    }, {once: true});
});

async function shareExperienceRobust() {
    try { await navigator.share({ title: 'Salón Express Mona Lisa', url: window.location.href }); }
    catch { alert("Enlace copiado al portapapeles."); }
}