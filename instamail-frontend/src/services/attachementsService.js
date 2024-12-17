import api from "./api";

const AttachmentService = {
    uploadAttachment: async (mailId, files) => {
        if(files.length === 0){
            return;
        }
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });
        const response = await api.post(`/upload-attachment/${mailId}`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        
        return response.data;
    },
    downloadAttachment: async (attachmentId) => {
        const response = await api.get(`/download-attachment/${attachmentId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
            },
            responseType: 'blob', 
        });
        return response;
    },
    getAttachmentname: async (mailId) => {
        const response = await api.get(`/get-all-attachments/${mailId}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                }
            }
        );
        return response.data;
    },
    multiRecievers: async (mailId, remainingReceivers) => {
        const response = await api.post(`/multi-recievers/${mailId}`, remainingReceivers, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
            }
        });
        return response.data;
    }
}

export default AttachmentService;

