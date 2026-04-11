import {Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    // BUTTON_WRITE_TO_US = '[class^=btn]', 
    BUTTON_WRITE_TO_US = '[data-test="button_feedback_form"]',
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,

    // Дополнительный тест - поиск статей по ключевым словам
    SEARCH_INPUT = 'input[type="text"]',
    ARTICLE_TITLE = '.title__-CRDN',
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER)
    }

    async openWidget() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN).click();
    }

    async getPopularArticles() {
        //return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM).all()
        const locator = this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM)
        await locator.first().waitFor();
        return locator.all();
    }

    async clickWriteToUs() {
        //return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
        return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).first().click();
    }

    async getTitle() {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent();
    }

    getWidgetBody() {
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }

    async fillSearch(query: string) {
        const input = this.wrapper().locator(WidgetPage.selector.SEARCH_INPUT).first();
        await input.waitFor({ state: 'visible', timeout: 5000 });
        await input.fill(query);
    }

    async getArticleTitles() {
        const item = WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM;
        const titleSel = WidgetPage.selector.ARTICLE_TITLE;
        await this.wrapper().locator(item).first().waitFor({ state: 'visible', timeout: 5000 });
        return this.wrapper().locator(`${item} ${titleSel}`).allTextContents();
    }
}

