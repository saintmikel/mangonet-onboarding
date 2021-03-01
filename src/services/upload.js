import api from "./api";

export const Upload = (store, target, field, file, onUploadProgress) => {
  let formData = new FormData();
  formData.append(field, file);

  return api.post(`/upload/${store}/${target}/${field}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress
  });
};
