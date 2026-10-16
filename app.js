/**
 * 特別支援学校向け「買い物に行こう」Webアプリ
 * iPad (Safari) 最適化・文字選択肢 ＆ Google画像検索ジャンプシステム
 */

// ==================== 効果音システム (Web Audio API) ====================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// iPad Safari用アンロック
document.addEventListener('touchstart', () => getAudioContext(), { once: true });
document.addEventListener('click', () => getAudioContext(), { once: true });

function playTapSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {}
}

function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.35, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.2);
    });
  } catch (e) {}
}

function playWarningSound() {
  try {
    const ctx = getAudioContext();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(220, ctx.currentTime);
    osc2.frequency.setValueAtTime(233.08, ctx.currentTime);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.35);
    osc2.stop(ctx.currentTime + 0.35);
  } catch (e) {}
}

function playFanfareSound() {
  try {
    const ctx = getAudioContext();
    const chord = [
      { f: 523.25, t: 0.0, d: 0.15 },
      { f: 523.25, t: 0.15, d: 0.15 },
      { f: 523.25, t: 0.3, d: 0.15 },
      { f: 659.25, t: 0.45, d: 0.35 },
      { f: 783.99, t: 0.8, d: 0.35 },
      { f: 1046.50, t: 1.15, d: 0.8 }
    ];
    chord.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, ctx.currentTime + n.t);
      gain.gain.setValueAtTime(0.4, ctx.currentTime + n.t);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + n.t + n.d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + n.t);
      osc.stop(ctx.currentTime + n.t + n.d);
    });
  } catch (e) {}
}

// ==================== 状態管理 (State) ====================
const state = {
  currentStep: 1,
  selectedCategory: 'choco',
  searchQuery: '',
  selectedSnackCandidate: null,
  capturedSnack: null,
  album: [],
  worksheetSlots: [null, null],
  studentName: '',
  targetSlotIndex: null,
  keyboardTarget: 'search'
};

// ==================== アイコン定義 ====================
const CUSTOM_ICONS = {
  snack_bag: `
    <svg viewBox="0 0 64 64" width="54" height="54">
      <defs>
        <linearGradient id="snackBagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd43b"/>
          <stop offset="100%" stop-color="#f59f00"/>
        </linearGradient>
      </defs>
      <path d="M 12 14 L 16 10 L 20 14 L 24 10 L 28 14 L 32 10 L 36 14 L 40 10 L 44 14 L 48 10 L 52 14 L 50 50 L 46 54 L 42 50 L 38 54 L 34 50 L 30 54 L 26 50 L 22 54 L 18 50 L 14 54 L 12 14 Z" fill="url(#snackBagGrad)" stroke="#e67700" stroke-width="2"/>
      <ellipse cx="32" cy="32" rx="12" ry="7" fill="#ffe066" stroke="#f08c00" stroke-width="1.5" transform="rotate(-15 32 32)"/>
    </svg>
  `,
  dagashi_stick: `
    <svg viewBox="0 0 64 64" width="54" height="54">
      <rect x="22" y="6" width="16" height="48" rx="6" fill="#ffd43b" stroke="#f59f00" stroke-width="2" transform="rotate(25 30 30)"/>
      <circle cx="20" cy="22" r="14" fill="#ff8787" stroke="#e03131" stroke-width="2"/>
      <line x1="20" y1="36" x2="12" y2="56" stroke="#adb5bd" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `
};

// ==================== 初期化 ====================
document.addEventListener('DOMContentLoaded', () => {
  renderCategoryGrid();
  setupEventListeners();
  renderAlbumList();
  updateWorksheetUI();
});

