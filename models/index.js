const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require('./Item')

// Multiple menus can be added to a Restaurant.
Menu.hasOne(Restaurant);
Restaurant.hasMany(Menu);

// Multiple items can be added to a menu.
// Items can be added to many menus
Menu.belongsToMany(Item, {through: "menu_items"});
Item.belongsToMany(Menu, {through: "menu_items"});

module.exports = { Restaurant, Menu, Item }
