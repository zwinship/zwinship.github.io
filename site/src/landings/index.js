// Landing page options. Preview one with ?landing=<key>; DEFAULT_LANDING is what visitors see.
import SystemMap from './SystemMap.jsx';
import StationSign from './StationSign.jsx';
import RideTheLine from './RideTheLine.jsx';
import NoLanding from './NoLanding.jsx';

export const LANDINGS = {
  map: SystemMap,
  sign: StationSign,
  ride: RideTheLine,
  none: NoLanding,
};
export const DEFAULT_LANDING = 'map';
