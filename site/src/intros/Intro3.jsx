import { useEffect } from 'react';

// Placeholder, being built.
export default function Intro3({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 300); return () => clearTimeout(t); }, [onDone]);
  return <div className="intro-cover" />;
}
