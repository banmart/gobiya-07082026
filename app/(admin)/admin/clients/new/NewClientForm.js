'use client';

import { useActionState } from 'react';
import CopyButton from '../../../../../components/CopyButton';
import { createClientAction } from '../actions';

const INITIAL = {};

export default function NewClientForm() {
  const [state, formAction, pending] = useActionState(createClientAction, INITIAL);

  if (state?.ok) {
    return (
      <div className="card">
        <h2 className="card__title">Client created</h2>
        <p className="card__body" style={{ marginBottom: '1rem' }}>
          {state.emailSent
            ? 'The invite email is on its way.'
            : 'The invite email could not be sent. Copy the link below and send it yourself.'}
        </p>
        <p
          className="card__body"
          style={{ wordBreak: 'break-all', marginBottom: '0.75rem' }}
        >
          <code>{state.inviteLink}</code>
        </p>
        <p style={{ marginBottom: '1.25rem' }}>
          <CopyButton text={state.inviteLink} label="Copy invite link" />
        </p>
        <a className="btn-app" href="/admin/clients">
          Back to clients
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="card" noValidate>
      {state?.error ? (
        <p className="auth__error" role="alert">
          {state.error}
        </p>
      ) : null}

      <div className="auth__field">
        <label className="auth__label" htmlFor="name">
          Business name
        </label>
        <input className="auth__input" id="name" name="name" type="text" required />
        {state?.errors?.name ? (
          <p className="auth__error" role="alert">
            {state.errors.name}
          </p>
        ) : null}
      </div>

      <div className="auth__field">
        <label className="auth__label" htmlFor="contactEmail">
          Contact email
        </label>
        <input
          className="auth__input"
          id="contactEmail"
          name="contactEmail"
          type="email"
          required
        />
        {state?.errors?.contactEmail ? (
          <p className="auth__error" role="alert">
            {state.errors.contactEmail}
          </p>
        ) : null}
      </div>

      <div className="auth__field">
        <label className="auth__label" htmlFor="website">
          Website <span style={{ textTransform: 'none' }}>(optional)</span>
        </label>
        <input className="auth__input" id="website" name="website" type="text" />
      </div>

      <button className="btn-app" type="submit" disabled={pending}>
        {pending ? 'Creating…' : 'Create client and send invite'}
      </button>
    </form>
  );
}
