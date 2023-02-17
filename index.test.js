const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
    seedItem,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
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
        await Restaurant.sync({ force: true});
        await Menu.sync({ force: true});
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
        let restaurant = await Restaurant.create( seedRestaurant[0] );
        expect(restaurant.name).toEqual(seedRestaurant[0].name);
    });

    test('can create a Menu', async () => {
        // TODO - write test
        let menu = await Menu.create( seedMenu[0] );
        expect(menu.title).toEqual(seedMenu[0].title);
    });

    test('can find Restaurants', async () => {
        // TODO - write test
        let restaurant = await Restaurant.create( seedRestaurant[1] );
        let result = await Restaurant.findByPk(1);
        expect(result.name).toEqual(seedRestaurant[1].name);
    });

    test('can find Menus', async () => {
        // TODO - write test
        let menu = await Menu.create( seedMenu[1] );
        let result =  await Menu.findByPk(1);
        expect(result.title).toEqual(seedMenu[1].title);
    });

    test('can delete Restaurants', async () => {
        // TODO - write test
        let restaurant = await Restaurant.create( seedRestaurant[2] );
        let result = await Restaurant.findByPk(1);
        expect(result.name).toEqual(seedRestaurant[2].name);
        let deletedRestaurant = await restaurant.destroy();
        result = await Restaurant.findByPk(1);
        expect(result).toEqual(null);
    });
})