function setupEventListeners() {
  document.getElementById('chipStep1').addEventListener('click', () => goToStep(1));
  document.getElementById('chipStep2').addEventListener('click', () => goToStep(2));
  document.getElementById('chipStep3').addEventListener('click', () => {
    if (state.capturedSnack) goToStep(3);
  });
  document.getElementById('chipStep4').addEventListener('click', () => goToStep(4));

  // ヘッダーアルバム
  document.getElementById('btnHeaderAlbum').addEventListener('click', () => openAlbumModal(null));
  document.getElementById('btnCloseAlbum').addEventListener('click', closeAlbumModal);

  // ステップ②のアクション
  document.getElementById('btnBackToStep1').addEventListener('click', () => goToStep(1));
  document.getElementById('btnSearchKeyboard').addEventListener('click', () => openKeyboardModal('search'));
  document.getElementById('searchInput').addEventListener('click', () => openKeyboardModal('search'));

  // スクショ選択ボタン
  const btnUpload = document.getElementById('btnUploadScreenshot') || document.getElementById('btnPickScreenshot');
  if (btnUpload) {
    btnUpload.addEventListener('click', () => {
      document.getElementById('fileUploadInput').click();
    });
  }

  const btnAlbumUpload = document.getElementById('btnAlbumUploadPhoto');
  if (btnAlbumUpload) {
    btnAlbumUpload.addEventListener('click', () => {
      document.getElementById('fileUploadInput').click();
    });
  }

  const fileInput = document.getElementById('fileUploadInput');
  if (fileInput) {
    fileInput.addEventListener('change', handleFileSelected);
  }

  // ステップ③のアクション
  const btnCrop = document.getElementById('btnLaunchCrop');
  if (btnCrop) {
    btnCrop.addEventListener('click', openCropModal);
  }
  document.getElementById('btnCloseCropModal').addEventListener('click', closeCropModal);
  document.getElementById('btnCancelCrop').addEventListener('click', closeCropModal);
  document.getElementById('btnConfirmCrop').addEventListener('click', confirmCropSelection);
  document.getElementById('btnCropSmaller').addEventListener('click', () => resizeCropBox(-0.15));
  document.getElementById('btnCropLarger').addEventListener('click', () => resizeCropBox(0.15));
  document.getElementById('btnCropCenter').addEventListener('click', centerCropBox);

  setupCropDragHandlers();

  document.getElementById('btnRetakeSnack').addEventListener('click', () => goToStep(2));
  document.getElementById('btnAddAlbum').addEventListener('click', () => {
    if (!state.capturedSnack) return;
    playSuccessSound();

    const item = {
      ...state.capturedSnack,
      albumId: 'snack_' + Date.now()
    };
    state.album.unshift(item);
    updateAlbumBadge();

    goToStep(4);
  });

  // ステップ④のアクション
  document.getElementById('btnFindMoreSnack').addEventListener('click', () => goToStep(1));

  document.querySelectorAll('.btn-slot-choose').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const slotNum = parseInt(e.currentTarget.getAttribute('data-slot'));
      openAlbumModal(slotNum - 1);
    });
  });

  document.getElementById('nameBannerBox').addEventListener('click', () => openKeyboardModal('name'));
  document.getElementById('btnCompleteDone').addEventListener('click', handleCompleteDone);
  document.getElementById('btnDownloadImage').addEventListener('click', handleDownloadImage);
  document.getElementById('btnBackToWorksheet').addEventListener('click', () => goToStep(4));
  document.getElementById('btnRestartApp').addEventListener('click', handleRestartApp);

  // キーボード
  document.getElementById('btnKbClear').addEventListener('click', () => {
    document.getElementById('keyboardPreviewText').textContent = '';
  });
  document.getElementById('btnKbDelete').addEventListener('click', () => {
    const cur = document.getElementById('keyboardPreviewText').textContent;
    document.getElementById('keyboardPreviewText').textContent = cur.slice(0, -1);
  });
  document.getElementById('btnKbSubmit').addEventListener('click', handleKeyboardSubmit);

  // アラートOK
  document.getElementById('btnAlertOk').addEventListener('click', () => {
    document.getElementById('alertPopupOverlay').classList.remove('active');
  });
}

// ==================== ステップ切り替え ====================
function goToStep(stepNumber) {
  state.currentStep = stepNumber;
  playTapSound();

  document.querySelectorAll('.step-view').forEach(v => v.classList.remove('active'));
  document.getElementById(`viewStep${stepNumber}`).classList.add('active');

  for (let i = 1; i <= 5; i++) {
    const chip = document.getElementById(`chipStep${i}`);
    chip.classList.remove('active');
    if (i < stepNumber) {
      chip.classList.add('completed');
    } else {
      chip.classList.remove('completed');
    }
  }
  document.getElementById(`chipStep${stepNumber}`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (stepNumber === 2) {
    const uploadBtn = document.getElementById('btnUploadScreenshot');
    if (uploadBtn) uploadBtn.classList.remove('highlight');
    const uploadLabel = document.getElementById('uploadBtnLabel');
    if (uploadLabel) uploadLabel.textContent = 'iPadで とった すくしょ（しゃしん）をつかう！';
    const readyCard = document.getElementById('screenshotReadyCard');
    if (readyCard) readyCard.classList.remove('highlight');
    const prompt = document.getElementById('readyCardPrompt');
    if (prompt) prompt.textContent = 'すくしょを とったら、ここを おしてね！';
    const guideText = document.getElementById('step2GuideText');
    if (guideText) guideText.textContent = 'すきなおかしを えらんでね！Googleで がぞうが ひらくよ！';
  } else if (stepNumber === 4) {
    updateWorksheetUI();
  }
}

// ==================== ステップ①：大項目（ジャンル）一覧 ====================
function renderCategoryGrid() {
  const container = document.getElementById('categoryGrid');
  container.innerHTML = '';

  SNACK_CATEGORIES.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.style.background = cat.bg;
    card.style.borderColor = cat.color + '33';

    let iconHtml = `<div class="category-icon">${cat.icon}</div>`;
    if (cat.svgIcon && CUSTOM_ICONS[cat.svgIcon]) {
      iconHtml = `<div class="category-icon" style="height:60px; display:flex; align-items:center; justify-content:center;">${CUSTOM_ICONS[cat.svgIcon]}</div>`;
    }

    card.innerHTML = `
      ${iconHtml}
      <div class="category-name" style="color: ${cat.color};">${cat.name}</div>
    `;

    card.addEventListener('click', () => {
      playTapSound();
      if (cat.id === 'custom') {
        openKeyboardModal('search');
      } else {
        selectCategory(cat);
      }
    });

    container.appendChild(card);
  });
}

