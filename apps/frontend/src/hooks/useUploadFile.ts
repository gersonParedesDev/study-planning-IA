import { useState } from 'react';
import { uploadFile } from '../services/resources.service';
import type { UploadedResource } from '../services/resources.service';

export const useUploadFile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File): Promise<UploadedResource | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await uploadFile(file);
      return result;
    } catch {
      setError('Error subiendo el archivo');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { upload, loading, error };
};