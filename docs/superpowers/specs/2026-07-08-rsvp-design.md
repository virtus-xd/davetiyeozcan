# RSVP (LCV) Özelliği — Tasarım Dokümanı

**Tarih:** 2026-07-08
**Proje:** Sema & Özcan düğün davetiyesi (Next.js 16, statik site, blossom teması)

## Amaç

Misafirler davetiye üzerinden katılım durumlarını (Katılıyorum / Katılamıyorum)
bildirsin; yanıtlar düğün sahibinin görebileceği bir Google Sheets tablosunda
toplansın. Site statik kalmaya devam etsin — backend veya veritabanı eklenmesin.

## Genel Akış

1. Misafir, davetiyedeki yeni **"Katılım Durumu (LCV)"** bölümünde formu doldurur.
2. Form, istemciden doğrudan bir **Google Apps Script** webhook URL'ine
   URL-encoded `fetch` POST'u ile gönderilir.
3. Apps Script, bağlı Google Sheet'e bir satır ekler:
   `Zaman | Ad Soyad | Durum | Kişi Sayısı`.
4. Düğün sahibi tabloyu telefondan/bilgisayardan açıp tüm yanıtları görür.

## Bileşenler

### 1. `src/components/blossom/RsvpSection.tsx` (yeni)

- `InvitationRenderer` içinde `EventDetailsSection` ile `Footer` arasına yerleşir.
- Mevcut bej/blossom estetiğine uyar (diğer bölümlerin tipografi ve renk düzeni).
- **Form alanları:**
  - Ad Soyad — zorunlu metin alanı.
  - Katılım durumu — "Katılıyorum" / "Katılamıyorum" buton-seçim (zorunlu).
  - Kişi sayısı — yalnızca "Katılıyorum" seçiliyken görünür; 1–10 arası, varsayılan 1.
- **Durum yönetimi:**
  - Gönderim sırasında: buton devre dışı + "Gönderiliyor…" metni.
  - Başarıda: form yerine teşekkür mesajı ("Yanıtınız iletildi 🌸").
  - Hatada: Türkçe hata mesajı, form tekrar gönderilebilir.
- **Mükerrer gönderim koruması:** Başarılı gönderim `localStorage`'a yazılır;
  sayfa yeniden açıldığında doğrudan teşekkür ekranı gösterilir. (Basit,
  kritik olmayan koruma — farklı cihaz/tarayıcıdan tekrar gönderilebilir.)

### 2. Veri modeli değişiklikleri

- `src/components/types.ts`: `InvitationData`'ya opsiyonel alan eklenir:

  ```ts
  rsvp?: { scriptUrl: string };
  ```

- `src/data/invitation.ts`: `rsvp: { scriptUrl: '' }` alanı eklenir.
- **Koşullu render:** `scriptUrl` boşsa RSVP bölümü hiç render edilmez —
  kurulum tamamlanana kadar site bozulmaz.

### 3. Google tarafı (tek seferlik kurulum)

- Hazır Apps Script kodu (`doPost` → sheet'e satır ekleme) ve adım adım Türkçe
  kurulum talimatı `docs/rsvp-kurulum.md` dosyasında verilir.
- Kurulum: Google Sheet aç → Apps Script'i yapıştır → "Web App" olarak yayınla
  (erişim: herkes) → çıkan URL'i `invitation.ts` içindeki `scriptUrl`'e yapıştır.
- Apps Script `no-cors`/redirect davranışı nedeniyle istemci yanıt gövdesini
  okuyamayabilir; başarı, isteğin ağ hatası olmadan tamamlanmasına göre kabul
  edilir (Apps Script web app'lerinde standart yaklaşım).

## Hata Yönetimi

- Ağ hatası / fetch reddi → kullanıcıya "Gönderilemedi, lütfen tekrar deneyin"
  mesajı; form verisi korunur.
- Boş isim veya durum seçilmeden gönderim → istemci tarafı doğrulama, form
  gönderilmez, ilgili alan işaretlenir.

## Test / Doğrulama

- Form doğrulaması, koşullu kişi sayısı alanı ve durum geçişleri tarayıcıda
  manuel doğrulanır (dev sunucusu ile).
- Gerçek bir test gönderimi yapılıp Google Sheet'te satırın göründüğü teyit
  edilir (script kurulumu sonrası).
- `scriptUrl` boşken bölümün render edilmediği doğrulanır.
- `npm run build` ile üretim derlemesinin geçtiği doğrulanır.

## Kapsam Dışı (YAGNI)

- Admin paneli / yanıt listeleme sayfası (Sheet zaten bu işi görüyor).
- E-posta/WhatsApp bildirimi.
- Sunucu tarafı doğrulama, rate limiting, spam koruması.
- Not/dilek alanı (kullanıcı tercihiyle kapsam dışı bırakıldı).
