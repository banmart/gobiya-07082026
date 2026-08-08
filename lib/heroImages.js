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
// Encoded for scrubbing, which is a different job from encoding for playback:
//
// - 24fps, not 12. 12fps is 96 pictures spread over the whole pin, so scrolling
//   steps through them one visible jump at a time. The master is 24fps, so this
//   is just no longer throwing half the frames away.
// - Every frame a keyframe (-g 1). A seek then decodes exactly one frame no
//   matter where it lands, instead of a frame plus its GOP predecessors. This is
//   also what makes video.fastSeek() exact rather than a jump to the last I-frame.
// - H.264, no VP9/webm alternative. Chrome would pick the webm, and VP9 decodes
//   in software on most desktops while H.264 hits the hardware decoder — for a
//   file that gets seeked several times a second, that difference is the stutter.
//
// Sizes at crf 27, preset slower, for the same 8 seconds: 5.8MB at 1280x720,
// 2.9MB at 854x480. An earlier note here recorded 23MB for all-keyframe VP9 and
// concluded all-keyframe was not worth it; that was a VP9 number, and H.264
// all-intra lands within a megabyte of the 4-frame-GOP VP9 it replaces.
//
// Only served at 768px and up — see HERO_VIDEO_WEBM_MOBILE/HERO_VIDEO_MP4_MOBILE
// below for what plays under that breakpoint.
export const HERO_VIDEO_MP4 = '/assets/videos/hero-walks-forward-scrub.mp4';
export const HERO_VIDEO_POSTER = '/img/hero-walks-forward-poster.webp';

// Mobile background loop — normal (non-scrub) encodes of the same
// walking-forward clip, sized for continuous autoplay+loop rather than JS
// seeking. Mobile never runs the scroll-scrub (see the desktop-only media
// query in HomeHeroVideo.js), so the all-keyframe scrub encode above bought
// nothing there but a bigger, frozen first frame. webm goes first for the
// smaller file; the h264 mp4 is the fallback for browsers without webm
// support (Safari/iOS).
export const HERO_VIDEO_WEBM_MOBILE = '/assets/videos/hero-walks-forward.webm';
export const HERO_VIDEO_MP4_MOBILE = '/assets/videos/hero-walks-forward-h264.mp4';

// Position on the site-wide rotation, not an index into HERO_IMAGES. Callers
// pass a stable number — the homepage is 0, services run 1–8, the areas index
// is 9, the cities run 10–19, /about is 22 — so the picture a given page shows
// stays put between builds instead of shuffling whenever the array changes
// length.
//
// /about skips 20 and 21 on purpose. Five pictures means position % 5 decides
// the image, so 20 would hand /about the homepage's photograph and 21 would
// hand it /services/technical-seo's — and Home → About is the most walked path on the
// site. 22 lands on a room neither neighbour uses.
export function heroImage(position) {
  return HERO_IMAGES[position % HERO_IMAGES.length];
}
