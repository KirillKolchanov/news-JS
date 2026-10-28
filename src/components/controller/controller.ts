import AppLoader from './appLoader';
import { Callback, Endpoint, ErrorCallback, NewsResponse, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp<SourcesResponse>({ endpoint: Endpoint.Sources }, callback);
    }

    public getNews(e: Event, callback: Callback<NewsResponse>, onError?: ErrorCallback): boolean {
        let target: EventTarget | null = e.target;
        const newsContainer = e.currentTarget;

        if (!(newsContainer instanceof HTMLElement)) return false;

        while (target !== newsContainer) {
            if (!(target instanceof HTMLElement)) return false;

            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    this.setActiveSource(newsContainer, target);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: { sources: sourceId },
                        },
                        callback,
                        (error) => {
                            newsContainer.removeAttribute('data-source');
                            onError?.(error);
                        }
                    );
                    return true;
                }
                return false;
            }
            target = target.parentNode;
        }

        return false;
    }

    private setActiveSource(container: HTMLElement, activeItem: HTMLElement): void {
        container
            .querySelectorAll('.source__item--active')
            .forEach((item) => item.classList.remove('source__item--active'));
        activeItem.classList.add('source__item--active');
    }
}

export default AppController;
