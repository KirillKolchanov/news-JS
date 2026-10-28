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
