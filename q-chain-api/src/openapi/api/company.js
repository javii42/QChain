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
        get: {
            operationId: 'getCompany',
            security: [{bearerAuth: []}],
            description: 'Traer una compañía en el sistema QChain',
            tags: ['companyAPI'],
            requestBody: {
                description: 'Descripción, ',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object'
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
    },
    '/api/company/sector': {
        post: {
            operationId: 'createCompanySector',
            security: [{bearerAuth: []}],
            description: 'Crear el sector de una compañía en el sistema QChain',
            tags: ['companyAPI'],
            requestBody: {
                description: 'Descripcion',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'company_id',
                                'cs_desc',
                                'cs_active'
                            ],
                            properties: {
                                company_id: { type: 'string' },
                                cs_desc: { type: 'string' },
                                cs_employees: { 
                                    type: 'array',
                                    uniqueItems: true,
                                    items: {type: 'string'} 
                                },
                                cs_active: { type: 'boolean' }
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
    '/api/company/branch': {
        post: {
            operationId: 'createCompanyBranch',
            security: [{bearerAuth: []}],
            description: 'Crear la sucursal de una compañía en el sistema QChain',
            tags: ['companyAPI'],
            requestBody: {
                description: 'Descripcion',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'company_id',
                                'branch_num',
                                'branch_name',
                                'branch_active'
                            ],
                            properties: {
                                company_id: { type: 'string' },
                                branch_num: { type: 'integer' },
                                branch_name: { type: 'string' },
                                branch_employees: { 
                                    type: 'array',
                                    uniqueItems: true,
                                    items: {type: 'string'} 
                                },
                                branch_active: { type: 'boolean' }
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
    '/api/company/branch/address': {
        post: {
            operationId: 'createCompanyBranchAddress',
            security: [{bearerAuth: []}],
            description: 'Crear la direccion de la sucursal de una compañía en el sistema QChain',
            tags: ['companyAPI'],
            requestBody: {
                description: 'Descripcion',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'branch_id',
                                'ba_street',
                                'ba_number',
                                'ba_country',
                                'ba_locality',
                                'ba_city',
                                'ba_active'
                            ],
                            properties: {
                                branch_id: { type: 'string' },
                                ba_street: { type: 'string' },
                                ba_number: { type: 'integer' },
                                ba_country: { type: 'string' },
                                ba_locality: { type: 'string' },
                                ba_city: { type: 'string' },
                                ba_geometry: { 
                                    type: 'array',
                                    uniqueItems: true,
                                    items: {type: 'object'} 
                                },
                                ba_active: { type: 'boolean' }
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
    '/api/company/agenda': {
        post: {
            operationId: 'createCompanyAgenda',
            security: [{bearerAuth: []}],
            description: 'Crear la agenda de una compañía en el sistema QChain',
            tags: ['companyAPI'],
            requestBody: {
                description: 'Descripcion',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'ce_id',
                                'branch_id',
                                'agenda_week_day',
                                'agenda_date',
                                'agenda_open',
                                'agenda_opening',
                                'agenda_closing',
                                'agenda_q_shifts',
                                'agenda_sim_shifts',
                                'agenda_shift_duration'
                            ],
                            properties: {
                                ce_id: { type: 'string' },
                                branch_id: { type: 'string' },
                                agenda_week_day: { type: 'integer', enum: [1,2,3,4,5,6,7] },
                                agenda_date: { type: 'string' },
                                agenda_open: { type: 'boolean' },
                                agenda_opening: { type: 'string' },
                                agenda_closing: { type: 'string' },
                                agenda_q_shifts: { type: 'integer' },
                                agenda_sim_shifts: { type: 'integer' },
                                agenda_shift_duration: { type: 'string' }
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
    '/api/company/shift': {
        get: {
            operationId: 'getShifts',
            security: [{bearerAuth: []}],
            description: 'Traer turnos de una compañía en el sistema QChain',
            tags: ['companyAPI'],
            requestBody: {
                description: 'Descripción, ',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object'
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
            operationId: 'createCompanyShift',
            security: [{bearerAuth: []}],
            description: 'Crear el turno de una compañía en el sistema QChain',
            tags: ['companyAPI'],
            requestBody: {
                description: 'Descripcion',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: [
                                'shift_id',
                                'branch_id',
                                'user_id',
                                'ce_id',
                                'ss_id',
                                'shift_call',
                                'shift_duration',
                                'shift_date',
                                'shift_start',
                                'shift_comment'
                            ],
                            properties: {
                                shift_id: { type: 'string' },
                                branch_id: { type: 'string' },
                                user_id: { type: 'string' },
                                ce_id: { type: 'string' },
                                ss_id: { type: 'string' },
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
    }
};
