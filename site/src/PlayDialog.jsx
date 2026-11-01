import { useEffect, useRef } from 'react';

const VERSIONS = [
  { href: '/play/wii/', name: 'Living room, 2006', what: 'The portfolio as a Wii Menu. Point at a channel, listen for the jingle, press Start.' },
  { href: '/play/win98/', name: 'Family computer, 1998', what: 'The portfolio as a Windows 98 desktop, with Minesweeper, Paint and a dial-up modem.' },
];

// Native <dialog>: focus trapping, Escape to close and the backdrop come from the browser.
export default function PlayDialog({ open, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className="play-dialog" aria-labelledby="play-title" onClose={onClose}
      onClick={e => { if (e.target === ref.current) onClose(); }}>
      <div className="play-inner">
        <h2 id="play-title">Same portfolio, two other machines</h2>
        <ul>
          {VERSIONS.map(v => (
            <li key={v.href}>
              <a href={v.href}>
                <span className="play-name">{v.name}</span>
                <span className="play-what">{v.what}</span>
              </a>
            </li>
          ))}
        </ul>
        <button className="text-button" onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
}
