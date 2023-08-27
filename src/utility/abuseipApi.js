export async function getAbuseipInfo(ips, apiKey) {

    const baseUrl = "/api/check?ipAddress=";
    const result = [];

    for (let i = 0; i < Object.keys(ips).length; i++) {

        let headers = new Headers();

        headers.append('Key', apiKey);
        headers.append('Accept', 'application/json');

        //console.log(baseUrl + ips[i]);
        //console.log(apiKey);

        await fetch(baseUrl + ips[i], {
            method: 'GET',
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                //console.log('Success:', data);
                result.push(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    //console.log(result);

    return result;

}
