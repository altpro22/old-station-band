const CONFIG = {
    whatsapp: "5552924717",
    facebook: "https://www.facebook.com/profile.php?id=61575004556983&sk=directory_contact_info",
    instagram: "https://www.instagram.com/jldavid_mx/",
    maps: "https://maps.app.goo.gl/HN7bNvnZ56yEZTP76", 
    youtubeUrl: "https://www.youtube.com/shorts/7NWN73CYBlY",
    textos: {
        cat1: { 
            t: "NUESTRA HISTORIA", 
            c: "Nacemos de la pasión por la perfección estética. En nuestro santuario, cada trazo y cada corte se ejecuta con la maestría de un artist, garantizando que tu imagen refleje la elegancia y el poder que llevas dentro. Somos más que un salón, somos tu aliado en la creación de una marca personal inolvidable." 
        },
        cat2: { 
            t: "SERVICIOS EXCLUSIVOS", 
            c: "Desde colorimetría avanzada que respeta la salud de tu fibra capilar, hasta diseños de corte vanguardistas. Nuestro equipo domina las tendencias globales de Balayage, tratamientos de reconstrucción profunda y estilismo para eventos de alto nivel. Aquí, la calidad no es un servicio, es nuestro estándar innegociable." 
        },
        cat3: { 
            t: "CLUB DE EXCLUSIVIDAD", 
            c: "La exclusividad merece reconocimiento. Disfruta de nuestras promociones diseñadas para la mujer Mona Lisa: \n\n• LUNES DE COLOR: 20% de descuento en servicios químicos.\n• MARTES DE HIDRATACIÓN: Tratamiento VIP en cada corte.\n• JUEVES DE AMIGAS: Promociones grupales exclusivas." 
        }
    }
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

    const imgCount = (cat === 'cat1' || cat === 'cat2' || cat === 'cat3') ? 6 : 4;
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