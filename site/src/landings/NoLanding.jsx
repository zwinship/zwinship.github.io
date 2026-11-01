import { useLayoutEffect } from 'react';

// Skips the landing: replaces the empty hash with the main page.
export default function NoLanding({ onGo }) {
  useLayoutEffect(() => { history.replaceState(null, '', `${location.pathname}${location.search}#/`); onGo('#/'); }, [onGo]);
  return null;
}
