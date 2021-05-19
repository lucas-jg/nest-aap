import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { isOctal } from 'class-validator'

describe('AppController (e2e)', () => {
  let app: INestApplication

  // 매 테스트마다 새로운 어플리케이션을 실행하지 않기 위해서 beforeEach -> beforeAll 변경
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    // 실제 어플리케이션과 동일한 환경을 만들기 위해서 동일한 파이프를 넣어줘야함.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    await app.init()
  })

  describe('/movies', () => {
    it('GET', () =>
      request(app.getHttpServer()).get('/movies').expect(200).expect([]))

    it('POST', () =>
      request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['terst'] })
        .expect(201))

    it('DELETE', () =>
      request(app.getHttpServer()).delete('/movies/11').expect(404))
  })

  describe('/movies/:id', () => {
    it('GET 200', () =>
      request(app.getHttpServer()).get('/movies/1').expect(200))
    it('GET 404', () =>
      request(app.getHttpServer()).get('/movies/222').expect(404))

    it('PATCH', () =>
      request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200))

    it('DELETE', () =>
      request(app.getHttpServer()).delete('/movies/1').expect(200))
  })
})
