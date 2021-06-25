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
    },
    '/api/user/shift': {
        post: {
            operationId: 'createUserShift',
            security: [{}],
            description: 'Crear el turno de un usuario en el sistema QChain',
            tags: ['userAPI'],
            requestBody: {
                description: 'Descripcion',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'branch_id',
                                'user_id',
                                'user_data',
                                'company_name',
                                'employee_name',
                                'ce_id',
                                'shift_call',
                                'shift_duration',
                                'shift_date',
                                'shift_start',
                                'shift_comment'
                            ],
                            properties: {
                                branch_id: { type: 'string' },
                                user_id: { type: 'string' },
                                user_data: { type: 'string' },
                                company_name: { type: 'string' },
                                employee_name: { type: 'string' },
                                ce_id: { type: 'string' },
                                ss_id: { type: 'string' },
                                shift_call: { type: 'integer' },
                                shift_address: {type: 'string'},
                                shift_duration: { type: 'string' },
                                shift_date: { type: 'string' },
                                shift_start: { type: 'string' },
                                shift_comment: { type: 'string' },
                                shift_status: { type: 'string' }
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
            operationId: 'getShifts',
            security: [{}],
            description: 'Traer turnos de una compañía en el sistema QChain',
            tags: ['userAPI'],
            parameters: [
                {
                    in: 'query',
                    name: 'user_id',
                    schema: {type: 'string'}
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
            operationId: 'modifyUserShift',
            security: [{bearerAuth: []}],
            description: 'Modifica el turno de un usuario en el sistema QChain',
            tags: ['userAPI'],
            requestBody: {
                description: 'Descripcion',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                '_id',
                                'branch_id',
                                'user_id',
                                'user_data',
                                'ce_id',
                                'shift_call',
                                'shift_duration',
                                'shift_date',
                                'shift_start',
                                'shift_comment'
                            ],
                            properties: {
                                _id: { type: 'string' },
                                branch_id: { type: 'string' },
                                user_id: { type: 'string' },
                                user_data: { type: 'string' },
                                ce_id: { type: 'string' },
                                ss_id: { type: 'string' },
                                shift_address: {type: 'string'},
                                shift_call: { type: 'integer' },
                                shift_duration: { type: 'string' },
                                shift_date: { type: 'string' },
                                shift_start: { type: 'string' },
                                shift_comment: { type: 'string' }
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
    '/api/user/branch/{company_id}': {
        get: {
            operationId: 'getCompanyBranch',
            security: [{}],
            description: 'Obtener sucursales de una compañía en el sistema QChain',
            tags: ['companyAPI'],
            parameters: [
                {
                    in: 'path',
                    name: 'company_id',
                    required: true,
                    schema: {
                        type: 'string'
                    }
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
        }
    },
    '/api/user/sector/{company_id}': {
        get: {
            operationId: 'getCompanySector',
            security: [{}],
            description: 'Obtener sectores de una compañía en el sistema QChain',
            tags: ['companyAPI'],
            parameters: [
                {
                    in: 'path',
                    name: 'company_id',
                    required: true,
                    schema: {
                        type: 'string'
                    }
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
        }
    },
    '/api/user/employees/{branch_id}': {
        get: {
            operationId: 'getCompanyEmployees',
            security: [{}],
            description: 'Obtener empleados de una compañía en el sistema QChain',
            tags: ['companyAPI'],
            parameters: [
                {
                    in: 'path',
                    name: 'branch_id',
                    required: true,
                    schema: {
                        type: 'string'
                    }
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
        }
    },
    '/api/user/employees/{branch_id}/{sector_id}': {
        get: {
            operationId: 'getCompanyEmployees',
            security: [{}],
            description: 'Obtener empleados de una compañía en el sistema QChain',
            tags: ['companyAPI'],
            parameters: [
                {
                    in: 'path',
                    name: 'branch_id',
                    required: true,
                    schema: {
                        type: 'string'
                    }
                },
                {
                    in: 'path',
                    name: 'sector_id',
                    required: true,
                    schema: {
                        type: 'string'
                    }
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
        }
    },
    '/api/user/agenda': {
        get: {
            operationId: 'getAgenda',
            security: [{}],
            description: 'Traer agenda de una compañía en el sistema QChain',
            tags: ['userAPI'],
            parameters: [
                {
                    in: 'query',
                    name: 'ce_id',
                    schema: {type: 'string'}
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
        }
    }
};
