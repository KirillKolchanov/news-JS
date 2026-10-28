export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface IArticleSource {
    id: string | null;
    name: string;
}

export interface IArticle {
    source: IArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export enum ResponseStatus {
    Ok = 'ok',
    Error = 'error',
}

export type ApiResponse<T> = {
    status: ResponseStatus;
} & T;

export type SourcesResponse = ApiResponse<{
    sources: ISource[];
}>;

export type NewsResponse = ApiResponse<{
    totalResults: number;
    articles: IArticle[];
}>;

export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export type HttpMethod = 'GET' | 'POST';

export type Callback<T> = (data: T) => void;

export type ErrorCallback = (error: Error) => void;

export enum MessageType {
    Info = 'info',
    Error = 'error',
    Loading = 'loading',
}

export interface IRequestOptions {
    apiKey: string;
    sources: string;
}

export type RequestOptions = Partial<IRequestOptions>;

export interface IRequestParams {
    endpoint: Endpoint;
    options?: RequestOptions;
}
