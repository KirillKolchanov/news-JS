import { Callback, Endpoint, ErrorCallback, HttpMethod, HttpStatus, IRequestParams, RequestOptions } from '../../types';

class Loader {
    constructor(
        private readonly baseLink: string,
        private readonly options: Readonly<RequestOptions>
    ) {}

    protected getResp<T>(
        { endpoint, options = {} }: IRequestParams,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        },
        onError?: ErrorCallback
    ): void {
        this.load<T>('GET', endpoint, callback, options, onError);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatus.Unauthorized || res.status === HttpStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw new Error(`Request failed with status ${res.status}`);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: Endpoint): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        (Object.keys(urlOptions) as (keyof RequestOptions)[]).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: Callback<T>,
        options: RequestOptions = {},
        onError?: ErrorCallback
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err: unknown) => {
                console.error(err);
                onError?.(err instanceof Error ? err : new Error(String(err)));
            });
    }
}

export default Loader;
