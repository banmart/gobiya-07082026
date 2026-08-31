'use client';

import { useActionState } from 'react';
import { resendInviteAction } from './actions';

const INITIAL = {};

export default function ResendInviteButton({ clientId }) {
  const [state, formAction, pending] = useActionState(resendInviteAction, INITIAL);

  if (state?.ok) return <span className="status">Sent</span>;

  return (
    <form action={formAction}>
      <input type="hidden" name="clientId" value={clientId} />
      <button className="btn-app btn-app--quiet" type="submit" title="Resend invite email to this client" disabled={pending}>
        {pending ? 'Sending…' : 'Resend invite'}
      </button>
      {state?.error ? (
        <span className="status status--paused" role="alert">
          {state.error}
        </span>
      ) : null}
    </form>
  );
}
