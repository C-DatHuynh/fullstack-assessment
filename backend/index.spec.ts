import { describe } from 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { isServerOnline, findServer, type Server } from './index.js';
import FetchMock, { FetchMockSandbox } from 'fetch-mock';
import serverFixture from './fixture.js';

const fetchMock = FetchMock.sandbox();

// Override fetch with fetch-mock
global.fetch = fetchMock as any; // eslint-disable-line @typescript-eslint/no-explicit-any

chai.use(chaiAsPromised);

// Mock server response with status code and timeout parameter
function mockServer(fetchMock: FetchMockSandbox, server: Server, status: number, timeout?: number) {
  fetchMock.get(server.url, status, { overwriteRoutes: true, delay: timeout });
}

function findServerWithLowestPriorty(servers: Server[]) {
  return servers.reduce((p, c) => (p.priority < c.priority ? p : c));
}

describe('test "isServerOnline"', () => {
  const testServer: Server = { url: 'http://localhost:8888', priority: 1 };
  afterEach(() => {
    fetchMock.reset();
  });
  it('Function should return true for status code = 200', async () => {
    mockServer(fetchMock, testServer, 200);
    const result = await isServerOnline(testServer);
    expect(result).to.be.true;
  });
  it('Function should return false for status code = 502', async () => {
    mockServer(fetchMock, testServer, 502);
    const result = await isServerOnline(testServer);
    expect(result).to.be.false;
  });
  it('Function should return false for timeout even if status code = 200', async () => {
    mockServer(fetchMock, testServer, 200, 1000);
    const result = await isServerOnline(testServer, 500);
    expect(result).to.be.false;
  });
});

describe('test "findServer"', () => {
  afterEach(() => {
    fetchMock.reset();
  });
  it('All server are online, server with lowest priority wins', async () => {
    serverFixture.forEach((server: Server) => {
      mockServer(fetchMock, server, 200);
    });
    const expected = findServerWithLowestPriorty(serverFixture);
    const result = await findServer(serverFixture);
    expect(result).to.be.deep.eq(expected);
  });
  it('All server are offline, throw error', async () => {
    serverFixture.forEach((server: Server) => {
      mockServer(fetchMock, server, 500);
    });
    const result = findServer(serverFixture);
    expect(result).to.be.eventually.throw('No servers are online!');
  });
});
