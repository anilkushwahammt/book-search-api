const chai = require('chai')
chai.use(require('chai-http'))
const { expect } = require('chai')
const { app } = require('../../app')

/**
 * @see https://github.com/chaijs/chai-http
 */
const request = chai.request(app).keepOpen()


//a collection of test cases that test a specific component
describe("Testing Book Search API without Query Parameter /book/search", () => {
	//test a function for a specific case
    it("it should return all book result from api without filter", async () => {
        const response =  await request.get(`/book/search`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(83);
    })

    it("it should return empty response if query parameter is different from allowed lits", async () => {
        const response =  await request.get(`/book/search?pricee=300`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(0);
    })
})


describe("Testing Book Search API with Query Parmeters", () => {
	//test a function for a specific case
    it("it should return  book result after applying title filter /book/search?title=Flex 4 in Action", async () => {
        const response =  await request.get(`/book/search?title=Flex 4 in Action`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(1);
    })

    //test a function for a specific case
    it("it should fail if query parameter title contains empty value i.e. /book/search?title=", async () => {
        const response =  await request.get(`/book/search?title=`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(400);
        expect(bookResult.error.message).contains('is invalid query parameter');
    })

    it("it should return  book result after applying isbn filter /book/search?isbn=1935182463", async () => {
        const response =  await request.get(`/book/search?isbn=1935182463`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(1);
    })

    it("it should fail if query parameter isbn contains empty value i.e. /book/search?isbn=", async () => {
        const response =  await request.get(`/book/search?isbn=`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(400);
        expect(bookResult.error.message).contains('is invalid query parameter');
    })

    it("it should return  book result after applying pageCount filter /book/search?pageCount=416", async () => {
        const response =  await request.get(`/book/search?pageCount=416`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(1);
    })

    it("it should fail if query parameter pageCount contains empty value i.e. /book/search?pageCount=", async () => {
        const response =  await request.get(`/book/search?pageCount=`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(400);
        expect(bookResult.error.message).contains('is invalid query parameter');
    })

    it("it should return  book result after applying date filter in format [YYYY] /book/search?published.$date=2011", async () => {
        const response =  await request.get(`/book/search?published.$date=2011`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(6);
    })

    it("it should return  book result after applying date filter in format [YYYY-MM-DD] /book/search?published.$date=2011-05-15", async () => {
        const response =  await request.get(`/book/search?published.$date=2011-05-15`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(1);
    })

    it("it should fail if query parameter date contains empty value i.e. /book/search?published.$date=", async () => {
        const response =  await request.get(`/book/search?published.$date=`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(400);
        expect(bookResult.error.message).contains('is invalid query parameter');
    })


    it("it should return  book result after applying price filter /book/search?published.price=90", async () => {
        const response =  await request.get(`/book/search?published.price=90`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(6);
    })

    it("it should fail if query parameter price contains empty value i.e. /book/search?published.price=", async () => {
        const response =  await request.get(`/book/search?published.price=`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(400);
        expect(bookResult.error.message).contains('is invalid query parameter');
    })

    it("it should return  book result after applying currency filter /book/search?published.currency=USD", async () => {
        const response =  await request.get(`/book/search?published.currency=USD`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(83);
    })

    it("it should fail if query parameter currency contains empty value i.e. /book/search?published.currency=", async () => {
        const response =  await request.get(`/book/search?published.currency=`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(400);
        expect(bookResult.error.message).contains('is invalid query parameter');
    })

    it("it should return  book result after applying status filter /book/search?status=PUBLISH", async () => {
        const response =  await request.get(`/book/search?status=PUBLISH`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(83);
    })

    it("it should fail if query parameter status contains empty value i.e. /book/search?status=", async () => {
        const response =  await request.get(`/book/search?status=`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(400);
        expect(bookResult.error.message).contains('is invalid query parameter');
    })

    it("it should return  book result after applying author filter /book/search?authors=PUBLISH", async () => {
        const response =  await request.get(`/book/search?authors=Anthony Briggs`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(1);
    })

    it("it should fail if query parameter author contains empty value i.e. /book/search?authors=", async () => {
        const response =  await request.get(`/book/search?authors=`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(400);
        expect(bookResult.error.message).contains('is invalid query parameter');
    })

    it("it should return  book result after applying category filter /book/search?categories=Internet", async () => {
        const response =  await request.get(`/book/search?categories=Internet`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(14);
    })

    it("it should fail if query parameter category contains empty value i.e. /book/search?categories=", async () => {
        const response =  await request.get(`/book/search?categories=`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(400);
        expect(bookResult.error.message).contains('is invalid query parameter');
    })

    it("it should return  book result after applying category and price filter /book/search?categories=Internet&published.price=40", async () => {
        const response =  await request.get(`/book/search?categories=Internet&published.price=40`);
        const bookResult = response.body;
        expect(response.status).to.have.equal(200);
        expect(bookResult.length).to.have.equal(3);
    })
})


