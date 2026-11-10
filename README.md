# Premium Christian Wedding Invitation Website & Full CMS 🕊️💍

A modern, cinematic, and luxurious Christian wedding invitation website with an **Interactive 3D Opening Envelope Experience** and a **Complete Content Management System (CMS)**, built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

Designed for **Sunitha & Prasad** under God's grace.

---

## 🛠️ Complete Wedding CMS (Admin Dashboard)

Every single page, section, text, milestone, photo, and guest response can be edited and managed in real-time by the administrator without touching code.

### How to Access the CMS
* Click the **"Admin CMS"** button in the navigation bar, footer, or the floating pill in the bottom-left corner of the screen.
* **Default Admin PIN:** `grace2026`
* *(A handy "Quick Demo Unlock" option is also provided directly on the login modal).*

---

### 📌 Pin-to-Pin Editable Sections in CMS

| Section / Tab | Features & Editable Properties |
| :--- | :--- |
| **1. Overview & Metrics** | Live counters for Total RSVPs, Confirmed Attendees, Chapters, Photos, plus 1-click live site preview. |
| **2. Couple & Date** | Groom short/full names, Bride short/full names, date-time picker, formatted date, city, and core tagline. |
| **3. 3D Envelope & Seal** | Envelope header text, subheader text, wax seal Latin scripture text (*LOVE NEVER FAILS • 1 COR 13:8*), tap CTA button text, and church background image URL. |
| **4. Hero Section** | Divine calling badge (*BY THE GRACE OF GOD*), hero quote/tagline, *"ARE GETTING MARRIED"* label, background image URL, church name, and action button labels. |
| **5. Scripture & Prayer** | Main Bible verse & reference (**Matthew 19:6**), secondary scripture (**1 Cor 13:4, 8**), and couple's dedication prayer. |
| **6. Love Story Timeline** | **Full CRUD**: Add new milestones, edit titles, phases, dates, descriptions, scripture quotes, image URLs, or delete milestones. |
| **7. Countdown & Calendar** | Section headers, scripture reflection (**Ecclesiastes 3:11**), Google Calendar event title, description, and location. |
| **8. Wedding Events** | **Full CRUD**: Add, edit, and delete ceremony events (Holy Matrimony, Reception, etc.) with titles, times, venues, dress codes, full addresses, Google Maps links, and highlight checklists. |
| **9. Photo Gallery** | **Full CRUD**: Add, edit, or delete photos with titles, categories (*Ceremony, Engagement, Candid*), full URLs, and aspect ratios. |
| **10. Family Blessings** | Edit Groom's Parents (*names, title, blessing message*) and Bride's Parents (*names, title, blessing message*). |
| **11. Reels & Hashtag** | Official wedding hashtag (`#SunithaWedsPrasad`), plus **CRUD** for Instagram reel cards (titles, URLs, thumbnails, captions). |
| **12. Locations & Logistics**| Church and Reception logistics: parking guidance, transit/metro notes, and cathedral photography etiquette. |
| **13. Final & Benediction** | Closing tagline, headline, closing couple portrait URL, **Numbers 6:24–26** blessing verse, and footer note. |
| **14. Audio & Music** | Track title, custom MP3 URL (or peaceful built-in Web Audio synth melody), and envelope autoplay settings. |
| **15. Live RSVP Manager** | Real-time guest list with search by name/email, attendance filter, total count summary, dietary requirements, personal blessings, and **1-Click Export to CSV**. |
| **16. Backup & Security** | Change Admin PIN, export complete website JSON configuration, import JSON to restore, and factory reset to default template. |

---

## 🎨 Design & Soft Romantic Pastel Theme

Strict adherence to a soft, romantic, premium pastel theme (no black, no gold, no dark themes, and no neon colors):

| Color Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Ivory Cream** | `#F8F3EE` / `#FDFAF7` | Base canvas, background, textured card stock |
| **Sage Green** | `#DCE8E2` / `#8EAFA0` | Satin ribbon, accent badges, botanical flourishes |
| **Dusty Rose** | `#E9D8DE` / `#BA8FA0` | Embossed wax seal, delicate dividers, floral petals |
| **Powder Blue** | `#D8E4F0` / `#A8C4DF` | Subtle secondary highlights and sky vignettes |
| **Warm Taupe** | `#A8978A` / `#736357` | Borders, subtle hairline frames, date badges |
| **Soft Brown Text** | `#66564D` / `#43362F` | Primary serif headings, scripture, and readable body text |

