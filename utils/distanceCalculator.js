import turf from '@turf/turf';

const inDistance = (p1Lat, p1Long, p2Lat, p2Long, dist) => {
  const p1 = turf.point(p1Lat, p1Long);
  const p2 = turf.point(p2Lat, p2Long);
  const distance = turf.distance(p1, p2);
  if (distance <= dist) return true;
  return false;
};

export default inDistance;
