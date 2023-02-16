import axiosInstance from "axios";
import https from 'https';
import {
  buildSearchRequest,
  buildSearchResponse,
  buildInitRequest,
  buildInitResponse,
  buildConfirmRequest,
  buildConfirmResponse,
  buildStatusRequest,
  buildStatusResponse,
  buildSelectRequest,
  buildSelectResponse
} from "./schema-build-helper";
import searchScholarshipResponse from "./mocks/searchScholarshipResponse.json";
import initScholarshipResponse from "./mocks/initScholarshipResponse.json";
import confirmScholarshipReponse from "./mocks/confirmScholarshipReponse.json";
import statusScholarshipReponse from "./mocks/statusScholarshipReponse.json";
import selectScholarshipResponse from "./mocks/selectScholarshipResponse.json";


const gatewayUrl = process.env.GATEWAY_URL;
const scholarshipNetwork = process.env.SCHOLARSHIP_NETWORK;

const axios = axiosInstance.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

export const searchScholarshipService = async (body: any): Promise<any> => {
  try {
    const searchRequest = buildSearchRequest(body);
    console.log(JSON.stringify(searchRequest.payload));

    let searchResponse: any = {};
    if (scholarshipNetwork !== "local") {
      const headers = { "Content-Type": "application/JSON" };
      let res = await axios.post(
        `${gatewayUrl}/search`,
        searchRequest.payload,
        { headers }
      );
      searchResponse = buildSearchResponse(res, body);
    } else {
      searchResponse = buildSearchResponse({ data: searchScholarshipResponse }, body);
    }

    return searchResponse;
  } catch (error) {
    console.log(error);
    return { error: error, errorOccured: true };
  }
};

export const selectScholarshipService = async (body: any): Promise<any> => {
  try {
    const initRequest = buildSelectRequest(body);
    console.log(JSON.stringify(initRequest.payload));

    let selectResponse: any = {};
    if (scholarshipNetwork !== "local") {
      const headers = { "Content-Type": "application/JSON" };
      let res = await axios.post(`${gatewayUrl}/select`, initRequest.payload, {
        headers
      });
      selectResponse = buildSelectResponse(res, body);
    } else {
      selectResponse = buildSelectResponse({ data: selectScholarshipResponse }, body);
    }

    return selectResponse;
  } catch (error) {
    console.log(error);
    return { error: error, errorOccured: true };
  }
}

export const initScholarshipService = async (body: any): Promise<any> => {
  try {
    const initRequest = buildInitRequest(body);
    console.log(JSON.stringify(initRequest.payload));

    let initResponse: any = {};
    if (scholarshipNetwork !== "local") {
      const headers = { "Content-Type": "application/JSON" };
      let res = await axios.post(`${gatewayUrl}/init`, initRequest.payload, {
        headers
      });
      initResponse = buildInitResponse(res?.data, body);
    } else {
      initResponse = buildInitResponse(initScholarshipResponse, body);
    }

    return { data: initResponse };
  } catch (error) {
    return { error: error, errorOccured: true };
  }
};

export const confirmScholarshipService = async (body: any): Promise<any> => {
  try {
    const confirmRequest = buildConfirmRequest(body);
    console.log(JSON.stringify(confirmRequest.payload));

    let confirmResponse: any = {};
    if (scholarshipNetwork !== "local") {
      const headers = { "Content-Type": "application/JSON" };
      let res = await axios.post(
        `${gatewayUrl}/confirm`,
        confirmRequest.payload,
        { headers }
      );
      confirmResponse = buildConfirmResponse(res?.data, body);
    } else {
      confirmResponse = buildConfirmResponse(confirmScholarshipReponse, body);
    }

    return { data: confirmResponse };
  } catch (error) {
    return { error: error, errorOccured: true };
  }
};

export const statusScholarshipService = async (body: any): Promise<any> => {
  try {
    const statusRequest = buildStatusRequest(body);
    console.log(JSON.stringify(statusRequest.payload));

    let statusResponse: any = {};
    if (scholarshipNetwork !== "local") {
      const headers = { "Content-Type": "application/JSON" };
      let res = await axios.post(
        `${gatewayUrl}/status`,
        statusRequest.payload,
        { headers }
      );
      statusResponse = buildStatusResponse(res?.data, body);
    } else {
      statusResponse = buildStatusResponse(statusScholarshipReponse, body);
    }

    return { data: statusResponse };
  } catch (error) {
    return { error: error, errorOccured: true };
  }
};
