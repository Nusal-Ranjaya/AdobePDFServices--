import fetch from 'node-fetch';

const clientId = '438effb2c5fe44a4b22175c69abbc1f3';
const clientSecret = 'p8e-C-GBYytE_WlYDTMdQpjuIGfuO-EmmFjr';
const scope = 'openid';

async function getToken() {
    try {
        const response = await fetch('https://ims-na1.adobelogin.com/ims/token/v3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'client_id': clientId,
                'client_secret': clientSecret,
                'grant_type': 'client_credentials',
                'scope': scope
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch access token');
        }

        const tokenData = await response.json();
        
        return tokenData.access_token;
    } catch (error) {
        console.error('Error getting token:', error.message);
        throw error;
    }
}


export { getToken };
