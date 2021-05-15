module.exports = {
    ArrayString: {
        type: 'array',
        uniqueItems: true,
        items: {type: 'string'}
    },
    ArrayNumber: {
        type: 'array',
        uniqueItems: true,
        items: {type: 'integer'}
    },
    Role: {
        type: 'object',
        properties: {
            id: {type: 'string'},
            name: {type: 'string'},
            order: {type: 'integer'}
        }
    },
    ids: {
        type: 'array',
        uniqueItems: true,
        items: {
            type: 'string',
            format: 'uuid'
        }
    },
    User: {
        type: 'object',
        properties: {
        }
    },
    Profile: {
        type: 'object',
        properties: {
            token: {
                type: 'string',
                nullable: true
            },
            success: {
                type: 'boolean',
                nullable: true
            },
            user: {
                allOf: [{$ref: '#/components/schemas/User'}],
                type: 'object',
                required: [
                    'roles'
                ],
                properties: {
                    role: {
                        type: 'array',
                        items: {type: 'string'}
                    },
                    attributes: {type: 'object'}
                }
            }
        }
    },
    Error: {
        type: 'object',
        required: [
            'code',
            'message'
        ],
        properties: {
            code: {
                type: 'integer',
                format: 'int32'
            },
            message: {type: 'string'}
        }
    }
};
