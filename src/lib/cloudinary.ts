import { compressImage, blobToDataURL } from "./imageCompressor";

export interface CloudinaryUploadResult {
  url: string;
  isCloudinary: boolean;
}

/**
 * Téléverse une photo de profil directement sur Cloudinary après compression client.
 * En cas d'indisponibilité, bascule automatiquement sur l'image compressée locale (DataURL).
 */
export async function uploadProfileAvatar(file: File): Promise<CloudinaryUploadResult> {
  // Step 1: Compresser l'image à moins de 30 Ko avant tout envoi
  const compressedBlob = await compressImage(file, 256, 256, 0.6);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "vylo-app";
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "vylo_avatars";

  const formData = new FormData();
  formData.append("file", compressedBlob, "avatar.jpg");
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "vylo_profiles");

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.secure_url) {
        return {
          url: data.secure_url,
          isCloudinary: true,
        };
      }
    }
  } catch (err) {
    console.warn("Connexion Cloudinary échouée, basculement sur stockage local compressé:", err);
  }

  // Fallback haute performance : DataURL local ultra-compressé
  const dataUrl = await blobToDataURL(compressedBlob);
  return {
    url: dataUrl,
    isCloudinary: false,
  };
}
