module.exports = {
    '/api/company/generic': {
        post: {
            operationId: 'createCompany',
            security: [{bearerAuth: []}],
            description: 'Crear una compañía en el sistema QChain',
            tags: ['companyAPI'],
            requestBody: {
                description: 'Descripcion',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'company_name',
                                'company_mail',
                                'company_doc_type',
                                'company_doc_number'
                            ],
                            properties: {
                                company_name: { type: 'string' },
                                company_mail: { type: 'string' },
                                company_doc_type: { type: 'string' },
                                company_doc_number: { type: 'string' },
                                user_mail: { 
                                    type: 'string',
                                    format: 'email' 
                                },
                                user_password: { 
                                    type: 'string',
                                    format: 'password' 
                                },
                                user_name: { type: 'string' },
                                user_lastname: { type: 'string' },
                                user_birthday: { type: 'string' },
                                user_doc_type: { type: 'string' },
                                user_doc_number: { 
                                    type: 'string',
                                    pattern: '^\\d{5,11}$' 
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'login success',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Profile' } } }
                },
                default: {
                    description: 'Error',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        },
        put: {
            operationId: 'modifyCompany',
            security: [{bearerAuth: []}],
            description: 'Modificar una compañía en el sistema QChain',
            tags: ['companyAPI'],
            requestBody: {
                description: 'Descripción, ',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['_id'],
                            properties: {
                                _id: { type: 'string' },
                                company_name: { type: 'string' },
                                company_mail: { type: 'string' },
                                company_doc_type: { type: 'string' },
                                company_doc_number: { type: 'string' }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'login success',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Profile' } } }
                },
                default: {
                    description: 'Error',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        },
        delete: {
            operationId: 'deleteCompany',
            security: [{bearerAuth: []}],
            description: 'Elimina una compañía en el sistema QChain',
            tags: ['companyAPI'],
            requestBody: {
                description: 'Id',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['_id'],
                            properties: {
                                _id: { type: 'string' }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'login success',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Profile' } } }
                },
                default: {
                    description: 'Error',
                    content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } }
                }
            }
        }
    }
};
