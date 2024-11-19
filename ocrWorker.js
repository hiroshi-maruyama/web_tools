importScripts('https://cdn.jsdelivr.net/npm/tesseract.js');

self.onmessage = async (event) => {
  const imageData = event.data.imageData;

  try {
    // OCR処理を実行
    const result = await Tesseract.recognize(imageData, 'eng', {
      tessedit_char_whitelist: '0123456789',
      preserve_interword_spaces: 0,
      page_seg_mode: Tesseract.PSM.SPARSE_TEXT
    });

    // 11桁の数字を抽出してメインスレッドに送信
    const matchedNumbers = result.data.text.match(/\b\d{11}\b/g);
    self.postMessage(matchedNumbers ? matchedNumbers[0] : null);
  } catch (error) {
    console.error("OCR Error:", error);
    self.postMessage(null);
  }
};
