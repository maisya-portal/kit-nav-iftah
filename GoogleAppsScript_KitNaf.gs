/**
 * =======================================================================
 * KIT-NAF (KITABAH-NAFIAH) - GOOGLE APPS SCRIPT DATABASE BACKEND
 * =======================================================================
 * 
 * Skrip ini digunakan untuk menghubungkan aplikasi Kit-Naf dengan Google Spreadsheet.
 * Dilengkapi dengan Smart Conflict-Free Multi-Device Synchronization (LWW Merge).
 * 
 * CARA MEMASANG / MEMPERBARUI:
 * 1. Buka Google Spreadsheet Anda.
 * 2. Klik menu: Ekstensi (Extensions) > Apps Script.
 * 3. Hapus semua teks yang ada di editor Apps Script, lalu tempel (paste) seluruh kode ini.
 * 4. Klik ikon Simpan (Save) atau tekan Ctrl + S.
 * 5. Klik tombol "Deploy" (Terapkan) > "Manage deployments" (Kelola penerapan).
 * 6. Klik ikon pensil (Edit) di penerapan aktif Anda > pilih Version: "New version" (Versi baru).
 * 7. Klik "Deploy".
 * =======================================================================
 */

function doGet(e) {
  try {
    var lastSync = PropertiesService.getScriptProperties().getProperty('LAST_SYNC_TIME') || '';
    
    // Mode Cepat: Cek apakah ada perubahan tanpa unduh seluruh data
    if (e && e.parameter && e.parameter.action === 'check') {
      return createJsonResponse({ status: 'success', lastSync: lastSync });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var list = getExistingData(ss);
    
    return createJsonResponse({ status: 'success', data: list, lastSync: lastSync });
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
    var incomingData = payload.data || payload;
    
    if (!Array.isArray(incomingData)) {
      return createJsonResponse({ status: 'error', message: 'Format data harus berupa Array catatan.' });
    }
    
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var existingList = getExistingData(ss);
    
    // SMART ITEM-LEVEL MERGE (LAST-WRITE-WINS PER MATERI)
    // Mencegah data perangkat yang sedang mengetik terhapus/tertimpa
    var map = {};
    for (var i = 0; i < existingList.length; i++) {
      var itm = existingList[i];
      if (itm && itm.id) {
        map[itm.id] = itm;
      }
    }
    
    var deletedIds = payload.deletedIds || [];
    var deletedSet = {};
    for (var d = 0; d < deletedIds.length; d++) {
      deletedSet[deletedIds[d]] = true;
    }

    for (var j = 0; j < incomingData.length; j++) {
      var inc = incomingData[j];
      if (!inc || !inc.id) continue;
      if (deletedSet[inc.id]) continue;
      
      // Selalu terima dan simpan data terkini yang dikirim oleh perangkat yang sedang menyimpan
      if (!inc.updatedAt) {
        inc.updatedAt = new Date().toISOString();
      }
      map[inc.id] = inc;
    }
    
    // Hapus catatan yang ada di daftar deletedIds
    for (var delId in deletedSet) {
      delete map[delId];
    }
    
    // Susun kembali data gabungan yang telah dimerge
    var mergedData = [];
    var processedIds = {};
    for (var k = 0; k < incomingData.length; k++) {
      var id = incomingData[k].id;
      if (map[id] && !processedIds[id]) {
        mergedData.push(map[id]);
        processedIds[id] = true;
      }
    }
    for (var remId in map) {
      if (!processedIds[remId]) {
        mergedData.push(map[remId]);
        processedIds[remId] = true;
      }
    }
    
    // 1. Simpan Raw JSON Chunked ke Sheet Raw_JSON_Backup
    var rawSheet = ss.getSheetByName('Raw_JSON_Backup');
    if (!rawSheet) {
      rawSheet = ss.insertSheet('Raw_JSON_Backup');
    }
    writeChunkedJson(rawSheet, JSON.stringify(mergedData));
    
    // 2. Simpan Data Terstruktur ke Sheet Data_Materi
    var sheet = ss.getSheetByName('Data_Materi');
    if (!sheet) {
      sheet = ss.insertSheet('Data_Materi');
    }
    sheet.clearContents();
    
    // Buat Header Tabel
    var headers = ['ID', 'Parent_ID', 'Level', 'Judul', 'Ikon', 'Background', 'Terakhir_Diperbarui', 'Isi_Materi_HTML', 'Font_Family'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#4F46E5').setFontColor('#FFFFFF');
    
    if (mergedData.length > 0) {
      var rows = [];
      for (var m = 0; m < mergedData.length; m++) {
        var item = mergedData[m];
        var cellContent = (item.content || '').toString();
        if (cellContent.length > 45000) {
          cellContent = cellContent.substring(0, 45000);
        }
        
        rows.push([
          item.id || Utilities.getUuid(),
          item.parentId || '',
          typeof item.level === 'number' ? item.level : (parseInt(item.level) || 0),
          item.title || '',
          item.icon || 'fa-book-open',
          item.bg || '',
          item.updatedAt || new Date().toISOString(),
          cellContent,
          item.fontFamily || ''
        ]);
      }
      
      sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
      sheet.autoResizeColumns(1, 9);
    }
    
    var syncTime = new Date().toISOString();
    try {
      PropertiesService.getScriptProperties().setProperty('LAST_SYNC_TIME', syncTime);
    } catch(e) {}

    return createJsonResponse({
      status: 'success',
      message: 'Berhasil menyinkronkan data!',
      data: mergedData,
      totalItems: mergedData.length,
      timestamp: syncTime,
      lastSync: syncTime
    });
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

// Helper: Mengambil data existing dengan aman dari Raw_JSON_Backup atau Data_Materi
function getExistingData(ss) {
  var rawSheet = ss.getSheetByName('Raw_JSON_Backup');
  if (rawSheet) {
    var rawJsonStr = readChunkedJson(rawSheet);
    if (rawJsonStr && rawJsonStr.trim() !== '') {
      try {
        var parsed = JSON.parse(rawJsonStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch(err) {}
    }
  }
  
  var sheet = ss.getSheetByName('Data_Materi');
  if (!sheet) return [];
  
  var values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  
  var list = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (!row[0] && !row[3]) continue;
    
    list.push({
      id: row[0] ? row[0].toString() : Utilities.getUuid(),
      parentId: row[1] ? row[1].toString() : '',
      level: typeof row[2] === 'number' ? row[2] : (parseInt(row[2]) || 0),
      title: row[3] ? row[3].toString() : 'Tanpa Judul',
      icon: row[4] ? row[4].toString() : 'fa-book-open',
      bg: row[5] ? row[5].toString() : '',
      updatedAt: row[6] ? row[6].toString() : new Date().toISOString(),
      content: row[7] ? row[7].toString() : '',
      fontFamily: row[8] ? row[8].toString() : ''
    });
  }
  return list;
}

// Helper: Membagi JSON panjang ke dalam beberapa baris (tiap baris maks 45.000 karakter)
function writeChunkedJson(sheet, jsonStr) {
  sheet.clearContents();
  var chunkSize = 45000;
  var chunks = [];
  for (var i = 0; i < jsonStr.length; i += chunkSize) {
    chunks.push([jsonStr.substring(i, i + chunkSize)]);
  }
  if (chunks.length > 0) {
    sheet.getRange(1, 1, chunks.length, 1).setValues(chunks);
  }
}

// Helper: Membaca kembali JSON panjang dari baris-baris terpecah
function readChunkedJson(sheet) {
  if (!sheet) return null;
  var lastRow = sheet.getLastRow();
  if (lastRow < 1) return null;
  var values = sheet.getRange(1, 1, lastRow, 1).getValues();
  var fullStr = '';
  for (var i = 0; i < values.length; i++) {
    fullStr += values[i][0].toString();
  }
  return fullStr;
}

function createJsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
