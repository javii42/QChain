module.exports = {
    '/api/companyType': {
        post: {
            operationId: 'createCompanyType',
            security: [{bearerAuth: []}],
            description: 'Crear un tipo de compañía en el sistema QChain',
            tags: ['companyTypeAPI'],
            requestBody: {
                description: 'Descripcion',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'ct_desc',
                                'ct_active',
                            ],
                            properties: {
                                ct_desc: { type: 'string' },
                                ct_active: { type: 'boolean' }
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
            operationId: 'modifyCompanyType',
            security: [{bearerAuth: []}],
            description: 'Modificar una obra social en el sistema QChain',
            tags: ['companyTypeAPI'],
            requestBody: {
                description: 'Descripción',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['_id'],
                            properties: {
                                _id: { type: 'string' },
                                ct_desc: { type: 'string' },
                                ct_active: { type: 'boolean' }
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
            operationId: 'deletecompanyType',
            security: [{bearerAuth: []}],
            description: 'Elimina un tipo de compañía en el sistema QChain',
            tags: ['companyTypeAPI'],
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
