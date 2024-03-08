const fs = require('fs').promises; // Using fs.promises for async file operations
const { generatePDF } = require('./pdfGenerator');

// JSON data
const jsonDataForMerge = {
    name: 'Damika',
    start_date: '01/12/2023',
    End_date: '01/12/2024',
    allowance: 'lkr 40,000',
    sender: 'Sahan',
};
const test2 = {
    name: 'Damika',
    sender: 'Sahan'
};

let templateLocation = '../Templates/internTemplate.docx';
let templateTypeOut = 'InternshipOfferLetter.pdf';

let templateLocationTest = '../Templates/testTemplate.docx';
let templateTypeOutTest = 'test.pdf';

async function main() {
    try {
        // Generating PDF
        await generatePDF(jsonDataForMerge, templateLocation, templateTypeOut);
       
    } catch (error) {
        console.error('Error:', error);
    }
}


main();
