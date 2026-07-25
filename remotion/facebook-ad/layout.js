import { useVideoConfig } from 'remotion';

// Every placement is 1080 wide, so horizontal layout never changes — only the
// vertical room does, plus where each surface puts its own UI chrome.
//
//   1:1  1080x1080  feed/marketplace. 270px shorter than the 4:5 master, so
//                   the tallest scenes (services, hook) get scaled down a
//                   touch rather than crowding the caption bar.
//   4:5  1080x1350  the design size everything is authored against.
//   9:16 1080x1920  Reels and Stories. Meta overlays the profile row up top
//                   and the caption + CTA block along the bottom ~250px, so
//                   burned-in captions have to sit well clear of it.
export const useLayout = () => {
  const { height } = useVideoConfig();

  if (height <= 1080) {
    return { scale: 0.92, shiftY: 0, captionBottom: 62, frameInset: 40 };
  }
  if (height >= 1920) {
    // 1.08 is the ceiling: the widest surface is the services card at 912px,
    // which lands at 985px and still keeps a margin inside the 1080 frame.
    // Content is nudged up so it isn't crowded against the caption block,
    // which sits high here to clear Meta's UI.
    return { scale: 1.08, shiftY: -70, captionBottom: 300, frameInset: 86 };
  }
  return { scale: 1, shiftY: 0, captionBottom: 74, frameInset: 46 };
};
