import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private readonly controller: AppController = new AppController();
    private readonly view: AppView = new AppView();

    public start(): void {
        const sourcesContainer = document.querySelector<HTMLElement>('.sources');

        if (!sourcesContainer) {
            throw new Error('Sources container not found');
        }

        sourcesContainer.addEventListener('click', (e: MouseEvent) => {
            const isLoading = this.controller.getNews(
                e,
                (data) => this.view.drawNews(data),
                (error) => this.view.showError(error.message)
            );

            if (isLoading) this.view.showLoading();
        });
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
