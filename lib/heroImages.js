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

// The homepage hero scrub video, and the still it has to agree with.
//
// This clip is a DIFFERENT take from HERO_IMAGES[0]: same room and same set,
// but the figure walking toward camera is the man in the denim jacket, not the
// woman with the phone, and the framing sits further back. So the homepage no
// longer posters off HERO_IMAGES[0] — it uses HERO_VIDEO_POSTER below, which is
// frame 0 of this file pulled with ffmpeg. Point the hero back at heroImage(0)
// and you get a visible cut the moment the video paints.
//
// HERO_IMAGES[0] still should not be reordered, but for the rotation reason in
// the comment above rather than a poster match.
//
// Encoded 12fps, keyframe every 4 frames (-g 4), 1280x720, VP9 crf 30. The GOP
// is the part that matters for scrubbing: a seek lands at most 3 frames past a
// keyframe, so it decodes 3 frames worst case rather than a long chain. Every
// frame a keyframe (-g 1) was measured first and came out at 23MB for the same
// 8 seconds, which buys nothing a 4-frame GOP does not already give here.
export const HERO_VIDEO = '/assets/videos/hero-walks-forward.webm';
export const HERO_VIDEO_MP4 = '/assets/videos/hero-walks-forward-h264.mp4';
export const HERO_VIDEO_POSTER = '/img/hero-walks-forward-poster.webp';

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
