const { sequelize } = require("./db");
const { Restaurant, Menu, Item } = require("./models/index");
const { seedRestaurant, seedMenu, seedItem } = require("./seedData");

describe("Restaurant and Menu Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await Restaurant.sync({ force: true });
    await Menu.sync({ force: true });
    await Item.sync({ force: true });
  });

//   test("can create a Restaurant", async () => {
//     // TODO - write test
//     let restaurant = await Restaurant.create(seedRestaurant[0]);
//     expect(restaurant.name).toEqual(seedRestaurant[0].name);
//     expect(restaurant.location).toEqual(seedRestaurant[0].location);
//     expect(restaurant.cuisine).toEqual(seedRestaurant[0].cuisine);
//     expect(restaurant.rating).toEqual(seedRestaurant[0].rating);
//   });

//   test("can create a Menu", async () => {
//     // TODO - write test
//     let menu = await Menu.create(seedMenu[0]);
//     expect(menu.title).toEqual(seedMenu[0].title);
//   });

//   test("can find Restaurants", async () => {
//     // TODO - write test
//     let restaurant = await Restaurant.create(seedRestaurant[1]);
//     let result = await Restaurant.findByPk(1);
//     expect(result.name).toEqual(seedRestaurant[1].name);
//   });

//   test("can find Menus", async () => {
//     // TODO - write test
//     let menu = await Menu.create(seedMenu[1]);
//     let result = await Menu.findByPk(1);
//     expect(result.title).toEqual(seedMenu[1].title);
//   });

//   test("can delete Restaurants", async () => {
//     // TODO - write test
//     let restaurant = await Restaurant.create(seedRestaurant[2]);
//     let result = await Restaurant.findByPk(1);
//     expect(result.name).toEqual(seedRestaurant[2].name);
//     let deletedRestaurant = await restaurant.destroy();
//     result = await Restaurant.findByPk(1);
//     expect(result).toEqual(null);
//   });

//   test("can delete Menus", async () => {
//     let menu = await Menu.create(seedMenu[2]);
//     let result = await Menu.findByPk(1);
//     expect(result.title).toEqual(seedMenu[2].title);
//     let deletedMenu = await menu.destroy();
//     result = await Menu.findByPk(1);
//     expect(result).toEqual(null);
//   });

//   test("Restuarant can have many Menus", async () => {
//     let restaurant = await Restaurant.create(seedRestaurant[0]);
//     let menu1 = await Menu.create(seedMenu[0]);
//     let menu2 = await Menu.create(seedMenu[1]);
//     await restaurant.addMenu(menu1);
//     await restaurant.addMenu(menu2);
//     let foundMenus = await restaurant.getMenus();
//     menu1 = await Menu.findByPk(1);
//     menu2 = await Menu.findByPk(2);
//     expect(foundMenus).toEqual([menu1, menu2]);
//   });

//   test("Multiple Items can be added to a Menu", async () => {
//     let item1 = await Item.create(seedItem[0]);
//     let item2 = await Item.create(seedItem[1]);
//     let item3 = await Item.create(seedItem[2]);
//     let menu = await Menu.create(seedMenu[0]);
//     await menu.addItem(item1);
//     await menu.addItem(item2);
//     await menu.addItem(item3);
//     let foundItems = await menu.getItems();
//     item1 = await Item.findByPk(1);
//     item2 = await Item.findByPk(2);
//     item3 = await Item.findByPk(3);
//     expect(foundItems.length).toBe(3);
//   });

//   test("Items can be added to many Menus", async () => {
//     let item1 = await Item.create(seedItem[0]);
//     item1 = await Item.findByPk(1);
//     let menu1 = await Menu.create(seedMenu[0]);
//     let menu2 = await Menu.create(seedMenu[1]);
//     await menu1.addItem(item1);
//     await menu2.addItem(item1);
//     let foundItems1 = await menu1.getItems();
//     let foundItems2 = await menu2.getItems();
//     expect(foundItems1[0].name).toBe(item1.name);
//     expect(foundItems2[0].name).toBe(item1.name);
//   });

  test("Eager Loading data", async () => {
    let menu1 = await Menu.create(seedMenu[0]);
    let menu2 = await Menu.create(seedMenu[1]);
    let item1 = await Item.create(seedItem[0]);
    let item2 = await Item.create(seedItem[1]);
    let item3 = await Item.create(seedItem[2]);
    await menu1.addItem(item1);
    await menu1.addItem(item2);
    await menu2.addItem(item3);
    const eagerMenus = await Menu.findAll({
        include: { model: Item, as: 'items' }
      });
    expect(eagerMenus[0].items[0].name).toBe(seedItem[0].name);
    expect(eagerMenus[0].items.length).toBe(2);
    expect(eagerMenus[1].items[0].name).toBe(seedItem[2].name);
  });
});
