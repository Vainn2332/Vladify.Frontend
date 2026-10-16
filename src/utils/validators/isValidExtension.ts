// "My.Song.MP3" -> ".mp3"
function getExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) return "";

  return fileName.slice(dotIndex).toLowerCase();
}

export function isValidExtension(
  file: File,
  allowedExtensions: string[],
): boolean {
  return allowedExtensions.includes(getExtension(file.name));
}
