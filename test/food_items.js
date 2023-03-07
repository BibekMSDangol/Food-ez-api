const supertest = require('supertest');
const app = require('../app');
const Food = require('../models/Food');
const request = supertest(app);
const mongoose = require('mongoose');

const food  =  Food({
    name : "burger",
    price : "150",
    description : "hamburger",
    image : "image",
})

describe('Testing food routes', () => {
    test('Response the GET method', async () => {
        const response = await request.get('/food');
        expect(response.statusCode).toBe(200);
    });
    });
describe('testing food post', () => {
    test('Response POST method', async () => {
        const response = await request.post('/food')
        .send(food)
        .expect(201)
    });
    });
