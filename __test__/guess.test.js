import { createMocks } from 'node-mocks-http';
import handleGuess from '../pages/api/v1/game/guess';

describe('/api/v1/game/guess Tests', () => {
  test('returns evaluation of guess', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        guess: 'namen',
        wordID: [15,19] // pfand
      },
    });

    await handleGuess(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        validGuess: true,
        wordGuessed: false,
        submittedGuess: 'namen',
        evaluation: expect.objectContaining({
          letterStatus: [2,2,1,1,1],
        })
      }),
    );
  });

  test('returns evaluation of guess correct-answer', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        guess: 'pfand',
        wordID: [15,19]
      },
    });

    await handleGuess(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        validGuess: true,
        wordGuessed: true,
        submittedGuess: 'pfand',
        evaluation: expect.objectContaining({
          letterStatus: [3,3,3,3,3],
        })
      }),
    );
  });

  test('returns evaluation of guess', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        guess: 'namen',
        wordID: [6,3] // garen
      },
    });

    await handleGuess(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        validGuess: true,
        wordGuessed: false,
        submittedGuess: 'namen',
        evaluation: expect.objectContaining({
          letterStatus: [1,3,1,3,3],
        })
      }),
    );
  });

});