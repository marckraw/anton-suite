export const isBrowser =
    typeof window !== "undefined" && typeof window.document !== "undefined";

export const isProduction = process.env['NODE_ENV'] === "production";

export const throwErrorIfBrowser = (modelName: string) => {
    if (isBrowser) {
        throw new Error(
            `${modelName} can't be used directly in browser environments due to CORS restrictions. Use a server-side proxy.`,
        );
    }
};
