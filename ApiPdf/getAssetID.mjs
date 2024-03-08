import fetch from 'node-fetch';
import { getToken } from './getTkn.mjs'; 
import fs from 'fs';
import { response } from 'express';

const apiKey = '438effb2c5fe44a4b22175c69abbc1f3';

async function getAssetID(fileLocation) {
    try {
        
        const token = await getToken(); 
        const fileData = fs.readFileSync(fileLocation);

        // Make API call to upload PDF file
        const authResponse = await fetch('https://pdf-services-ue1.adobe.io/assets', {
            method: 'POST',
            headers: {
                'X-API-Key': apiKey,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mediaType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            })
        });

        // Check if upload is successful
        if (!authResponse.ok) {
            throw new Error('Failed to upload Word Template: ' + authResponse.statusText);
        }

        const uploadData = await authResponse.json();
        const assetId = uploadData.assetID; 
        const uploadUri = uploadData.uploadUri; 

        // Upload the PDF file
        const uploadFileResponse = await fetch(uploadUri, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            },
            body: fileData
        });

        // Check if the file upload is successful
        if (!uploadFileResponse.ok) {
            throw new Error('Failed to upload Word file: ' + uploadFileResponse.statusText);
        }

        //console.log("File uploaded successfully.");
        //console.log("Asset ID:", assetId);
        return assetId;

    } catch (error) {
        console.error(error.message);
    }
}



// const fileLocation = '../Templates/internTemplate.docx'; 
// getAssetID(fileLocation);

export {getAssetID};