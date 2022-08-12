const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productServices = require('../../../services/produtctServices');
const productModels = require('../../../models/productModels');

describe("Busca apenas um produto no BD por seu ID", () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe("quando não existe um produto com o ID informado", () => {
    it("retorna null", async () => {
      const response = await productServices.getProdutctsId();

      expect(response).to.be.equal(false);
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
      const response = await productServices.getProdutctsId(1);

      expect(response).to.be.an("object");
    });

    it("o objeto não está vazio", async () => {
      const response = await productServices.getProdutctsId(1);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades: "id", "name"', async () => {
      const item = await productServices.getProdutctsId(1);

      expect(item).to.include.all.keys(
        "id",
        "name"
      );
    });
  });
});
