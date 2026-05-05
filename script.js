const CONFIG = {
    whatsapp: "3521473400",
    // CORRECCIÓN: URL de Facebook verificada
    facebook: "https://www.facebook.com/oldStationband", 
    instagram: "https://www.instagram.com/oldstationband?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    maps: "https://maps.app.goo.gl/gEyF4uFKyhR14JyJA", 
    youtubeUrl: "https://www.youtube.com/shorts/D6MdXW2gSXw",
    musicalVideos: [
        { name: "Long Cool Woman", link: "https://www.youtube.com/watch?v=ZS8MfMiXIIY" },
        { name: "Don't Bring Me Down", link: "https://www.youtube.com/watch?v=qEfmCHOOeoY" },
        { name: "La Grange", link: "https://www.youtube.com/watch?v=uQTgulMwCC4" },
        { name: "Talking In Your Sleep", link: "https://www.youtube.com/watch?v=ufkj80qcJ58" }
    ],
    textos: {
        cat1: { 
            t: "CONÓCENOS", 
            c: "Old Station Band es una reconocida banda dedicada a rendir tributo al rock de las décadas 70s y 80s. Fundada en La Piedad Michoacán en el año 2004." 
        },
        cat2: { 
            t: "GALERIA MUSICAL", 
            c: "Disfruta de nuestros covers más icónicos grabados en vivo. José Luis Barba: Voz y teclados./ Emmanuel Martínez: Voz y guitarra electroacústica./ Damián Guardado: Guitarra líder./ Adrián Rodríguez: Batería./ Juan Medina: Bajo eléctrico."
        },
        cat3: { 
            t: "EVENTOS", 
            c: "Hemos sido galardonados con el 'Sol de Oro' como la 'Mejor Banda Tributo Rock de México' y 'Banda Revelación 2022'." 
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

    if(cat === 'cat2') {
        const videoGrid = document.createElement('div');
        videoGrid.className = 'video-musical-grid';
        CONFIG.musicalVideos.forEach(vid => {
            const vBtn = document.createElement('button');
            vBtn.className = 'btn-video-musical';
            vBtn.innerHTML = `<span>${vid.name}</span> <i class="fab fa-youtube"></i>`;
            vBtn.onclick = () => { playClick(); window.open(vid.link, '_blank'); };
            videoGrid.appendChild(vBtn);
        });
        grid.appendChild(videoGrid);
    } else {
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
    if(hideControls) { lightboxEl.classList.add('hide-nav-arrows'); } 
    else { lightboxEl.classList.remove('hide-nav-arrows'); }
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

// CORRECCIÓN 1: Directo a WhatsApp sin flyer previo
function openWAChat() {
    playClick();
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=Hola, deseo contratar a OLD STATION BAND.`, '_blank');
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
    // CORRECCIÓN 2: El link de Facebook ahora apunta a CONFIG.facebook actualizado
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
    try { await navigator.share({ title: 'OLD STATION BAND', url: window.location.href }); }
    catch { alert("Enlace copiado al portapapeles."); }
}