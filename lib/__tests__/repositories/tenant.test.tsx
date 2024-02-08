import ITenant from '../../domain/entities/ITenant';
import TenantRepository from '../../domain/repositories/TenantRepository';
// docker exec main yarn test
describe('name and email required fields', () => {
  it('should not save without name', async () => {
    const tenantRepository = new TenantRepository();
    const tenant: ITenant = {
      email: 'test@example.com',
      phone: '1234567890',
      notes: 'Some notes'
    };

    let error;
    try {
      await tenantRepository.save(tenant);
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
  });
});

export {};
