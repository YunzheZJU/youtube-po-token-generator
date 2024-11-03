declare module 'youtube-po-token-generator' {
    export function generate(): Promise<{ visitorData: string, poToken: string }>;
}