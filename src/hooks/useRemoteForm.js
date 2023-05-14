import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import api from "../services/api";

export default function useRemoteForm() {
  const [existingForm, setExistingForm] = useLocalStorage("form", null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading || form) return;
    const getForm = async () => {
      let resp;
      setLoading(true);
      if (!existingForm || existingForm.mode) {
        // create empty form and store
        resp = await api.post("store/form", {});
      } else {
        try {
          resp = await api.get("store/form/" + existingForm.id);
        } catch (error) {
          resp = await api.post("store/form", {});
        }
      }
      setExistingForm(resp.data);
      setForm(resp.data);
      setLoading(false);
    };
    getForm();
  }, [loading, form, setForm, setExistingForm, existingForm, setLoading, api]);

  return [form, setForm];
}
