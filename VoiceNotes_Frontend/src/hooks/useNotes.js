import { useEffect, useState, useCallback } from "react";
import {
  getNotes,
  transcribeAudio,
  updateNote,
  deleteNote,
  generateSummary,
} from "../lib/api";
import toast from "react-hot-toast";

export default function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    let toastId;
    try {
      setLoading(true);
      toastId = toast.loading("Loading notes...");
      const res = await getNotes();
      const list = Array.isArray(res) ? res : res?.data || [];
      setNotes(list);
      toast.success("Notes loaded successfully.", { id: toastId });
      setError(null);
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const uploadAndTranscribe = async (file, title) => {
    setLoading(true);
    try {
      await transcribeAudio(file, title || "New Voice Note");
      await load();
      toast.success("Recording uploaded and transcribed successfully.");
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
      toast.error(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = async (id, updates) => {
    setLoading(true);
    try {
      await updateNote(id, updates);
      await load(); // backend clears summary if transcript changed
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    try {
      await deleteNote(id);
      await load();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };

  const summarize = async (id) => {
    setLoading(true);
    try {
      await generateSummary(id);
      await load();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
      toast.error(String(e?.response?.data?.error || e.message));
    } finally {
      setLoading(false);
    }
  };

  return {
    notes,
    loading,
    setLoading,
    error,
    load,
    uploadAndTranscribe,
    saveEdit,
    remove,
    summarize,
  };
}
