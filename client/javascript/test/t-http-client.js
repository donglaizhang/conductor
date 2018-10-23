
const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');
const expect = require('chai').expect;

describe('unit test for restful http client', function() {
  let HttpClient, mockRequestPromise;
  beforeEach(function() {
    mockRequestPromise = sinon.stub().returns(Promise.resolve());
  });
  function stubHttpClient() {
    return proxyquire('../http-client', {
      'request-promise-native': mockRequestPromise
    });
  }

  it('post the conductor request with right url and payload', function(done) {
    mockRequestPromise = sinon.stub().returns(Promise.resolve({
      result: 'fake-result'
    }));
    HttpClient = stubHttpClient();
    let hc = new HttpClient('http://fake.conductor.com:3331');
    hc.post('/workflow/31', {version: 32, name: 'fake-name'}, { attr0: 'fake-value-0'}).then(rs => {
      expect(mockRequestPromise.called).to.be.true;
      let args = mockRequestPromise.args[0][0];
      expect(args.uri).equal('http://fake.conductor.com:3331/workflow/31?version=32&name=fake-name');
      expect(args.headers.Accept).equal('application/json');
      expect(rs.result).equal('fake-result');
      done();
    }).catch(e => {
      expect(true, 'fail to post the correct request').to.throw(e);
    });
  });

  it('get the conductor request without paramters', function(done) {
    HttpClient = stubHttpClient();
    let hc = new HttpClient('http://fake.conductor.com:3332');
    hc.get('/workflow/name1', undefined, ).then(() => {
      expect(mockRequestPromise.called).to.be.true;
      let args = mockRequestPromise.args[0][0];
      expect(args.uri).equal('http://fake.conductor.com:3332/workflow/name1');
      done();
    }).catch(e => {
      expect(true, 'fail to get the correct request').to.throw(e);
      done();
    });
  });
});
