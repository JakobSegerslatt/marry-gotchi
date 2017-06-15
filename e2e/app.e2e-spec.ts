import { MarryGotchiPage } from './app.po';

describe('marry-gotchi App', () => {
  let page: MarryGotchiPage;

  beforeEach(() => {
    page = new MarryGotchiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
