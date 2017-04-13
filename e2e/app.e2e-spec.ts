import { AbacusPage } from './app.po';

describe('abacus App', () => {
  let page: AbacusPage;

  beforeEach(() => {
    page = new AbacusPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
