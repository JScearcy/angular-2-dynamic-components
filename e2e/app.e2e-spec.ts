import { HtmlStringsPage } from './app.po';

describe('html-strings App', function() {
  let page: HtmlStringsPage;

  beforeEach(() => {
    page = new HtmlStringsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
