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

  afterEach(function() {
    sinon.restore();
  })

  it('Testa o retorno de "getAll"', async () => {
    sinon.stub(Model, 'findAll').resolves(outputMock);

    const teamsService = new TeamsService();
    const data = await teamsService.getAll();

    const result = await chai.request(app).get('/teams')

    chai.expect(data).to.be.equal(outputMock);
    expect(result.status).to.equal(200);
    expect(result.body[0]).to.be.deep.equal(bestTeam);
  });

})