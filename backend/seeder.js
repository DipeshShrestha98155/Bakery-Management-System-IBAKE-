import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const products = [
  {
    name: 'Blackforest Cake',
    image: '/images/black-forest-cake.jpg',
    description:
      'Blackforest Cake is a chocolate sponge cake with a rich cherry filling based on the German dessert Schwarzwälder Kirschtorte, literally "Black Forest Cherry-torte".',
    flavour: 'Chocolate',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
  {
    name: 'Whiteforest Cake',
    image: '/images/white-forest-cake.png',
    description:
      'Whiteforest Cake is a white chocolate variant of the traditional German chocolate cake. It is covered in whipped cream and decorated with white chocolate shavings and maraschino cherries.',
    flavour: 'Chocolate',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
  {
    name: 'Chocolate Cake',
    image: '/images/chocolate-cake.jpg',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend. lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend.',
    flavour: 'Chocolate',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
  {
    name: 'White Chocolate Cake',
    image: '/images/white-chocolate-cake.jpg',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend. lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend.',
    flavour: 'Chocolate',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
  {
    name: 'Mango Cake',
    image: '/images/mango-cake.jpg',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend. lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend.',
    flavour: 'Fruit',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
  {
    name: 'Blueberry Cake',
    image: '/images/blueberry-cake.jpg',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend. lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend.',
    flavour: 'Fruit',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
  {
    name: 'Butterscotch Cake',
    image: '/images/butterscotch-cake.jpg',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend. lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend.',
    flavour: 'Butterscotch',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
  {
    name: 'Strawberry Cake',
    image: '/images/strawberry-cake.jpg',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend. lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend.',
    flavour: 'Fruit',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
  {
    name: 'Pineapple Cake',
    image: '/images/pineapple-cake.jpg',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend. lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend.',
    flavour: 'Fruit',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
  {
    name: 'Mixed Fruit Cake',
    image: '/images/mixed-fruit-cake.jpg',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend. lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend.',
    flavour: 'Fruit',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
  {
    name: 'Sugar Free Cake',
    image: '/images/sugar-free-cake.jpg',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend. lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend.',
    flavour: 'Fruit',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
  {
    name: 'Red Velvet Cake',
    image: '/images/red-velvet-cake.jpg',
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend. lorem ipsum dolor sit amet, consectetur adipiscing elit fusce eleifend.',
    flavour: 'Chocolate',
    category: 'Cake',
    price: 800,
    countInStock: 10,
    rating: 0,
  },
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // create an admin
    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync("e9Tmu@8'p-UCv#:", 10),
        isAdmin: true,
      },
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();
