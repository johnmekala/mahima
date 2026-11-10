// Cloudinary Media & Asset Service for Sunitha & Prasad Wedding Web App
// Cloud Name: hl15ad6n

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'hl15ad6n',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '378234116654941',
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET || 'MhKixkZ31Qvo4s8rDQ0-shNdt_4',
  defaultFolder: 'wedding_sunitha_prasad',
};

export interface CloudinaryUploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
}

/**
 * Generate SHA-1 signature required by Cloudinary Signed Upload API
 */
async function generateSha1Signature(paramsToSign: Record<string, string | number>, secret: string): Promise<string> {
  const sortedKeys = Object.keys(paramsToSign).sort();
  const serialized = sortedKeys
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join('&');
  const stringToSign = `${serialized}${secret}`;

  const buffer = new TextEncoder().encode(stringToSign);
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Upload an image or video directly to Cloudinary
 */
export async function uploadToCloudinary(
  file: File | Blob,
  options: {
    folder?: string;
    resourceType?: 'image' | 'video' | 'raw' | 'auto';
  } = {}
): Promise<CloudinaryUploadResult> {
  const { folder = CLOUDINARY_CONFIG.defaultFolder, resourceType = 'auto' } = options;
  const timestamp = Math.floor(Date.now() / 1000);

  // Generate signature with API Secret
  const paramsToSign: Record<string, string | number> = {
    folder,
    timestamp,
  };
  const signature = await generateSha1Signature(paramsToSign, CLOUDINARY_CONFIG.apiSecret);

  // Build FormData
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('folder', folder);
  formData.append('signature', signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      throw new Error(
        errorJson?.error?.message || `Cloudinary upload failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return {
      url: data.url,
      secure_url: data.secure_url,
      public_id: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      resource_type: data.resource_type,
      bytes: data.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

/**
 * Optimize any Cloudinary delivery URL with auto format and auto quality
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  transformations: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'scale' | 'fit' | 'thumb';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg';
  } = {}
): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const { width, height, crop = 'fill', quality = 'auto', format = 'auto' } = transformations;
  const parts: string[] = [`f_${format}`, `q_${quality}`];

  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (width || height) parts.push(`c_${crop}`);

  const transformString = parts.join(',');

  // Insert transformations right after /upload/
  if (url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/${transformString}/`);
  }

  return url;
}

/**
 * Generate a responsive thumbnail URL from a Cloudinary image
 */
export function getCloudinaryThumbnail(url: string, size = 600): string {
  return getOptimizedCloudinaryUrl(url, {
    width: size,
    height: size,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
  });
}
