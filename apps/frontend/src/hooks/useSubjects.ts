import { useState, useEffect } from 'react';
import { getSubjectsByUser } from '../services/subjects.service';
import type { Subject } from '../services/subjects.service';

export const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const data = await getSubjectsByUser();
      setSubjects(data);
    } catch {
      setError('Error cargando materias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return { subjects, loading, error, refetch: fetchSubjects };
};