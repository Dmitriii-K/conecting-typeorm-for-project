import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserInputModel } from '../src/features/users/api/models/input.models';
import { UserViewModel } from '../src/features/users/api/models/output.models';
import { appUse } from 'src/app-use';

describe('UsersController (integration)', () => {
    let app: INestApplication;
    let httpServer: any;
    const basicAuthCredentials = Buffer.from('admin:qwerty').toString('base64');

    beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appUse(app);
    await app.init();
    httpServer = app.getHttpServer();
});

    beforeEach(async () => {
    // Очищаем БД перед каждым тестом
    await request(httpServer)
        .delete('/testing/all-data')
        .expect(204);
});

    afterAll(async () => {
    await app.close();
});

    describe('GET /sa/users', () => {
    it('should return 401 without basic auth', async () => {
        await request(httpServer)
        .get('/sa/users')
        .expect(401);
    });

    it('should return empty array of users', async () => {
    const response = await request(httpServer)
        .get('/sa/users')
        .set('Authorization', `Basic ${basicAuthCredentials}`)
        .expect(200);

    expect(response.body).toEqual({
        pagesCount: 0,
        page: 1,
        pageSize: 10,
        totalCount: 0,
        items: []
    });
    });
});

describe('POST /sa/users', () => {
    const validUser: UserInputModel = {
    login: 'testuser',
    password: 'password123',
    email: 'test@test.com'
    };

    it('should create new user with valid data', async () => {
    const response = await request(httpServer)
        .post('/sa/users')
        .set('Authorization', `Basic ${basicAuthCredentials}`)
        .send(validUser)
        .expect(201);

    expect(response.body).toMatchObject({
        login: validUser.login,
        email: validUser.email,
    });
    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
    });

    it('should return 400 with invalid data', async () => {
    const invalidUser = {
        login: 'te',
        password: 'pass',
        email: 'invalid-email'
    };

    await request(httpServer)
        .post('/sa/users')
        .set('Authorization', `Basic ${basicAuthCredentials}`)
        .send(invalidUser)
        .expect(400);
    });

    it('should not create user with existing login', async () => {
      // Создаем первого пользователя
    await request(httpServer)
        .post('/sa/users')
        .set('Authorization', `Basic ${basicAuthCredentials}`)
        .send(validUser)
        .expect(201);

      // Пытаемся создать пользователя с тем же логином
    const duplicateUser = {
        ...validUser,
        email: 'another@test.com'
    };

    await request(httpServer)
        .post('/sa/users')
        .set('Authorization', `Basic ${basicAuthCredentials}`)
        .send(duplicateUser)
        .expect(400);
    });
});

describe('DELETE /sa/users/:id', () => {
    it('should delete existing user', async () => {
      // Создаем пользователя
    const createResponse = await request(httpServer)
        .post('/sa/users')
        .set('Authorization', `Basic ${basicAuthCredentials}`)
        .send({
        login: 'userToDelete',
        password: 'password123',
        email: 'delete@test.com'
        })
        .expect(201);

    const userId = createResponse.body.id;

      // Удаляем пользователя
    await request(httpServer)
        .delete(`/sa/users/${userId}`)
        .set('Authorization', `Basic ${basicAuthCredentials}`)
        .expect(204);

      // Проверяем что пользователь действительно удален
    await request(httpServer)
        .get(`/sa/users/${userId}`)
        .set('Authorization', `Basic ${basicAuthCredentials}`)
        .expect(404);
    });

    it('should return 404 when trying to delete non-existing user', async () => {
    await request(httpServer)
        .delete('/sa/users/non-existing-id')
        .set('Authorization', `Basic ${basicAuthCredentials}`)
        .expect(404);
    });
});
}); 