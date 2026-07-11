import fs from "fs";
import path from "path";

export function logToFile(message: string, data?: any) {
  try {
    const logPath = path.join(process.cwd(), "logs.txt");
    const logLine = `[${new Date().toISOString()}] ${message} ${data ? JSON.stringify(data) : ""}\n`;
    fs.appendFileSync(logPath, logLine);
  } catch (e) {
    console.error("Failed to write log to file:", e);
  }
}
