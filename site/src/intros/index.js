// Intro animations. 2 is the one visitors see; 1 ("landing animation 1") is kept to switch back to.
// Preview either with ?intro=<n> (it always plays when the parameter is set).
import Intro1 from './Intro1.jsx';
import Intro2 from './Intro2.jsx';

export const INTROS = { 1: Intro1, 2: Intro2 };
export const DEFAULT_INTRO = '2';
