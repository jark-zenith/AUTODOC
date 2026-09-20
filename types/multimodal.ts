export type MultimodalContent = {
  type: "TEXT" | "IMAGE" | "CHART" | "DIAGRAM" | "TABLE" | "DRAWING" | "AUDIO";
  value: string;
  altText?: string;
  metadata?: Record<string, unknown>;
};
