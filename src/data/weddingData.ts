import type {
  CoupleInfo,
  StoryMilestone,
  WeddingEvent,
  GalleryPhoto,
  FamilyMember,
  InstagramReel,
} from '../types/wedding';
import type { WeddingSiteData } from '../types/cms';

export const coupleInfo: CoupleInfo = {
  brideName: 'Sunitha',
  brideFullName: 'Sunitha Rani',
  groomName: 'Prasad',
  groomFullName: 'Vara Prasad',
  weddingDate: '2026-11-28T10:30:00',
  weddingDateFormatted: 'Saturday, November 28, 2026',
  weddingTime: '10:30 AM IST',
  locationCity: 'Bengaluru, India',
  tagline: 'Two Hearts, One Faith, One Forever',
  themeVerse: {
    verse: 'So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.',
    reference: 'Matthew 19:6',
  },
  sectionTitle: 'The Happy Couple',
  sectionSubtitle: 'United by God in Holy Love',
  brideTitle: 'The Bride',
  brideQualification: 'B.Tech, M.Tech (Computer Science)',
  brideParents: 'Daughter of Mr. Samuel Joseph & Mrs. Mary Joseph',
  brideBio: '',
  brideVerse: '“She is clothed with strength and dignity, and she laughs without fear of the future.” — Proverbs 31:25',
  bridePhotoUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  groomTitle: 'The Groom',
  groomQualification: 'B.E, M.S (Software Systems)',
  groomParents: 'Son of Mr. David Prasad & Mrs. Elizabeth Prasad',
  groomBio: '',
  groomVerse: '“As for me and my house, we will serve the Lord.” — Joshua 24:15',
  groomPhotoUrl:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
};

export const blessingsVerse = {
  main: {
    verse: 'So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.',
    reference: 'Matthew 19:6',
  },
  secondary: {
    verse: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. Love never fails.',
    reference: '1 Corinthians 13:4, 8',
  },
  prayer:
    'Heavenly Father, we surrender our lives, our love, and our future into Your gracious hands. May our home be an altar of worship, a haven of peace, and a beacon of Your unfailing grace.',
};

export const storyMilestones: StoryMilestone[] = [
  {
    id: '1',
    phase: 'The Beginning',
    title: 'A Divine Appointment',
    date: 'Autumn 2022',
    description:
      'We met through our church youth fellowship. What started as shared prayers and weekly Bible studies soon blossomed into heartfelt conversations about purpose, family, and faith.',
    verse: '“I have found the one whom my soul loves.” — Song of Solomon 3:4',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '2',
    phase: 'First Meeting',
    title: 'A Quiet Afternoon in Grace',
    date: 'Spring 2023',
    description:
      'Our first one-on-one meeting was over warm chai and old hymnals. In that calm quietness, we discovered an effortless alignment of values, dreams, and devotion to God.',
    verse: '“Every good and perfect gift is from above.” — James 1:17',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '3',
    phase: 'First Yes',
    title: 'Surrendering to His Plan',
    date: 'Summer 2024',
    description:
      'With the blessings of our parents and mentors, we made the conscious choice to walk together in courtship, seeking the Lord’s will in every step and discernment.',
    verse: '“Two are better than one, because they have a good return for their labor.” — Ecclesiastes 4:9',
    image:
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '4',
    phase: 'The Engagement',
    title: 'A Promise Under the Stars',
    date: 'Winter 2025',
    description:
      'Surrounded by soft candlelight, white lilies, and quiet acoustic hymns, Prasad knelt in prayer and asked Sunitha to be his partner in Christ for eternity. She said Yes!',
    verse: '“Above all these put on love, which binds everything together in perfect harmony.” — Colossians 3:14',
    image:
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '5',
    phase: 'Wedding Day',
    title: 'Covenant Before God and Loved Ones',
    date: 'November 28, 2026',
    description:
      'The sacred day we exchange our holy vows, united by the Holy Spirit in holy matrimony, celebrating with our beloved family and dear friends.',
    verse: '“A cord of three strands is not quickly broken.” — Ecclesiastes 4:12',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  },
];

