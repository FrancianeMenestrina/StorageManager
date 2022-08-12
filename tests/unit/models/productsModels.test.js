const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const connection = require("../../../models/connection");
const productModels = require('../../../models/productModels');

describe("Busca apenas um produto no BD por seu ID", () => {
  before(() => {
    const executeResult = [[], []];

    sinon.stub(connection, "execute").resolves(executeResult);
  });

  after(() => {
    connection.execute.restore();
  });

  describe("Quando não existe um produto com o ID informado", () => {
    it("retorna null", async () => {
      const response = await productModels.getProdutctsId();
      expect(response).to.be.equal(undefined);
    });
  });

  describe("quando existe um produto com o ID informado", () => {
    before(() => {
      sinon.stub(productModels, "getProdutctsId").resolves({
        id: 2,
        name: "Traje de encolhimento",
      });
    });

    after(() => {
      productModels.getProdutctsId.restore();
    });

    it("retorna um objeto", async () => {
      const response = await productModels.getProdutctsId(1);

      expect(response).to.be.an("object");
    });

    it("o objeto não está vazio", async () => {
      const response = await productModels.getProdutctsId(1);

      expect(response).to.be.not.empty;
    });

    it('O objeto possui as propriedades: "id", "name"', async () => {
      const resultado = await productModels.getProdutctsId(1);
      expect(resultado).to.include.all.keys(
        "id",
        "name"
      );
    });
  });
});
