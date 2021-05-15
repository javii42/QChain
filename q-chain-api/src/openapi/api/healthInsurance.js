module.exports = {
    '/api/healthInsurance': {
        post: {
            operationId: 'createHealthInsurance',
            security: [{bearerAuth: []}],
            description: 'Crear una obra social en el sistema QChain',
            tags: ['healthInsuranceAPI'],
            requestBody: {
                description: 'Descripcion',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'hi_desc',
                                'ct_need_hi',
                            ],
                            properties: {
                                hi_desc: { type: 'string' },
                                ct_need_hi: { type: 'boolean' }
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
            operationId: 'modifyHealthInsurance',
            security: [{bearerAuth: []}],
            description: 'Modificar una obra social en el sistema QChain',
            tags: ['healthInsuranceAPI'],
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
                                hi_desc: { type: 'string' },
                                ct_need_hi: { type: 'boolean' }
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
            operationId: 'deleteHealthInsurance',
            security: [{bearerAuth: []}],
            description: 'Elimina una obra social en el sistema QChain',
            tags: ['healthInsuranceAPI'],
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
