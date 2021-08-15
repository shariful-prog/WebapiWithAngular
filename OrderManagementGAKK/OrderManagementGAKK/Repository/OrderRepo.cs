using OrderManagementGAKK.ApplicationContext;
using OrderManagementGAKK.Generic;
using OrderManagementGAKK.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrderManagementGAKK.ViewModel;

namespace OrderManagementGAKK.Repository
{
    public class OrderRepo : IGenRepository<OrderMaster>
    {
        private readonly ApplicationDbContext _context;
        public OrderRepo(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var order = await _context.OrderMaster.FirstOrDefaultAsync(x => x.OrderMasterId == id);
            if (order != null)
            {
              _context.Remove(order);
                await _context.SaveChangesAsync();
                
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<IEnumerable<OrderMaster>> GetAll(string userId)
        {
            IEnumerable<OrderMaster> ordList=await (from order in _context.OrderMaster
                                  join customer in _context.Users on order.OrderedBy equals customer.Id
                                  where order.OrderedBy == userId
                                  select new OrderMaster{
                                     GrossValue= order.GrossValue,
                                      OrderedBy= order.OrderedBy,
                                      OrderMasterId= order.OrderMasterId,
                                      OrderDate= order.OrderDate,
                                      CustomerName=customer.CustomerName}
                                  ).ToListAsync();

       

            return ordList;
        }

        public async Task<OrderMaster> GetById(int id)
        {
            //OrderMaster order = await _context.OrderMaster.Where(x=>x.OrderMasterId ==id)
            //    .Include(a=>a.OrderDetails).SingleOrDefaultAsync();

            OrderMaster orderMaster = await _context.OrderMaster.Where(x => x.OrderMasterId == id).SingleOrDefaultAsync();
            List<OrderDetail> oddetail =await (from detail in _context.OrderDetail
                                                   join product in _context.Products on detail.ProductId equals product.ProductId
                                                   where detail.OrderMasterId == id
                                                   select new OrderDetail
                                                   {
                                                       OrderMasterId = detail.OrderMasterId,
                                                       OrderDetailId = detail.OrderDetailId,
                                                       ProductId = detail.ProductId,
                                                       Price = detail.Price,
                                                       Quantity = detail.Quantity,
                                                       ProductName = product.ProductName

                                                   }).ToListAsync();

            orderMaster.OrderDetails = oddetail;
            return orderMaster;
        }

        public async Task<OrderMaster> Insert(OrderMaster entity)
        {
            await _context.OrderMaster.AddAsync(entity);
            return entity; ;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(OrderMaster aItem)
        {
             _context.OrderMaster.Update(aItem);
           await _context.SaveChangesAsync();
        }
    }
}


