using Microsoft.EntityFrameworkCore;
using OrderManagementGAKK.ApplicationContext;
using OrderManagementGAKK.Generic;
using OrderManagementGAKK.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagementGAKK.Repository
{
    public class ProductRepo : IGenRepository<Product>
    {
      private readonly  ApplicationDbContext _context;
        public ProductRepo(ApplicationDbContext context)
        {
            this._context = context;

        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == id);
            if(product != null)
            {
                _context.Remove(product);
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }

        }

        public async Task<IEnumerable<Product>> GetAll(string userId)
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetById(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Product> Insert(Product entity)
        {
            await _context.Products.AddAsync(entity);
            return entity;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public Task UpdateAsync(Product aProduct)
        {
            throw new NotImplementedException();
        }
    }
}