### Typography
- **Headings & Accents:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (Serif)
- **Body & Controls:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Clean Sans)
- **Romantic Script:** [Great Vibes](https://fonts.google.com/specimen/Great+Vibes) (Calligraphy)

---

## ✨ Interactive Opening Envelope Experience

When a guest arrives at the link, they see **only** the closed luxury invitation envelope:
1. **Ivory Textured Envelope** with realistic paper grain, side/bottom folds, and warm candlelight glow.
2. **Sage Green Satin Ribbon** wrapping horizontally and vertically with realistic satin sheen and bow loops.
3. **Dusty Rose Wax Seal** with an embossed Christian cross and scripture border (*LOVE NEVER FAILS • 1 COR 13:8*).
4. **Cinematic 5-Stage Tap Animation:**
   - **Step 1:** Wax seal fractures and releases with an acoustic crackle.
   - **Step 2:** Sage green satin ribbon gracefully slides away and fades.
   - **Step 3:** Envelope flap unfolds upward with realistic 3D perspective fold (`rotateX(180deg)`).
   - **Step 4:** The textured invitation card slides up and out of the envelope pocket.
   - **Step 5:** Card smoothly expands into the full wedding website with a cinematic transition, while peaceful wedding hymn music begins playing.
5. **Replay Feature:** Guests can click *"Reopen Envelope"* at any time in the navbar or closing section to relive the experience.

---

## 🔥 Firebase Realtime Database (RTDB) Integration

The web app is connected to **Firebase Realtime Database (RTDB)**:
* **RTDB Link:** `https://wedding-25306-default-rtdb.firebaseio.com/`
* **Project ID:** `wedding-25306`

### What Firebase Realtime Database Powers:
1. **Instant Cloud RSVPs:**
   - Any guest submitting an RSVP is stored under the `rsvps/` node in the Realtime Database.
   - The Admin CMS dashboard receives instant sub-second push notifications (`onValue`) when an RSVP is submitted or deleted.
2. **Instant CMS Site Updates:**
   - Edits made in the CMS are pushed to `wedding_config` in RTDB.
   - All guests visiting the website see live updates in real-time across any phone or computer without reloading.
3. **Automatic Offline Fallback:**
   - If a device is offline or permissions are pending, the app continues to operate using `localStorage`.

### Recommended Firebase Realtime Database Security Rules:
In your [Firebase Console → Realtime Database → Rules](https://console.firebase.google.com/project/wedding-25306/database/wedding-25306-default-rtdb/rules), set:
```json
{
  "rules": {
    "rsvps": {
      ".read": true,
      ".write": true
    },
    "wedding_config": {
      ".read": true,
      ".write": true
    }
  }
}
```

---

## ☁️ Cloudinary Media & Asset Management

The web app is connected to **Cloudinary** for image, media, and asset storage and optimization:
* **Cloud Name:** `hl15ad6n`
* **API Key:** `378234116654941`
* **Asset Folder:** `wedding_sunitha_prasad`
* **Upload Endpoint:** `https://api.cloudinary.com/v1_1/hl15ad6n/auto/upload`

### Key Cloudinary Capabilities & Integration Points:
1. **Direct Signed Browser Uploads:**
   - Uploads occur directly from the client browser via signed requests using Web Crypto SHA-1 digests.
   - No intermediary backend server is required.
2. **Integrated CMS Upload Buttons:**
   - **Overview Tab:** Quick live test button and status indicators.
   - **3D Envelope Tab:** Church Sanctuary background uploader.
   - **Hero Section Tab:** Cinematic couple hero background image uploader.
   - **Love Story Timeline Tab:** Milestone photo uploaders for each chapter + in the Add Milestone form.
   - **Photo Gallery Tab:** **1-Click Quick Upload** button (picks an image, uploads to Cloudinary, and instantly adds it to the masonry gallery) + Custom Photo Form uploader.
   - **Instagram Reels Tab:** Custom reel thumbnail cover uploader.
   - **Closing Benediction Tab:** Closing couple portrait uploader.
   - **Audio & Music Tab:** Custom audio/hymn track uploader.
3. **Automated URL Optimization:**
   - Helper utilities (`getOptimizedCloudinaryUrl`, `getCloudinaryThumbnail`) apply automated modern formats (`f_auto`), smart compression (`q_auto`), and responsive thumbnails.

---

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

*“What God has joined together, let no one separate.” — Matthew 19:6*
