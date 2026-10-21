// Application State (Built-in Default Language is English)
const state = {
  currentLang: 'en',
  selectedCategory: null,
  searchQuery: '',
  selectedServices: new Set(),
  activeServiceForDirectOrder: null
};

// SVG Icons mapping
function getIconSvg(iconName, className = "w-5 h-5") {
  const icons = {
    "share-2": `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    "pen-tool": `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>`,
    "briefcase": `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
    "printer": `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>`,
    "heart": `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    "utensils": `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 2v10"/><path d="M15 16v6"/><path d="M9 2v4a3 3 0 0 1-6 0V2"/><path d="M6 6v16"/></svg>`,
    "shopping-bag": `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    "graduation-cap": `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    "image": `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`,
    "award": `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
    "sparkles": `<svg class="${className}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    "whatsapp": `<svg class="${className}" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>`
  };
  return icons[iconName] || icons["sparkles"];
}

// Initial Setup: Always show Language Selection Popup on website open!
document.addEventListener('DOMContentLoaded', () => {
  // Apply English as built-in default
  applyLanguage('en');

  // Show Language Selection Modal on open
  showLanguageModal();

  setupEventListeners();
  setupNetworkAndRouteListeners();
  renderMainView();
  updateInquiryBar();
});

// Language Modal Handling
function showLanguageModal() {
  const modal = document.getElementById('languageModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function hideLanguageModal() {
  const modal = document.getElementById('languageModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function selectLanguage(lang) {
  state.currentLang = lang;
  localStorage.setItem('selected_language', lang);
  hideLanguageModal();
  applyLanguage(lang);
}

function applyLanguage(lang) {
  const html = document.documentElement;
  const body = document.body;
  const t = window.translations[lang];

  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');

  if (lang === 'ur') {
    body.classList.add('lang-ur');
  } else {
    body.classList.remove('lang-ur');
  }

  // Update translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  // Re-render
  renderMainView();
  updateInquiryBar();
  renderFooterCategories();

  // Update error overlay text if active
  if (currentErrorType) {
    showErrorOverlay(currentErrorType);
  }
}

function toggleLanguage() {
  const nextLang = state.currentLang === 'ur' ? 'en' : 'ur';
  selectLanguage(nextLang);
}

// Main View Router: Controls whether to show Categories OR Services
function renderMainView() {
  const isUr = state.currentLang === 'ur';
  const t = window.translations[state.currentLang];
  const container = document.getElementById('contentContainer');
  const viewHeader = document.getElementById('viewHeaderContainer');
  if (!container) return;

  // Case 1: User is searching
  if (state.searchQuery.trim() !== '') {
    renderSearchResults();
    return;
  }

  // Case 2: A specific category is selected
  if (state.selectedCategory !== null) {
    renderCategoryServices(state.selectedCategory);
    return;
  }

  // Case 3: Default view -> Show 11 Categories cleanly (Do NOT expose all 117 services directly)
  renderCategoriesGrid();
}

// Render 11 Categories as clean cards
function renderCategoriesGrid() {
  const isUr = state.currentLang === 'ur';
  const t = window.translations[state.currentLang];
  const container = document.getElementById('contentContainer');
  const viewHeader = document.getElementById('viewHeaderContainer');
  if (!container) return;

  if (viewHeader) {
    viewHeader.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/70 text-pink-700 text-xs font-bold mb-2">
            11 Categories Available
          </span>
          <h2 class="text-2xl md:text-3xl font-extrabold text-slate-950">${t.categoriesHeading}</h2>
          <p class="text-xs md:text-sm text-slate-500 mt-1">${t.categoriesSubheading}</p>
        </div>
      </div>
    `;
  }

  let html = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">`;

  window.categoriesData.forEach(cat => {
    const title = isUr ? cat.title_ur : cat.title_en;
    const desc = isUr ? cat.description_ur : cat.description_en;
    const count = window.servicesData.filter(s => s.categoryId === cat.id).length;

    html += `
      <div 
        onclick="openCategory(${cat.id})"
        class="category-card p-6 flex flex-col justify-between group"
      >
        <div>
          <div class="flex items-center justify-between gap-3 mb-4">
            <div class="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-100 text-pink-600 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-all shadow-sm">
              ${getIconSvg(cat.icon, 'w-6 h-6')}
            </div>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
              ${count} ${t.servicesCountText}
            </span>
          </div>

          <h3 class="text-lg font-extrabold text-slate-900 group-hover:text-pink-600 transition-colors mb-2 leading-relaxed">
            ${title}
          </h3>
          <p class="text-xs md:text-sm text-slate-500 line-clamp-2 leading-relaxed mb-6">
            ${desc}
          </p>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-pink-600 flex items-center gap-1.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
            <span>${t.viewServices}</span>
            <svg class="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </span>
          <span class="text-[11px] text-slate-400 font-medium">100% Custom</span>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// Open Specific Category to view its services only
function openCategory(catId) {
  state.selectedCategory = catId;
  state.searchQuery = '';
  const searchInput = document.getElementById('serviceSearchInput');
  if (searchInput) searchInput.value = '';
  renderMainView();

  // Smooth scroll to services area
  const el = document.getElementById('servicesExplorerArea');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Back to Categories Overview
function backToCategories() {
  state.selectedCategory = null;
  state.searchQuery = '';
  const searchInput = document.getElementById('serviceSearchInput');
  if (searchInput) searchInput.value = '';
  renderMainView();
}

// Render Services for a Selected Category
function renderCategoryServices(catId) {
  const isUr = state.currentLang === 'ur';
  const t = window.translations[state.currentLang];
  const container = document.getElementById('contentContainer');
  const viewHeader = document.getElementById('viewHeaderContainer');
  if (!container) return;

  const cat = window.categoriesData.find(c => c.id === catId);
  const catTitle = isUr ? cat.title_ur : cat.title_en;
  const catDesc = isUr ? cat.description_ur : cat.description_en;
  const services = window.servicesData.filter(s => s.categoryId === catId);

  if (viewHeader) {
    viewHeader.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <button 
            onclick="backToCategories()" 
            class="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-4 py-1.5 rounded-full transition-colors mb-3 border border-pink-200"
          >
            <span>${t.backToCategories}</span>
          </button>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
              ${getIconSvg(cat.icon, 'w-5 h-5')}
            </div>
            <div>
              <h2 class="text-xl md:text-2xl font-extrabold text-slate-950">${catTitle}</h2>
              <p class="text-xs text-slate-500">${catDesc} (${services.length} ${t.servicesCountText})</p>
            </div>
          </div>
        </div>

        <button 
          onclick="backToCategories()" 
          class="btn-white-pill px-4 py-2 rounded-full text-xs font-bold self-start md:self-auto flex items-center gap-1.5"
        >
          <svg class="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          <span>All Categories</span>
        </button>
      </div>
    `;
  }

  let html = `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">`;

  services.forEach(service => {
    const isSelected = state.selectedServices.has(service.id);
    const serviceTitle = isUr ? service.title_ur : service.title_en;

    html += `
      <div class="service-card p-5 flex flex-col justify-between ${isSelected ? 'selected-card' : ''}">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
              ${catTitle}
            </span>
            <div class="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
              ${getIconSvg(cat.icon, 'w-3.5 h-3.5')}
            </div>
          </div>

          <h3 class="text-base font-extrabold text-slate-900 mb-2 leading-relaxed">
            ${serviceTitle}
          </h3>
          <p class="text-xs text-slate-500 line-clamp-2 mb-4 leading-normal">
            ${isUr ? 'اعلیٰ کوالٹی ڈیزائن، پرنٹ یا سوشل میڈیا کے لیے مکمل طور پر تیار۔' : 'High-resolution bespoke design, ready for print & digital marketing.'}
          </p>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
          <button 
            onclick="toggleServiceSelection(${service.id})"
            class="flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm ${isSelected ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'btn-pink-pill text-white'}"
          >
            ${isSelected ? `
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              <span>${t.inCart}</span>
            ` : `
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span>${t.addToCart}</span>
            `}
          </button>

          <button 
            onclick="openOrderModalForSingle(${service.id})"
            title="${t.orderSingleService}"
            class="p-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// Render Search Results (Triggered when user types in search bar)
function renderSearchResults() {
  const isUr = state.currentLang === 'ur';
  const t = window.translations[state.currentLang];
  const container = document.getElementById('contentContainer');
  const viewHeader = document.getElementById('viewHeaderContainer');
  if (!container) return;

  const q = state.searchQuery.toLowerCase().trim();
  const results = window.servicesData.filter(s => 
    s.title_ur.toLowerCase().includes(q) ||
    s.title_en.toLowerCase().includes(q)
  );

  if (viewHeader) {
    viewHeader.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <button 
            onclick="backToCategories()" 
            class="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-4 py-1.5 rounded-full transition-colors mb-2 border border-pink-200"
          >
            <span>${t.backToCategories}</span>
          </button>
          <h2 class="text-xl md:text-2xl font-extrabold text-slate-950">
            ${isUr ? `تلاش کے نتائج: "${state.searchQuery}"` : `Search Results for: "${state.searchQuery}"`}
          </h2>
          <p class="text-xs text-slate-500">${results.length} ${t.servicesFound}</p>
        </div>

        <button 
          onclick="backToCategories()" 
          class="btn-white-pill px-4 py-2 rounded-full text-xs font-bold self-start md:self-auto"
        >
          Clear Search
        </button>
      </div>
    `;
  }

  if (results.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto">
        <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
          ${getIconSvg('sparkles', 'w-7 h-7')}
        </div>
        <h4 class="text-base font-bold text-slate-900 mb-1">${isUr ? 'کوئی سروس نہیں ملی' : 'No Services Found'}</h4>
        <p class="text-xs text-slate-500 mb-4">${isUr ? 'براہ کرم کوئی دوسرا لفظ تلاش کریں یا تمام کیٹیگریز دیکھیں۔' : 'Try searching another keyword or view all categories.'}</p>
        <button onclick="backToCategories()" class="btn-pink-pill px-6 py-2 rounded-full text-xs font-bold">
          ${t.backToCategories}
        </button>
      </div>
    `;
    return;
  }

  let html = `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">`;

  results.forEach(service => {
    const isSelected = state.selectedServices.has(service.id);
    const cat = window.categoriesData.find(c => c.id === service.categoryId);
    const catTitle = isUr ? cat.title_ur : cat.title_en;
    const serviceTitle = isUr ? service.title_ur : service.title_en;

    html += `
      <div class="service-card p-5 flex flex-col justify-between ${isSelected ? 'selected-card' : ''}">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-600 border border-pink-100">
              ${catTitle}
            </span>
            <div class="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
              ${getIconSvg(cat.icon, 'w-3.5 h-3.5')}
            </div>
          </div>

          <h3 class="text-base font-extrabold text-slate-900 mb-2 leading-relaxed">
            ${serviceTitle}
          </h3>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
          <button 
            onclick="toggleServiceSelection(${service.id})"
            class="flex-1 py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm ${isSelected ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'btn-pink-pill text-white'}"
          >
            ${isSelected ? `
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              <span>${t.inCart}</span>
            ` : `
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span>${t.addToCart}</span>
            `}
          </button>

          <button 
            onclick="openOrderModalForSingle(${service.id})"
            title="${t.orderSingleService}"
            class="p-2 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// Basket & Selection Logic
function toggleServiceSelection(id) {
  if (state.selectedServices.has(id)) {
    state.selectedServices.delete(id);
  } else {
    state.selectedServices.add(id);
  }
  renderMainView();
  updateInquiryBar();
}

function clearAllSelections() {
  state.selectedServices.clear();
  state.activeServiceForDirectOrder = null;
  renderMainView();
  updateInquiryBar();
  renderModalSelectedChips([]);
}

function updateInquiryBar() {
  const bar = document.getElementById('floatingInquiryBar');
  const countSpan = document.getElementById('selectedItemsCount');
  const headerCartCount = document.getElementById('headerCartCount');
  const footerCartCount = document.getElementById('footerCartCount');

  const count = state.selectedServices.size;

  if (headerCartCount) headerCartCount.textContent = count;
  if (footerCartCount) footerCartCount.textContent = count;

  if (!bar) return;

  if (count > 0) {
    bar.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
    bar.classList.add('translate-y-0', 'opacity-100');
    if (countSpan) {
      countSpan.textContent = count;
    }
  } else {
    bar.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
    bar.classList.remove('translate-y-0', 'opacity-100');
  }
}

// Order Modal Functions (ONLY Client Name & Notes - NO phone, NO deadline)
function openOrderModalForSingle(serviceId) {
  state.activeServiceForDirectOrder = serviceId;
  const modal = document.getElementById('orderModal');
  const service = window.servicesData.find(s => s.id === serviceId);

  renderModalSelectedChips([service]);
  if (modal) modal.classList.remove('hidden');
}

function openOrderModalFromBasket() {
  state.activeServiceForDirectOrder = null;
  const modal = document.getElementById('orderModal');
  const services = Array.from(state.selectedServices).map(id => 
    window.servicesData.find(s => s.id === id)
  ).filter(Boolean);

  renderModalSelectedChips(services);
  if (modal) modal.classList.remove('hidden');
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  if (modal) modal.classList.add('hidden');
}

function renderModalSelectedChips(services) {
  const container = document.getElementById('modalSelectedChips');
  if (!container) return;

  const isUr = state.currentLang === 'ur';

  if (!services || services.length === 0) {
    container.innerHTML = `<span class="text-xs text-rose-500 font-medium">${isUr ? 'کوئی سروس منتخب نہیں کی گئی۔' : 'No services selected.'}</span>`;
    return;
  }

  let html = '';
  services.forEach(s => {
    const title = isUr ? s.title_ur : s.title_en;
    html += `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200 text-xs font-semibold">
        <span>${title}</span>
        <button type="button" onclick="removeChipFromOrder(${s.id})" class="hover:text-rose-600 hover:bg-pink-100 rounded-full w-4 h-4 flex items-center justify-center transition-colors">&times;</button>
      </span>
    `;
  });

  container.innerHTML = html;
}

function removeChipFromOrder(serviceId) {
  if (state.selectedServices.has(serviceId)) {
    state.selectedServices.delete(serviceId);
  }
  if (state.activeServiceForDirectOrder === serviceId) {
    state.activeServiceForDirectOrder = null;
  }
  const services = Array.from(state.selectedServices).map(id => 
    window.servicesData.find(s => s.id === id)
  ).filter(Boolean);
  renderModalSelectedChips(services);
  renderMainView();
  updateInquiryBar();
}

// WhatsApp Message Generator (Name, Services, Notes ONLY - NO customer phone, NO deadline)
function handleOrderFormSubmit(e) {
  e.preventDefault();

  const isUr = state.currentLang === 'ur';
  const nameInput = document.getElementById('clientName');
  const notesInput = document.getElementById('clientNotes');

  const name = nameInput ? nameInput.value.trim() : '';
  const notes = notesInput ? notesInput.value.trim() : '';

  if (!name) {
    alert(isUr ? 'براہ کرم اپنا نام درج فرمائیں۔' : 'Please enter your name.');
    return;
  }

  // Determine list of services
  let servicesToOrder = [];
  if (state.activeServiceForDirectOrder) {
    const s = window.servicesData.find(item => item.id === state.activeServiceForDirectOrder);
    if (s) servicesToOrder.push(s);
  } else if (state.selectedServices.size > 0) {
    servicesToOrder = Array.from(state.selectedServices).map(id => 
      window.servicesData.find(s => s.id === id)
    ).filter(Boolean);
  }

  if (servicesToOrder.length === 0) {
    alert(isUr ? 'براہ کرم کم از کم ایک سروس منتخب کریں۔' : 'Please select at least one service.');
    return;
  }

  // WhatsApp Message without phone or deadline
  let message = "";
  if (isUr) {
    message = `السلام علیکم!\nمیں شانی ڈیزائن اسٹوڈیو سے سروس حاصل کرنا چاہتا ہوں۔\n\n`;
    message += `👤 *کلائنٹ کا نام:* ${name}\n\n`;
    message += `🎨 *مطلوبہ سروسز (${servicesToOrder.length}):*\n`;
    servicesToOrder.forEach((s, idx) => {
      message += `${idx + 1}. ${s.title_ur}\n`;
    });
    if (notes) {
      message += `\n📝 *اضافی تفصیلات / نوٹ:*\n${notes}\n`;
    }
    message += `\n💡 برائے مہربانی ریٹ اور طریقہ کار شیئر فرمائیں۔ شکریہ!`;
  } else {
    message = `Hello!\nI would like to order design services from Shani Design Studio.\n\n`;
    message += `👤 *Client Name:* ${name}\n\n`;
    message += `🎨 *Requested Services (${servicesToOrder.length}):*\n`;
    servicesToOrder.forEach((s, idx) => {
      message += `${idx + 1}. ${s.title_en}\n`;
    });
    if (notes) {
      message += `\n📝 *Project Notes / Brief:*\n${notes}\n`;
    }
    message += `\n💡 Please share pricing and workflow details. Thank you!`;
  }

  const encodedMessage = encodeURIComponent(message);
  const waUrl = `https://wa.me/${window.WHATSAPP_PHONE}?text=${encodedMessage}`;

  // Open WhatsApp in new tab
  window.open(waUrl, '_blank');

  // Close modal
  closeOrderModal();

  // Reset form inputs
  if (nameInput) nameInput.value = '';
  if (notesInput) notesInput.value = '';

  // Clear selections
  clearAllSelections();

  // Show Customer Satisfaction / Happy Notes Modal
  showSatisfactionModal(name);
}

// Satisfaction & Happy Notes Modal Handlers
function showSatisfactionModal(clientName) {
  const modal = document.getElementById('satisfactionModal');
  const nameDisplay = document.getElementById('satisfactionClientName');
  if (nameDisplay) {
    nameDisplay.textContent = clientName ? `Dear ${clientName}` : '';
  }
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeSatisfactionModal() {
  const modal = document.getElementById('satisfactionModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Render Footer Quick Categories
function renderFooterCategories() {
  const container = document.getElementById('footerCategoriesList');
  if (!container) return;

  const isUr = state.currentLang === 'ur';
  let html = '';
  window.categoriesData.slice(0, 6).forEach(cat => {
    const title = isUr ? cat.title_ur : cat.title_en;
    html += `
      <li>
        <button onclick="openCategory(${cat.id})" class="hover:text-pink-600 transition-colors text-xs text-slate-600">
          ${title}
        </button>
      </li>
    `;
  });
  container.innerHTML = html;
}

// Search & Filter Listeners
function setupEventListeners() {
  const searchInput = document.getElementById('serviceSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMainView();
    });
  }

  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', handleOrderFormSubmit);
  }
}

// ==================== 404 & OFFLINE ERROR HANDLING ====================
let currentErrorType = null;

function showErrorOverlay(type = '404') {
  currentErrorType = type;
  const overlay = document.getElementById('error404Overlay');
  const descEl = document.getElementById('errorOverlayDesc');
  const detailEl = document.getElementById('errorOverlayDetail');
  const isUr = state.currentLang === 'ur';

  if (!overlay) return;

  if (type === 'offline') {
    if (descEl) descEl.textContent = isUr ? 'انٹرنیٹ رابطہ منقطع ہے' : 'No Internet Connection';
    if (detailEl) detailEl.textContent = isUr 
      ? 'آپ کا انٹرنیٹ رابطہ منقطع ہو چکا ہے۔ براہ کرم نیٹ ورک چیک کریں اور دوبارہ کوشش فرمائیں۔' 
      : 'You are currently offline. Please check your network connection and retry.';
  } else {
    // 404 / Invalid URL or broken link
    if (descEl) descEl.textContent = "We can`t find page you are looking for";
    if (detailEl) detailEl.textContent = isUr 
      ? 'معذرت! آپ کا درج کردہ لنک یا مطلوبہ صفحہ اس ویب سائٹ پر دستیاب نہیں ہے۔' 
      : 'The requested URL or section was not found on this website, or your network connection was lost.';
  }

  overlay.classList.remove('hidden');
}

function hideErrorOverlay() {
  const overlay = document.getElementById('error404Overlay');
  if (overlay) {
    overlay.classList.add('hidden');
  }
  currentErrorType = null;

  // Clear broken hash in the URL safely
  if (window.location.hash) {
    try {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (e) {
      window.location.hash = '';
    }
  }
}

function checkNetworkAndRetry() {
  if (navigator.onLine) {
    hideErrorOverlay();
  } else {
    const isUr = state.currentLang === 'ur';
    const msg = isUr 
      ? '⚠️ انٹرنیٹ ابھی بھی منقطع ہے۔ براہ کرم وائی فائی یا ڈیٹا چیک کریں۔' 
      : '⚠️ Still offline. Please check your Wi-Fi or mobile data connection and try again.';
    alert(msg);
  }
}

function setupNetworkAndRouteListeners() {
  // Listen for offline status
  window.addEventListener('offline', () => {
    showErrorOverlay('offline');
  });

  // Listen for online status restoration
  window.addEventListener('online', () => {
    if (currentErrorType === 'offline') {
      hideErrorOverlay();
    }
  });

  // Check initial offline status on page load
  if (typeof navigator.onLine === 'boolean' && !navigator.onLine) {
    showErrorOverlay('offline');
  }

  // Listen for broken or invalid hash changes in URL
  window.addEventListener('hashchange', checkHashRoute);
  checkHashRoute();
}

function checkHashRoute() {
  const hash = window.location.hash;
  if (!hash || hash === '#' || hash === '#top') return;

  const validHashes = [
    '#servicesExplorerArea',
    '#categoriesSection',
    '#processSection',
    '#whyUsSection',
    '#inquiryBar',
    '#services',
    '#categories'
  ];

  const targetId = hash.replace(/^#/, '');
  const el = document.getElementById(targetId);

  // If hash does not point to an existing element on the page and is not a known valid hash
  if (!el && !validHashes.includes(hash)) {
    showErrorOverlay('404');
  }
}
