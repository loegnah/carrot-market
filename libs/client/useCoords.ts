import { useEffect, useState } from "react";

interface Coords {
  longitude: number | null;
  latitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<Coords>({
    longitude: null,
    latitude: null,
  });

  useEffect(() => {
    const onSuccess = ({
      coords: { latitude, longitude },
    }: GeolocationPosition) => {
      setCoords({ latitude, longitude });
    };

    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
}