function selectCategory(cat) {
  state.selectedCategory = cat.id;
  state.searchQuery = '';
  state.selectedSnackCandidate = null;

  document.getElementById('activeCategoryBadge').innerHTML = `${cat.icon} ${cat.name}`;
  document.getElementById('searchInput').value = '';

  loadSnackList(cat.id, '');
  goToStep(2);
}

// ==================== ステップ②：文字選択肢リスト ＆ Google画像検索 ====================
function loadSnackList(category, query) {
  const container = document.getElementById('snackGrid');
  container.innerHTML = '';

  let list = [];
  if (query) {
    const q = query.toLowerCase();
    list = DEFAULT_SNACKS.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.kana.toLowerCase().includes(q)
    );
    if (list.length === 0) {
      const autoPrice = lookupSnackPrice(query, category);
      list = [{
        id: 'custom_' + Date.now(),
        name: query,
        kana: query,
        category: category,
        price: autoPrice
      }];
    }
  } else {
    list = DEFAULT_SNACKS.filter(s => s.category === category);
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:30px; font-size:1.3rem; font-weight:800; color:#868e96;">
        おかしが みつかりませんでした。<br>うえの「✏️ もじをいれる」で さがしてみてね！
      </div>
    `;
    return;
  }

  // ひらがなを大きくした、おしやすい もじボタンを いちらん ひょうじ
  list.forEach(snack => {
    const btn = document.createElement('button');
    btn.className = 'snack-text-btn';
    btn.setAttribute('type', 'button');
    btn.setAttribute('data-id', snack.id);

    btn.innerHTML = `
      <div class="snack-btn-top">
        <div class="snack-btn-name">${snack.name}</div>
      </div>
      <div class="snack-btn-bottom">
        <div class="snack-btn-price">${snack.price} えん</div>
        <div class="snack-btn-jump-icon">🔍 Googleで みる</div>
      </div>
    `;

    btn.addEventListener('click', () => {
      jumpToGoogleImageSearch(snack, btn);
    });

    container.appendChild(btn);
  });
}

// Googleがぞうけんさくへ ジャンプ！
function jumpToGoogleImageSearch(snack, btnEl) {
  playTapSound();
  state.selectedSnackCandidate = snack;

  // ボタンを ピカッと えらんだ いろにする
  document.querySelectorAll('.snack-text-btn').forEach(b => b.classList.remove('selected-active'));
  if (btnEl) btnEl.classList.add('selected-active');

  // Googleがぞうけんさくを ひらく
  const query = encodeURIComponent(snack.name + ' 画像');
  const googleUrl = `https://www.google.com/search?tbm=isch&q=${query}`;
  window.open(googleUrl, '_blank');

  // アプリがわの すくしょあんない ボタンを ピカピカ ひからせる
  const uploadBtn = document.getElementById('btnUploadScreenshot');
  if (uploadBtn) {
    uploadBtn.classList.add('highlight');
  }
  const uploadLabel = document.getElementById('uploadBtnLabel');
  if (uploadLabel) {
    uploadLabel.innerHTML = `📸 <strong>「${snack.name}」</strong>の すくしょを とったら ここを おしてね！`;
  }
  const readyCard = document.getElementById('screenshotReadyCard');
  if (readyCard) {
    readyCard.classList.add('highlight');
  }
  const prompt = document.getElementById('readyCardPrompt');
  if (prompt) {
    prompt.innerHTML = `📸 <strong>「${snack.name}」</strong>の しゃしんを とったら、ここを おしてね！`;
  }
  const guideText = document.getElementById('step2GuideText');
  if (guideText) {
    guideText.textContent = `Googleで「${snack.name}」の すくしょ（しゃしん）を とったら、したの ぼたんを おしてね！`;
  }
}

// 写真を決定してそのままステップ③（きりとり・ねだん）へ直行！
function chooseWebPhotoAndProceed(snack, imgUrl) {
  playSuccessSound();

  const chosenSnack = {
    id: 'snack_' + Date.now(),
    name: snack.name,
    kana: snack.kana || snack.name,
    category: snack.category || state.selectedCategory,
    price: snack.price,
    originalRawUrl: imgUrl,
    imgUrl: imgUrl,
    visualHtml: `<img src="${imgUrl}" alt="${snack.name}" style="width:100%; height:100%; object-fit:contain;">`
  };

  state.capturedSnack = chosenSnack;
  prepareStep3Crop(chosenSnack);
  goToStep(3);
}

