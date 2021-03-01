import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function useRemoteForm(api) {
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
        resp = await api.get("store/form/" + existingForm.id);
      }
      setExistingForm(resp.data);
      setForm(resp.data);
      setLoading(false);
    };
    getForm();
  }, [loading, form, setForm, setExistingForm, existingForm, setLoading, api]);

  return form;
}
