const request = require('supertest');
const express = require('express');
const resumeRouter = require('../routes/resume'); // Adjust the path if needed

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the resume router for /api routes
app.use('/api', resumeRouter);

describe('POST /api/enhance', () => {
  it('should return 200 and a success message', async () => {
    const response = await request(app)
      .post('/api/enhance')
      .send({ userInputText: 'Sample text', enhancementLevel: 3 })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ message: 'Received user input and enhancement level' });
  });

  it('should log user input and enhancement level', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await request(app)
      .post('/api/enhance')
      .send({ userInputText: 'Test input', enhancementLevel: 2 })
      .expect(200);

    expect(consoleSpy).toHaveBeenCalledWith('User input:', 'Test input');
    expect(consoleSpy).toHaveBeenCalledWith('Enhancement level:', 2);

    consoleSpy.mockRestore();
  });

});