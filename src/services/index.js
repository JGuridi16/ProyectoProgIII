import axios from 'axios';

const baseURL = 'https://localhost:44356/api';
const baseARSURL = '';

const get = async (endpoint) => {
    return await axios.get(`${baseURL}/${endpoint}`);
};

const getAnonymous = async (endpoint) => {
    return axios.get(`${baseURL}/${endpoint}`);
};

const patch = async (endpoint) => {
    return axios.patch(`${baseURL}/${endpoint}`);
};


const download = async (id, action = 'download', blank = true) => {
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
            // ...CONTENT_TYPE_JSON
        }
    };
    return axios.put(`${baseURL}/${endpoint}`, data, axiosConfig);
};

const postFile = async (file) => {
    let axiosConfig = {
        headers: {
            // ...CONTENT_TYPE_JSON
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
            // ...CONTENT_TYPE_MULTIPART_FORM_DATA
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

// const addToken = () => {
//     const tokenLocalStorage = tokenStorage.getString();
//     if (tokenLocalStorage) {
//         axios.interceptors.request.use(
//             (config) => {
//                 const token = `Bearer ${tokenLocalStorage}`;
//                 if (token) {
//                     config.headers['Authorization'] = token;
//                     config.headers.common['Authorization'] = token;
//                 }
//                 return config;
//             },
//             (error) => {
//                 return Promise.reject(error);
//             }
//         );
//     }
// };

export { get, post, put, onDelete, postARS, updateMany, uploadMany, putFiles, getAnonymous, patch, postFile, putDocument, download, baseURL };
