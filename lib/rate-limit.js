// In-memory store for rate limiting (will reset on server restart or lambda cold boot)
// Key: `${ip}_${toolId}`
// Value: { count: number, resetAt: number }
const rateLimitMap = new Map();

export function checkRateLimit(ip, toolId, maxRequests = 2, windowHours = 24) {
  const key = `${ip}_${toolId}`;
  const now = Date.now();
  const windowMs = windowHours * 60 * 60 * 1000;

  const userRecord = rateLimitMap.get(key) || { count: 0, resetAt: now + windowMs };

  // If the window has expired, reset their count
  if (now > userRecord.resetAt) {
    userRecord.count = 0;
    userRecord.resetAt = now + windowMs;
  }

  if (userRecord.count >= maxRequests) {
    return false; // Rate limit exceeded
  }

  userRecord.count += 1;
  rateLimitMap.set(key, userRecord);
  return true;
}
