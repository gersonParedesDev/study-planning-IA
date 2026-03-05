// components/modals/AddSubjectModal.tsx
import { useState } from "react";
import { BaseModal } from "./BaseModal";
import { useAreas } from "../../hooks/useAreas";
import { useCreateSubject } from "../../hooks/useCreateSubject";
import type { ResourceForm } from "../../hooks/useCreateSubject";
import type { ResourceType } from "../../services/subjects.service";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const RESOURCE_TYPES: { value: ResourceType; label: string; emoji: string }[] = [
  { value: "syllabus", label: "Programa", emoji: "📋" },
  { value: "book",     label: "Libro",    emoji: "📚" },
  { value: "exam",     label: "Examen",   emoji: "📝" },
  { value: "practice", label: "Práctica", emoji: "✏️" },
  { value: "notes",    label: "Apuntes",  emoji: "📄" },
  { value: "other",    label: "Otro",     emoji: "📎" },
];

const emptyResource = (): ResourceForm & { file: File | null } => ({
  title: "",
  resource_type: "notes",
  file: null as unknown as File,
});

export function AddSubjectModal({ open, onClose, onSuccess }: Props) {
  const { areas, loading: loadingAreas } = useAreas();
  const { handleCreate, loading, error } = useCreateSubject();

  const [name, setName] = useState("");
  const [areaId, setAreaId] = useState("");
  const [resources, setResources] = useState([emptyResource()]);

  function resetForm() {
    setName("");
    setAreaId("");
    setResources([emptyResource()]);
  }

  function addResource() {
    setResources((prev) => [...prev, emptyResource()]);
  }

  function removeResource(index: number) {
    setResources((prev) => prev.filter((_, i) => i !== index));
  }

  function updateResource(index: number, field: string, value: unknown) {
    setResources((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    );
  }

  async function handleSubmit() {
    if (!name.trim() || !areaId) return;
    if (resources.some((r) => !r.file || !r.title.trim())) return;

    const result = await handleCreate({
      name: name.trim(),
      area_id: areaId,
      resources: resources as ResourceForm[],
    });

    if (result) {
      resetForm();
      onSuccess();
      onClose();
    }
  }

  const isValid =
    name.trim() &&
    areaId &&
    resources.length > 0 &&
    resources.every((r) => r.file && r.title.trim());

  return (
    <BaseModal open={open} onClose={onClose}>
      <div
        className="w-full max-w-[520px] rounded-[20px] p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
        style={{ background: "#111620", border: "1px solid #1e2530" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#e8eaf0]">
              Nueva materia
            </h2>
            <p className="text-xs text-[#5a6478] mt-0.5">
              Completá los datos y subí al menos un recurso
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm text-[#5a6478] hover:text-[#e8eaf0] transition-colors"
            style={{ background: "#0e1219", border: "1px solid #1e2530" }}
          >
            ✕
          </button>
        </div>

        {/* Nombre */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-[#5a6478]">
            Nombre de la materia *
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Álgebra Lineal"
            className="rounded-[10px] px-3.5 py-3 text-sm text-[#e8eaf0] outline-none transition-all"
            style={{
              background: "#0e1219",
              border: `1px solid ${name.trim() ? "#4fffb0" : "#1e2530"}`,
            }}
          />
        </div>

        {/* Área */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-wider text-[#5a6478]">
            Área *
          </label>
          <select
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
            className="rounded-[10px] px-3.5 py-3 text-sm text-[#e8eaf0] outline-none transition-all cursor-pointer"
            style={{
              background: "#0e1219",
              border: `1px solid ${areaId ? "#4fffb0" : "#1e2530"}`,
            }}
          >
            <option value="" disabled>
              {loadingAreas ? "Cargando áreas..." : "Seleccioná un área"}
            </option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        {/* Recursos */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-[11px] uppercase tracking-wider text-[#5a6478]">
              Recursos * (mín. 1)
            </label>
            <button
              onClick={addResource}
              className="text-xs text-[#4fffb0] hover:opacity-70 transition-opacity"
            >
              + Agregar otro
            </button>
          </div>

          {resources.map((resource, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 rounded-[12px]"
              style={{ background: "#0e1219", border: "1px solid #1e2530" }}
            >
              {/* Header del recurso */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#5a6478]">
                  Recurso {index + 1}
                </span>
                {resources.length > 1 && (
                  <button
                    onClick={() => removeResource(index)}
                    className="text-xs text-[#ff6b6b] hover:opacity-70 transition-opacity"
                  >
                    Eliminar
                  </button>
                )}
              </div>

              {/* Título */}
              <input
                value={resource.title}
                onChange={(e) => updateResource(index, "title", e.target.value)}
                placeholder="Título del recurso"
                className="rounded-[8px] px-3 py-2.5 text-sm text-[#e8eaf0] outline-none"
                style={{ background: "#111620", border: "1px solid #1e2530" }}
              />

              {/* Tipo + Archivo */}
              <div className="flex gap-2">
                <select
                  value={resource.resource_type}
                  onChange={(e) => updateResource(index, "resource_type", e.target.value)}
                  className="flex-1 rounded-[8px] px-3 py-2.5 text-sm text-[#e8eaf0] outline-none cursor-pointer"
                  style={{ background: "#111620", border: "1px solid #1e2530" }}
                >
                  {RESOURCE_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.emoji} {t.label}
                    </option>
                  ))}
                </select>

                <label
                  className="flex-1 flex items-center justify-center gap-2 rounded-[8px] px-3 py-2.5 text-sm cursor-pointer transition-all"
                  style={{
                    background: "#111620",
                    border: `1px dashed ${resource.file ? "#4fffb0" : "#1e2530"}`,
                    color: resource.file ? "#4fffb0" : "#5a6478",
                  }}
                >
                  <span>{resource.file ? "✓ " + resource.file.name : "📁 Subir archivo"}</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) updateResource(index, "file", file);
                    }}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-[#ff6b6b] text-center">{error}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="w-full py-3.5 rounded-[10px] text-sm font-semibold transition-all"
          style={{
            background: isValid && !loading ? "#4fffb0" : "#1e2530",
            color: isValid && !loading ? "#080b10" : "#5a6478",
            cursor: isValid && !loading ? "pointer" : "not-allowed",
          }}
        >
          {loading ? "Creando materia..." : "Crear materia →"}
        </button>
      </div>
    </BaseModal>
  );
}