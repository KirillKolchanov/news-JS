import News from './news/news';
import Sources from './sources/sources';
import { MessageType, NewsResponse, SourcesResponse } from '../../types';

export class AppView {
    private readonly news: News = new News();
    private readonly sources: Sources = new Sources();

    public drawNews(data: NewsResponse): void {
        this.news.draw(data.articles ?? []);
    }

    public showLoading(): void {
        this.news.drawMessage('Loading news...', MessageType.Loading);
    }

    public showError(message: string): void {
        this.news.drawMessage(`Failed to load news. ${message}`, MessageType.Error);
    }

    public drawSources(data: SourcesResponse): void {
        this.sources.draw(data.sources ?? []);
    }
}

export default AppView;
