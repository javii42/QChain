module.exports = {
    '/api/rol': {
        post: {
            operationId: 'createRol',
            security: [{bearerAuth: []}],
            description: 'Crear un rol en el sistema QChain',
            tags: ['rolAPI'],
            requestBody: {
                description: 'Descripcion',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'rol_name',
                                'rol_description',
                                'rol_active',
                                'rol_creation_date'
                            ],
                            properties: {
                                rol_name: { type: 'string' },
                                rol_description: { type: 'string' },
                                rol_active: { type: 'boolean' },
                                rol_creation_date: { type: 'string' },
                                rol_deletion_date: { type: 'string' }
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
            operationId: 'modifyRol',
            security: [{bearerAuth: []}],
            description: 'Modificar un rol en el sistema QChain',
            tags: ['rolAPI'],
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
                                rol_name: { type: 'string' },
                                rol_description: { type: 'string' },
                                rol_active: { type: 'boolean' },
                                rol_creation_date: { type: 'string' },
                                rol_deletion_date: { type: 'string' }
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
            operationId: 'deleteRol',
            security: [{bearerAuth: []}],
            description: 'Elimina un rol en el sistema QChain',
            tags: ['rolAPI'],
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