// Wikipedia/Wikimedia Commonsからリアルタイムに画像を探す関数
async function fetchWikimediaImage(query) {
  try {
    const endpoint = `https://ja.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=0&gsrlimit=1&gsrsearch=${encodeURIComponent(query + ' お菓子')}&prop=pageimages&piprop=thumbnail&pithumbsize=600`;
    const res = await fetch(endpoint);
    const data = await res.json();
    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      if (pages.length > 0 && pages[0].thumbnail) {
        return pages[0].thumbnail.source;
      }
    }
  } catch (e) {
    console.warn('Wiki image search failed', e);
  }
  return null;
}

// ==================== iPad写真（スクショ）読み込み処理 ====================
function handleFileSelected(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;

    // タップしたお菓子（ハッピーターン等）の情報を適用
    let finalName = 'おかし';
    let finalPrice = 100;
    let finalKana = 'おかし';
    let finalCategory = state.selectedCategory;

    if (state.selectedSnackCandidate) {
      finalName = state.selectedSnackCandidate.name;
      finalPrice = state.selectedSnackCandidate.price;
      finalKana = state.selectedSnackCandidate.kana;
      finalCategory = state.selectedSnackCandidate.category;
    } else {
      const catObj = SNACK_CATEGORIES.find(c => c.id === state.selectedCategory);
      finalName = state.searchQuery || (catObj ? catObj.name : 'おかし');
      finalPrice = lookupSnackPrice(finalName, state.selectedCategory);
      finalKana = finalName;
    }

    const uploadedSnack = {
      id: 'upload_' + Date.now(),
      name: finalName,
      kana: finalKana,
      category: finalCategory,
      price: finalPrice,
      originalRawUrl: dataUrl, // 切り抜き用の元全体スクショ
      imgUrl: dataUrl,
      visualHtml: `<img src="${dataUrl}" alt="${finalName}" style="width:100%; height:100%; object-fit:cover;">`
    };

    // ワークシートのスロットから直接呼ばれた場合
    if (state.targetSlotIndex !== null) {
      closeAlbumModal();
      const albumItem = { ...uploadedSnack, albumId: 'snack_' + Date.now() };
      state.album.unshift(albumItem);
      updateAlbumBadge();
      pasteSnackToSlot(state.targetSlotIndex, albumItem);
      state.targetSlotIndex = null;
      return;
    }

    // ステップ③（切り取り画面）へ進む
    state.capturedSnack = uploadedSnack;
    prepareStep3Crop(uploadedSnack);
    goToStep(3);
  };
  reader.readAsDataURL(file);

  e.target.value = '';
}

// ==================== ステップ③：自動切り取り ＆ お値段表示 ====================
function prepareStep3Crop(snack) {
  const container = document.getElementById('cropPreviewContent');
  container.innerHTML = snack.visualHtml;

  document.getElementById('cropSnackName').textContent = snack.name;
  document.getElementById('cropSnackPrice').textContent = snack.price;
}

// ==================== 切り取り（トリミング）モーダル機能 ====================
const cropState = {
  x: 40,
  y: 40,
  size: 200,
  isDragging: false,
  startX: 0,
  startY: 0,
  initBoxX: 0,
  initBoxY: 0
};

// 「✂️ かんたんきりとり」をタップした時に起動
function openCropModal() {
  if (!state.capturedSnack) return;
  playTapSound();

  const overlay = document.getElementById('cropModalOverlay');
  const img = document.getElementById('cropSourceImage');
  const rawSrc = state.capturedSnack.originalRawUrl || state.capturedSnack.imgUrl;

  img.onload = () => {
    const wrap = document.getElementById('cropWorkspaceWrap');
    const wrapW = wrap.clientWidth;
    const wrapH = wrap.clientHeight;
    const imgW = img.clientWidth || wrapW;
    const imgH = img.clientHeight || wrapH;

    const baseSize = Math.min(imgW, imgH) * 0.7;
    cropState.size = Math.max(100, Math.min(baseSize, 300));
    cropState.x = (wrapW - cropState.size) / 2;
    cropState.y = (wrapH - cropState.size) / 2;

    updateCropBoxStyle();
  };

  img.src = rawSrc;
  overlay.classList.add('active');
}

function closeCropModal() {
  playTapSound();
  document.getElementById('cropModalOverlay').classList.remove('active');
}

function updateCropBoxStyle() {
  const box = document.getElementById('cropSelectionBox');
  const wrap = document.getElementById('cropWorkspaceWrap');
  if (!box || !wrap) return;

  const maxW = wrap.clientWidth;
  const maxH = wrap.clientHeight;

  if (cropState.size > Math.min(maxW, maxH)) {
    cropState.size = Math.min(maxW, maxH);
  }

  cropState.x = Math.max(0, Math.min(cropState.x, maxW - cropState.size));
  cropState.y = Math.max(0, Math.min(cropState.y, maxH - cropState.size));

  box.style.left = `${cropState.x}px`;
  box.style.top = `${cropState.y}px`;
  box.style.width = `${cropState.size}px`;
  box.style.height = `${cropState.size}px`;
}

