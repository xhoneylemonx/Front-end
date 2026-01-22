export const getImageUrl = (path: string | undefined | null) => {
    if (!path) return '/placeholder-image.png'; // Replace with a default placeholder if needed
    if (path.startsWith('http')) return path;
    // Assuming backend is at localhost:3000 and serves static files from /uploads
    // The backend returns paths like "products/uuid.jpg"
    // So we need to prepend the full URL.
    // If the path already has "uploads/" prefix (legacy), handle that too.

    const baseUrl = 'http://localhost:3000/uploads';
    if (path.startsWith('uploads/')) {
        return `http://localhost:3000/${path}`;
    }

    // Clean path to avoid double slashes if path starts with /
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${baseUrl}/${cleanPath}`;
};
