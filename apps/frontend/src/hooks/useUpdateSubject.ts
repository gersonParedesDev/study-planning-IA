import { useState } from 'react';
import { updateSubject, type UpdateSubjectPayload, type Subject } from '../services/subjects.service';

export const useUpdateSubject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editSubject = async (subjectId: string, payload: UpdateSubjectPayload): Promise<Subject | null> => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateSubject(subjectId, payload);
      return updated;
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Error al actualizar la materia';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { editSubject, loading, error };
};
