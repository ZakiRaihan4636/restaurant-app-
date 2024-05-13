/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking and Unliking Restaurant');

Before(({
  I,
}) => {
  I.amOnPage('#/favorite');
});

Scenario('showing empty liked restaurants', ({
  I,
}) => {
  I.seeElement('#catalogs');

  I.see('Your favorites list is empty. Start adding your favorite items now!', '.no-data');
});

Scenario('liking one restaurant', async ({
  I,
}) => {
  I.see('Your favorites list is empty. Start adding your favorite items now!', '.no-data');
  I.amOnPage('/');

  I.waitForElement('.cta-restaurant', 10);

  I.seeElement('.cta-restaurant');

  const firstResto = locate('.cta-restaurant').first();
  const firstRestoName = await I.grabTextFrom(firstResto);

  I.click(firstResto);

  I.waitForElement('#likeButton', 5);

  I.seeElement('#likeButton');

  I.click('#likeButton');

  I.amOnPage('#/favorite');

  I.waitForElement('#catalogs', 10);

  I.seeElement('#catalogs');

  const likedRestoName = await I.grabTextFrom('.cta-restaurant');

  assert.strictEqual(firstRestoName, likedRestoName);

  I.saveScreenshot('liking_one_restaurant.success.png');
  I.seeElement('.cta-restaurant');
});

Scenario('unliking one restaurant', async ({
  I,
}) => {
  I.see('Your favorites list is empty. Start adding your favorite items now!', '.no-data');
  I.amOnPage('/');
  I.waitForElement('.cta-restaurant', 10);

  I.seeElement('.cta-restaurant');

  const firstResto = locate('.cta-restaurant').first();
  const firstRestoName = await I.grabTextFrom(firstResto);

  I.click(firstResto);

  I.waitForElement('#likeButton', 5);

  I.seeElement('#likeButton');

  I.click('#likeButton');

  I.amOnPage('#/favorite');

  I.waitForElement('#catalogs', 10);

  I.seeElement('#catalogs');

  const likedRestoName = await I.grabTextFrom('.cta-restaurant');

  assert.strictEqual(firstRestoName, likedRestoName);

  I.click('.cta-restaurant');

  I.waitForElement('#likeButton', 5);

  I.seeElement('#likeButton');

  I.click('#likeButton');

  I.saveScreenshot('unliking_one_restaurant.success.png');

  I.amOnPage('#/favorite');

  I.waitForElement('#catalogs', 5);
  I.seeElement('#catalogs');

  I.see('Your favorites list is empty. Start adding your favorite items now!', '.no-data');
});
