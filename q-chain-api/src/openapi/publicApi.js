module.exports = {
    '/public-api/user/generic': {
        post: {
            operationId: 'createUser',
            security: [{}],
            description: 'Crear un usuario en el sistema QChain',
            tags: ['publicAPI'],
            requestBody: {
                description: 'Mail, clave, nombre, apellido, fecha de nacimiento, tipo de documento, número de documento',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'user_mail',
                                'user_password',
                                'user_name',
                                'user_lastname',
                                'user_birthday',
                                'user_doc_type',
                                'user_doc_number'
                            ],
                            properties: {
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
        }
    },
    '/public-api/login': {
        post: {
            operationId: 'login',
            security: [{}],
            description: 'Loguearse en el sistema QChain',
            tags: ['publicAPI'],
            requestBody: {
                description: 'Mail, clave',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'user_mail',
                                'user_password'
                            ],
                            properties: {
                                user_mail: { 
                                    type: 'string',
                                    format: 'email' 
                                },
                                user_password: { 
                                    type: 'string',
                                    format: 'password' 
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
        }
    },
    '/public-api/decryptBlockchainData': {
        post: {
            operationId: 'decryptBlockchainData',
            security: [{}],
            description: 'Desencriptar turno en el sistema QChain',
            tags: ['publicAPI'],
            requestBody: {
                description: 'Descripción, ',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'hash',
                                'password'
                            ],
                            properties: {
                                hash: { 
                                    type: 'string'
                                },
                                password: { 
                                    type: 'string' 
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
        }
    }
};
