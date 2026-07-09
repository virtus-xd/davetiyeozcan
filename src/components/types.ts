export interface InvitationEvent {
  iconName: string;
  title: string;
  time: string;
  description: string;
}

export interface InvitationVenue {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
}

export interface InvitationFooter {
  message: string;
  /** Aile adları — mesajın altında gösterilir (örn. "İnal ve Uzun Aileleri"). Boşsa gizlenir. */
  families?: string;
  hashtag: string;
  contactEmail: string;
  instagramUrl: string;
  emailUrl: string;
  credits: string;
}

export interface InvitationData {
  brideName: string;
  groomName: string;
  eventType: string;
  topDecoration: string;
  dateStr: string;
  dateDisplay: string;
  timeDisplay: string;
  venue: InvitationVenue;
  events: InvitationEvent[];
  footer: InvitationFooter;
  /** RSVP (LCV) — Google Apps Script webhook URL'i. Boşsa RSVP bölümü render edilmez. */
  rsvp?: { scriptUrl: string };
  /** Galeri görselleri — en az 3 foto varsa galeri bölümü render edilir */
  gallery?: string[];
}
