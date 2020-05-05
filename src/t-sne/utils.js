
import { promises as fs } from 'fs';

/**
 * clone 2d-typed array
 * @param {Float64Array[]} src
 * @return {Float64Array[]}
 */
export function clone(src) {
    const arr = [];
    const N = src.length;
    const dims = src[0].length;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < dims; j++) {
            arr[i] = src[i].slice();
        }
    }
    return arr;
}

/**
 * write down result
 * @param {string} fileName 
 * @param {Float64Array[]} result 
 */
export async function writeResult(fileName, result) {
    const N = result.length;
    const dims = result[0].length;
    let str = '';
    for(let i=0; i<N; i++) {
        for(let d=0; d<dims; d++) {
            str += result[i][d] + '\t';
        }
        str += '\n';
    }
    await fs.appendFile(fileName, str);
}

/**
 * 
 * @param {number[]} targets
 * @return {number[]}
 */
export function createIndexList(targets) {
    const N = targets.length;
    const indexList = [];
    const labels = Array.from(new Set(targets));
    labels.map(label => {
        indexList[label] = [];
    });
    for(let i=0; i<N; i++) {
        indexList[targets[i]].push(i);
    }
    return indexList;
}

/**
 * 
 * @param {Float64Array[]|number[][]} data 
 * @param {number[]} indexList
 * @return {number[][]}
 */
export function classifyPoint(data, indexList) {
    const points = [];
    const N = indexList.length;
    for(let i=0; i<N; i++) {
        const ilen = indexList[i].length;
        points[i] = [];
        for(let j=0; j<ilen; j++) {
            points[i].push(data[indexList[i][j]]);
        }
    }
    return points;
}