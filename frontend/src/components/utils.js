import { serverUrl } from './constants';
import axios from "axios";

export const getPage = (pageNumber, pageSize, onSuccess, onError = () => {}) => {
   return axios
        .get(`${serverUrl}/api/v1/tasks/all?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then(({data}) => {
            onSuccess(data);
        })
       .catch(onError);
};

export const getTaskCount = (onSuccess, onError = () => {}) => {
    return axios
        .get(`${serverUrl}/api/v1/tasks/count`)
        .then(({data}) => {
            onSuccess(data);
        })
        .catch(onError);
};

export const removeTask = (taskId, onSuccess, onError = () => {}) => {
    return axios
        .delete(`${serverUrl}/api/v1/tasks/${taskId}`)
        .then(() => {
            onSuccess();
        })
        .catch(onError);
};

export const editTask = (updatedTask, onSuccess, onError = () => {}) => {
    return axios
        .put(`${serverUrl}/api/v1/tasks`, updatedTask)
        .then(({data}) => {
            onSuccess(data);
        })
        .catch(onError);
};

export const createTask = (newTask, onSuccess, onError = () => {}) => {
    return axios
        .post(`${serverUrl}/api/v1/tasks`, newTask)
        .then(({data}) => {
            onSuccess(data);
        })
        .catch(onError);
};
