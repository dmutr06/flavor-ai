const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type ApiOptions = {
    token?: string;
    options?: RequestInit;
};

export const api = {
    async request<T>(url: string, { token, options = {} }: ApiOptions): Promise<T> {
        const res = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options?.headers,
            },
        });

        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }

        return res.json();
    },
    get<T>(url: string, options?: ApiOptions) {
        return this.request<T>(url, options ?? {});
    },
    post<T>(url: string, options?: ApiOptions) {
        return this.request<T>(url, {
            ...options,
            options: {
                ...options?.options,
                method: "POST",
            },
        });
    },
};
