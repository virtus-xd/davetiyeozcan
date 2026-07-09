import type { InvitationData } from '@/components/types';

/**
 * Sema & Özcan düğün davetiyesi verisi.
 * Tüm davetiye içeriği bu dosyadan okunur — değişiklik gerekirse tek nokta.
 */
export const invitation: InvitationData = {
  brideName:     'Sema',
  groomName:     'Özcan',
  eventType:     'Evleniyoruz',
  topDecoration: 'Düğünümüze Davetlisiniz',

  dateStr:     '2026-08-20T19:00:00',
  dateDisplay: '20 Ağustos 2026',
  timeDisplay: 'PERŞEMBE, SAAT 19:00',

  venue: {
    name:         'Jade Beach Club',
    addressLine1: 'Kadınlar Denizi, Yılancı Burnu Mevkii',
    addressLine2: 'Kuşadası / Aydın',
    city:         'Kuşadası • Aydın',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Jade+Beach+Club+Ku%C5%9Fadas%C4%B1',
    googleMapsEmbed:
      'https://maps.google.com/maps?q=37.8580604,27.2451131&hl=tr&z=16&output=embed',
  },

  events: [
    {
      iconName:    'Clock',
      title:       'Karşılama',
      time:        '19:00',
      description: 'Misafirlerimizi karşılıyoruz, hoşgeldiniz kokteyli.',
    },
    {
      iconName:    'Heart',
      title:       'Nikah Töreni',
      time:        '20:00',
      description: 'Hayatımızın en özel anına tanıklık etmenizi diliyoruz.',
    },
    {
      iconName:    'Calendar',
      title:       'Yemek & Eğlence',
      time:        '21:00',
      description: 'Birlikte yer, dans eder, sabaha kadar kutlarız.',
    },
  ],

  footer: {
    message:      'Bu özel günde yanımızda olmanızı çok isteriz.',
    families:     'İnal ve Uzun Aileleri',
    hashtag:      '#semaözcan',
    contactEmail: '',
    instagramUrl: '',
    emailUrl:     '',
    credits:      'Sanal Davetiyecim ile hazırlandı',
  },

  // Kurulum: docs/rsvp-kurulum.md — Apps Script web app URL'i buraya yapıştırılır.
  rsvp: { scriptUrl: 'https://script.google.com/macros/s/AKfycbwPGdU6VnnsaAccocFUjmQ-T2AzySiTECNC4TXyxZ_QG-QQeaa10vbNyy9n2utp_fi4/exec' },

  // İlk 3 görsel = 1. kolaj, sonraki 3 görsel = 2. kolaj (soldan sağa sırayla).
  // 7. görselden itibaren kolajların altında tekli olarak alt alta gösterilir.
  gallery: [
    '/gallery/1.jpeg',
    '/gallery/2.jpeg',
    '/gallery/4.jpeg',
    '/gallery/6.jpeg',
    '/gallery/3.jpeg',
    '/gallery/5.jpeg',
    '/gallery/7.jpeg',
    '/gallery/8.jpeg',
  ],
};
