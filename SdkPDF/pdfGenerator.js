const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');
const fs = require('fs');



async function generatePDF(jsonDataForMerge,templateLocation,templateTypeOut){

    try
    {
        //config
        const credentials =  PDFServicesSdk.Credentials
        .servicePrincipalCredentialsBuilder()
        .withClientId('438effb2c5fe44a4b22175c69abbc1f3')
        .withClientSecret('p8e-C-GBYytE_WlYDTMdQpjuIGfuO-EmmFjr')
        .build();
    
        //ExecutionContext using credentials
        const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);



        // DocumentMerge options instance.
        const documentMerge = PDFServicesSdk.DocumentMerge,
        documentMergeOptions = documentMerge.options,
        options = new documentMergeOptions.DocumentMergeOptions(jsonDataForMerge, documentMergeOptions.OutputFormat.PDF);

        // operation instance using the options instance.
        const documentMergeOperation = documentMerge.Operation.createNew(options);

        // Setting operation input document template from a source file.
        const input = PDFServicesSdk.FileRef.createFromLocalFile(templateLocation);
        documentMergeOperation.setInput(input);

        await documentMergeOperation.execute(executionContext)
        .then(result => result.saveAsFile('./output/'+jsonDataForMerge.name.toString()+templateTypeOut))
        .catch(err => {
            if(err instanceof PDFServicesSdk.Error.ServiceApiError
                || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });
    }catch(error)
    {
        console.log(error);
    }
}

module.exports ={generatePDF};

