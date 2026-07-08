# RSVP (LCV) Google Sheets Kurulumu

Misafir yanıtları bir Google Sheets tablosunda toplanır. Kurulum tek seferlik,
yaklaşık 5 dakika sürer. Google hesabı yeterlidir, başka bir şey gerekmez.

## 1. Google Sheet oluştur

1. [sheets.google.com](https://sheets.google.com) adresine git, boş bir tablo aç.
2. Tabloya isim ver (örn. **"Sema & Özcan RSVP"**).
3. İlk satıra başlıkları yaz: `A1: Zaman`, `B1: Ad Soyad`, `C1: Durum`, `D1: Kişi Sayısı`.

## 2. Apps Script ekle

1. Tablo açıkken menüden **Uzantılar → Apps Script**'e tıkla.
2. Açılan editördeki tüm kodu sil ve aşağıdakini yapıştır:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(),
    e.parameter.adSoyad || '',
    e.parameter.durum || '',
    e.parameter.kisiSayisi || '',
  ]);
  return ContentService.createTextOutput('OK');
}
```

3. Kaydet (Ctrl+S), projeye isim ver (örn. "RSVP").

## 3. Web App olarak yayınla

1. Sağ üstten **Dağıt (Deploy) → Yeni dağıtım (New deployment)**.
2. Tür olarak **Web uygulaması (Web app)** seç.
3. Ayarlar:
   - **Şu kimlikle çalıştır (Execute as):** Ben (Me)
   - **Erişimi olanlar (Who has access):** **Herkes (Anyone)** ← önemli!
4. **Dağıt**'a bas, Google hesabınla izin ver ("Güvenli değil" uyarısı çıkarsa
   *Gelişmiş → projeye git* diyerek onayla — kendi scriptin olduğu için güvenli).
5. Çıkan **Web app URL**'ini kopyala (`https://script.google.com/macros/s/.../exec`).

## 4. URL'i siteye ekle

`src/data/invitation.ts` dosyasında `scriptUrl` alanına yapıştır:

```ts
rsvp: { scriptUrl: 'https://script.google.com/macros/s/BURAYA_KENDI_URLIN/exec' },
```

Siteyi yeniden derleyip yayınla (`npm run build`).

## 5. Test et

1. Sitede formu doldurup gönder.
2. Google Sheet'i aç — yeni bir satır görünmeli: tarih, isim, durum, kişi sayısı.

## Notlar

- `scriptUrl` boş bırakılırsa RSVP bölümü sitede hiç görünmez.
- "Katılamıyorum" yanıtlarında kişi sayısı `0` olarak kaydedilir.
- Script kodunu değiştirirsen **yeniden dağıtman** gerekir
  (Dağıt → Dağıtımları yönet → kalem simgesi → Sürüm: Yeni sürüm → Dağıt).
