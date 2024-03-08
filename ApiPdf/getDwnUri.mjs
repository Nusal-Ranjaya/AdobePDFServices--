import { getToken } from './getTkn.mjs';
const apiKey = '438effb2c5fe44a4b22175c69abbc1f3';


async function getDownloadUri(assetId) {
    try {
        
        const token = await getToken();

        // Download pre-signed URI
        const response = await fetch(`https://pdf-services-ue1.adobe.io/assets/${assetId}`, {
            method: 'GET',
            headers: {
                'X-API-Key': apiKey,
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to get download pre-signed URI: ${response.statusText}`);
        }

        const responseData = await response.json();
        const downloadUri = responseData.downloadUri;

        
        return downloadUri;
    } catch (error) {
        console.error('Error getting download pre-signed URI:', error.message);
        throw error; 
    }
}

export {getDownloadUri}