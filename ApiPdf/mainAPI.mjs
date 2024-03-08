import {generatePDF} from './genertePDF.mjs'
import { getAssetID} from './getAssetID.mjs';

const jsonData = {
    jsonDataForMerge: {
        name: 'Damika',
        start_date: '01/12/2023',
        End_date: '01/12/2024',
        allowance: 'lkr 40,000',
        sender: 'Sahan',
    }
};

const fileLocation = '../Templates/internTemplate.docx'; 

const assetId = await getAssetID(fileLocation);
generatePDF(assetId, jsonData);