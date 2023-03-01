import * as sinon from 'sinon';
import * as chai from 'chai';
import 'chai-http';
import { app } from '../app';

chai.use(require('chai-http'));

const { expect } = chai;

const email = 'admin@admin.com';
const password = 'secret_admin';
const correctUser = { email, password };

describe('Realiza os testes do endpoint "/login"', () => {

  afterEach(function () {
    sinon.restore();
  });

  it('Testa uma tentativa de login correta', async () => {
    const result = await chai.request(app).post('/login').send(correctUser);
    expect(result.status).to.equal(200);
  });

  it('Testa uma tentativa de login sem email', async () => {
    const result = await chai.request(app).post('/login').send({ password });

    expect(result.status).to.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Testa uma tentativa de login sem password', async () => {
    const result = await chai.request(app).post('/login').send({ email });

    expect(result.status).to.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Testa uma tentativa de login com email vazio', async () => {
    const result = await chai.request(app).post('/login').send({ email: '', password });

    expect(result.status).to.equal(400);
    expect(result.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testa uma tentativa de login com password vazio', async () => {
    const result = await chai.request(app).post('/login').send({ email, password: '' });

    expect(result.status).to.equal(400);
    expect(result.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Testa uma tentativa de login com password incorreto', async () => {
    const result = await chai.request(app).post('/login').send({ email, password: '123134' });

    expect(result.status).to.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Testa uma tentativa de login com password email', async () => {
    const result = await chai.request(app).post('/login').send({ email: 'joao@eu.com', password });

    expect(result.status).to.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

});
