import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Teams from '../database/models/TeamsModel';
import { Model } from 'sequelize';
import { app } from '../app';
import TeamsService from '../services/TeamsService';

chai.use(chaiHttp);

const { expect } = chai;

const bestTeam = { id: 13, teamName: 'Palmeiras'}
const outputMock: Teams[] = [new Teams(bestTeam)]

describe('Realiza os testes do endpoint "/teams"', () => {

  beforeEach(() => {
    sinon.stub(Model, 'findAll').resolves(outputMock);
  })

  afterEach(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Testa o retorno de "getAll"', async () => {
    const teamsService = new TeamsService();
    const result = await teamsService.getAll();

    chai.expect(result).to.be.equal(outputMock);
  });

  it('Testa o método get do endpoint', async () => {
    const result = await chai.request(app).get('/teams')

    expect(result.status).to.equal(200);
    expect(result.body[0]).to.be.deep.equal(bestTeam);
  });

})