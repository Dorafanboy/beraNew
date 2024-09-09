import axios from 'axios';
import { HttpAgentObject, SocksAgentObject } from '../utils/utilsData';
import UserAgent from 'user-agents';

let userAgent: UserAgent;

export const generateAxiosInstance = (token: string, agent: HttpAgentObject | SocksAgentObject | null = null) => {
    let axiosConfig = {
        headers: {
            Authorization: token,
            'User-Agent': userAgent.toString(),
        },
    };

    if (agent) {
        axiosConfig = {
            ...axiosConfig,
            ...agent,
        };
    }

    return axios.create(axiosConfig);
};

export function generateRandomUserAgent() {
    userAgent = new UserAgent({ deviceCategory: 'desktop' });
}