export const weddingEvents: WeddingEvent[] = [
  {
    id: 'haldi',
    type: 'haldi',
    title: 'Haldi & Roce Ceremony',
    subtitle: 'Pre-Wedding Blessing & Cleansing Fellowship',
    date: 'Friday, November 27, 2026',
    time: '4:00 PM – 7:00 PM',
    venueName: 'Grace Heritage Villa & Courtyard',
    address: 'No. 42, Palm Meadows Road, Whitefield, Bengaluru, Karnataka 560066',
    attire: 'Traditional Yellow, Warm Ochre & Floral Attire',
    description:
      'A joyous South Indian pre-wedding celebration of prayer, holy blessing with turmeric and pure coconut milk (Roce), accompanied by traditional Christian hymns, fellowship, and warm laughter.',
    googleMapsUrl: 'https://maps.google.com/?q=Palm+Meadows+Whitefield+Bangalore',
    embedMapQuery: 'Palm Meadows, Whitefield, Bengaluru',
    highlights: [
      'Traditional Roce Blessing & Prayers',
      'Turmeric & Floral Shower',
      'Family Hymns & Thanksgiving',
      'High Tea & South Indian Sweets',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'matrimony',
    type: 'ceremony',
    title: 'Holy Matrimony',
    subtitle: 'Solemn Church Service & Nuptial Blessing',
    date: 'Saturday, November 28, 2026',
    time: '10:30 AM – 12:30 PM (Kindly be seated by 10:15 AM)',
    venueName: "St. Mark's Cathedral",
    address: 'No. 1, Mahatma Gandhi Road, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001',
    attire: 'Pastel Elegance / Modest Church Formal',
    description:
      'Join us as we enter the holy sanctuary to exchange our sacred vows, join hands in Holy Communion, and receive the pastoral blessing in the presence of God.',
    googleMapsUrl: 'https://maps.google.com/?q=St+Marks+Cathedral+MG+Road+Bangalore',
    embedMapQuery: "St Mark's Cathedral, MG Road, Bengaluru",
    highlights: [
      'Processional Hymn & Choral Prelude',
      'Scripture Readings & Pastoral Homily',
      'Exchange of Sacred Vows & Rings',
      'The Lord’s Supper & Benediction',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'reception',
    type: 'reception',
    title: 'Wedding Reception',
    subtitle: 'An Evening of Fellowship, Praise & Dining',
    date: 'Saturday, November 28, 2026',
    time: '6:30 PM Onwards',
    venueName: 'The Grand Rosewood Pavilion & Gardens',
    address: 'Heritage Valley Road, Off Sarjapur Main Road, Bengaluru, Karnataka 560035',
    attire: 'Formal Evening / Romantic Pastels',
    description:
      'An enchanting evening under the fairy lights surrounded by serene rose gardens. Join us for cake cutting, acoustic praise, fellowship, and a lavish celebratory feast.',
    googleMapsUrl: 'https://maps.google.com/?q=The+Grand+Rosewood+Pavilion+Bangalore',
    embedMapQuery: 'The Grand Rosewood Pavilion, Bengaluru',
    highlights: [
      'Welcome Drinks & High Tea (6:30 PM)',
      'Grand Couple Entry & Cake Cutting',
      'Heartfelt Toasts & Family Blessings',
      'Fellowship Banquet Dinner',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'g1',
    title: 'Moments of Grace',
    category: 'engagement',
    imageUrl:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    aspectRatio: 'portrait',
  },
  {
    id: 'g2',
    title: 'Sacred Covenant',
    category: 'ceremony',
    imageUrl:
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80',
    aspectRatio: 'landscape',
  },
  {
    id: 'g3',
    title: 'The Golden Hour Walk',
    category: 'candid',
    imageUrl:
      'https://images.unsplash.com/photo-1519225429402-b210086c8f49?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1519225429402-b210086c8f49?auto=format&fit=crop&w=600&q=80',
    aspectRatio: 'portrait',
  },
  {
    id: 'g4',
    title: 'Pure White Roses & Rings',
    category: 'ceremony',
    imageUrl:
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
    aspectRatio: 'square',
  },
  {
    id: 'g5',
    title: 'Laughter in the Meadows',
    category: 'candid',
    imageUrl:
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=600&q=80',
    aspectRatio: 'landscape',
  },
  {
    id: 'g6',
    title: 'Cathedral Aisle Dream',
    category: 'ceremony',
    imageUrl:
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=600&q=80',
    aspectRatio: 'portrait',
  },
  {
    id: 'g7',
    title: 'Hand in Hand Forever',
    category: 'engagement',
    imageUrl:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    aspectRatio: 'landscape',
  },
  {
    id: 'g8',
    title: 'Serenade of Joy',
    category: 'candid',
    imageUrl:
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80',
    aspectRatio: 'square',
  },
];

export const familyBlessings: FamilyMember[] = [
  {
    role: "Groom's Parents",
    title: 'Blessed Parents of the Groom',
    names: ['Mr. David Prasad', 'Mrs. Elizabeth Prasad'],
    blessingMessage:
      '“From his first steps to this sacred day, we have prayed for the woman who would walk beside Prasad in faith. Sunitha is the true answered prayer for our family. May God shower their new home with wisdom, unconditional love, and abundant peace.”',
    familySide: 'groom',
  },
  {
    role: "Bride's Parents",
    title: 'Cherished Parents of the Bride',
    names: ['Mr. Samuel Joseph', 'Mrs. Mary Joseph'],
    blessingMessage:
      '“Sunitha has always been the light and joy of our hearts. Seeing Prasad cherish, honor, and lead her with such humble Christ-like love fills our souls with joy. We entrust them to the Almighty, knowing that what He has ordained will forever stand firm.”',
    familySide: 'bride',
  },
];

export const instagramReels: InstagramReel[] = [
  {
    id: 'reel-1',
    title: 'The Engagement Story Reel',
    views: '48.2K',
    likes: '4.8K',
    url: 'https://www.instagram.com/reel/C8yZ7X0vV_b/',
    thumbnail:
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80',
    caption: 'When prayers turn into forever ✨ #SunithaWedsPrasad #ChristianWedding #HolyMatrimony',
  },
  {
    id: 'reel-2',
    title: 'Behind the Scenes & Pre-Wedding Whispers',
    views: '32.6K',
    likes: '3.9K',
    url: 'https://www.instagram.com/reel/C9Aa91ZpQmK/',
    thumbnail:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
    caption: 'Laughter, white bouquets, and grace-filled moments 🕊️ #LoveInChrist #ForeverBegins',
  },
  {
    id: 'reel-3',
    title: 'Save The Date Teaser',
    views: '61.4K',
    likes: '7.1K',
    url: 'https://www.instagram.com/reel/C-B81x4rTsD/',
    thumbnail:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    caption: 'Save the Date! November 28, 2026 💒 Two hearts, one faith, one forever.',
  },
  {
    id: 'reel-4',
    title: 'Family Prayer & Dedication Service',
    views: '24.1K',
    likes: '2.5K',
    url: 'https://www.instagram.com/reel/C_C702wNyEx/',
    thumbnail:
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=600&q=80',
    caption: 'Gathered under His wing, surrounded by our beloved family 🤍 #GratefulHearts',
  },
];

export const weddingHashtag = '#SunithaWedsPrasad';

// Full default configuration object for the CMS
export const defaultWeddingData: WeddingSiteData = {
  couple: coupleInfo,
  envelope: {
    headerText: "Together With God's Blessings",
    subHeaderText: "Holy Matrimony",
    sealBorderText: "LOVE NEVER FAILS • 1 COR 13:8 •",
    buttonText: "Tap to Unwrap Our Gift",
    subNoticeText: "An interactive wedding gift invitation",
    churchBgUrl: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1920&q=80",
    bgBlurIntensity: "blur-md",
    topLeftBadgeText: "A Special Wedding Gift for You",
    bottomRightBadgeText: "Matthew 19:6",
    cardHonorText: "Request the honor of your presence",
  },
  hero: {
    divineCallingText: "BY THE GRACE OF GOD",
    tagline: "Two Hearts, One Faith, One Forever",
    gettingMarriedText: "ARE GETTING MARRIED",
    backgroundUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
    churchNameShort: "St. Mark's Cathedral, Bengaluru",
    eventsButtonText: "Wedding Events",
    rsvpButtonText: "Locations & Directions",
    overlayOpacity: 35,
  },
  blessings: {
    sectionTitle: "God's Holy Blessings",
    sectionSubtitle: "Sacred Covenant",
    mainVerse: "So they are no longer two, but one flesh. Therefore what God has joined together, let no one separate.",
    mainVerseRef: "Matthew 19:6",
    secondaryVerse: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. Love never fails.",
    secondaryVerseRef: "1 Corinthians 13:4, 8",
    prayerTitle: "The Couple's Prayer of Dedication",
    prayerText: "Heavenly Father, we surrender our lives, our love, and our future into Your gracious hands. May our home be an altar of worship, a haven of peace, and a beacon of Your unfailing grace.",
  },
  storySettings: {
    sectionTitle: "Our Love Story",
    sectionSubtitle: "Guided By Faith",
    sectionDescription: "How the Lord wrote every chapter of our lives, weaving two paths into one eternal purpose.",
  },
  story: storyMilestones,
  countdown: {
    sectionTitle: "Wedding Countdown",
    sectionSubtitle: "Anticipating The Holy Day",
    scriptureVerse: "He has made everything beautiful in its time.",
    scriptureRef: "Ecclesiastes 3:11",
    googleCalendarTitle: "Sunitha & Prasad Holy Matrimony & Wedding Celebration",
    googleCalendarDescription: "Together with God's blessings, celebrate the Holy Matrimony and wedding reception of Sunitha & Prasad. St. Mark's Cathedral, Bengaluru.",
    calendarLocation: "St. Mark's Cathedral, MG Road, Bengaluru, Karnataka, India",
  },
  eventsSettings: {
    sectionTitle: "Wedding Events",
    sectionSubtitle: "Celebration of Covenant",
    sectionDescription: "We cordially invite you to join us in prayer, thanksgiving, and fellowship as we celebrate our holy union.",
  },
  events: weddingEvents,
  gallerySettings: {
    sectionTitle: "Wedding Gallery",
    sectionSubtitle: "Cherished Moments",
    sectionDescription: "Capturing the smiles, sacred prayers, and quiet grace leading up to our forever.",
  },
  gallery: galleryPhotos,
  familySettings: {
    sectionTitle: "Family Blessings",
    sectionSubtitle: "Honoring Our Heritage",
    proverbVerse: "“Children’s children are a crown to the aged, and parents are the pride of their children.” — Proverbs 17:6",
  },
  family: familyBlessings,
  warmRegards: {
    sectionSubtitle: "Cordial Invitation",
    sectionTitle: "With Warm Regards",
    brideFamilyTitle: "Invited by the Bride's Family",
    parentsNames: "Mr. Samuel Joseph & Mrs. Mary Joseph",
    parentsRelation: "Loving Parents of Sunitha Rani",
    invitationQuote:
      "“With prayerful hearts and joyous praise to Almighty God, we cordially invite you and your family to witness and celebrate the Holy Matrimony of our beloved daughter Sunitha with Prasad. Your gracious presence and prayers will make our joy complete.”",
    familyMembersList:
      "Alan Joseph (Brother)\nLate Mr. P. Joseph & Mrs. Annamma Joseph (Grandparents)\nWith Best Compliments from Uncles, Aunts, Cousins, and the entire Joseph Family & Well-wishers",
    scriptureVerse:
      "“The Lord bless you and keep you; the Lord make His face shine on you and be gracious to you; the Lord turn His face toward you and give you peace.” — Numbers 6:24-26",
    footerNote: "Warmly welcoming you from Bengaluru, Karnataka",
  },
  reelsSettings: {
    sectionTitle: "Instagram Reels & Highlights",
    sectionSubtitle: "Social Celebrations",
    sectionDescription: "Watch our pre-wedding teasers, engagement clips, and prayer gatherings on Instagram.",
  },
  reels: instagramReels,
  rsvpSettings: {
    sectionTitle: "Wedding RSVP",
    sectionSubtitle: "Celebrate With Us",
    deadlineNotice: "Kindly respond by October 25, 2026. Your presence and prayers mean the world to us.",
  },
  locations: {
    sectionTitle: "Wedding Locations & Directions",
    sectionSubtitle: "Getting There",
    churchParkingNote: "Complimentary church compound parking & overflow at gate 2.",
    churchTransitNote: "MG Road Metro Station is a short 3-minute walk.",
    churchEtiquetteNote: "Kindly silence phones and refrain from flash during prayers.",
    receptionParkingNote: "Valet parking available at the main pavilion entrance.",
    receptionTransitNote: "Ride-sharing cabs (Uber/Ola) have a designated drop point.",
    receptionPhotoNote: "Feel free to capture and share photos with #SunithaWedsPrasad!",
  },
  final: {
    sectionTitle: "Two Hearts. One Faith. One Beautiful Forever.",
    tagline: "UNTIL ETERNITY",
    closingPhotoUrl: "https://images.unsplash.com/photo-1519225429402-b210086c8f49?auto=format&fit=crop&w=1000&q=80",
    benedictionVerse: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.",
    benedictionRef: "Numbers 6:24–26",
    footerNote: "With heartfelt love and prayers from the families of Sunitha & Prasad.",
  },
  social: {
    weddingHashtag: "#SunithaWedsPrasad",
    instagramHandle: "@sunitha_and_prasad",
  },
  music: {
    trackTitle: "Hymn of Grace & Peace",
    customAudioUrl: "",
    useSyntheticMelody: true,
    autoPlayAfterEnvelope: true,
  },
};
