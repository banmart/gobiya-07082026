// Microsoft Clarity Data Export API Client
// Official Docs: https://www.clarity.ms/export-data/api/v1/project-live-insights

/**
 * Fetches live insights data from Microsoft Clarity for a given project token.
 * 
 * @param {string} token - Microsoft Clarity Data Export API Bearer Token
 * @param {number} numOfDays - Number of days to fetch (1 to 3 days allowed by Clarity API)
 * @returns {Promise<Object|null>} - Returns Clarity insights payload or null if unavailable
 */
export async function fetchClarityInsights(token = process.env.CLARITY_API_TOKEN, numOfDays = 3) {
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=${numOfDays}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.warn(`[Clarity API] Request failed with status ${response.status}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[Clarity API] Network or parsing error:', error);
    return null;
  }
}
