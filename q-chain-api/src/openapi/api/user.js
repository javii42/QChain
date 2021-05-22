module.exports = {
    '/api/user/generic': {
        put: {
            operationId: 'updateUser',
            security: [{bearerAuth: []}],
            description: 'Actualizar un usuario en el sistema QChain',
            tags: ['userAPI'],
            requestBody: {
                description: 'Id, Mail, clave, nombre, apellido, fecha de nacimiento, tipo de documento, número de documento',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['_id'],
                            properties: {
                                _id: { type: 'string' },
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
        delete: {
            operationId: 'deleteUser',
            security: [{bearerAuth: []}],
            description: 'Elimina un usuario en el sistema QChain',
            tags: ['userAPI'],
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
    },
    '/api/user/employee': {
        post: {
            operationId: 'createUserEmployee',
            security: [{bearerAuth: []}],
            description: 'Crear un usuario con el rol de empleado en el sistema QChain',
            tags: ['userAPI'],
            requestBody: {
                description: 'id compañía, id usuario',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'company_id',
                                'user_id',
                                'user_mail',
                                'user_password',
                                'user_name',
                                'user_lastname',
                                'user_birthday',
                                'user_doc_type',
                                'user_doc_number'
                            ],
                            properties: {
                                company_id: { type: 'string' },
                                user_id: { type: 'string' },
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
        get: {
            operationId: 'getEmployee',
            security: [{bearerAuth: []}],
            description: 'Traer una employee en el sistema QChain',
            tags: ['employeeAPI'],
            parameters: [
                {
                    in: 'query',
                    name: '_id',
                    schema: {type: 'string'},
                    required: true
                },
                {
                    in: 'query',
                    name: 'user_doc_type',
                    schema: {type: 'string'},
                    required: true
                },
                {
                    in: 'query',
                    name: 'user_doc_number',
                    schema: {type: 'string'},
                    required: true
                }
            ],
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
            operationId: 'modifyEmployee',
            security: [{bearerAuth: []}],
            description: 'Modificar un empleado en el sistema QChain',
            tags: ['employeeAPI'],
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
                                user_name: { type: 'string' },
                                user_mail: { type: 'string' },
                                user_doc_type: { type: 'string' },
                                user_doc_number: { type: 'string' }
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
            operationId: 'deleteEmployee',
            security: [{bearerAuth: []}],
            description: 'Elimina un empleado en el sistema QChain',
            tags: ['employeeAPI'],
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