function resizeCropBox(deltaPercent) {
  playTapSound();
  const wrap = document.getElementById('cropWorkspaceWrap');
  const delta = Math.min(wrap.clientWidth, wrap.clientHeight) * deltaPercent;
  const newSize = cropState.size + delta;

  if (newSize >= 80 && newSize <= Math.min(wrap.clientWidth, wrap.clientHeight)) {
    cropState.x -= delta / 2;
    cropState.y -= delta / 2;
    cropState.size = newSize;
    updateCropBoxStyle();
  }
}

function centerCropBox() {
  playTapSound();
  const wrap = document.getElementById('cropWorkspaceWrap');
  cropState.x = (wrap.clientWidth - cropState.size) / 2;
  cropState.y = (wrap.clientHeight - cropState.size) / 2;
  updateCropBoxStyle();
}

function setupCropDragHandlers() {
  const box = document.getElementById('cropSelectionBox');
  if (!box) return;

  box.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    box.setPointerCapture(e.pointerId);
    cropState.isDragging = true;
    cropState.startX = e.clientX;
    cropState.startY = e.clientY;
    cropState.initBoxX = cropState.x;
    cropState.initBoxY = cropState.y;
  });

  box.addEventListener('pointermove', (e) => {
    if (!cropState.isDragging) return;
    const dx = e.clientX - cropState.startX;
    const dy = e.clientY - cropState.startY;
    cropState.x = cropState.initBoxX + dx;
    cropState.y = cropState.initBoxY + dy;
    updateCropBoxStyle();
  });

  const onPointerUp = (e) => {
    if (cropState.isDragging) {
      cropState.isDragging = false;
      try { box.releasePointerCapture(e.pointerId); } catch(err){}
    }
  };
  box.addEventListener('pointerup', onPointerUp);
  box.addEventListener('pointercancel', onPointerUp);
}

// 決定：枠内をCanvasで切り抜く
function confirmCropSelection() {
  playSuccessSound();
  const img = document.getElementById('cropSourceImage');
  const wrap = document.getElementById('cropWorkspaceWrap');

  const imgRect = img.getBoundingClientRect();
  const wrapRect = wrap.getBoundingClientRect();

  const imgOffsetLeft = imgRect.left - wrapRect.left;
  const imgOffsetTop = imgRect.top - wrapRect.top;

  const relX = cropState.x - imgOffsetLeft;
  const relY = cropState.y - imgOffsetTop;

  const scale = img.naturalWidth / img.clientWidth;

  const sourceX = Math.max(0, relX * scale);
  const sourceY = Math.max(0, relY * scale);
  const sourceSize = Math.max(10, cropState.size * scale);

  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    img,
    sourceX, sourceY, sourceSize, sourceSize,
    0, 0, canvas.width, canvas.height
  );

  const croppedDataUrl = canvas.toDataURL('image/png');

  // 画像を更新
  state.capturedSnack.imgUrl = croppedDataUrl;
  state.capturedSnack.visualHtml = `<img src="${croppedDataUrl}" alt="${state.capturedSnack.name}" style="width:100%; height:100%; object-fit:cover;">`;

  // プレビュー枠に即時反映
  document.getElementById('cropPreviewContent').innerHTML = state.capturedSnack.visualHtml;

  // モーダルを閉じる
  document.getElementById('cropModalOverlay').classList.remove('active');
}

// ==================== アプリ内アルバム管理 ====================
function updateAlbumBadge() {
  document.getElementById('albumCountBadge').textContent = state.album.length;
}

function openAlbumModal(slotIndex) {
  state.targetSlotIndex = slotIndex;
  renderAlbumList();
  document.getElementById('albumModalOverlay').classList.add('active');
  playTapSound();
}

function closeAlbumModal() {
  document.getElementById('albumModalOverlay').classList.remove('active');
}

