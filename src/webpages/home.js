import { type } from '@testing-library/user-event/dist/type/index.js';
import React, { useState } from 'react';
import { getAbuseipInfo } from '../utility/abuseipApi.js';

const Home = () => {

    const [formValid, setFormValid] = useState(true);
    const [ips, setIps] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [result, setResult] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        var parsedIps = await validateTextarea(ips);

        if (formValid) {
            setResult(await getAbuseipInfo(parsedIps, apiKey));
        } else {
            alert("Bad IPs detected!");
            setFormValid(true);
        }

    }

    function validateTextarea(input) {
        const re = /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;

        input = input.match(re);

        if (input == null) {
            setFormValid(false);
        }

        return input;

    }

    function renderTableData() {
        return result.map((element) => {
            return (
                <tr>
                    <td>{element.data.ipAddress}</td>
                    <td>{(element.data.isPublic).toString() || 'null'}</td>
                    <td>{element.data.ipVersion}</td>
                    <td>{(element.data.isWhitelisted).toString() || 'null'}</td>
                    <td>{element.data.abuseConfidenceScore}</td>
                    <td>{element.data.countryCode}</td>
                    <td>{element.data.usageType}</td>
                    <td>{element.data.isp}</td>
                    <td>{element.data.domain}</td>
                    <td>{element.data.hostnames}</td>
                    <td>{element.data.totalReports}</td>
                    <td>{element.data.numDistinctUsers}</td>
                    <td>{element.data.lastReportedAt}</td>
                </tr>
            )
        })
    }

    return (
        <div class="container-fluid">
            <div class="row mb-4">
                <div class="col">
                    <form onSubmit={handleSubmit}>
                        <label class="form-label">Enter your API Key:</label>
                        <input class="form-control" type="password" value={apiKey || ''} onChange={event => setApiKey(event.target.value)} required />
                        <br></br>
                        <label class="form-label">Enter list of IPs:</label>
                        <textarea class="form-control" value={ips || ''} onChange={event => setIps(event.target.value)} required></textarea>
                        <br></br>
                        <div class="d-grid gap-2">
                        <button class="btn btn-primary" type="submit">Verifica</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    {
                        result &&
                        <div class="table-responsive">
                            <table class="table table-sm table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <td>ipAddress</td>
                                        <td>isPublic</td>
                                        <td>ipVersion</td>
                                        <td>isWhitelisted</td>
                                        <td>abuseConfidenceScore</td>
                                        <td>countryCode</td>
                                        <td>usageType</td>
                                        <td>isp</td>
                                        <td>domain</td>
                                        <td>hostnames</td>
                                        <td>totalReports</td>
                                        <td>numDistinctUsers</td>
                                        <td>lastReportedAt</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderTableData()}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
}

export default Home;
