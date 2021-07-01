import axios from 'axios';
import { tokenStorage } from 'localStorage';
import { XmlState } from 'xmlStates';
import { StatusCode } from 'statusCode';

import { CONTENT_TYPE_MULTIPART_FORM_DATA, CONTENT_TYPE_JSON, ALL_METHODS, ALL_HEADERS, ANY_ORIGIN } from '../globalConsts';


const baseURL = 'https://localhost:44356/api';
const baseARSURL = '';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = ANY_ORIGIN;
const get = async (endpoint) => {
    addToken();
    return axios.get(`${baseURL}/${endpoint}`);
};

const getAnonymous = async (endpoint) => {
    return axios.get(`${baseURL}/${endpoint}`);
};

const patch = async (endpoint) => {
    return axios.patch(`${baseURL}/${endpoint}`);
};

const getGeneric = (endpoint) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XmlState.DONE) {
                if (xhr.status === StatusCode.OK) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.response);
                }
            }
        };

        xhr.open('GET', endpoint);
        xhr.setRequestHeader("Access-Control-Allow-Methods", ALL_METHODS);
        xhr.setRequestHeader("Access-Control-Allow-Headers", ALL_HEADERS);
        xhr.setRequestHeader('Access-Control-Allow-Origin', ANY_ORIGIN);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();

    });
};

const donwload = async (id, action = 'download', blank = true) => {
    const target = (blank) ? '_blank' : undefined;
    const url = await axios.get(`${baseURL}/files/${action}?documentId=${id}`);
    return window.open(url.config.url, target);
};

const post = async (endpoint, data) => {
    return axios.post(`${baseURL}/${endpoint}`, data);
};

const put = async (endpoint, id, data) => {
    return axios.put(`${baseURL}/${endpoint}/${id}`, data);
};
const putDocument = async (endpoint, id, statusId) => {

    return axios.put(`${baseURL}/${endpoint}/${id}?statusId=${statusId}`);
};

const putFiles = async (endpoint, data) => {
    let axiosConfig = {
        headers: {
            ...CONTENT_TYPE_JSON
        }
    };
    return axios.put(`${baseURL}/${endpoint}`, data, axiosConfig);
};

const postFile = async (file) => {
    let axiosConfig = {
        headers: {
            ...CONTENT_TYPE_JSON
        }
    };
    const data = new FormData();
    data.append('file', file);
    return axios.post(`${baseURL}//files/upload`, data, axiosConfig);
};


const updateMany = async (endpoint, data) => {
    return axios.put(`${baseURL}/${endpoint}`, data);
};

const uploadMany = async (files) => {
    const data = new FormData();
    let axiosConfig = {
        headers: {
            ...CONTENT_TYPE_MULTIPART_FORM_DATA
        }
    };
    for (let index = 0; index < files.length; index++) {
        const element = files[index];
        data.append('files', element);
    }
    return axios.post(`${baseURL}/files/upload-many`, data, axiosConfig);
};

const onDelete = async (endpoint, id) => {
    return axios.delete(`${baseURL}/${endpoint}/${id}`);
};

const postARS = async (endpoint, data) => {
    return axios.post(`${baseARSURL}/${endpoint}`, data);
};

const addToken = () => {
    const tokenLocalStorage = tokenStorage.getString();
    if (tokenLocalStorage) {
        axios.interceptors.request.use(
            (config) => {
                const token = `Bearer ${tokenLocalStorage}`;
                if (token) {
                    config.headers['Authorization'] = token;
                    config.headers.common['Authorization'] = token;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
};

export { get, post, put, onDelete, postARS, addToken, updateMany, uploadMany, putFiles, getAnonymous, getGeneric, patch, postFile, putDocument, donwload };
