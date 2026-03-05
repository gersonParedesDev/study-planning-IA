import { useState } from 'react';
import { createSubject } from '../services/subjects.service';
import { uploadFile } from '../services/resources.service';
import type { ResourceType } from '../services/subjects.service';

export interface ResourceForm {
  title: string;
  resource_type: ResourceType;
  file: File;
}

export interface CreateSubjectForm {
  name: string;
  area_id: string;
  resources: ResourceForm[];
}

export const useCreateSubject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (data: CreateSubjectForm) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Subir cada archivo a MinIO
      const uploadedResources = await Promise.all(
        data.resources.map(async (r) => {
          const uploaded = await uploadFile(r.file);
          return {
            title: r.title,
            resource_type: r.resource_type,
            file_url: uploaded.file_url,
            filename: uploaded.original_filename,
          };
        })
      );

      // 2. Crear la materia con las URLs reales
      const subject = await createSubject({
        name: data.name,
        area_id: data.area_id,
        resources: uploadedResources,
      });

      return subject;

    } catch {
      setError('Error creando la materia');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreate, loading, error };
};