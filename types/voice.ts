export type VoiceRequest = {
  id: string;
  input: "MICROPHONE" | "TEXT";
  transcript?: string;
  locale?: string;
  responseMode: "TEXT" | "SPEECH";
  createdAt: string;
};
