const BASE_URL = 'http://localhost:3000'; // TODO: find why ENV variable is not working for this

export const API_BASE = `${BASE_URL}/api`;

export const POST_METHOD = 'POST';
export const GET_METHOD = 'GET';
export const PUT_METHOD = 'PUT';
export const DELETE_METHOD = 'DELETE';

// PROPERTIES
export const ALL_PROPERTY_METHODS_ENDPOINT = `${API_BASE}/properties`;

// TENANTS
export const ALL_TENANT_METHODS_ENDPOINT = `${API_BASE}/tenants`;

// CONTRACT DEFS
export const ALL_CONTRACT_DEF_METHODS_ENDPOINT = `${API_BASE}/contractdefs`;
