/**
 * =======================================================================
 * KIT-NAF (KITABAH-NAFIAH) - GOOGLE APPS SCRIPT DATABASE BACKEND
 * =======================================================================
 * 
 * Skrip ini digunakan untuk menghubungkan aplikasi Kit-Naf dengan Google Spreadsheet.
 * 
 * CARA MEMASANG:
 * 1. Buka Google Spreadsheet baru di Google Drive Anda.
 * 2. Beri judul spreadsheet Anda, misalnya: "Database Kit-Naf".
 * 3. Klik menu: Ekstensi (Extensions) > Apps Script.
 * 4. Hapus semua teks yang ada di editor Apps Script, lalu tempel (paste) seluruh kode ini.
 * 5. Klik ikon Simpan (Save) atau tekan Ctrl + S.
 * 6. Klik tombol "Deploy" (Terapkan) di pojok kanan atas > "New deployment" (Penerapan baru).
 * 7. Klik ikon gerigi (Select type) > pilih "Web app" (Aplikasi web).
 * 8. Isi konfigurasi:
 *    - Description : Database Kit-Naf
 *    - Execute as  : Me (email Anda)
 *    - Who has access : Anyone (Siapa saja)  <-- PENTING!
 * 9. Klik "Deploy", lalu klik "Authorize access" dan pilih akun Google Anda.
 *    (Jika muncul peringatan "Google hasn't verified this app", klik "Advanced" > "Go to ... (unsafe)").
 * 10. Salin "Web App URL" yang berakhiran "/exec", lalu tempel ke menu Pengaturan di Kit-Naf.
 * =======================================================================
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Data_Materi');
    var rawSheet = ss.getSheetByName('Raw_JSON_Backup');
    
    // Prioritas 1: Ambil dari Raw JSON Backup jika ada
    if (rawSheet) {
      var rawVal = rawSheet.getRange('A1').getValue();
      if (rawVal && rawVal.toString().trim() !== '') {
        try {
          var parsed = JSON.parse(rawVal);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return createJsonResponse({ status: 'success', data: parsed });
          }
        } catch(err) {}
      }
    }
    
    // Prioritas 2: Baca dari tabel Data_Materi
    if (!sheet) {
      return createJsonResponse({ status: 'success', data: [] });
    }
    
    var values = sheet.getDataRange().getValues();
    if (values.length <= 1) {
      return createJsonResponse({ status: 'success', data: [] });
    }
    
    var headers = values[0];
    var list = [];
    
    for (var i = 1; i < values.length; i++) {
      var row = values[i];
      if (!row[0] && !row[3]) continue; // Lewati jika kosong
      
      list.push({
        id: row[0] ? row[0].toString() : Utilities.getUuid(),
        parentId: row[1] ? row[1].toString() : '',
        level: typeof row[2] === 'number' ? row[2] : (parseInt(row[2]) || 0),
        title: row[3] ? row[3].toString() : 'Tanpa Judul',
        icon: row[4] ? row[4].toString() : 'fa-book-open',
        bg: row[5] ? row[5].toString() : '',
        updatedAt: row[6] ? row[6].toString() : new Date().toISOString(),
        content: row[7] ? row[7].toString() : ''
      });
    }
    
    return createJsonResponse({ status: 'success', data: list });
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

function doPost(e) {
  try {
    var contents = e.postData ? e.postData.contents : '';
    if (!contents) {
      return createJsonResponse({ status: 'error', message: 'Tidak ada data yang dikirim.' });
    }
    
    var payload = JSON.parse(contents);
    var data = payload.data || payload;
    
    if (!Array.isArray(data)) {
      return createJsonResponse({ status: 'error', message: 'Format data harus berupa Array catatan.' });
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. Simpan Raw JSON ke Sheet Raw_JSON_Backup
    var rawSheet = ss.getSheetByName('Raw_JSON_Backup');
    if (!rawSheet) {
      rawSheet = ss.insertSheet('Raw_JSON_Backup');
    }
    rawSheet.clearContents();
    rawSheet.getRange('A1').setValue(JSON.stringify(data));
    rawSheet.getRange('A2').setValue('Terakhir Disinkronkan: ' + new Date().toLocaleString('id-ID'));
    
    // 2. Simpan Data Terstruktur ke Sheet Data_Materi
    var sheet = ss.getSheetByName('Data_Materi');
    if (!sheet) {
      sheet = ss.insertSheet('Data_Materi');
    }
    sheet.clearContents();
    
    // Buat Header Tabel
    var headers = ['ID', 'Parent_ID', 'Level', 'Judul', 'Ikon', 'Background', 'Terakhir_Diperbarui', 'Isi_Materi_HTML'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4F46E5').setFontColor('#FFFFFF');
    
    if (data.length > 0) {
      var rows = [];
      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        rows.push([
          item.id || Utilities.getUuid(),
          item.parentId || '',
          typeof item.level === 'number' ? item.level : (parseInt(item.level) || 0),
          item.title || '',
          item.icon || 'fa-book-open',
          item.bg || '',
          item.updatedAt || new Date().toISOString(),
          item.content || ''
        ]);
      }
      
      sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
      sheet.autoResizeColumns(1, 7);
    }
    
    return createJsonResponse({
      status: 'success',
      message: 'Berhasil menyimpan ' + data.length + ' materi ke Spreadsheet!',
      totalItems: data.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

function createJsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
