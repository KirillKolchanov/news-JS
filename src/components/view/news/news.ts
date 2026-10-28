import './news.css';
import { IArticle } from '../../../types';

const MAX_NEWS_COUNT = 10;
const IMAGE_PLACEHOLDER = 'img/news_placeholder.jpg';

class News {
    public draw(data: readonly IArticle[]): void {
        const news = data.slice(0, MAX_NEWS_COUNT);
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (!newsItemTemp || !newsContainer) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (photo) photo.style.backgroundImage = `url(${item.urlToImage || IMAGE_PLACEHOLDER})`;

            this.setText(newsClone, '.news__meta-author', item.author || item.source.name);
            this.setText(newsClone, '.news__meta-date', this.formatDate(item.publishedAt));
            this.setText(newsClone, '.news__description-title', item.title);
            this.setText(newsClone, '.news__description-source', item.source.name);
            this.setText(newsClone, '.news__description-content', item.description);
            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsContainer.replaceChildren(fragment);
    }

    private setText(root: ParentNode, selector: string, text: string | null): void {
        const element = root.querySelector(selector);
        if (element) element.textContent = text;
    }

    private formatDate(date: string): string {
        return date.slice(0, 10).split('-').reverse().join('-');
    }
}

export default News;
