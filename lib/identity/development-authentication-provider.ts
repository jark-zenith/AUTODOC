import type { AuthenticationProvider } from "./types";

export class DevelopmentAuthenticationProvider implements AuthenticationProvider {
  authenticate() { return { status: "DEVELOPMENT_ONLY" as const, reason: "Production authentication is not configured." }; }
}
