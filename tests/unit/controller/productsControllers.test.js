const { expect } = require("chai");
const sinon = require("sinon");

const productsControllers = require('../../../controllers/produtctControllers');
const producstServices = require('../../../services/produtctServices');

describe("Ao chamar o controller productsControllers", () => {
  describe("Quando não existe nenhum produto criado", function () {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(producstServices, "allProducts").resolves([]);
    });
    after(function () {
      producstServices.allProducts.restore();
    });

    it("O status seja 200", async function () {
      await productsControllers.allProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("o array vazio", async function () {
      await productsControllers.allProducts(request, response);
      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe("Quando existem produtos dentro do banco de dados", () => {
    const response = {};
    const request = {};
    const allProducts = [
      {
        id: 1,
        name: "Martelo de Thor",
      },
      {
        id: 2,
        name: "Traje de encolhimento",
      },
    ];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(producstServices, "allProducts").resolves(allProducts);
    });

    after(() => {
      producstServices.allProducts.restore();
    });

    it("o status seja 200", async function () {
      await productsControllers.allProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it("o array com os dados", async function () {
      await productsControllers.allProducts(request, response);
      expect(response.json.calledWith(allProducts)).to.be.equal(true);
    });
  });
});

describe("Ao chamar o controller de getProdutctsId", () => {
  describe("quando não existem filmes no banco de dados", async () => {
    const response = {};
    const request = {};

    const objectError = {
      error: { code: "notFound", message: "Product not found" },
    };

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
      next = sinon
        .stub(producstServices, "getProdutctsId")
        .resolves(objectError);
    });

    after(() => {
      producstServices.getProdutctsId.restore();
    });

    it('é chamado o método "status" passando 404', async () => {
      await producstServices.getProdutctsId(request, response, next);

      expect(response.send.calledWith("Not Found")).to.be.equal(false);
    });

    it('é chamado o método "send" passando a mensagem "Not Found"', async () => {
      await producstServices.getProdutctsId(request, response);

      expect(response.send.calledWith("Not Found")).to.be.equal(false);
    });
  });

  describe("Quando chama o controller getProdutctsId", async () => {
    const response = {};
    const request = {};

    const product = {
      id: 1,
      name: "Martelo de Thor",
    };

    before(() => {
      request.params = {
        id: 1,
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(producstServices, "getProdutctsId").resolves(product);
    });

    after(() => {
      producstServices.getProdutctsId.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsControllers.getProdutctsId(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsControllers.getProdutctsId(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
