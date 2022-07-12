export function apiKeyValidation(apiKey: string) {
    if(!apiKey) {
        throw {
            type: "Not found",
            message: "API Key not found or invalid"
        }
    }
}