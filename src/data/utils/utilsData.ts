import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { SocksProxyAgent } from 'socks-proxy-agent';

export type HttpAgentObject = {
    httpProxy?: HttpProxyAgent<string>;
    httpsProxy?: HttpsProxyAgent<string>;
};

export type SocksAgentObject = {
    httpProxy?: SocksProxyAgent;
};
