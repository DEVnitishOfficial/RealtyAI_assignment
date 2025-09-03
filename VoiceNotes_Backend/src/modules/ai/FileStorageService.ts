import fs from "fs";

export class FileStorageService {
  static deleteFile(filePath: string): void {
    if (!filePath) return;
    fs.unlink(filePath, (err) => {
      if (err) console.warn(`File cleanup failed for ${filePath}:`, err.message);
    });
  }
}
