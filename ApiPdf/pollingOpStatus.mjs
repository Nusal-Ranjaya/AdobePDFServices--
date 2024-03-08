import { getToken } from './getTkn.mjs';
const apiKey = '438effb2c5fe44a4b22175c69abbc1f3';


async function pollOperationStatus(statusUri) {
    let assetID = null;
    while (!assetID) {
        try {
            const token = await getToken();
            const response = await fetch(statusUri, {
                headers: {
                    'X-API-Key': apiKey,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch operation status: ${response.statusText}`);
            }

            const responseData = await response.json();
            const status = responseData.status;
            console.log(status);

            if (status === 'done') {
                assetID = responseData.asset.assetID;
            } else if (status === 'failed') {
                throw new Error('Document generation failed.'); 
            } else {
                
                await new Promise(resolve => setTimeout(resolve, 5000)); 
            }
        } catch (error) {
            console.error('Error polling operation status:', error.message);
            throw error; 
        }
    }
    return assetID;
}

export {pollOperationStatus}