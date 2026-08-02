// The branded hero photographs, and the rotation that spreads them across the
// site.
//
// Every page with a full-bleed hero — the homepage, the eight service pages,
// the /areas-we-serve index and the ten city pages — pulls its background from
// here rather than naming a file itself. Nineteen surfaces, five pictures, so
// repeats are unavoidable; what the rotation buys is that pages a visitor sees
// back to back (a service and the next service, a city and its neighbour) never
// land on the same one.
//
// public/img holds six .webp files, but two of them are the same picture saved
// under different names: Change_room_logo_right_people_202607291545.webp is
// byte-identical to Change_scene_same_background_people_202607291544.webp. Only
// the ...1544 name is listed below. Adding the duplicate back would make two
// pages look identical while the code claimed they differed, which is the exact
// thing this file exists to prevent.
//
// Ordering alternates where the Gobiya mark sits in the frame — centre, right,
// centre, right — so consecutive pages read as different rooms rather than the
// same photograph nudged sideways.
//
// The spaces in the ...(1) and ...(2) filenames are written as %20. A browser
// would encode them anyway inside a quoted url(), but these strings are also
// handed to next/image and to <video poster>, and an already-encoded path is
// the one form all three treat the same.
export const HERO_IMAGES = [
  // Single figure walking toward camera, mark centre-left. The one image with a
  // matching .webm, hence the homepage's.
  '/img/Change_scene_same_background_people_202607291544.webp',
  // Rust dress crossing left of frame, mark on the right-hand wall.
  '/img/Change_room_logo_right_people_202607291545%20(1).webp',
  // Busiest of the five: group at right, mark centre, grid lines on the floor.
  '/img/Change_scene_same_background_people_202607291543.webp',
  // Calmest of the five: two figures centre, mark on the right-hand wall.
  '/img/Change_room_logo_right_people_202607291545%20(2).webp',
  // Heaviest blue wash, group centre-right, mark centre.
  '/img/Use_logo_and_character_2K_202607291541%20(1).webp',
];

// The homepage hero plays this behind the still, which is why HERO_IMAGES[0]
// cannot be reordered away from index 0 — the poster and the first frame of the
// video have to be the same room.
export const HERO_VIDEO = '/assets/videos/home-hero-background-video.webm';
export const HERO_VIDEO_MP4 = '/assets/videos/home-hero-background-video.mp4';

// Position on the site-wide rotation, not an index into HERO_IMAGES. Callers
// pass a stable number — the homepage is 0, services run 1–8, the areas index
// is 9, the cities run 10–19, /about is 22 — so the picture a given page shows
// stays put between builds instead of shuffling whenever the array changes
// length.
//
// /about skips 20 and 21 on purpose. Five pictures means position % 5 decides
// the image, so 20 would hand /about the homepage's photograph and 21 would
// hand it /services/seo's — and Home → About is the most walked path on the
// site. 22 lands on a room neither neighbour uses.
export function heroImage(position) {
  return HERO_IMAGES[position % HERO_IMAGES.length];
}
