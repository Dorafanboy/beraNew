import fs from 'fs';
import path from 'path';
import { IBoostData } from '../../data/utils/interfaces';

export const boostDataPath = path.join(__dirname, '../../assets/', 'boostData.json');

export function saveData(boostData: IBoostData) {
    const data = fs.readFileSync(boostDataPath, 'utf8');
    let jsonObject = JSON.parse(data);

    if (!Array.isArray(jsonObject)) {
        jsonObject = [];
    }

    jsonObject.push(boostData);
    const jsonString = JSON.stringify(jsonObject, null, 4);

    fs.writeFileSync(boostDataPath, jsonString);
}

export function loadData(accountAddress: string): Promise<IBoostData | null> {
    let blastrData = JSON.parse(fs.readFileSync(boostDataPath, 'utf8'));
    const walletData = blastrData.find((item: IBoostData) => item.accountAddress === accountAddress);

    if (walletData) {
        blastrData = blastrData.filter((item: IBoostData) => item.accountAddress !== accountAddress);
        fs.writeFileSync(boostDataPath, JSON.stringify(blastrData, null, 4));
    }

    return walletData ? walletData : null;
}
