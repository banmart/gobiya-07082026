import { createServerSupabase } from './supabase/server.js';

export async function listClientReviews(clientId) {
  const supabase = await createServerSupabase();
  let query = supabase
    .from('google_reviews')
    .select('id, author_name, rating, review_text, response_text, status, reviewed_at, created_at')
    .order('reviewed_at', { ascending: false });

  if (clientId) {
    query = query.eq('client_id', clientId);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching google reviews:', error);
    return [];
  }
  return data ?? [];
}

export async function postReviewResponse(reviewId, responseText) {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from('google_reviews')
    .update({
      response_text: responseText,
      status: 'replied',
    })
    .eq('id', reviewId)
    .select('id, response_text, status')
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, review: data };
}
