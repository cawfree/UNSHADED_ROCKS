import {ethers} from 'ethers';

export const keccakString = (str: string) => ethers.keccak256(ethers.toUtf8Bytes(str));