function renderAlbumList() {
  const grid = document.getElementById('albumItemsGrid');
  grid.innerHTML = '';

  if (state.album.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 40px 10px; color:#868e96; font-weight:800;">
        <div style="font-size:3rem; margin-bottom:10px;">📸</div>
        しゃしんが まだ ないよ！<br>うえの「📁 iPadの しゃしんから えらぶ」を おすか、<br>おかしを えらんで すくしょを とってね！
      </div>
    `;
    return;
  }

  state.album.forEach((snack) => {
    const item = document.createElement('div');
    item.className = 'album-item-card';
    item.innerHTML = `
      <div class="album-thumb-wrap">
        ${snack.visualHtml}
      </div>
      <div class="album-item-info">
        <div class="album-item-name">${snack.name}</div>
        <div class="album-item-price">${snack.price}えん</div>
      </div>
    `;

    item.addEventListener('click', () => {
      handleChooseSnackFromAlbum(snack);
    });

    grid.appendChild(item);
  });
}

function handleChooseSnackFromAlbum(snack) {
  playTapSound();
  closeAlbumModal();

  if (state.targetSlotIndex !== null) {
    pasteSnackToSlot(state.targetSlotIndex, snack);
    return;
  }

  if (state.worksheetSlots[0] === null) {
    pasteSnackToSlot(0, snack);
  } else if (state.worksheetSlots[1] === null) {
    pasteSnackToSlot(1, snack);
  } else {
    // ２こまでだよ！注意モーダル
    showWarningModal(
      '２こまでだよ！',
      'おかしは ２こまでしか かえないよ。\nどちらかを はずして やりなおしてね。'
    );
  }
}

function pasteSnackToSlot(slotIdx, snack) {
  state.worksheetSlots[slotIdx] = snack;
  playSuccessSound();
  updateWorksheetUI();
}

function removeSnackFromSlot(slotIdx) {
  playTapSound();
  state.worksheetSlots[slotIdx] = null;
  updateWorksheetUI();
}

// ==================== ステップ④：ワークシート更新 ＆ 200円自動計算 ====================
function updateWorksheetUI() {
  const slot1 = state.worksheetSlots[0];
  const slot2 = state.worksheetSlots[1];

  const currentCount = (slot1 ? 1 : 0) + (slot2 ? 1 : 0);
  const totalPrice = (slot1 ? slot1.price : 0) + (slot2 ? slot2.price : 0);

  document.getElementById('badgeCurrentCount').textContent = currentCount;
  document.getElementById('badgeTotalPrice').textContent = totalPrice;

  const countPill = document.getElementById('pillCountCondition');
  if (currentCount <= 2) {
    countPill.className = 'condition-pill ok';
  } else {
    countPill.className = 'condition-pill warn';
  }

  const pricePill = document.getElementById('pillPriceCondition');
  const priceStatus = document.getElementById('priceStatusText');
  if (totalPrice <= 200) {
    const remain = 200 - totalPrice;
    pricePill.className = 'condition-pill ok';
    priceStatus.innerHTML = `（あと ${remain}えん かえるよ）⭕`;
  } else {
    const over = totalPrice - 200;
    pricePill.className = 'condition-pill warn';
    priceStatus.innerHTML = `（${over}えん おおいよ！）⚠️ ２００えんを こえたよ`;
  }

  renderSlotUI(1, slot1);
  renderSlotUI(2, slot2);

  const nameValEl = document.getElementById('nameDisplayVal');
  if (state.studentName) {
    nameValEl.textContent = state.studentName;
    nameValEl.style.color = '#1c7ed6';
  } else {
    nameValEl.textContent = '（おして いれる）';
    nameValEl.style.color = '#adb5bd';
  }
}

function renderSlotUI(slotNum, snack) {
  const el = document.getElementById(`slot${slotNum}`);
  if (!snack) {
    el.className = 'snack-slot-item';
    el.innerHTML = `
      <div class="slot-empty-prompt">
        <span class="icon">➕</span>
        <span>${slotNum}こめ</span>
        <button class="btn-slot-choose" data-slot="${slotNum}">しゃしんを えらぶ</button>
      </div>
    `;
    el.querySelector('.btn-slot-choose').addEventListener('click', () => {
      openAlbumModal(slotNum - 1);
    });
  } else {
    el.className = 'snack-slot-item filled';
    el.innerHTML = `
      <button class="btn-remove-snack" title="はずす">✕</button>
      <div class="slot-img-wrap">
        ${snack.visualHtml}
      </div>
      <div class="slot-snack-name">${snack.name}</div>
      <div class="slot-snack-price">${snack.price}えん</div>
    `;
    el.querySelector('.btn-remove-snack').addEventListener('click', (e) => {
      e.stopPropagation();
      removeSnackFromSlot(slotNum - 1);
    });
  }
}

// ==================== 「できた！」完成チェック ====================
function handleCompleteDone() {
  const slot1 = state.worksheetSlots[0];
  const slot2 = state.worksheetSlots[1];
  const count = (slot1 ? 1 : 0) + (slot2 ? 1 : 0);
  const totalPrice = (slot1 ? slot1.price : 0) + (slot2 ? slot2.price : 0);

  if (count === 0) {
    showWarningModal('おかしを えらんでね！', 'まだ おかしが えらばれていないよ。\nしゃしんを えらんで わーくしーとに はってね。');
    return;
  }

  if (totalPrice > 200) {
    showWarningModal('200えんを こえちゃったよ！', `ごうけいが ${totalPrice}えん に なっているよ。\n200えん までに なるように、どちらかを べつの おかしに してね。`);
    return;
  }

  playFanfareSound();
  launchConfetti();

  generateWorksheetCanvas().then(dataUrl => {
    const previewContainer = document.getElementById('finalWorksheetPreview');
    previewContainer.innerHTML = `<img src="${dataUrl}" style="width:100%; display:block;" alt="かんせい わーくしーと">`;
    state.completedImageURL = dataUrl;
  });

  goToStep(5);
}

// ==================== 五十音ソフトキーボード ====================
const KANA_TABLE = [
  'あ','い','う','え','お',  'か','き','く','け','こ',
  'さ','し','す','せ','そ',  'た','ち','つ','て','と',
  'な','に','ぬ','ね','の',  'は','ひ','ふ','へ','ほ',
  'ま','み','む','め','も',  'や','（','ゆ','）','よ',
  'ら','り','る','れ','ろ',  'わ','を','ん','ー','っ',
  'が','ぎ','ぐ','げ','ご',  'ざ','じ','ず','ぜ','ぞ',
  'だ','ぢ','づ','で','ど',  'ば','び','ぶ','べ','ぼ',
  'ぱ','ぴ','ぷ','ぺ','ぽ',  'ゃ','ゅ','ょ','・',' '
];

function openKeyboardModal(target) {
  state.keyboardTarget = target;
  const overlay = document.getElementById('keyboardModalOverlay');
  const title = document.getElementById('keyboardModalTitle');
  const preview = document.getElementById('keyboardPreviewText');
  const grid = document.getElementById('kanaKeyboardGrid');

  if (target === 'search') {
    title.textContent = '🔍 おかしの なまえを えらんでね';
    preview.textContent = state.searchQuery || '';
  } else {
    title.textContent = '✏️ あなたの なまえを えらんでね';
    preview.textContent = state.studentName || '';
  }

  grid.innerHTML = '';
  KANA_TABLE.forEach(char => {
    const btn = document.createElement('button');
    btn.className = 'btn-kana-key';
    btn.textContent = char;
    btn.addEventListener('click', () => {
      playTapSound();
      preview.textContent += char;
    });
    grid.appendChild(btn);
  });

  overlay.classList.add('active');
  playTapSound();
}

function handleKeyboardSubmit() {
  playSuccessSound();
  const text = document.getElementById('keyboardPreviewText').textContent.trim();
  const overlay = document.getElementById('keyboardModalOverlay');
  overlay.classList.remove('active');

  if (state.keyboardTarget === 'search') {
    state.searchQuery = text;
    document.getElementById('searchInput').value = text;
    document.getElementById('activeCategoryBadge').innerHTML = `🔍 ${text || 'けんさく'}`;
    loadSnackList('custom', text);
    goToStep(2);

    if (text) {
      const customSnack = {
        id: 'custom_' + Date.now(),
        name: text,
        kana: text,
        category: 'custom',
        price: lookupSnackPrice(text, 'custom')
      };
      jumpToGoogleImageSearch(customSnack);
    }
  } else {
    state.studentName = text;
    updateWorksheetUI();
  }
}

function showWarningModal(title, msg) {
  playWarningSound();
  document.getElementById('alertMsgText').textContent = title;
  document.getElementById('alertSubText').innerText = msg;
  document.getElementById('alertPopupOverlay').classList.add('active');
}

// ==================== ワークシート高画質Canvas生成 (A4プリント対応) ====================
async function generateWorksheetCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 1240;
  canvas.height = 1754;
  const ctx = canvas.getContext('2d');

  // 白背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 背景ドット
  ctx.fillStyle = '#f1f3f5';
  for (let x = 40; x < canvas.width; x += 40) {
    for (let y = 40; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // フレーム枠
  ctx.strokeStyle = '#ced4da';
  ctx.lineWidth = 4;
  ctx.setLineDash([12, 12]);
  ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
  ctx.setLineDash([]);

  // タイトル
  ctx.font = 'bold 82px "Hiragino Maru Gothic ProN", "BIZ UDPGothic", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff922b';
  ctx.fillText('なにを　かおうかな？', canvas.width / 2, 170);

  // 条件ボックス
  ctx.strokeStyle = '#212529';
  ctx.lineWidth = 5;
  ctx.strokeRect(canvas.width / 2 - 280, 220, 560, 150);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(canvas.width / 2 - 275, 225, 550, 140);

  ctx.textAlign = 'left';
  ctx.font = 'bold 36px "Hiragino Maru Gothic ProN", sans-serif';
  ctx.fillStyle = '#212529';
  ctx.fillText('じょうけん', canvas.width / 2 - 240, 275);
  ctx.fillStyle = '#d6336c';
  ctx.fillText('①　２こ　まで', canvas.width / 2 - 240, 335);
  ctx.fillText('②　200円　まで', canvas.width / 2 + 30, 335);

  // 中央黒枠
  const boxX = 140;
  const boxY = 440;
  const boxW = canvas.width - 280;
  const boxH = 920;

  ctx.strokeStyle = '#212529';
  ctx.lineWidth = 8;
  ctx.strokeRect(boxX, boxY, boxW, boxH);

  // マスキングテープ
  ctx.fillStyle = '#fcc419';
  ctx.fillRect(canvas.width / 2 - 160, boxY - 30, 320, 60);

  // 枠タイトル
  ctx.textAlign = 'center';
  ctx.font = 'bold 54px "Hiragino Maru Gothic ProN", sans-serif';
  ctx.fillStyle = '#212529';
  ctx.fillText('おかしやさんで　かいたいもの', canvas.width / 2, boxY + 110);

  const slot1 = state.worksheetSlots[0];
  const slot2 = state.worksheetSlots[1];
  const slotW = (boxW - 120) / 2;
  const slotH = 580;
  const slotY = boxY + 180;

  await drawSlotToCanvas(ctx, slot1, boxX + 40, slotY, slotW, slotH, 1);
  await drawSlotToCanvas(ctx, slot2, boxX + 80 + slotW, slotY, slotW, slotH, 2);

  // 合計金額バー
  const totalPrice = (slot1 ? slot1.price : 0) + (slot2 ? slot2.price : 0);
  ctx.fillStyle = '#f8f9fa';
  ctx.fillRect(boxX + 40, boxY + boxH - 120, boxW - 80, 80);
  ctx.strokeStyle = '#dee2e6';
  ctx.lineWidth = 3;
  ctx.strokeRect(boxX + 40, boxY + boxH - 120, boxW - 80, 80);

  ctx.textAlign = 'center';
  ctx.font = 'bold 40px "Hiragino Maru Gothic ProN", sans-serif';
  ctx.fillStyle = '#d6336c';
  ctx.fillText(`ごうけい：${totalPrice}えん（２００えん いない ⭕）`, canvas.width / 2, boxY + boxH - 68);

  // なまえ枠
  const nameBoxW = 420;
  const nameBoxH = 90;
  const nameBoxX = canvas.width - 140 - nameBoxW;
  const nameBoxY = 1480;

  ctx.strokeStyle = '#212529';
  ctx.lineWidth = 5;
  ctx.strokeRect(nameBoxX, nameBoxY, nameBoxW, nameBoxH);

  ctx.textAlign = 'left';
  ctx.font = 'bold 42px "Hiragino Maru Gothic ProN", sans-serif';
  ctx.fillStyle = '#212529';
  ctx.fillText('なまえ', nameBoxX + 24, nameBoxY + 60);

  ctx.font = 'bold 46px "Hiragino Maru Gothic ProN", sans-serif';
  ctx.fillStyle = '#1c7ed6';
  ctx.fillText(state.studentName || '　　　　　', nameBoxX + 170, nameBoxY + 62);

  return canvas.toDataURL('image/png');
}

async function drawSlotToCanvas(ctx, snack, x, y, w, h, slotNum) {
  ctx.save();
  if (!snack) {
    ctx.strokeStyle = '#adb5bd';
    ctx.lineWidth = 4;
    ctx.setLineDash([10, 10]);
    ctx.strokeRect(x, y, w, h);
    ctx.setLineDash([]);
    ctx.fillStyle = '#868e96';
    ctx.font = 'bold 36px "Hiragino Maru Gothic ProN", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${slotNum}こめ`, x + w / 2, y + h / 2);
  } else {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#ff922b';
    ctx.lineWidth = 6;
    ctx.strokeRect(x, y, w, h);

    const imgH = h * 0.65;
    const imgX = x + 15;
    const imgY = y + 15;
    const imgW = w - 30;

    if (snack.imgUrl) {
      try {
        const img = new Image();
        if (!snack.imgUrl.startsWith('data:')) {
          img.crossOrigin = 'anonymous';
        }
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = snack.imgUrl;
        });
        ctx.drawImage(img, imgX, imgY, imgW, imgH);
      } catch (e) {
        console.warn('Canvas image error', e);
      }
    }

    ctx.fillStyle = '#212529';
    ctx.font = 'bold 38px "Hiragino Maru Gothic ProN", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(snack.name, x + w / 2, y + h * 0.78);

    ctx.fillStyle = '#d6336c';
    ctx.font = '900 48px "Hiragino Maru Gothic ProN", sans-serif';
    ctx.fillText(`${snack.price} えん`, x + w / 2, y + h * 0.92);
  }
  ctx.restore();
}

function handleDownloadImage() {
  if (!state.completedImageURL) return;
  playSuccessSound();

  const link = document.createElement('a');
  link.download = `なにをかおうかな_${state.studentName || 'わーくしーと'}.png`;
  link.href = state.completedImageURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function handleRestartApp() {
  playTapSound();
  state.worksheetSlots = [null, null];
  state.studentName = '';
  state.capturedSnack = null;
  state.selectedSnackCandidate = null;
  updateWorksheetUI();
  goToStep(1);
}

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#ff6b6b', '#4dabf7', '#ffd43b', '#51cf66', '#f06595', '#cc5de8'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: Math.random() * 12 + 6,
      h: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: Math.random() * 4 + 2,
      vx: (Math.random() - 0.5) * 3,
      rot: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  let frame = 0;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.vRot;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    frame++;
    if (frame < 200) {
      requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  update();
}
