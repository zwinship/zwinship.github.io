// How an item opens. 2 ("station grows") is what visitors see; 1 (side panel) is kept as a fallback.
// Preview with ?open=<n>.
import Sheet1 from './Sheet1.jsx';
import Sheet2 from './Sheet2.jsx';

export const SHEETS = { 1: Sheet1, 2: Sheet2 };
export const DEFAULT_SHEET = '2';
