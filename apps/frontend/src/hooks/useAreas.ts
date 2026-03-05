import { useState, useEffect } from 'react';
import { getAreas } from '../services/areas.service';
import type { Area } from '../services/areas.service';

export const useAreas = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAreas()
      .then(setAreas)
      .catch(() => setError('Error cargando áreas'))
      .finally(() => setLoading(false));
  }, []);

  return { areas, loading, error };
};