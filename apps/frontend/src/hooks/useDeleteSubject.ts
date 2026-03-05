import { useState } from 'react';
import { deleteSubject } from '../services/subjects.service';

export const useDeleteSubject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (subjectId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteSubject(subjectId);
      return true;
    } catch {
      setError('Error eliminando la materia');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
};