import fetch from 'node-fetch';
import fs from 'fs';
import { getToken } from './getTkn.mjs';
import {getDownloadUri} from './getDwnUri.mjs'
import {pollOperationStatus} from './pollingOpStatus.mjs'

const apiKey = '438effb2c5fe44a4b22175c69abbc1f3';

async function generatePDF(assetId, jsonData) {
    try {
        // Retrieve the access token
        const token = await getToken();

        // Make API call to generate PDF
        const response = await fetch('https://pdf-services-ue1.adobe.io/operation/documentgeneration', {
            method: 'POST',
            headers: {
                'X-API-Key': apiKey,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assetID: assetId,
                outputFormat: 'pdf',
                jsonDataForMerge: jsonData.jsonDataForMerge,
                notifiers: [ {
                    "type": "CALLBACK",
                    "data": {
                      "url": "https://dummy.callback.org/",
                      "headers": {
                        "x-api-key": "dummykey",
                        "access-token": "dummytoken"
                      }
                    }
                  }]
            })
        });

        const locationHeader = response.headers.get('location');
        if (!locationHeader) {
            throw new Error('Location header not found in the response.');
        }

        console.log('PDF generation job status URI:', locationHeader);

        // Poll the operation 
        const assetID = await pollOperationStatus(locationHeader);

        // Getting download URI 
        const downloadUri = await getDownloadUri(assetID)
        
        // Download the PDF 
        const downloadResponse = await fetch(downloadUri);
        if (!downloadResponse.ok) {
            throw new Error(`Failed to download PDF: ${downloadResponse.statusText}`);
        }

        const pdfArrayBuffer = await downloadResponse.arrayBuffer();
        fs.writeFileSync('./outPDF/output.pdf', Buffer.from(pdfArrayBuffer));
        console.log('PDF generated and saved successfully.');


   } catch (error) {
       console.error('Error generating PDF:', error.message);
   }
}

export {generatePDF}





